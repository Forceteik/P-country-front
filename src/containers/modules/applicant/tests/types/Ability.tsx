import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import Countdown from 'react-countdown';

import { Box, Typography, CircularProgress, Grid, useMediaQuery } from '@mui/material';

import TestProgress from 'containers/modules/applicant/components/TestProgress';
import Button from 'components/Button';
import { axiosClient } from 'pages/_app';
import { useSession } from 'context/UserContext';
import CompletedTest from 'containers/modules/common/modals/CompletedTest/CompletedTest';
import { OverlayLoader } from 'components/Loaders';
import { useStyles } from 'containers/modules/applicant/tests/types/styles';
import TestItem from 'containers/modules/applicant/tests/components/TestItem';
import { greenMain, pinkMain } from 'styles/colorPalette';
import { ABILITY_SUB_TEST_COUNT } from 'constants/common';
import CountdownTime from 'components/CountdownTime';

export const renderer = ({ total, completed, formatted }) => {
  if (completed) {
    // Render a completed state
    return <CountdownTime time={'00:00'} color={total > 10 ? greenMain : pinkMain} width={51} />;
  }
  return (
    <CountdownTime
      time={`${formatted.minutes}:${formatted.seconds}`}
      width={51}
      color={total > 10 ? greenMain : pinkMain}
    />
  );
};

const Ability = ({ group }) => {
  const [testId, setTestId] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(null);
  const [timer, setTimer] = useState(0);
  const [aLoading, setALoading] = useState(true);
  const { refetch } = useSession();
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState(0);
  const [{ data, loading, error }] = useAxios(`ability/tests/start/${group}`);
  const [, answer] = useAxios({ method: 'post' }, { manual: true });
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const [, getUser] = useAxios('profile', { manual: true });

  const [completedModal, setCompletedModal] = useState({
    state: false,
    fullReportLink: '',
  });

  // const [timeLeft, { start, pause, resume, reset }] = useCountDown(360000, 1000);

  useEffect(() => {
    if (data?.data) {
      setTestId(data.data.id);
      axiosClient
        .get(`ability/tests/user/${data.data.id}/next-questions`)
        .then(({ data }) => {
          setNextQuestion(data);
          setTimer(Date.now() + data?.data?.time_left * 1000);
          setALoading(false);
          // start(data?.data?.time_left * 1000);
        })
        .catch((e) => {
          if (e.code === 'test_not_access' || e.code === 'test_already_been_completed') {
            setIsDone(true);
          }
        });
    }
  }, [loading]);

  const handleSelect = (e) => {
    setSelectedValue(parseInt(e.target.value));
  };

  const handleSubmit = () => {
    setALoading(true);
    answer({
      url: `ability/tests/user/${testId}/answer`,
      data: {
        question_id: nextQuestion?.data?.question.id,
        answer_id: selectedValue,
      },
    }).then(() => {
      handleNextQuestion();
    });
  };

  const handleNextQuestion = (reason = 'user') => {
    if (nextQuestion.question_left === 1) {
      // даем время, чтобы данные успели обновиться на сервере
      setTimeout(() => {
        refetch();
        getUser().then(({ data }) => {
          const countFinished = data.data.ability.filter((item) => item.status === 'completed').length;
          if (countFinished === ABILITY_SUB_TEST_COUNT) {
            setCompletedModal({
              state: true,
              fullReportLink: '/applicant/ability/report',
            });
          } else {
            setCompletedModal({
              state: true,
              fullReportLink: '',
            });
          }
        });

        // router.push("/applicant");
      }, 5000);
    } else {
      // Если он выбрал ответ и не ответил до окончания таймера, дать возможность все равно отправить ответ
      if (selectedValue !== 0 && reason === 'system') {
        handleSubmit();
      } else {
        axiosClient.get(`ability/tests/user/${testId}/next-questions`).then(({ data }) => {
          if (nextQuestion?.question_left === data?.question_left || data?.data?.time_left === 0) {
            // if (nextQuestion?.data.id === data?.data?.id) {
            handleNextQuestion();
          } else {
            setNextQuestion(data);
            setTimer(Date.now() + data?.data?.time_left * 1000);
            setSelectedValue(0);
            setALoading(false);
            // start(data?.data?.time_left * 1000);
          }
        });
      }
    }
  };

  const isFormValid = () => selectedValue !== 0;
  const questionNumber = data?.data?.test?.question_count - nextQuestion?.question_left + 1 || 0;
  const questionTotal = data?.data?.test.question_count;
  let done = isDone;
  if (loading) {
    return <OverlayLoader />;
  }
  if (error && error.code === 'test_not_access') {
    done = true;
  }

  return (
    <Box className={classes.container}>
      <CompletedTest
        open={completedModal.state || done}
        testLink={'/applicant/tests/2'}
        fullReportLink={completedModal.fullReportLink}
      />
      <Box className={classes.root}>
        <Grid container spacing={isMobile ? 3 : 4} justifyContent="center">
          <Grid item xs={12} className={classes.relativeGrid}>
            <TestProgress total={questionTotal} current={questionNumber} wm />
            <Box className={classes.countdownBoxAbility}>
              {!aLoading && !loading && (
                <>
                  <Typography className={classes.remine}>Осталось:</Typography>
                  <Countdown
                    date={timer}
                    // onTick={({ total }) => setTimer(total)}
                    onComplete={() => {
                      setALoading(true);
                      handleNextQuestion('system');
                    }}
                    renderer={renderer}
                  />
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.questionHelper}>
              {data?.data?.test?.group === 'verbal'
                ? 'Прочтите отрывок и скажите, верно ли утверждение'
                : 'Выберите один вариант'}
            </Typography>
            <TestItem
              title={nextQuestion?.data?.question.text}
              helperText={nextQuestion?.data?.question?.question_helper_text}
              imgUrlWeb={nextQuestion?.data?.question.media_desktop}
              imgUrlMobile={nextQuestion?.data?.question.media_mobile}
              options={nextQuestion?.data?.question?.answers}
              selectedValue={selectedValue}
              handleSelect={handleSelect}
              group={data?.data?.test?.group}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Button
              fullWidth
              onClick={handleSubmit}
              disabled={!isFormValid()}
              loading={aLoading || loading}
              loadingIndicator={<CircularProgress color="inherit" size={26} />}
            >
              {nextQuestion?.question_left === 1 ? 'Завершить\u00A0тест' : 'Далее'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Ability;
