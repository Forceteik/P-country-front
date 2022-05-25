import { Box, Grid, Typography, Hidden, useMediaQuery } from '@mui/material';

import Layout from 'containers/layout/main';
import Button from 'components/Button';
import PrevLink from 'components/PrevLink';
import { darkGray, greenMain } from 'styles/colorPalette';
import Time from 'components/icons/Time';
import MessageBlow from 'components/icons/MessageBlow';
import { getTestUserData } from 'utils/common';
import AccordionDone from 'components/icons/AccordionDone';

import { viewStyles } from './style';

const SingleItem = ({ test, reportLink = '' }) => {
  const userData = getTestUserData(test.items);

  const classes = viewStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <Layout>
      <Box className={classes.content}>
        <Grid container justifyContent={'space-between'}>
          <Grid item sm={12} md={5.5}>
            <Box className={classes.left}>
              <Grid container rowSpacing={isMobile ? 3 : 5.5}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <PrevLink link={'/applicant/tests/'} text={'Назад к тестам'} />
                    </Grid>
                    <Grid item xs={12} md={11}>
                      <Typography className={classes.title}>{test.title}</Typography>
                    </Grid>
                    {userData.statusCode !== 'completed' && (
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Box className={classes.timeBox}>
                              <MessageBlow />
                              <Typography className={classes.timeText}>{test.question_count}</Typography>
                            </Box>
                          </Grid>
                          <Grid item>
                            <Box className={classes.timeBox}>
                              <Time color={darkGray} fontSize={16} />
                              <Typography className={classes.timeText}>{test.duration} минут</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                    {userData.statusCode !== 'completed' && (
                      <Grid item xs={12}>
                        <Box className={classes.desc}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography whiteSpace={'pre-wrap'}>{test.description}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    )}
                    {userData.statusCode === 'completed' && (
                      <Grid item xs={12}>
                        <Box className={classes.success}>
                          <Box className={classes.successHeader}>
                            <AccordionDone color={greenMain} />
                            <Typography>Тест пройден</Typography>
                          </Box>
                          <Typography className={classes.successDescr} component="p">
                            Возможность повторного прохождения теста будет доступна{' '}
                            <Typography component={'span'}>{userData.nextAttempt}</Typography>
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                {userData.statusCode === 'completed' && reportLink && (
                  <Grid item xs={8} sm={5}>
                    <Button fullWidth nextLink linkProps={{ href: reportLink }}>
                      Полный отчет
                    </Button>
                  </Grid>
                )}
                {userData.statusCode !== 'completed' && (
                  <Grid item xs={8} sm={6}>
                    <Button fullWidth nextLink linkProps={{ href: `/applicant/tests/${test.id}/instruction` }}>
                      Перейти к тесту
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
          <Hidden mdDown>
            <Grid item sm={12} md={6}>
              <Box className={classes.right}>
                <img src={test.image_big.original_url} alt="" />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Layout>
  );
};

export default SingleItem;
