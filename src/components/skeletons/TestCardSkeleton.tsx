import { Box, Grid, Typography, Hidden, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

import { gray } from 'styles/colorPalette';

const TestCardSkeleton = (props) => {
  const classes = useItemStyles(props);
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('lg'));

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Box className={classes.root}>
        <Box className={classes.imgBox}>
          <Skeleton variant="rectangular" height={isSm ? 140 : 200} />
        </Box>
        <Box className={classes.content}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography>
                    <Skeleton variant="text" width={100} />
                  </Typography>
                </Grid>
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <Skeleton variant="text" width={70} />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title}>
                <Skeleton />
                <Skeleton width="80%" />
              </Typography>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={12}>
                <Typography className={classes.desc}>
                  <Skeleton variant="text" width={70} />
                </Typography>
              </Grid>
            </Hidden>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default TestCardSkeleton;

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
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      [theme.breakpoints.down('xl')]: {
        objectPosition: 'bottom',
      },
    },
    [theme.breakpoints.down('md')]: {
      height: '140px',
    },
  },
  content: {
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
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(22),
    lineHeight: '110%',
  },
  desc: {
    color: '#535C73',
    lineHeight: '150%',
  },
}));
