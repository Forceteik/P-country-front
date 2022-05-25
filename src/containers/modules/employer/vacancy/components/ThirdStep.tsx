import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Hidden from '@mui/material/Hidden';

import Button, { TetriatyButton } from 'components/Button';
import TestProgress from 'containers/modules/applicant/components/TestProgress';
import { black, blueMain } from 'styles/colorPalette';

import useVacancyStyles from '../style';

const useThirdStyle = makeStyles<any>((theme) => ({
  itemContainer: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'space-between',
  },
  itemAnswer: {
    padding: '20px 24px',
    border: '1px solid #E1E3E8',
    borderRight: 'none',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    width: '100%',
    display: 'flex',
    cursor: 'pointer',
  },
  itemHandle: {
    background: '#F0F5FB',
    display: 'flex',
    alignItems: 'center',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  itemIcon: {
    transform: 'rotate(90deg)',
    color: '#979DAD',
    cursor: 'pointer',
  },
  mainSortable: {
    'color': black,
    '& .sortable-chosen': {
      '& $itemIcon': {
        color: blueMain,
      },
    },
  },
}));

const ThirdStep = ({ dictionaryState, onSubmit, onNext, onBack, ...other }) => {
  const classes = useVacancyStyles();
  const thirdClasses = useThirdStyle();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const [answers, setAnswers] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(other.corpActiveQuestionIndex);

  const corpValuesQuestions =
    other.corpValuesData.length !== 0 ? other.corpValuesData : dictionaryState.data.corp_values_test.questions;

  const [corpValuesTestResult, setCorpValuesTestResult] = useState(other.corpValuesData);

  const activeQuestion = corpValuesQuestions.find((item, key) => key === activeQuestionIndex);

  const handleBack = () => {
    onBack(2);
  };

  useEffect(() => {
    setAnswers(activeQuestion.answers);
  }, [activeQuestion]);

  useEffect(() => {
    setCorpValuesTestResult(
      corpValuesQuestions.map((item) => ({
        id: item.id,
        text: item.text,
        answers: item.answers,
      })),
    );
  }, [corpValuesQuestions]);

  const handleAnswerSubmit = () => {
    if (corpValuesTestResult.length === activeQuestionIndex + 1) {
      onSubmit({ answers: corpValuesTestResult });
    } else {
      const resultArr = [...corpValuesTestResult];
      const foundQuestion = resultArr.find((item) => item.id === activeQuestion.id);
      if (foundQuestion) {
        resultArr[activeQuestionIndex] = { id: foundQuestion.id, answers };
        // resultArr = resultArr.filter((item) => item.questionId !== activeQuestion.id);
        // resultArr.push({ questionId: activeQuestion.id, answers });
      }
      setCorpValuesTestResult(resultArr);
      setActiveQuestionIndex(activeQuestionIndex + 1);
      onNext(resultArr, activeQuestionIndex + 1);
    }
  };

  return (
    <Grid container spacing={isMobile ? 4 : 7}>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography component="h2" className={classes.blockTitle}>
              Совместимость по ценностям <Typography component="span">*</Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.notification}>
              <Grid container alignItems="center" justifyContent="space-between" spacing={isMobile ? 2 : 0}>
                <Grid item xs={12} sm={8}>
                  <Typography className={classes.notificationTitle}>Инструкция</Typography>
                  <Typography className={classes.notificationText}>
                    Перед вами представлено начало утверждения. Расположите варианты его продолжения в порядке того,
                    насколько важно это было бы для компании вашей мечты (с учетом должности): на первом месте должно
                    стоять самое важное, а на последнем наименее важное.
                  </Typography>
                </Grid>
                <Hidden smDown>
                  <Grid item xs={12} sm={3}>
                    <img src="/images/vacancies/notification.png" width="132" height="117" />
                  </Grid>
                </Hidden>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.header}>
              <TestProgress total={corpValuesTestResult.length} current={activeQuestionIndex + 1} wm />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.descr}>{dictionaryState.data.corp_values_test.task}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.notificationTitle}>{activeQuestion.text}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box className={thirdClasses.mainSortable}>
              <ReactSortable list={answers} setList={setAnswers} animation={200}>
                {answers.map((item, key) => (
                  <Box key={item.id} className={thirdClasses.itemContainer}>
                    <Box padding={2.5}>
                      <Typography>{key + 1}</Typography>
                    </Box>
                    <Box className={thirdClasses.itemAnswer}>
                      <Typography>{item.text}</Typography>
                    </Box>
                    <Box className={thirdClasses.itemHandle}>
                      <DragIndicatorIcon className={thirdClasses.itemIcon} />
                    </Box>
                  </Box>
                ))}
              </ReactSortable>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Button fullWidth onClick={handleAnswerSubmit} loading={other.loadingSubmit}>
              Далее
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TetriatyButton fullWidth onClick={handleBack}>
              Назад
            </TetriatyButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ThirdStep;
