import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';

import { Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { VacancyCircularProgress } from 'components/CustomCircularProgress';
import LineProgress from 'components/LineProgress';
import { generatePercentColor } from 'containers/modules/applicant/profile/Content/utils';
import CheckGreen from 'components/icons/CheckGreen';
import CloseRed from 'components/icons/CloseRed';
import { black, greenMain, midDarkGray, pinkMain } from 'styles/colorPalette';
import { MadFormatter } from 'utils/formatters';

const useStyles = makeStyles<any>((theme) => ({
  label: {
    'fontSize': theme.typography.pxToRem(14),
    'fontFamily': 'inter-med',
    'marginBottom': theme.spacing(1.5),
    'textAlign': 'left',
    'lineHeight': '110%',
    '& span': {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: '110%',
    },
  },
  mainTitle: {
    fontSize: theme.typography.pxToRem(26),
    textAlign: 'left',
    fontFamily: 'inter-bold',
    lineHeight: '110%',
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  profileTitle: {
    'marginBottom': theme.spacing(3),
    'marginTop': theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(4),
    },
    '& .MuiInputBase-input': {
      'color': black,
      '-webkit-text-fill-color': 'rgba(0, 0, 0, 1)',
    },
  },
  innerLabel: {
    fontSize: theme.typography.pxToRem(12),
    marginBottom: theme.spacing(0.7),
    color: midDarkGray,
  },
}));

//функция высчитывает % разницу между верхней границей зп вакансии и желаемой зп соискателя
const calcPersentDifference = (from, to, expectation) => {
  let percent = 0;
  const fromNum = Number(from);
  const toNum = Number(to);
  const expectationNum = Number(expectation);

  if (!from && !to) {
    return;
  } else if (to) {
    if (expectationNum > toNum) {
      percent = (expectationNum / toNum - 1) * 100;
    } else {
      return;
    }
  } else {
    if (expectationNum > fromNum) {
      percent = (expectationNum / fromNum - 1) * 100;
    }
  }
  //код добавлен чтобы выводить максимум +999% в редких сучаях огромной разницы между зп и ожиданиями кандидата. Попросил Петр
  if (percent) {
    if (percent > 999) {
      return (
        <Typography component={'span'} color={percent > 30 ? pinkMain : greenMain}>
          {' '}
          +999%
        </Typography>
      );
    }
    return (
      <Typography component={'span'} color={percent > 30 ? pinkMain : greenMain}>
        {' '}
        +{Math.round(percent)}%
      </Typography>
    );
  }
};

const CompetencyInfo = ({ compatibility, expectation, vacancyData = null, modal = false }) => {
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const compatibilityClasses = useStyles();

  const router = useRouter();
  const { vacancy_id } = router.query;

  const [{ data: vacancyDataAxious }] = useAxios(`/vacancies/${vacancy_id}`);

  const vData = vacancyData || vacancyDataAxious;

  if (!compatibility) {
    return null;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent={'space-between'} wrap={'nowrap'}>
          <Grid item xs={12} sm={'auto'}>
            <Typography className={compatibilityClasses.mainTitle}>Общая совместимость</Typography>
          </Grid>
          <Grid item>
            <VacancyCircularProgress progress={compatibility.value} size={65} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2.5}>
          <Grid item xs={modal ? 11.5 : 12}>
            <Typography className={compatibilityClasses.label}>Ценности</Typography>
            <LineProgress
              progress={compatibility.corp_values}
              label={`${Math.round(compatibility.corp_values)}%`}
              color={generatePercentColor(compatibility.corp_values)}
            />
          </Grid>
          <Grid item xs={modal ? 11.5 : 12}>
            <Typography className={compatibilityClasses.label}>Компетенции</Typography>
            <LineProgress
              progress={compatibility.competencies}
              label={`${Math.round(compatibility.competencies)}%`}
              color={generatePercentColor(compatibility.competencies)}
            />
          </Grid>
          <Grid item xs={modal ? 11.5 : 12}>
            <Typography className={compatibilityClasses.label}>Командная роль</Typography>
            <LineProgress
              progress={compatibility.team_role}
              label={`${Math.round(compatibility.team_role)}%`}
              color={generatePercentColor(compatibility.team_role)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={compatibilityClasses.label}>Профессиональные навыки</Typography>
            <LineProgress
              progress={compatibility.qualities}
              label={`${Math.round(compatibility.qualities)}%`}
              color={generatePercentColor(compatibility.qualities)}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2.4}>
              <Grid item xs={modal ? 11.4 : 12}>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography className={compatibilityClasses.label}>Заработная плата</Typography>
                  </Grid>
                  <Grid item>{compatibility.salary ? <CheckGreen /> : <CloseRed />}</Grid>
                </Grid>
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                  direction={isMobile ? 'column' : 'row'}
                >
                  <Grid xs={7} container item direction="column" alignItems="start">
                    <Typography className={compatibilityClasses.innerLabel}>Ваше предложение</Typography>
                    {vData?.data.salary_from ? (
                      <Typography className={compatibilityClasses.label}>
                        {MadFormatter.toCurrency(vData?.data.salary_from, '₽')}
                        {vData?.data.salary_to && `- ${MadFormatter.toCurrency(vData?.data.salary_to, '₽')}`}
                      </Typography>
                    ) : (
                      <Typography className={compatibilityClasses.label}>По результатам собеседования</Typography>
                    )}
                  </Grid>
                  <Grid xs={5} container item direction="column" alignItems={isMobile ? 'start' : 'end'}>
                    <Typography className={compatibilityClasses.innerLabel}>Ожидания кандидата</Typography>
                    <Typography className={compatibilityClasses.label}>
                      {MadFormatter.toCurrency(expectation, '₽')}
                      {calcPersentDifference(vData?.data.salary_from, vData?.data.salary_to, expectation)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={modal ? 11.4 : 12}>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography className={compatibilityClasses.label}>Профессиональная область</Typography>
                  </Grid>
                  <Grid item>{compatibility.specialization ? <CheckGreen /> : <CloseRed />}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={modal ? 11.4 : 12}>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography className={compatibilityClasses.label}>Предпочительные ВУЗы</Typography>
                  </Grid>
                  <Grid item>{compatibility.education ? <CheckGreen /> : <CloseRed />}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompetencyInfo;
