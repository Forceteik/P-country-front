import { Grid, Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { MainInvertButton } from 'components/Button';
import { darkGray, pinkMain, pinkWhite } from 'styles/colorPalette';
import { useSession } from 'context/UserContext';

const useStyles = makeStyles<any>((theme) => ({
  box: {
    backgroundColor: pinkWhite,
    borderRadius: 20,
    padding: '24px 24px 24px 42px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },
  },
  titleText: {
    lineHeight: '120%',
    color: pinkMain,
    fontFamily: 'inter-med',
    marginLeft: theme.spacing(1.5),
    fontSize: theme.typography.pxToRem(18),
  },
  descr: {
    color: darkGray,
    lineHeight: '150%',
  },
}));

const TestNotification = () => {
  const classes = useStyles();
  const { role } = useSession();

  if (role !== 'employee') {
    return null;
  }

  return (
    <Box className={classes.box}>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid item xs={12} md={7} lg={6}>
          <Box className={classes.titleBox}>
            <img src="/images/icons/sad-smile-2.png" width="27" height="27" />
            <Typography className={classes.titleText}>Тестирование не пройдено</Typography>
          </Box>
          <Typography className={classes.descr}>
            Пройдите все тесты, чтобы получить подборку наиболее подходящих вам вакансий
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5} lg={4}>
          <MainInvertButton fullWidth small nextLink linkProps={{ href: '/applicant/tests' }}>
            Пройти тестирование
          </MainInvertButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestNotification;
