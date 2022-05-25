import { Fragment } from 'react';

import { Grid, Typography, useMediaQuery, Box, Checkbox, FormControlLabel } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import RadioGroup from 'components/RadioGroup';
import { blueLight, blueMain } from 'styles/colorPalette';

import useVacancyStyles from '../style';

const useStyles = makeStyles<any>((theme) => ({
  checkbox: {
    '& .MuiFormGroup-root': {
      'marginLeft': 0,
      'flexDirection': 'column',
      '& .MuiFormControlLabel-root': {
        marginLeft: 0,
      },
    },
  },
  itemCheckbox: {
    'padding': theme.spacing(2),
    'borderRadius': 16,
    'border': '1px solid #E1E3E8',
    'marginBottom': theme.spacing(2),
    'marginRight': 0,
    '& .MuiFormControlLabel-label': {
      fontSize: theme.typography.pxToRem(18),
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(16),
      },
    },
  },
  itemCheckboxChecked: {
    'padding': theme.spacing(2),
    'borderRadius': 16,
    'backgroundColor': blueLight,
    'color': blueMain,
    'border': `1px solid ${blueLight}`,
    'marginBottom': theme.spacing(2),
    'marginRight': 0,
    '& .MuiFormControlLabel-label': {
      fontSize: theme.typography.pxToRem(18),
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(16),
      },
    },
  },
}));

const WorkerCharacter = (props) => {
  const { questions, answers, ...other } = props;

  const common = useVacancyStyles();
  const classes = useStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const handleSelect = (e, questionId, answerId, grades = []) => {
    other.onChange(questionId, answerId, grades);
  };

  const activeQuestion = questions.find((item, key) => key === props.activeQuestionIndex);
  const questionFound = answers.find((answer) => answer.questionId === activeQuestion?.id);

  const items = activeQuestion?.answers.map((item) => ({
    value: item.id,
    label: item.text,
    ExtraContent: () => {
      const selectedGrades = questionFound?.grades;

      const handleCheckbox = (e, gradeId) => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        let gradesArr = [...questionFound?.grades];
        if (e.target.checked) {
          gradesArr.push(gradeId);
        } else {
          gradesArr = gradesArr.filter((grade) => grade !== gradeId);
        }

        handleSelect(e, activeQuestion.id, questionFound?.answerId, gradesArr);
      };

      if (item.grades.length === 0) {
        return null;
      }
      return (
        <Box pb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography fontFamily={'inter-bold'}>Уточните уровень:</Typography>
            </Grid>
            {item.grades.map((item, key) => (
              <Grid item xs={12} lg={6} key={key}>
                <Box p={1} borderRadius={16} border="1px solid #E1E3E8">
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={selectedGrades.includes(item.id)}
                        onChange={(e) => handleCheckbox(e, item.id)}
                        color="primary"
                      />
                    }
                    label={item.name}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    },
  }));

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={isMobile ? 1 : 2}>
          <Grid item xs={12}>
            <Typography component="h2" className={common.blockTitle}>
              Качества будущего сотрудникa{' '}
              <Typography className={common.titleSpan}>({questions.length} вопроса)</Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={common.descr}>{activeQuestion.text}</Typography>
          </Grid>
          <Grid item xs={12} />
        </Grid>
        <Grid container spacing={isMobile ? 1 : 2}>
          <Fragment>
            <Grid item xs={12}>
              <Typography>Вопрос {props.activeQuestionIndex + 1}</Typography>
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                items={items}
                selectedValue={questionFound?.answerId || null}
                className={classes.checkbox}
                itemClassName={classes.itemCheckbox}
                itemClassNameChecked={classes.itemCheckboxChecked}
                onChange={(e, value) => handleSelect(e, activeQuestion.id, parseInt(value))}
              />
            </Grid>
          </Fragment>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WorkerCharacter;
