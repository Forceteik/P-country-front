import { Box, Grid, Hidden, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import PersonalSlider from 'components/PersonalSlider';
import Button, { SecondaryButton } from 'components/Button';
import BlockStyleOne from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/BlockStyleOne';
import testProfileStyle from 'containers/modules/common/styles/testProfileStyle';
import { black, darkGray, midDarkGray, orangeMain } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  rightTitle: {
    color: orangeMain,
    fontSize: theme.typography.pxToRem(24),
    fontFamily: 'inter-bold',
    lineHeight: '115%',
  },
  rightSubTitle: {
    color: darkGray,
    fontSize: theme.typography.pxToRem(12),
  },
  mainText: {
    color: midDarkGray,
    fontSize: theme.typography.pxToRem(14),
  },
  winnerText: {
    color: black,
  },
}));

const PersonalTest = ({ title, user, fullReportHref = '/applicant/mbti/report', guest = false, report = false }) => {
  const mbti = user.mbti;
  const isDone = mbti?.status === 'completed';
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  const personalData = isDone ? generatePersonalData(mbti.result) : [];

  const classes = useStyles();
  const commonTestStyle = testProfileStyle({ report });

  return (
    <>
      {isDone ? (
        <Box>
          <Grid container className={commonTestStyle.gridContainer}>
            <Grid item xs={12} lg={report ? 12 : 8} className={commonTestStyle.paddingLeftTest}>
              <Grid container spacing={2} justifyContent="center" alignContent="center">
                <Grid item xs={12}>
                  <Typography className={commonTestStyle.titleTest} component="h3">
                    {title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {personalData.map((item, key) => (
                    <Grid container key={key} spacing={1} alignItems="center" justifyContent="space-between">
                      <Grid item xs={4} sm={2} lg={3}>
                        <Typography className={`${item.winner === 'name1' && classes.winnerText} ${classes.mainText}`}>
                          {item.name1}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={8} md={report ? 5 : 6} lg={6}>
                        <Box style={{ height: 50 }}>
                          <PersonalSlider
                            value={item.progress}
                            aria-labelledby="range-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks={false}
                            min={0}
                            max={22}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={4} sm={2} lg={3}>
                        <Box textAlign="right">
                          <Typography
                            className={`${item.winner === 'name2' && classes.winnerText} ${classes.mainText}`}
                          >
                            {item.name2}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                {!report && (
                  <Hidden lgUp>
                    <Grid item xs={12} sm={8} md={10}>
                      <BlockStyleOne data={mbti.result.config_type} />
                    </Grid>
                  </Hidden>
                )}
                {!report && (
                  <Grid item xs={12} sm={8} md={10} lg={12}>
                    <SecondaryButton nextLink linkProps={{ href: fullReportHref }} fullWidth small>
                      Полный отчет
                    </SecondaryButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {!report && (
              <Hidden lgDown>
                <Grid item xs={4}>
                  <BlockStyleOne data={mbti.result.config_type} />
                </Grid>
              </Hidden>
            )}
          </Grid>
        </Box>
      ) : (
        <Box className={commonTestStyle.nullImgBox}>
          <img src={isSm ? '/images/tests/bg-blur/nullTest-bg.png' : '/images/tests/bg-blur/desctop-null.png'} alt="" />
          <Box className={commonTestStyle.nullInfo}>
            <Typography className={commonTestStyle.nullTitle}>{title}</Typography>
            <Typography className={commonTestStyle.nullText}>
              {guest ? 'Кандидат не прошел тест' : 'Для получения результатов пройдите тест'}
            </Typography>
            {!guest && (
              <Box className={commonTestStyle.nullBtnWidth}>
                <Button nextLink linkProps={{ href: '/applicant/tests/1' }} small fullWidth>
                  Пройти тест
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

const generatePersonalData = (result) => {
  return [
    {
      name1: 'Экстраверт',
      name2: 'Интроверт',
      progress: parseInt(result.e) > parseInt(result.i) ? [11 - parseInt(result.e), 11] : [11, parseInt(result.i) + 11],
      winner: result.e > result.i ? 'name1' : 'name2',
    },
    {
      name1: 'Ощущения',
      name2: 'Интуиция',
      progress: parseInt(result.s) > parseInt(result.n) ? [11 - parseInt(result.s), 11] : [11, parseInt(result.n) + 11],
      winner: parseInt(result.s) > parseInt(result.n) ? 'name1' : 'name2',
    },
    {
      name1: 'Мышление',
      name2: 'Чувство',
      progress: parseInt(result.t) > parseInt(result.f) ? [11 - parseInt(result.t), 11] : [11, parseInt(result.f) + 11],
      winner: parseInt(result.t) > parseInt(result.f) ? 'name1' : 'name2',
    },
    {
      name1: 'Восприятие',
      name2: 'Суждение',
      progress: parseInt(result.p) > parseInt(result.j) ? [11 - parseInt(result.p), 11] : [11, parseInt(result.j) + 11],
      winner: parseInt(result.p) > parseInt(result.j) ? 'name1' : 'name2',
    },
  ];
};

export default PersonalTest;
