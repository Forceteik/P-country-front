import { useRouter } from 'next/router';

import { Box, Grid, Hidden, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

import { Layout } from 'containers/layout/main';
import { blueMain, blueVisited, gray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    marginTop: theme.spacing(2.2),
    marginBottom: theme.spacing(11),
  },
  header: {
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1.5),
      marginTop: theme.spacing(2.5),
    },
  },
  companyTitle: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  company: {
    fontFamily: 'inter-med',
    fontSize: theme.typography.pxToRem(18),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  name: {
    marginTop: theme.spacing(1.5),
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(38),
    lineHeight: '110%',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(22),
    },
  },
  link: {
    'color': blueMain,
    '&:visited': {
      color: blueVisited,
    },
  },
  infoList: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
  infoListItem: {
    'display': 'inline-block',
    'marginRight': 12,
    'paddingRight': 12,
    'position': 'relative',
    // whiteSpace: "nowrap",
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
  blockTitle: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(22),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  asideTitle: {
    fontFamily: 'inter-med',
    lineHeight: '150%',
    marginBottom: theme.spacing(1),
  },
}));

const VacancyPageSkeleton = () => {
  const classes = useStyles();

  const router = useRouter();

  return (
    <Layout>
      <Box className={classes.mainBox}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box onClick={() => router.back()}>
              <Skeleton variant="text" width={150} />
            </Box>
            <Box className={classes.header}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={12} md={9}>
                  <Grid container alignItems="center" justifyContent="space-between" wrap="wrap-reverse" spacing={2}>
                    <Grid item>
                      <Box className={classes.companyTitle}>
                        <Typography className={classes.company}>
                          <Skeleton variant="text" width={200} />
                        </Typography>
                      </Box>
                    </Grid>

                    <Hidden mdUp>
                      <Grid item>
                        <Skeleton variant="circular" width={50} height={50} />
                      </Grid>
                    </Hidden>
                  </Grid>
                  <Typography className={classes.name} component="h1">
                    <Skeleton width={250} />
                  </Typography>
                </Grid>
                <Hidden lgDown>
                  <Grid item xs={3}>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                      <Skeleton variant="circular" width={100} height={100} />
                    </Box>
                  </Grid>
                </Hidden>
              </Grid>
            </Box>

            <Box className={classes.infoList}>
              <Box className={classes.infoListItem}>
                <Typography>
                  <Skeleton variant="text" width={70} />
                </Typography>
              </Box>
              <Box className={classes.infoListItem}>
                <Typography>
                  <Skeleton variant="text" width={90} />
                </Typography>
              </Box>
              <Box className={classes.infoListItem}>
                <Typography>
                  <Skeleton variant="text" width={40} />
                </Typography>
              </Box>
              <Box className={classes.infoListItem}>
                <Typography>
                  <Skeleton variant="text" width={100} />
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} lg={9}>
            <Grid container spacing={7}>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="h2" className={classes.blockTitle}>
                      <Skeleton width={250} />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default VacancyPageSkeleton;
