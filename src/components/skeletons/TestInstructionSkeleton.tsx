import { Box, Grid, Typography, Hidden, useMediaQuery } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import Layout from 'containers/layout/main';
import PrevLink from 'components/PrevLink';
import { viewStyles } from 'containers/modules/applicant/tests/View/style';

const TestInstructionSkeleton = () => {
  const classes = viewStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  const prevLink = '/applicant/tests/';

  return (
    <Layout>
      <Box className={classes.content}>
        <Grid container spacing={5} alignItems="flex-start">
          <Grid item sm={12} md={7}>
            <Box className={classes.left}>
              <Grid container spacing={isMobile ? 3 : 4}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <PrevLink link={prevLink} text={'Назад к тестам'} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.title} component="h1">
                        <Skeleton width={isMobile ? 230 : 400} />
                        <Skeleton width={isMobile ? 190 : 300} />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography component="h2" className={classes.subtitle}>
                        <Skeleton variant="text" width={280} />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={classes.text}>
                        <Skeleton variant="text" width={isMobile ? '100%' : 500} />
                        <Skeleton variant="text" width={isMobile ? '100%' : 500} />
                        <Skeleton variant="text" width={isMobile ? '100%' : 500} />
                        <Skeleton variant="text" width={isMobile ? '100%' : 500} />
                        <Skeleton variant="text" width={isMobile ? '100%' : 500} />
                        <Skeleton variant="text" width={isMobile ? '100%' : 400} />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3} className={classes.instructionBottom}>
                    <Grid item xs={12} sm={5} lg={4}>
                      <Skeleton variant="rectangular" width={isMobile ? '100%' : 200} height={isMobile ? 50 : 70} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Hidden lgDown>
            <Grid item sm={12} md={5}>
              <Box className={classes.instructionImg}>
                <img src="/images/instruction.png" alt="" />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Layout>
  );
};

export default TestInstructionSkeleton;
