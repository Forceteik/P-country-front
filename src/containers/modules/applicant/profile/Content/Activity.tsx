import { Doughnut } from 'react-chartjs-2';
import cx from 'classnames';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueMain, gray, orangeMain, pinkMain } from 'styles/colorPalette';
import Eye from 'components/icons/Eye';
import Profile from 'components/icons/Profile';
import Blank from 'components/icons/Blank';
import ActivityLineProgress from 'containers/modules/common/profile/ActivityLineProgress';
import activityStyle from 'containers/modules/common/styles/activityStyle';
import { useProfile } from 'context/ProfileContext';

const useStyles = makeStyles<any, any>((theme) => ({
  activityBox: {
    backgroundColor: '#F8F9FC',
    display: 'flex',
    borderRadius: 20,
    padding: '10px 20px 22px 24px',
    height: ({ responses }) => (responses ? 'unset' : '100%'),
    [theme.breakpoints.down('md')]: {
      height: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 15px',
    },
  },
  doughnutLabel: {
    justifyContent: 'center',
    position: 'absolute',
    top: '57%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
  },
  doughnutNum: {
    'fontSize': ({ responses }) => (responses ? theme.typography.pxToRem(16) : theme.typography.pxToRem(19)),
    'fontFamily': 'inter-bold',
    'position': 'relative',
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.typography.pxToRem(16),
    },
    '&:not(:last-child)': {
      'paddingRight': theme.spacing(0.5),
      'marginRight': theme.spacing(0.5),
      '&:after': {
        content: '""',
        width: 1,
        height: 11,
        backgroundColor: gray,
        position: 'absolute',
        bottom: 6,
        right: 0,
        transform: 'rotate(16deg)',
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

const calculateRate = (views, invitations, rejections) => {
  const total = views + invitations + rejections;
  const viewsRate = views !== 0 ? Math.round((views / total) * 100) : 0;
  const invitationsRate = invitations !== 0 ? Math.round((invitations / total) * 100) : 0;
  const rejectionsRate = rejections !== 0 ? Math.round((rejections / total) * 100) : 0;

  return {
    total,
    views: viewsRate,
    invitations: invitationsRate,
    rejections: rejectionsRate,
  };
};

const Activity = ({ title, responses = false, ...other }) => {
  const classes = useStyles({ responses });
  const commonStyle = activityStyle();
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.only('md'));
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  const session = useProfile();

  let views = 0,
    invitations = 0,
    rejections = 0,
    zero = 0;

  // если график загружается в откликах
  if (responses) {
    views = other.views;
    invitations = other.invitations;
    rejections = other.rejections;

    const total = views + invitations + rejections;
    if (total === 0) {
      zero = 1;
    }
  } else {
    views = session.currentUser.employee.views;
    invitations = session.invitations;
    rejections = session.rejections;
    const total = views + invitations + rejections;
    if (total === 0) {
      zero = 1;
    }
  }

  const generateData = (views, invitations, rejections, zero) => ({
    datasets: [
      {
        rotation: 100,
        data: [views, invitations, rejections, zero],
        backgroundColor: [orangeMain, blueMain, pinkMain, gray],
        borderRadius: zero === 1 ? 0 : 39,
        spacing: zero === 1 ? 0 : 1,
        cutout: isSm ? '85%' : '83%',
        tooltips: false,
        legend: { display: false },
        borderWidth: zero === 1 ? 0 : 2,
        hoverOffset: 0,
      },
    ],
  });

  const doughnutData = generateData(views, invitations, rejections, zero);
  const rates = calculateRate(views, invitations, rejections);

  return (
    <Box component="article" className={classes.activityBox}>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={10} md={12}>
          <Grid container alignItems="center" spacing={1} justifyContent={isMd && responses ? 'center' : 'flex-start'}>
            <Grid item xs={6} sm={9} md={responses ? 12 : 6} lg={responses ? 12 : 7}>
              <Typography component="h3" className={commonStyle.title}>
                {title}
              </Typography>
              <Typography className={commonStyle.text}>Cоотношение приглашений, просмотров и отказов</Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={6} lg={responses ? 6 : 5} position={'relative'} textAlign="center">
              {/*@ts-ignore*/}
              <Doughnut data={doughnutData} type="doughnut" options={doughnutOptions} />

              <Box className={classes.doughnutLabel}>
                <Typography className={cx(commonStyle.orange, classes.doughnutNum)}>{rates.views}</Typography>
                <Typography className={cx(commonStyle.blue, classes.doughnutNum)}>{rates.invitations}</Typography>
                <Typography className={cx(commonStyle.pink, classes.doughnutNum)}>{rates.rejections}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={12}>
          <Typography className={commonStyle.label}>Просмотры:</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9} sm={10} md={9}>
              <ActivityLineProgress progress={rates.views} color={orangeMain} />
            </Grid>
            <Grid item xs={3} sm={2} md={3}>
              <Box display="flex">
                <Box flexShrink={0} width={20} className={commonStyle.icon}>
                  <Eye />
                </Box>
                <Typography className={commonStyle.iconText}>{views}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={12}>
          <Typography className={commonStyle.label}>Приглашения:</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9} sm={10} md={9}>
              <ActivityLineProgress progress={rates.invitations} color={blueMain} />
            </Grid>
            <Grid item xs={3} sm={2} md={3}>
              <Box display="flex">
                <Box flexShrink={0} width={20} className={commonStyle.icon}>
                  <Profile />
                </Box>
                <Typography className={commonStyle.iconText}>{invitations}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={10} md={12}>
          <Typography className={commonStyle.label}>Отказы:</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9} sm={10} md={9}>
              <ActivityLineProgress progress={rates.rejections} color={pinkMain} />
            </Grid>
            <Grid item xs={3} sm={2} md={3}>
              <Box display="flex">
                <Box flexShrink={0} width={20} className={commonStyle.icon}>
                  <Blank />
                </Box>
                <Typography className={commonStyle.iconText}>{rejections}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Activity;
