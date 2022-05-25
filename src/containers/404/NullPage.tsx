import Head from 'next/head';

import { Box, Grid, Typography, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Button from 'components/Button';
import { black, darkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  left: {
    '& button': {
      borderRadius: 20,
      padding: '23px 44px',
      marginBottom: 50,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '23px 30px',
      },
    },
  },
  right: {
    'textAlign': 'center',
    'position': 'relative',
    '& img': {
      marginLeft: 49,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        width: '80%',
      },
    },
  },
  first: {
    fontSize: theme.typography.pxToRem(120),
    marginBottom: theme.spacing(1),
    color: black,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(60),
    },
  },
  second: {
    fontSize: theme.typography.pxToRem(24),
    lineHeight: '142%',
    color: darkGray,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '150%',
      marginBottom: theme.spacing(1),
    },
  },
  third: {
    color: darkGray,
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  root: {
    'height': '100vh',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'padding': theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      height: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 0px',
      height: 'unset',
    },
    '& .MuiGrid-container': {
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse',
      },
    },
  },
}));

const NullPage = ({ linkText = 'Вернуться на главную', link = '/' }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Код ошибки: 404</title>
        <meta property="og:title" content={'Код ошибки: 404'} key="title" />
      </Head>
      <Box className={classes.root}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={5} className={classes.left}>
            <Typography className={classes.first}>Ой...</Typography>
            <Typography className={classes.second}>Похоже, мы не можем найти нужную вам страницу</Typography>
            <Typography className={classes.third}>Код ошибки: 404</Typography>
            <Button nextLink linkProps={{ href: link }}>
              {linkText}
            </Button>
          </Grid>
          <Grid item xs={12} md={5} className={classes.right}>
            <img src="/images/404.png" alt="" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NullPage;
