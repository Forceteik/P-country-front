import cx from 'classnames';

import { Box, Typography, Grid, useMediaQuery } from '@mui/material';

import Button, { SecondaryButton } from 'components/Button';
import { generatePercentColor } from 'containers/modules/applicant/profile/Content/utils';
import LineProgress from 'components/LineProgress';
import testProfileStyle from 'containers/modules/common/styles/testProfileStyle';

const StandardTest = ({
  title,
  items,
  done = true,
  startTestHref = '/applicant/tests/4', //todo идшник брать с бэка
  fullReportHref = '/applicant/motivation/report',
  guest = false,
}) => {
  const commonTestStyle = testProfileStyle({ report: false });
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {done ? (
        <Box className={cx(commonTestStyle.gridContainer, commonTestStyle.padding)}>
          <Grid container spacing={3} justifyContent={isMd ? 'center' : 'flex-start'}>
            <Grid item xs={12}>
              <Typography className={commonTestStyle.titleTest} component="h3">
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {items.map((item, key) => (
                  <Grid item xs={12} key={key}>
                    <Grid container spacing={isMobile ? 0 : 2} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <Typography key={key} className={commonTestStyle.progressName}>
                          {item.label} {item.Icon && <item.Icon />}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <LineProgress
                          progress={item.value}
                          label={`${Math.round(item.value)}%`}
                          color={generatePercentColor(item.value)}
                          key={key}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={8} md={10} lg={7}>
              <SecondaryButton nextLink linkProps={{ href: fullReportHref }} fullWidth small>
                Полный отчет
              </SecondaryButton>
            </Grid>
          </Grid>
        </Box>
      ) : (
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
      )}
    </>
  );
};

export default StandardTest;
