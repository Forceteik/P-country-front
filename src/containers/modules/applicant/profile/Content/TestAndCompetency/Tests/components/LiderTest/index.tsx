import cx from 'classnames';

import { Box, Typography, Grid, useMediaQuery } from '@mui/material';

import Button, { SecondaryButton } from 'components/Button';
import testProfileStyle from 'containers/modules/common/styles/testProfileStyle';

import LiderTestBlock from './LiderTestBlock';

const LiderTest = ({ user, role, guest = false, report = false, fullReportHref = '/applicant/mbti/report' }) => {
  const currentUser = user;
  const leadership = currentUser.leadership;
  const commonTestStyle = testProfileStyle({ report: false });
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  //Здесь важно знать не просто гость/не гость, но и конкретно какая роль у гостя - тк для гостя соискателя будет показываться те же данные что и для владельца-соискателя, а для гостя-работодалетя - другие данные. Поэтому я помимо guest проверяю еще работодатель это смотрит или нет
  const isEmployer = role.isEmployer || role.isGuestEmployer;

  const isDone = leadership[0]?.status === 'completed';
  const testId = process.env.NEXT_PUBLIC_BUILD_MODE === 'prod' ? 9 : 10;
  return (
    <>
      {isDone ? (
        <Box className={cx(commonTestStyle.gridContainer, commonTestStyle.padding)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Typography className={commonTestStyle.titleTest} component="h3">
                    Тест лидерства
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {isEmployer && (
                      <Grid item xs={12} sm={6}>
                        <LiderTestBlock
                          item={leadership[0].result.loyalty_level}
                          report={report}
                          subTitle="Уровень лояльности:"
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} sm={isEmployer ? 6 : 12}>
                      <LiderTestBlock item={leadership[0].result.type} report={report} subTitle="Тип лидера:" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {!report && (
              <Grid item xs={12} sm={5} md={3.4}>
                <SecondaryButton fullWidth small nextLink linkProps={{ href: fullReportHref }}>
                  Полный отчет
                </SecondaryButton>
              </Grid>
            )}
          </Grid>
        </Box>
      ) : (
        <Box className={commonTestStyle.nullImgBox}>
          <img src={isSm ? '/images/tests/bg-blur/nullTest-bg.png' : '/images/tests/bg-blur/desctop-null.png'} alt="" />
          <Box className={commonTestStyle.nullInfo}>
            <Typography className={commonTestStyle.nullTitle}>Тест лидерства</Typography>
            <Typography className={commonTestStyle.nullText}>
              {guest ? 'Кандидат не прошел тест' : 'Для получения результатов пройдите тест'}
            </Typography>
            {!guest && (
              <Box className={commonTestStyle.nullBtnWidth}>
                <Button nextLink linkProps={{ href: `/applicant/tests/${testId}` }} fullWidth small>
                  Пройти тест
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default LiderTest;
