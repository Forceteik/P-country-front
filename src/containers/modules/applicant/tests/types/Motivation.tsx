import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

import { Box, Typography, CircularProgress, Grid } from '@mui/material';

import TestProgress from 'containers/modules/applicant/components/TestProgress';
import Button from 'components/Button';
import { axiosClient } from 'pages/_app';
import { useSession } from 'context/UserContext';
import CompletedModal from 'containers/modules/common/modals/CompletedTest/CompletedTest';
import { OverlayLoader } from 'components/Loaders';
import { useStyles } from 'containers/modules/applicant/tests/types/styles';
import TestItem from 'containers/modules/applicant/tests/components/TestItem';

const Motivation = () => {
  const [testId, setTestId] = useState(0);
  // const [isDone, setIsDone] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(null);
  const [aLoading, setALoading] = useState(false);
  const { refetch } = useSession();
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState(0);
  const [{ data, loading, error }] = useAxios('motivation/tests/start');
  const [, answer] = useAxios({ method: 'post' }, { manual: true });

  const [finishModal, setFinishModal] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setTestId(data.data.id);
      axiosClient
        .get(`motivation/tests/user/${data.data.id}/next-questions`)
        .then(({ data }) => {
          setNextQuestion(data);
        })
        .catch((e) => {
          if (e.code === 'test_not_access') {
            // setIsDone(true);
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
      url: `motivation/tests/user/${testId}/answer`,
      data: {
        question_id: nextQuestion.data.id,
        answer_id: selectedValue,
      },
    }).then(() => {
      if (nextQuestion.question_left === 1) {
        refetch();
        setFinishModal(true);
        // router.push("/applicant");
      } else {
        axiosClient.get(`motivation/tests/user/${testId}/next-questions`).then(({ data }) => {
          setNextQuestion(data);
          setSelectedValue(0);
          setALoading(false);
        });
      }
    });
  };

  const isFormValid = () => selectedValue !== 0;
  const questionNumber = data?.data?.test.question_count - nextQuestion?.question_left + 1 || 0;
  // let done = isDone;
  if (loading) {
    return <OverlayLoader />;
  }
  if (error && error.code === 'test_not_access') {
    // done = true;
  }
  // console.log("isDone", isDone);
  // const done = isDone ||
  return (
    <Box className={classes.container}>
      <CompletedModal open={finishModal} fullReportLink={'/applicant/motivation/report'} />
      <Box className={classes.root}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Box className={classes.header}>
              <TestProgress total={data?.data?.test.question_count} current={questionNumber} wm />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.questionHelper}>Выберите один вариант</Typography>
            <TestItem
              title={data?.data?.test.question_text}
              options={nextQuestion?.data?.answers}
              selectedValue={selectedValue}
              handleSelect={handleSelect}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Button
              fullWidth
              onClick={handleSubmit}
              disabled={!isFormValid()}
              loading={aLoading}
              // endIcon={<ArrowForwardIcon />}
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

export default Motivation;