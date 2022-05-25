import { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Hidden from '@mui/material/Hidden';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

import Button, { TetriatyButton } from 'components/Button';

import useVacancyStyles from '../style';

import WorkerCharacter from './WorkerCharacter';

const SecondStep = ({ dictionaryState, onNext, onBack, ...other }) => {
  const classes = useVacancyStyles();
  const teamRoleTest = dictionaryState.data.team_role_test;
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const [answers, setAnswers] = useState(other.answers);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(
    other.answers.length !== 0 ? other.answers.length - 1 : 0,
  );

  const handleNext = () => {
    if (teamRoleTest.questions.length === activeQuestionIndex + 1) {
      onNext(3, { answers });
    } else {
      setActiveQuestionIndex(activeQuestionIndex + 1);
      onNext(2, { answers });
    }
  };

  const handleBack = () => {
    onBack(1);
  };

  const handleAnswer = (questionId, answerId, grades = []) => {
    let answersArr = [...answers];
    const foundQuestion = answersArr.find((item) => item.questionId === questionId);
    if (foundQuestion) {
      answersArr = answersArr.filter((item) => item.questionId !== questionId);
      answersArr.push({ questionId, answerId, grades });
    } else {
      answersArr.push({ questionId, answerId, grades });
    }
    onNext(2, { answers: answersArr });
    setAnswers(answersArr);
  };

  const questions = teamRoleTest.questions;
  const nextEnabled = activeQuestionIndex + 1 === answers.length && answers[0].grades.length !== 0;

  return (
    <Grid container spacing={isMobile ? 4 : 7}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography component="h2" className={classes.blockTitle}>
              Совместимость по психотипу и командной роли
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.notification}>
              <Grid container alignItems="center" justifyContent="space-between" spacing={isMobile ? 2 : 0}>
                <Grid item xs={12} sm={8}>
                  <Typography className={classes.notificationTitle}>Очень важно!</Typography>
                  <Typography className={classes.notificationText}>
                    Следующие шаги анкеты необходимы для точного подбора лучшего кандидата на вашу вакансию. Пожалуйста,
                    отвечайте ответственно!
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
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <WorkerCharacter
          questions={questions}
          activeQuestionIndex={activeQuestionIndex}
          answers={answers}
          onChange={handleAnswer}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Button fullWidth onClick={handleNext} disabled={!nextEnabled}>
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

export default SecondStep;
