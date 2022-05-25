import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import Countdown from 'react-countdown';
import cx from 'classnames';
import { useRouter } from 'next/router';

import { Box, Typography, CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import {
  calcProgressColor,
  calcProgressColorLight,
  TestProgressWithSelection,
} from 'containers/modules/applicant/components/TestProgress';
import Button, { SecondaryButton } from 'components/Button';
import { axiosClient } from 'pages/_app';
import { useSession } from 'context/UserContext';
import CompletedTest from 'containers/modules/common/modals/CompletedTest/CompletedTest';
import { OverlayLoader } from 'components/Loaders';
import { useStyles } from 'containers/modules/applicant/tests/types/styles';
import TestItemSocial from 'containers/modules/applicant/tests/components/TestItemSocial';
import LineProgress from 'components/LineProgress';
import { SOCIAL_SUB_TEST_COUNT } from 'constants/common';

import { renderer } from './Ability';

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

const useCustomStyles = makeStyles(() => ({
  countdownRoot: {
    position: 'relative',
    top: 0,
    right: 0,
  },
}));

const calculatePaginationPropsData = (breakpoint) => {
  let siblingCount = 3;
  let boundaryCount = 1;
  if (breakpoint === 'xs') {
    siblingCount = 0;
    boundaryCount = 1;
  }

  if (breakpoint === 'sm') {
    siblingCount = 1;
    boundaryCount = 1;
  }

  return {
    siblingCount,
    boundaryCount,
  };
};

/**
 * У этого теста есть некоторая особенность
 * 1. Ответы отправляются на сервер только когда самостоятенльно нажал Завершить тест, никакой автоматически
 * 2. Если П частично или вообще не ответил на вопросы.
 * @param itemId
 * @constructor
 */
const Social = ({ itemId }) => {
  const width = useWidth();
  const router = useRouter();
  const { siblingCount, boundaryCount } = calculatePaginationPropsData(width);

  const [testId, setTestId] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(1);

  const [timer, setTimer] = useState(0);
  const [aLoading, setALoading] = useState(false);

  const { refetch } = useSession();
  const classes = useStyles();
  const customStyles = useCustomStyles();
  const [{ data, loading, error }] = useAxios(`/gilford/tests/start/${itemId}`);
  const [, answer] = useAxios({ method: 'post' }, { manual: true });
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const [, getUser] = useAxios('profile', { manual: true });

  const [completedModal, setCompletedModal] = useState({
    state: false,
    fullReportLink: '',
  });

  const handleQuestionChange = (e, page) => {
    setActiveQuestion(page);
  };

  useEffect(() => {
    if (data?.data) {
      const answersLS = localStorage.getItem(`talantyTestAnswers_${data.data.test_user.id}`);

      if (answersLS) {
        setAnswers(JSON.parse(answersLS));
      }
    }
  }, [loading]);

  // useEffect(() => {
  //   if (data?.data && testId !== 0) {
  //     if (data.data.time_left === 0) {
  //       sendAnswers();
  //     }
  //   }
  // }, [data, testId]);

  useEffect(() => {
    if (data?.data) {
      setTestId(data.data.test_user.id);
      axiosClient
        .get(`/gilford/tests/user/${data.data.test_user.id}/next-questions`)
        .then(({ data }) => {
          if (data.data?.time_left === 0) {
            location.reload();
          }
          setQuestions(data.data.questions);
          setTimer(Date.now() + data.data?.time_left * 1000);
          // setALoading(false);
        })
        .catch((e) => {
          // todo очень топорно, но это работает. Рассмотреть элегантнее способ решить эту задачу
          // суть в том что в этом случае нужно вызвать /start и таким образом перезапускаем тесты
          if (e.code === 'page_not_found') {
            location.reload();
          }
          if (e.code === 'test_not_access' || e.code === 'test_already_been_completed' || e.code === 'test_completed') {
            finishTest();
          }
        });
    }
  }, [loading]);

  const finishTest = () => {
    refetch({
      onRefetched: () => {
        // based on number of completed test show "Go to test" or "Go to full report" button
        getUser()
          .then(({ data: userData }) => {
            const socialCountFinished = userData.data.gilford.filter((item) => item.status === 'completed').length;
            if (socialCountFinished === SOCIAL_SUB_TEST_COUNT) {
              setCompletedModal({
                state: true,
                fullReportLink: '/applicant/social/report',
              });
            } else {
              setCompletedModal({
                state: true,
                fullReportLink: '',
              });
            }
            setALoading(false);
            localStorage.removeItem(`talantyTestAnswers_${data.data.test_user.id}`);
          })
          .catch(() => {
            setALoading(false);
          });
      },
    });
  };

  const handleSelect = (questionId) => (e) => {
    let answersArr = [...answers];
    if (answersArr.some((item) => item.questionId === questionId)) {
      answersArr = answersArr.filter((item) => item.questionId !== questionId);
      answersArr = [...answersArr, { questionId, answerId: parseInt(e.target.value) }];
    } else {
      answersArr.push({ questionId, answerId: parseInt(e.target.value) });
    }
    setAnswers(answersArr);
    localStorage.setItem(`talantyTestAnswers_${data.data.test_user.id}`, JSON.stringify(answersArr));
  };

  const handleSkip = () => {
    setActiveQuestion(activeQuestion + 1);
  };

  const sendAnswers = () => {
    setALoading(true);
    answer({
      url: `/gilford/tests/user/${testId}/answer`,
      data: {
        answers: answers.map((item) => ({ question_id: item.questionId, answer_id: item.answerId })),
      },
    }).then(() => {
      setTimeout(() => {
        finishTest();
      }, 2000);
    });
  };
  /**
   * Эта функция вызывается в 2х сценариях
   * 1. П. выбрал все ответы и завершил тест
   * 2. П. выбрал все/не все ответы и по окончании таймера система сама отправляет данные на сервер
   */
  const handleSubmit = (reason) => () => {
    if (reason === 'user') {
      // Все ответы есть, отправляем ответы на сервер
      if (questions.length === answers.length) {
        sendAnswers();
      } else {
        setActiveQuestion(activeQuestion + 1);
      }
    }
    if (reason === 'system') {
      sendAnswers();
    }
  };

  let done = false;
  if (loading) {
    return <OverlayLoader />;
  }
  if (error && error.code === 'test_not_access') {
    done = true;
  }

  /**
   * Нажатие недоступно:
   * 1. Если мы на последнем вопросе и все вопросы не отвечены
   * 2. Если не отвечен текущий вопрос
   */
  const isFormValid = () => {
    let isValid = true;

    if (questions.length !== answers.length && activeQuestion === questions.length) {
      isValid = false;
    }

    if (!answers.some((item) => item.questionId === questions[activeQuestion - 1]?.id)) {
      isValid = false;
    }
    return isValid;
  };

  return (
    <Box className={classes.container}>
      <CompletedTest
        open={completedModal.state || done}
        testLink={'/applicant/tests/7'} //todo вставить ид с базы
        fullReportLink={completedModal.fullReportLink}
      />
      <Box className={classes.root}>
        <Grid container spacing={isMobile ? 3 : 4} justifyContent="center">
          <Grid item xs={12} className={classes.relativeGrid}>
            <Box className={classes.headerContent}>
              <TestProgressWithSelection
                count={questions.length}
                onChange={handleQuestionChange}
                answers={answers}
                questions={questions}
                page={activeQuestion}
                siblingCount={siblingCount}
                boundaryCount={boundaryCount}
                // defaultPage={activeQuestion}
              />
              <Box className={cx(classes.countdownBoxAbility, customStyles.countdownRoot)}>
                {timer !== 0 && (
                  <>
                    <Typography className={classes.remine}>Осталось:</Typography>
                    <Countdown
                      date={timer}
                      // onTick={({ total }) => setTimer(total)}
                      onComplete={() => {
                        router.push('/applicant');
                      }}
                      renderer={renderer}
                    />
                  </>
                )}
              </Box>
            </Box>
            <Box className={classes.headerProgress}>
              <LineProgress
                withoutLabel
                color={calcProgressColor(questions.length, answers.length)}
                bgColor={calcProgressColorLight(questions.length, answers.length)}
                progress={(answers.length / questions.length) * 100}
                label={Math.round((answers.length / questions.length) * 100) + '%'}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.questionHelper}>Выберите один вариант</Typography>
            <TestItemSocial
              title={questions[activeQuestion - 1]?.text || ''}
              helperText={''}
              imgUrlWeb={questions[activeQuestion - 1]?.media}
              imgUrlMobile={questions[activeQuestion - 1]?.media}
              options={questions[activeQuestion - 1]?.answers || []}
              selectedValue={
                answers.find((item) => item.questionId === questions[activeQuestion - 1]?.id)?.answerId || -1
              }
              handleSelect={handleSelect(questions[activeQuestion - 1]?.id)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <SecondaryButton fullWidth onClick={handleSkip} disabled={activeQuestion === questions.length}>
                  Пропустить
                </SecondaryButton>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  onClick={handleSubmit('user')}
                  disabled={!isFormValid()}
                  loading={aLoading || loading}
                  // endIcon={<ArrowForwardIcon />}
                  loadingIndicator={<CircularProgress color="inherit" size={26} />}
                  // loadingPosition="end"
                >
                  {questions.length === answers.length ? 'Завершить\u00A0тест' : 'Далее'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Social;
