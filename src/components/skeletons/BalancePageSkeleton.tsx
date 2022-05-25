import Skeleton from '@mui/material/Skeleton';
import { Box, Grid, Hidden, Typography } from '@mui/material';

import { Layout } from 'containers/layout/main';
import commonStyle from 'containers/modules/common/styles/commonStyle';

const BalancePageSkeleton = () => {
  const commonStyles = commonStyle();
  return (
    <Layout>
      <Box component="section" className={commonStyles.inner}>
        <Grid container rowSpacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h3">
              <Skeleton width={'20%'} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8}>
                <Grid container rowSpacing={{ xs: 2, md: 3 }}>
                  <Grid item xs={12}>
                    <Grid container alignItems={'center'} spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Skeleton width={'100%'} height={30} />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Skeleton width={'100%'} height={50} />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Hidden lgUp>
                    <Grid item xs={12}>
                      <Grid container columnSpacing={3}>
                        <Grid item xs={12} md={6}>
                          <Skeleton height={209} variant="rectangular" />
                        </Grid>
                        <Hidden mdDown>
                          <Grid item xs={6}>
                            <Skeleton height={209} variant="rectangular" />
                          </Grid>
                        </Hidden>
                      </Grid>
                    </Grid>
                  </Hidden>

                  <Grid item xs={12}>
                    <Grid container rowSpacing={{ xs: 2, md: 2 }}>
                      <Grid item xs={12} md={6} lg={8}>
                        <Skeleton variant="rectangular" height={50} />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container alignItems={'center'} columnSpacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Grid container rowSpacing={1}>
                              <Grid item xs={12}>
                                <Skeleton height={80} variant="rectangular" />
                              </Grid>
                              <Grid item xs={12}>
                                <Skeleton height={80} variant="rectangular" />
                              </Grid>
                              <Grid item xs={12}>
                                <Skeleton height={80} variant="rectangular" />
                              </Grid>
                              <Grid item xs={12}>
                                <Skeleton height={80} variant="rectangular" />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Hidden smDown>
                            <Grid item xs={6}>
                              <Grid container rowSpacing={1}>
                                <Grid item xs={12}>
                                  <Skeleton variant="text" />
                                </Grid>
                                <Grid item xs={12}>
                                  <Skeleton variant="text" />
                                </Grid>
                                <Grid item xs={12}>
                                  <Skeleton variant="text" />
                                </Grid>
                                <Grid item xs={12}>
                                  <Skeleton variant="text" />
                                </Grid>
                                <Grid item xs={12}>
                                  <Skeleton variant="text" />
                                </Grid>
                                <Grid item xs={12}>
                                  <Skeleton variant="text" />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Hidden>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={12}>
                    <Skeleton variant="rectangular" height={50} />
                  </Grid>
                </Grid>
              </Grid>

              <Hidden lgDown>
                <Grid item xs={4}>
                  <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                      <Skeleton variant="rectangular" height={200} />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton variant="rectangular" height={200} />
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>

              <Hidden mdUp smDown>
                <Grid item xs={12}>
                  <Skeleton variant="rectangular" height={200} />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default BalancePageSkeleton;
