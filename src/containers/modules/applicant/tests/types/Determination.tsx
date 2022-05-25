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

import TestItemDetermination from '../components/TestItemDetermination';

const Determination = () => {
  const classes = useStyles();
  const { refetch } = useSession();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const [testId, setTestId] = useState(0);
  const [aLoading, setALoading] = useState(false);
  const [nextQuestions, setNextQuestions] = useState([]);
  const [questionLeft, setQuestionLeft] = useState(0);
  const [selectedValues, setSelectedValues] = useState([
    { questionId: 0, point: -1 },
    { questionId: 0, point: -1 },
  ]);

  const [isDone, setIsDone] = useState(false);

  const [{ data, loading, error }] = useAxios('determination/tests/start');

  const [, answer] = useAxios({ method: 'post' }, { manual: true });

  useEffect(() => {
    if (data?.data) {
      setTestId(data.data.id);
      axiosClient
        .get(`determination/tests/user/${data.data.id}/next-questions`)
        .then(({ data }) => {
          setNextQuestions(data.data.questions);
          setQuestionLeft(data.question_left);
        })
        .catch((e) => {
          if (e.code === 'test_not_access') {
            setIsDone(true);
          }
        });
    }
  }, [loading]);

  const handleAnswerChange = (questionId, point, index) => {
    const answersArr = [...selectedValues];
    answersArr[index] = { questionId, point };

    setSelectedValues(answersArr);
  };

  const handleSubmit = () => {
    setALoading(true);
    answer({
      url: `determination/tests/user/${testId}/answer`,
      data: {
        answers: selectedValues
          .filter((item) => item.point !== -1)
          .map((item) => ({ question_id: item.questionId, point: item.point })),
      },
    })
      .then(({ data }) => {
        setNextQuestions(data.data.questions);

        setSelectedValues([
          { questionId: 0, point: -1 },
          { questionId: 0, point: -1 },
        ]);
        setALoading(false);
        setQuestionLeft(data.question_left);
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

  const isFormValid = () => !selectedValues.some((item) => item.point === -1);
  const questionNumber = (data?.data?.test.question_count - questionLeft) / 2 + 1 || 0;

  return (
    <Box className={classes.container}>
      <CompletedModal open={done} fullReportLink={'/applicant/determination/report'} />
      <Box className={classes.root}>
        <Grid container spacing={isMobile ? 4 : 5} justifyContent="center">
          <Grid item xs={12}>
            <Box className={classes.header}>
              <TestProgress total={data?.data?.test.question_count / 2} current={questionNumber} wm />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.questionHelper}>
              Перетащите ползунок по линии на место, которое отражает степень вашего согласия с утверждением.
            </Typography>
            {nextQuestions.map((item, key) => (
              <TestItemDetermination
                item={item}
                key={key}
                index={key}
                onChange={handleAnswerChange}
                selectedValue={selectedValues[key].point}
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={5} className={classes.gridBtn}>
            <Button fullWidth disabled={!isFormValid()} onClick={handleSubmit} loading={aLoading}>
              {questionLeft === 2 ? 'Завершить тест' : 'Далее'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Determination;
