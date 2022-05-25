import Link from 'next/link';

import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Button from 'components/Button';
import { useSession } from 'context/UserContext';

const useStyles = makeStyles<any>((theme) => ({
  container: {
    maxWidth: 1328,
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    margin: '0px auto',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      height: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  bannerContainer: {
    position: 'relative',
    display: 'flex',
    backgroundColor: '#003B77',
    borderRadius: 15,
    padding: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '10px 0px 20px 0px',
    },
  },
  bannerContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    width: '68%',
    padding: `${theme.spacing(5)} 0`,
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(2)} 0`,
      width: '100%',
    },
  },
  bannerButton: {
    'marginTop': theme.spacing(3),
    'padding': '18px 50px',
    'transition': 'all 0.3s',
    'backgroundColor': '#FFCE85',
    'color': '#003B77',
    'width': '40%',
    'fontFamily': 'inter-bold',
    '&:hover': {
      backgroundColor: 'rgb(252,183,101) !important',
    },
  },
  imgLeft: {
    position: 'absolute',
    left: -190,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  imgRight: {
    position: 'absolute',
    right: 0,
    bottom: -65,
    [theme.breakpoints.down('md')]: {
      bottom: -129,
    },
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      left: 0,
      top: 10,
      bottom: 'unset',
    },
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(36),
    color: '#fff !important',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(30),
    },
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(26),
      textAlign: 'center',
    },
  },

  subTitle: {
    fontSize: theme.typography.pxToRem(28),
    color: '#fff !important',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(20),
    },
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(16),
      textAlign: 'center',
    },
  },
}));

const FooterBanner = () => {
  const classes = useStyles();
  const { currentUser } = useSession();
  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.bannerContainer}>
            <img src="/images/landing/footer_1.png" alt="" className={classes.imgLeft} />
            <img src="/images/landing/footer_2.png" alt="" className={classes.imgRight} />
            <Box className={classes.bannerContent}>
              <Typography variant="h4" className={classes.title}>
                Работа мечты ждет вас!
              </Typography>
              <Typography className={classes.subTitle}>Осталось пройти тестирование!</Typography>
              <Link href={currentUser ? '/applicant/tests' : '/auth'}>
                <Button className={classes.bannerButton} fullWidth>
                  Начать
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FooterBanner;
