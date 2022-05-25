import cx from 'classnames';

import { Box, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import useMediaQuery from '@mui/material/useMediaQuery';

import List from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/List';
import Button, { SecondaryButton } from 'components/Button';
import testProfileStyle from 'containers/modules/common/styles/testProfileStyle';
import { darkGray, greenMain, greenWhite } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  role: {
    padding: '16px 20px',
    backgroundColor: greenWhite,
    width: '100%',
    borderRadius: 14,
  },
  roleTitle: {
    fontSize: theme.typography.pxToRem(12),
    color: darkGray,
    marginBottom: theme.spacing(0.5),
  },
  roleValue: {
    color: greenMain,
    fontFamily: 'inter-med',
  },
}));

const CommandRole = ({ user, fullReportHref = '/applicant/mbti/report', guest = false }) => {
  const currentUser = user;
  const mbti = currentUser.mbti;
  const isDone = mbti?.status === 'completed';
  const features = isDone ? mbti.result.config_role.features : [];
  const roleName = isDone ? mbti.result.config_role.name : '';
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const classes = useStyles();
  const commonTestStyle = testProfileStyle({ report: false });

  return (
    <>
      {isDone ? (
        <Box className={cx(commonTestStyle.gridContainer, commonTestStyle.padding)}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className={commonTestStyle.titleTest} component="h3">
                    Тип личности в команде
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <Box className={classes.role}>
                    <Typography className={classes.roleTitle}>Командная роль</Typography>
                    <Typography className={classes.roleValue}>{roleName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <List
                    items={features.map((item) => ({
                      name: item.feature.name,
                      text: item.text,
                      type: item.feature.type,
                    }))}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={8} md={12}>
              <SecondaryButton fullWidth nextLink linkProps={{ href: fullReportHref }} small>
                Полный отчет
              </SecondaryButton>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box className={commonTestStyle.nullImgBox}>
          <img src={isSm ? '/images/tests/bg-blur/nullTest-bg.png' : '/images/tests/bg-blur/desctop-null.png'} alt="" />
          <Box className={commonTestStyle.nullInfo}>
            <Typography className={commonTestStyle.nullTitle}>Тип личности в команде</Typography>
            <Typography className={commonTestStyle.nullText}>
              {guest ? 'Кандидат не прошел тест' : 'Для получения результатов пройдите тест'}
            </Typography>
            {!guest && (
              <Box className={commonTestStyle.nullBtnWidth}>
                <Button nextLink linkProps={{ href: '/applicant/tests/1' }} fullWidth small>
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

export default CommandRole;
