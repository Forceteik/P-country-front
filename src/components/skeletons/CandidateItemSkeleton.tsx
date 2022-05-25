import Link from 'next/link';

import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

import { blueMain, darkGray, gray, ligthGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  box: {
    borderRadius: 20,
    border: `1px solid ${gray}`,
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      padding: '24px 16px',
    },
  },
  imgBox: {
    cursor: 'pointer',
    width: 100,
    height: 100,
    overflow: 'hidden',
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      width: 50,
      height: 50,
      marginRight: theme.spacing(0),
    },
  },
  name: {
    color: blueMain,
    cursor: 'pointer',
  },
  prof: {
    cursor: 'pointer',
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    marginBottom: theme.spacing(1),
    lineHeight: '125%',
    lineClamp: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    [theme.breakpoints.down('xl')]: {
      lineClamp: 3,
      marginBottom: 0,
      fontSize: theme.typography.pxToRem(18),
    },
  },
  descr: {
    color: darkGray,
    lineClamp: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    [theme.breakpoints.down('lg')]: {
      lineClamp: 4,
    },
  },
  skillItem: {
    'display': 'inline-block',
    'backgroundColor': ligthGray,
    'borderRadius': 60,
    'padding': '10px 18px',
    'marginRight': theme.spacing(2),
    'marginBottom': theme.spacing(2),
    '& p': {
      color: darkGray,
      whiteSpace: 'nowrap',
      fontFamily: 'inter-med',
      fontSize: theme.typography.pxToRem(12),
      textTransform: 'uppercase',
      [theme.breakpoints.down('md')]: {
        whiteSpace: 'normal',
      },
    },
    [theme.breakpoints.down('md')]: {
      padding: '6px 8px',
      borderRadius: 14,
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.8),
    },
  },
  extraText: {
    color: darkGray,
    whiteSpace: 'pre-line',
  },
  date: {
    flexGrow: 1,
    textAlign: 'right',
  },
  task: {
    color: darkGray,
  },
  overflow: {
    overflow: 'hidden',
  },
  flexGrow: {
    flexGrow: 1,
    overflow: 'hidden',
  },
}));

const CandidateItem = () => {
  const classes = useStyles();
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.down('xl'));
  const isXs = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  return (
    <Grid item xs={12}>
      <Box className={classes.box} component="article">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid
              container
              wrap={isMd ? 'wrap' : 'nowrap'}
              spacing={isMd ? 1 : 0}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Link href="/">
                  <a target="_blank">
                    <Box className={classes.imgBox}>
                      <Skeleton variant="circular" width={isXs ? 50 : 100} height={isXs ? 50 : 100} />
                    </Box>
                  </a>
                </Link>
              </Grid>
              <Grid item className={classes.flexGrow}>
                <Grid container spacing={isMd ? 1 : 0}>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12} lg={8}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Link href="/">
                              <a target="_blank">
                                <Typography className={classes.name}>
                                  <Skeleton variant="text" width={200} />
                                </Typography>
                              </a>
                            </Link>
                          </Grid>
                          <Grid item xs={12}>
                            <Link href="/">
                              <a target="_blank">
                                <Typography className={classes.prof}>
                                  <Skeleton variant="text" width={250} />
                                </Typography>
                              </a>
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.descr}>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex">
              <Box pr={1}>
                <Skeleton variant="text" width={isXs ? 50 : 100} />
              </Box>
              <Box pr={1}>
                <Skeleton variant="text" width={isXs ? 50 : 100} />
              </Box>
              <Box>
                <Skeleton variant="text" width={isXs ? 50 : 100} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={12} sm={6} lg={4}>
                <Skeleton variant="rectangular" width={isXs ? '100%' : 150} height={40} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default CandidateItem;
