import { Doughnut } from 'react-chartjs-2';
import cx from 'classnames';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueMain, gray, midDarkGray, orangeMain } from 'styles/colorPalette';
import Eye from 'components/icons/Eye';
import Profile from 'components/icons/Profile';
import ActivityLineProgress from 'containers/modules/common/profile/ActivityLineProgress';
import activityStyle from 'containers/modules/common/styles/activityStyle';

const useStyles = makeStyles<any, any>((theme) => ({
  activityBox: {
    backgroundColor: '#F8F9FC',
    display: 'flex',
    borderRadius: 20,
    padding: '24px 20px 22px 24px',
    height: ({ responses }) => (responses ? 'unset' : '100%'),
    [theme.breakpoints.down('md')]: {
      height: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 15px',
    },
  },
  doughnut: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      maxWidth: 130,
      maxHeight: 130,
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 100,
      maxHeight: 100,
    },
  },
  doughnutLabel: {
    'width': '65%',
    'justifyContent': 'center',
    'position': 'absolute',
    'top': '56%',
    'left': '52%',
    'transform': 'translate(-50%, -50%)',
    'display': 'flex',
    '& span': {
      fontSize: theme.typography.pxToRem(12),
      fontFamily: 'inter-bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(9),
      },
    },
  },
  doughnutNum: {
    'fontSize': theme.typography.pxToRem(19),
    'fontFamily': 'inter-bold',
    'position': 'relative',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
    },
    '&:not(:last-child)': {
      'paddingRight': theme.spacing(0.5),
      'marginRight': theme.spacing(0.5),
      '&:after': {
        content: '""',
        width: 1,
        height: 11,
        backgroundColor: midDarkGray,
        position: 'absolute',
        bottom: 6,
        right: 0,
        transform: 'rotate(29deg)',
        [theme.breakpoints.down('sm')]: {
          height: 8,
        },
      },
    },
  },
}));

const doughnutOptions = {
  plugins: {
    tooltip: {
      enabled: false,
    },
  },
  animation: { duration: 0 },
};

const calculateRate = (views, responses) => {
  const total = views + responses;
  const viewRate = views !== 0 ? Math.round((views / total) * 100) : 0;
  const responsesRate = responses !== 0 ? Math.round((responses / total) * 100) : 0;

  if (total === 0) {
    return {
      total,
      responses: responsesRate,
      views: viewRate,
      zero: 1,
    };
  }
  return {
    total,
    responses: responsesRate,
    views: viewRate,
    zero: 0,
  };
};

const generateDoughnutData = (rate) => ({
  datasets: [
    {
      rotation: 100,
      data: [rate.views, rate.responses, rate.zero],
      backgroundColor: [orangeMain, blueMain, gray],
      borderRadius: rate.zero === 1 ? 0 : 39,
      spacing: rate.zero === 1 ? 0 : 1,
      cutout: '80%',
      tooltips: false,
      legend: { display: false },
      hoverOffset: 0,
      borderWidth: rate.zero === 1 ? 0 : 2,
    },
  ],
});

const Activity = ({ responses = false, title = 'Активность', responseCount = 0, viewsCount = 0 }) => {
  const classes = useStyles({ responses });
  const commonStyle = activityStyle();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const rate = calculateRate(viewsCount, responseCount);
  const doughnutData = generateDoughnutData(rate);
  //Если значения будут очень большими - будет выделяться больше места под цифры, чтобы они не выпали за пределы блока
  const bigNumber = viewsCount > 999999 || responseCount > 999999 ? true : false;

  return (
    <Box component="article" className={classes.activityBox}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={10} md={12}>
          <Grid container alignItems="center" spacing={1} justifyContent={isMobile ? 'flex-start' : 'space-between'}>
            <Grid item xs={7} sm={8} md={responses ? 12 : 6} lg={responses ? 12 : 7}>
              <Typography component="h3" className={commonStyle.title}>
                {title}
              </Typography>
              <Typography className={commonStyle.text}>Процентное соотношение откликов и просмотров</Typography>
            </Grid>
            <Grid item xs={5} sm={4} md={6} lg={responses ? 6 : 5} className={classes.doughnut}>
              {/*@ts-ignore*/}
              <Doughnut data={doughnutData} type="doughnut" options={doughnutOptions} />

              <Box className={classes.doughnutLabel}>
                <Typography className={cx(commonStyle.orange, classes.doughnutNum)}>
                  {rate.views}
                  <Typography component="span">%</Typography>
                </Typography>
                <Typography className={cx(commonStyle.blue, classes.doughnutNum)}>
                  {rate.responses}
                  <Typography component="span">%</Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={12}>
          <Typography className={commonStyle.label}>Просмотры:</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9} sm={10} md={bigNumber ? 8 : 9}>
              <ActivityLineProgress progress={rate.views} color={orangeMain} />
            </Grid>
            <Grid item xs={3} sm={2} md={bigNumber ? 4 : 3}>
              <Box display="flex" alignItems="center">
                <Box flexShrink={0} width={20} className={commonStyle.icon}>
                  <Eye />
                </Box>
                <Typography className={commonStyle.iconText}>{viewsCount}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={12}>
          <Typography className={commonStyle.label}>Отклики:</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9} sm={10} md={bigNumber ? 8 : 9}>
              <ActivityLineProgress progress={rate.responses} color={blueMain} />
            </Grid>
            <Grid item xs={3} sm={2} md={bigNumber ? 4 : 3}>
              <Box display="flex" alignItems="center">
                <Box flexShrink={0} width={20} className={commonStyle.icon}>
                  <Profile />
                </Box>
                <Typography className={commonStyle.iconText}>{responseCount}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Activity;
