import Link from 'next/link';

import { Box, Typography, Grid, Hidden, useMediaQuery } from '@mui/material';

import Button, { SecondaryButton } from 'components/Button';
import BlockStyleOne from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/BlockStyleOne';
import LineProgress from 'components/LineProgress';
import testProfileStyle from 'containers/modules/common/styles/testProfileStyle';

const TestChart = ({
  title,
  items,
  user,
  countFinished,
  countTotal,
  released = true,
  startTestHref = '/applicant',
  fullReportHref = '/applicant',
  guest = false,
  type,
}) => {
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const commonTestStyle = testProfileStyle({ report: false });

  if (!released) {
    return (
      <Box className={commonTestStyle.nullImgBox}>
        <img src={isSm ? '/images/tests/bg-blur/nullTest-bg.png' : '/images/tests/bg-blur/desctop-null.png'} alt="" />
        <Box className={commonTestStyle.nullInfo}>
          <Typography className={commonTestStyle.nullTitle}>{title}</Typography>
        </Box>
      </Box>
    );
  }

  if (countFinished === 0) {
    return (
      <Box className={commonTestStyle.nullImgBox}>
        <img src={isSm ? '/images/tests/bg-blur/nullTest-bg.png' : '/images/tests/bg-blur/desctop-null.png'} alt="" />
        <Box className={commonTestStyle.nullInfo}>
          <Typography className={commonTestStyle.nullTitle}>{title}</Typography>
          <Typography className={commonTestStyle.nullText}>
            {guest ? 'Кандидат не прошел тест' : 'Для получения результатов пройдите тест'}
          </Typography>
          {!guest && (
            <Box className={commonTestStyle.nullBtnWidth}>
              <Button nextLink linkProps={{ href: startTestHref }} fullWidth small>
                Пройти тест
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    );
  }

  const currentUser = user;
  let integralIndicatorPercent,
    integralIndicatorText = guest
      ? 'Кандидат еще не завершил тестирование'
      : 'Пройдите все тесты этого раздела, чтобы рассчитать интегральный показатель';

  const iqIntegralIndicator = currentUser.test_integral_indicator.find((item) => item.type === type);
  if (iqIntegralIndicator) {
    integralIndicatorPercent = Math.round(iqIntegralIndicator.percent_points);
    integralIndicatorText = iqIntegralIndicator.description?.text;
  }

  return (
    <Box>
      <Grid container className={commonTestStyle.gridContainer}>
        <Grid item xs={12} lg={8}>
          <Box className={commonTestStyle.paddingLeftTest}>
            <Grid container spacing={3} justifyContent="center" alignContent="space-between">
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography className={commonTestStyle.titleTest} component="h3">
                      {title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {items
                        .filter((item) => item.status === 'completed')
                        .map((item, key) => (
                          <Grid item xs={12} key={key}>
                            <Grid container spacing={isMobile ? 0 : 2} alignItems="center">
                              <Grid item xs={12} sm={3}>
                                <Typography key={key} className={commonTestStyle.progressName}>
                                  {item.name} {item.Icon && <item.Icon />}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={9}>
                                <LineProgress
                                  progress={item.progress}
                                  label={`${Math.round(item.progress)}%`}
                                  color={item.color}
                                  key={key}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Hidden lgUp>
                <Grid item xs={12} sm={8} md={10}>
                  <BlockStyleOne
                    data={{
                      percent: integralIndicatorPercent,
                      name: 'Интегральный показатель',
                      description: integralIndicatorText,
                      scale: null,
                    }}
                  />
                </Grid>
              </Hidden>
              {countFinished < countTotal && (
                <Grid item xs={12}>
                  <Box className={commonTestStyle.undoneBox}>
                    <Box className={commonTestStyle.undoneInfo}>
                      <Typography className={commonTestStyle.nullText}>
                        {guest
                          ? 'Кандидат еще не завершил тестирование'
                          : 'Пройдите следующие тесты, чтобы открыть результаты'}
                      </Typography>
                      {!guest && (
                        <Link href={startTestHref}>
                          <Typography className={commonTestStyle.undoneInfoLink}>Продолжить</Typography>
                        </Link>
                      )}
                    </Box>
                  </Box>
                </Grid>
              )}
              {countFinished === countTotal && (
                <Grid item xs={12} sm={8} md={10} lg={12}>
                  <SecondaryButton nextLink linkProps={{ href: fullReportHref }} fullWidth small>
                    Полный отчет
                  </SecondaryButton>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
        <Hidden lgDown>
          <Grid item xs={4}>
            <BlockStyleOne
              data={{
                percent: integralIndicatorPercent,
                name: 'Интегральный показатель',
                description: integralIndicatorText,
                scale: null,
              }}
            />
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};

export default TestChart;
