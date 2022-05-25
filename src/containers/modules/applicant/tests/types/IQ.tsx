import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import Countdown from 'react-countdown';
import { Trans } from 'react-i18next';
import times from 'lodash.times';

import { Box, Typography, CircularProgress, Grid, useMediaQuery } from '@mui/material';

import Button from 'components/Button';
import { axiosClient } from 'pages/_app';
import { useSession } from 'context/UserContext';
import CompletedModal from 'containers/modules/common/modals/CompletedTest/CompletedTest';
import { OverlayLoader } from 'components/Loaders';
import { useStyles } from 'containers/modules/applicant/tests/types/styles';
import { IQ_SUB_TEST_COUNT } from 'constants/common';

import IQOptions from '../components/iqOptions';

import { renderer } from './Ability';

const IQ = ({ itemId }) => {
  const [testId, setTestId] = useState(0);
  const [nextQuestion, setNextQuestion] = useState(null);
  const [timer, setTimer] = useState(0);
  const [aLoading, setALoading] = useState(true);
  const { refetch } = useSession();
  const classes = useStyles();
  const [selectedValues, setSelectedValues] = useState([]);
  const [{ data, loading, error }] = useAxios(`iq/tests/start/${itemId}`);
  const [, answer] = useAxios({ method: 'post' }, { manual: true });
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const [completedModal, setCompletedModal] = useState({
    state: false,
    fullReportLink: '',
  });

  const [, getUser] = useAxios('profile', { manual: true });

  // const [timeLeft, { start, pause, resume, reset }] = useCountDown(360000, 1000);

  // если П перезагрузил страницу или позже вернулся к тестам, получаем вопрос-ответ
  useEffect(() => {
    if (data?.data) {
      setTestId(data.data.id);
      getNextQuestion();
    }
  }, [loading]);

  // value is the {statement_id: 0, answer_id}
  const handleSelect = (value) => {
    let selectedValuesArr = [...selectedValues];
    if (selectedValuesArr.some((item) => item.statement_id === value.statement_id)) {
      selectedValuesArr = selectedValuesArr.filter((item) => item.statement_id !== value.statement_id);
    }
    selectedValuesArr.push(value);
    setSelectedValues(selectedValuesArr);
  };

  // Вызывается когда нажата кнопка далее или когда время истекло, были выбраны ответы и симетам сабмитить ответы за П
  const handleSubmit = () => {
    setALoading(true);

    answer({
      url: `iq/tests/user/${testId}/answer/${nextQuestion.id}`,
      data: {
        statements: selectedValues.map((item) => ({ statement_id: item.statement_id, answer_id: item.answer_id })),
      },
    })
      .then(({ data }) => {
        setNextQuestion(data.data);
        setTimer(Date.now() + data.data.time_left * 1000);
        setSelectedValues([]);
        setALoading(false);
      })
      .catch((e) => {
        if (e.code === 'test_not_access' || e.code === 'test_already_been_completed' || e.code === 'test_completed') {
          finishTest();
        }
      });
  };

  const handleSystemSubmit = () => {
    setALoading(true);
    //Если он что то выбрал и время истекло, система отвечает за него
    if (selectedValues.length !== 0) {
      handleSubmit();
    } else {
      getNextQuestion();
    }
  };

  const getNextQuestion = () => {
    axiosClient
      .get(`iq/tests/user/${data.data.id}/next-questions`)
      .then(({ data }) => {
        // если полученный вопрос с сервера одинаков с текущим, делаем следующю попытку получить новый вопрос
        if (data.data.id === nextQuestion?.id) {
          getNextQuestion();
        } else {
          setNextQuestion(data.data);
          setTimer(Date.now() + data?.data?.time_left * 1000);
          setALoading(false);
        }
      })
      .catch((e) => {
        if (e.code === 'test_not_access' || e.code === 'test_already_been_completed' || e.code === 'test_completed') {
          // setIsDone(true);
          finishTest();
        }
      });
  };

  const finishTest = () => {
    refetch();

    // based on number of completed test show "Go to test" or "Go to full report" button
    getUser().then(({ data }) => {
      const countFinished = data.data.iq.filter((item) => item.status === 'completed').length;
      if (countFinished === IQ_SUB_TEST_COUNT) {
        setCompletedModal({
          state: true,
          fullReportLink: '/applicant/iq/report',
        });
      } else {
        setCompletedModal({
          state: true,
          fullReportLink: '',
        });
      }
    });
  };
  const generateAnswers = () => {
    const result = {};
    const countAnswers = nextQuestion?.question?.statements.length;
    times(countAnswers, (index) => {
      if (selectedValues[index]) {
        result[`answer${index + 1}`] = selectedValues[index].label;
      } else {
        result[`answer${index + 1}`] = '...';
      }
    });

    return result;
  };

  const isFormValid = () => selectedValues.length === nextQuestion?.question?.statements.length;

  if (loading) {
    return <OverlayLoader />;
  }

  const answers = generateAnswers();

  return (
    <Box className={classes.container} mb={5}>
      <CompletedModal
        open={completedModal.state || error?.code === 'test_not_access'}
        fullReportLink={completedModal.fullReportLink}
        testLink={'/applicant/tests/3'}
      />
      <Box className={classes.root}>
        <Grid container spacing={isMobile ? 3 : 4} justifyContent="center">
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center" className={classes.relativeGrid}>
              <Grid item>
                <Typography className={classes.title}>Вопрос {nextQuestion?.number}</Typography>
              </Grid>
              <Grid item>
                <Box className={classes.countdownBoxIQ}>
                  {!aLoading && !loading && (
                    <>
                      <Typography className={classes.remine}>Осталось:</Typography>
                      <Countdown date={timer} onComplete={handleSystemSubmit} renderer={renderer} />
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.task}>
              <Trans i18nKey={nextQuestion?.question.text} values={answers} />
            </Typography>
          </Grid>

          {nextQuestion?.question.media_desktop && (
            <Grid item xs={12}>
              <Box textAlign="center">
                <img src={nextQuestion?.question.media_desktop.original_url} alt="" className={classes.imgIq} />
              </Box>
            </Grid>
          )}
          {nextQuestion?.question?.task && (
            <Grid item xs={12}>
              <Typography className={classes.helperTextIQ}>{nextQuestion?.question.task}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <IQOptions
              options={nextQuestion?.question?.statements}
              selectedValues={selectedValues}
              handleSelect={handleSelect}
              loading={aLoading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5} className={classes.iqButton}>
            <Button
              fullWidth
              onClick={handleSubmit}
              disabled={!isFormValid()}
              loading={aLoading || loading}
              // endIcon={<ArrowForwardIcon />}
              loadingIndicator={<CircularProgress color="inherit" size={26} />}
            >
              Далее
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default IQ;
