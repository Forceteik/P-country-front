import Link from 'next/link';
import cx from 'classnames';

import { Box, Grid, Typography, Hidden } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Time from 'components/icons/Time';
import { darkGray, gray, greenMain, orangeMain } from 'styles/colorPalette';
import { getTestUserData } from 'utils/common';

const TestCard = ({ data }) => {
  const { image, is_required, duration, title, description_short, is_released, id, items } = data;

  const userData = getTestUserData(items);

  const classes = useItemStyles({ is_released });

  return (
    <Grid item xs={12} sm={6} lg={4}>
      {is_released ? (
        <Link href={`/applicant/tests/${id}`}>
          <a>
            <Box className={classes.root}>
              <Box className={classes.imgBox}>
                <img src={image.original_url} alt="" />
              </Box>
              {is_required && (
                <Box className={cx(classes.badge, classes.required)}>
                  <Typography>обязательный</Typography>
                </Box>
              )}
              {items[0].type === 'leadership' && (
                <Box className={cx(classes.badge, classes.volunteer)}>
                  <Typography>для волонтеров</Typography>
                  <Box className={classes.img}>
                    <img src="/images/university/landing/roscongress.png" />
                  </Box>
                </Box>
              )}
              <Box className={classes.content}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography className={classes[userData.className]}>{userData.status}</Typography>
                      </Grid>
                      <Grid item>
                        <Box display="flex" alignItems="center">
                          <Time color={darkGray} fontSize={17} />
                          <Typography className={classes.duration}>{duration} минут</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.title}>{title}</Typography>
                  </Grid>
                  <Hidden smDown>
                    <Grid item xs={12}>
                      <Typography className={classes.desc}>{description_short}</Typography>
                    </Grid>
                  </Hidden>
                </Grid>
              </Box>
            </Box>
          </a>
        </Link>
      ) : (
        <Box className={classes.root}>
          <Box className={classes.imgBox}>
            <img src={image.original_url} alt="" />
          </Box>
          {is_required && (
            <Box className={cx(classes.badge, classes.required)}>
              <Typography>обязательный</Typography>
            </Box>
          )}
          {items[0].type === 'leadership' && (
            <Box className={cx(classes.badge, classes.volunteer)}>
              <Typography>для волонтеров</Typography>
              <Box className={classes.img}>
                <img src="/images/university/landing/roscongress.png" />
              </Box>
            </Box>
          )}
          <Box className={classes.content}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography className={classes[userData.className]}>{userData.status}</Typography>
                  </Grid>
                  <Grid item>
                    <Box display="flex" alignItems="center">
                      <Time color={darkGray} fontSize={17} />
                      <Typography className={classes.duration}>{duration} минут</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.title}>{title}</Typography>
              </Grid>
              <Hidden smDown>
                <Grid item xs={12}>
                  <Typography className={classes.desc}>{description_short}</Typography>
                </Grid>
              </Hidden>
            </Grid>
          </Box>
          <Box className={classes.noReleaseBox}>
            <Typography className={classes.noReleaseText}>Тест находится в разработке</Typography>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default TestCard;

const useItemStyles = makeStyles<any, any>((theme) => ({
  root: {
    'borderRadius': 20,
    'display': 'flex',
    'flexDirection': 'column',
    'position': 'relative',
    'border': ({ is_released }) => (is_released ? 'none' : `1px solid ${gray}`),
    'height': '100%',
    'overflow': 'hidden',
    'transition': 'all 0.5s ease',
    '&:hover': {
      boxShadow: ({ is_released }) => {
        if (is_released) {
          return `5px 1px 10px 6px ${gray}`;
        }
        return 'none';
      },
    },
  },
  imgBox: {
    'height': '200px',
    'filter': ({ is_released }) => (is_released ? 'none' : 'blur(4px)'),
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      [theme.breakpoints.down('lg')]: {
        objectPosition: 'bottom',
      },
    },
    [theme.breakpoints.down('sm')]: {
      height: '140px',
    },
  },
  content: {
    filter: ({ is_released }) => (is_released ? 'none' : 'blur(4px)'),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    border: `1px solid ${gray}`,
    borderTopWidth: 0,
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.only('sm')]: {
      padding: theme.spacing(2.5),
    },
  },
  done: {
    color: greenMain,
  },
  notDone: {
    color: darkGray,
  },
  notFullDone: {
    color: orangeMain,
  },
  duration: {
    color: '#535C73',
    fontSize: theme.typography.pxToRem(14),
    marginLeft: theme.spacing(0.5),
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(22),
    lineHeight: '110%',
  },
  desc: {
    color: '#535C73',
    lineHeight: '150%',
  },
  badge: {
    'borderRadius': 60,
    'padding': `7px 16px`,
    'position': 'absolute',
    'top': 20,
    'left': 20,
    '& p': {
      textTransform: 'uppercase',
      fontSize: theme.typography.pxToRem(12),
    },
  },
  required: {
    'backgroundColor': '#FFF5E5',
    '& p': {
      color: '#F28601',
    },
  },
  volunteer: {
    'backgroundColor': '#ffffff',
    'display': 'flex',
    'alignItems': 'center',
    'padding': '5px 16px 3px 16px',
    '& img': {
      height: 15,
      objectFit: 'contain',
    },
    '& p': {
      color: greenMain,
      paddingRight: 6,
    },
  },
  noReleaseBox: {
    borderRadius: 20,
    overflow: 'hidden',
    cursor: 'unset',
    padding: theme.spacing(3),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
  },
  noReleaseText: {
    textAlign: 'center',
    fontFamily: 'inter-med',
    fontSize: theme.typography.pxToRem(18),
  },
}));
