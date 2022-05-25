import { Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { blueMain, darkGray, gray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  item: {
    'border': `1px solid ${gray}`,
    'padding': theme.spacing(4),
    '&:first-child': {
      borderRadius: '20px 20px 0px 0px',
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
    },
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: 22,
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
    },
  },
  infoListItem: {
    'display': 'inline-block',
    'marginRight': 12,
    'paddingRight': 12,
    'position': 'relative',
    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translate(50%, -50%)',
      width: 6,
      height: 6,
      backgroundColor: gray,
      borderRadius: '50%',
    },
    [theme.breakpoints.down('md')]: {
      'display': 'block',
      'marginRight': 0,
      'paddingRight': 0,
      '&:not(:last-child)::after': {
        display: 'none',
      },
    },
  },
  activityInfo: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xl')]: {
      justifyContent: 'unset',
    },
  },
  activityInfoItem: {
    'display': 'flex',
    'alignItems': 'center',
    '&:not(:last-child)': {
      marginRight: theme.spacing(3),
    },
  },
  all: {
    marginLeft: theme.spacing(0.5),
    color: darkGray,
  },
  new: {
    marginLeft: theme.spacing(0.5),
    color: blueMain,
  },
  descr: {
    'overflow': 'hidden',
    'maxHeight': 200,
    'color': darkGray,
    'position': 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      background:
        'linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.4) 80%, rgba(255,255,255,0.8) 90%, rgba(255,255,255,0.98) 98%, rgba(255,255,255,1) 100%)',
      top: 0,
      left: 0,
    },
  },
  date: {
    color: darkGray,
  },
}));

const ResponseItem = () => {
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.down('xl'));
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const classes = useStyles();

  return (
    <Box component="article" className={classes.item}>
      <Grid container spacing={isMobile ? 2 : 3}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1} direction={isMd ? 'column-reverse' : 'row'}>
                <Grid item xs={12} lg={8}>
                  <Typography component="h2" className={classes.title}>
                    <Skeleton width={200} />
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Box className={classes.activityInfo}>
                    <Box className={classes.activityInfoItem}>
                      <Typography className={classes.all}>
                        <Skeleton width={60} />
                      </Typography>
                    </Box>
                    <Box className={classes.activityInfoItem}>
                      <Typography className={classes.all}>
                        <Skeleton width={60} />
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Box className={classes.infoListItem}>
                  <Typography>
                    <Skeleton width={100} />
                  </Typography>
                </Box>

                <Box className={classes.infoListItem}>
                  <Typography>
                    <Skeleton width={100} />
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.descr}>
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={isMobile ? 2 : 0}
            justifyContent="space-between"
            alignItems={isMobile ? 'stretch' : 'flex-end'}
            direction={isMobile ? 'column-reverse' : 'row'}
          >
            <Grid item xs={12} sm={6} md={5} lg={3}>
              <Skeleton variant="rectangular" width={isMobile ? '100%' : 180} height={50} />
            </Grid>
            <Grid item>
              <Typography className={classes.date}>
                <Skeleton variant="text" width={100} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResponseItem;
