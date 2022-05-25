import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

import { Box, Typography, Grid } from '@mui/material';

import TestProgress from 'containers/modules/applicant/components/TestProgress';
import Button from 'components/Button';
import { axiosClient } from 'pages/_app';
import { useSession } from 'context/UserContext';
import CompletedModal from 'containers/modules/common/modals/CompletedTest/CompletedTest';
import { OverlayLoader } from 'components/Loaders';
import { useStyles } from 'containers/modules/applicant/tests/types/styles';
import TestItemCorpValues from 'containers/modules/applicant/tests/components/TestItemCorpValues';

const CorpValues = () => {
  const [testId, setTestId] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(null);
  const [aLoading, setALoading] = useState(false);
  const { refetch } = useSession();
  const classes = useStyles();
  const [orderedAnswers, setOrderedAnswers] = useState([]);
  // const [selectedValue, setSelectedValue] = useState(0);
  const [{ data, loading, error }] = useAxios('/corp-values/tests/start');
  const [, answer] = useAxios({ method: 'post' }, { manual: true });

  const [finishModal, setFinishModal] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setTestId(data.data.id);
      axiosClient
        .get(`/corp-values/tests/user/${data.data.id}/next-questions`)
        .then(({ data }) => {
          setNextQuestion(data);
        })
        .catch((e) => {
          if (e.code === 'test_not_access' || e.code === 'test_completed') {
            setIsDone(true);
          }
        });
    }
  }, [loading]);

  const handleSelect = (orderedAnswers) => {
    setOrderedAnswers(orderedAnswers);
    // setSelectedValue(parseInt(e.target.value));
  };

  const handleSubmit = () => {
    setALoading(true);
    answer({
      url: `/corp-values/tests/user/${testId}/answer`,
      data: {
        question_id: nextQuestion.data.question.id,
        answers: orderedAnswers.map((item) => item.id),
      },
    })
      .then(() => {
        if (nextQuestion.question_left === 1) {
          refetch();
          setFinishModal(true);
          // router.push("/applicant");
        } else {
          axiosClient.get(`/corp-values/tests/user/${testId}/next-questions`).then(({ data }) => {
            setNextQuestion(data);
            setOrderedAnswers([]);
            setALoading(false);
          });
        }
      })
      .catch((e) => {
        setALoading(true);
        if (e.code === 'test_not_access') {
          refetch();
          setFinishModal(true);
        }
      });
  };

  const isFormValid = () => true;
  const questionNumber = data?.data?.test.question_count - nextQuestion?.question_left + 1 || 0;
  let done = isDone;
  if (loading) {
    return <OverlayLoader />;
  }
  if (error && (error.code === 'test_not_access' || error.code === 'test_completed')) {
    done = true;
  }

  return (
    <Box className={classes.container}>
      <CompletedModal open={finishModal || done} fullReportLink={null} />
      <Box className={classes.root}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Box className={classes.header}>
              <TestProgress total={data?.data?.test.question_count} current={questionNumber} wm />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.questionHelper}>{data?.data.test.task}</Typography>
            <TestItemCorpValues
              title={nextQuestion?.data?.question.text}
              options={nextQuestion?.data?.question.answers}
              onChange={handleSelect}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Button fullWidth onClick={handleSubmit} disabled={!isFormValid()} loading={aLoading}>
              {nextQuestion?.question_left === 1 ? 'Завершить\u00A0тест' : 'Далее'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CorpValues;
