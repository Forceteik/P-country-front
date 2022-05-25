import { Box, Grid, Typography, Hidden, useMediaQuery } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import Layout from 'containers/layout/main';
import PrevLink from 'components/PrevLink';
import { viewStyles } from 'containers/modules/applicant/tests/View/style';

const SingleTestSkeleton = () => {
  const classes = viewStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  return (
    <Layout>
      <Box className={classes.content}>
        <Grid container spacing={5}>
          <Grid item sm={12} md={6}>
            <Box className={classes.left}>
              <Grid container spacing={isMobile ? 3 : 4}>
                <Grid item xs={12}>
                  <Grid container spacing={isMobile ? 2 : 3}>
                    <Grid item xs={12}>
                      <PrevLink link={'/applicant/tests/'} text={'Назад к тестам'} />
                    </Grid>
                    <Grid item xs={12} md={11}>
                      <Typography className={classes.title}>
                        <Skeleton />
                        <Skeleton width="80%" />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Box className={classes.timeBox}>
                            <Skeleton variant="text" width={100} />
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box className={classes.timeBox}>
                            <Skeleton variant="text" width={100} />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={classes.desc}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography whiteSpace={'pre-wrap'}>
                              <Skeleton variant="text" width="100%" />
                              <Skeleton variant="text" width="100%" />
                              <Skeleton variant="text" width="100%" />

                              <Box mt={2}>
                                <Skeleton variant="text" width={200} />
                                <Skeleton variant="text" width="50%" />
                                <Skeleton variant="text" width="50%" />
                                <Skeleton variant="text" width="50%" />
                              </Box>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={8} sm={6}>
                  <Skeleton variant="rectangular" width={250} height={70} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Hidden lgDown>
            <Grid item sm={12} md={6}>
              <Box className={classes.right}>
                <Skeleton className={classes.skeletonCover} variant="rectangular" width="100%" height="100%" />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Layout>
  );
};

export default SingleTestSkeleton;
