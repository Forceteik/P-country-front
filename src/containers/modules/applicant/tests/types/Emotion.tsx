import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

import { Box, Typography, Grid, useMediaQuery } from '@mui/material';

import TestProgress from 'containers/modules/applicant/components/TestProgress';
import Button from 'components/Button';
import { axiosClient } from 'pages/_app';
import { useSession } from 'context/UserContext';
import CompletedModal from 'containers/modules/common/modals/CompletedTest/CompletedTest';
import { OverlayLoader } from 'components/Loaders';
import { useStyles } from 'containers/modules/applicant/tests/types/styles';

import TestItemEmotion from '../components/TestItemEmotion';

const Emotion = () => {
  const classes = useStyles();
  const { refetch } = useSession();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const [testId, setTestId] = useState(0);
  const [aLoading, setALoading] = useState(false);

  const [isDone, setIsDone] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [questionLeft, setQuestionLeft] = useState(0);
  const [selectedValue, setSelectedValue] = useState({
    questionId: -1,
    point: -1,
    value: 0,
  });

  const [{ data, loading, error }] = useAxios('/hall/tests/start');

  const [, answer] = useAxios({ method: 'post' }, { manual: true });

  useEffect(() => {
    if (data?.data) {
      setTestId(data.data.id);
      axiosClient
        .get(`hall/tests/user/${data.data.id}/next-questions`)
        .then(({ data }) => {
          setNextQuestion(data.data.question);
          setQuestionLeft(data.question_left);
          setQuestionCount(data.data.test_user.test.question_count);
        })
        .catch((e) => {
          if (e.code === 'test_not_access') {
            setIsDone(true);
          }
        });
    }
  }, [loading]);

  const handleAnswerChange = (questionId, point, value) => {
    setSelectedValue({ questionId, point, value });
  };

  const handleSubmit = () => {
    setALoading(true);
    answer({
      url: `hall/tests/user/${testId}/answer`,
      data: {
        question_id: selectedValue.questionId,
        point: selectedValue.point,
      },
    })
      .then(({ data }) => {
        setNextQuestion(data.data.question);

        setSelectedValue({ questionId: -1, point: -1, value: 0 });
        setNextQuestion(data.data.question);
        setQuestionLeft(data.question_left);
        setQuestionCount(data.data.test_user.test.question_count);
        setALoading(false);
      })
      .catch((e) => {
        if (e.code === 'test_not_access' || e.code === 'test_already_been_completed' || e.code === 'test_completed') {
          refetch();
          setIsDone(true);
        }
      });
  };

  let done = isDone;

  if (loading) {
    return <OverlayLoader />;
  }

  if (error && error.code === 'test_not_access') {
    done = true;
  }

  const isFormValid = () => selectedValue.questionId !== -1 && selectedValue.value !== 0;
  const questionNumber = questionCount - questionLeft + 1 || 0;

  return (
    <Box className={classes.container}>
      <CompletedModal open={done} fullReportLink={'/applicant/hall/report'} />
      <Box className={classes.root}>
        <Grid container spacing={isMobile ? 4 : 5} justifyContent="center">
          <Grid item xs={12}>
            <Box className={classes.header}>
              <TestProgress total={questionCount} current={questionNumber} wm />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.questionHelper}>
              Выберите вариант ответа, который больше всего отражает степень вашего согласия или несогласия с
              высказыванием.
            </Typography>
            <TestItemEmotion onChange={handleAnswerChange} selectedValue={selectedValue} nextQuestion={nextQuestion} />
          </Grid>

          <Grid item xs={12} sm={6} md={5} className={classes.gridBtn}>
            <Button fullWidth disabled={!isFormValid()} onClick={handleSubmit} loading={aLoading}>
              Далее
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Emotion;
