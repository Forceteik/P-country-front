import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';

import { Box, Grid, Typography, Hidden, useMediaQuery } from '@mui/material';

import Layout from 'containers/layout/main';
import Button from 'components/Button';
import PrevLink from 'components/PrevLink';
import TestInstructionSkeleton from 'components/skeletons/TestInstructionSkeleton';
import { getTestUserData } from 'utils/common';

import { viewStyles } from './style';

const TestInstruction = () => {
  const classes = viewStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const router: any = useRouter();

  const { id, itemId } = router.query;
  const [{ data, loading }] = useAxios(`/tests/${id}`, { useCache: false });

  if (loading) {
    return <TestInstructionSkeleton />;
  }

  const userData = getTestUserData(data.data.items);

  const test = data.data;
  let testInstruction = test.items[0].instruction;
  let startLink = `/applicant/tests/${id}/start`;
  let title = test.items[0].title;
  let instructionNote = test.items[0].instruction_note;
  let prevLink = '/applicant/tests/';

  if (data?.data?.items.length > 0) {
    prevLink = `/applicant/tests/${data.data.id}`;
  }

  //ability test items
  if (itemId) {
    title = test.items.find((item) => item.id === parseInt(itemId)).title;
    testInstruction = test.items.find((item) => item.id === parseInt(itemId)).instruction; //testsData.find((item) => item.id === parseInt(id)).instruction;
    instructionNote = test.items.find((item) => item.id === parseInt(itemId)).instruction_note; //testsData.find((item) => item.id === parseInt(id)).instruction;
    startLink = `/applicant/tests/${id}/start?itemId=${itemId}`;
  }

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
                      <Grid container alignItems={'center'} spacing={2}>
                        <Grid item xs={12} sm="auto">
                          <Typography className={classes.title} component="h1">
                            Инструкция
                          </Typography>
                        </Grid>

                        {userData.statusCode === 'process' && (
                          <Grid item>
                            <Box className={classes.badge}>
                              <Typography>не завершен</Typography>
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography component="h2" className={classes.subtitle}>
                        {title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={classes.text} dangerouslySetInnerHTML={{ __html: testInstruction }} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3} className={classes.instructionBottom}>
                    <Grid item xs={12} sm={5} lg={4}>
                      <Button fullWidth nextLink linkProps={{ href: startLink }}>
                        Начать тест
                      </Button>
                    </Grid>
                    {instructionNote && instructionNote !== '' && (
                      <Grid item xs={12} lg={8}>
                        <Box className={classes.notification}>
                          <img src="/images/icons/light-big.png" width="32" height="32" />
                          <Typography className={classes.notificationText}>{instructionNote}</Typography>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Hidden mdDown>
            <Grid item sm={12} md={5}>
              <Box className={classes.instructionImg}>
                <img src="/images/tests/instruction.png" alt="" />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Layout>
  );
};

export default TestInstruction;
