import { makeStyles } from '@mui/styles';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

import Button from 'components/Button';
import { darkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  container: {
    display: 'flex',
    paddingLeft: 'max(40px, calc((100% - 1110px) / 2))',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
      flexWrap: 'wrap',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
  },
  left: {
    flexShrink: 0,
    marginRight: '60px',
    width: 520,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      paddingTop: 51,
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  right: {
    width: 'calc(100% - 520px - 60px)',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '111%',
    },
  },
  img: {
    'height': '506px',
    'textAlign': 'right',
    [theme.breakpoints.down('sm')]: {
      height: '364px',
    },
    '& img': {
      height: '100%',
      objectFit: 'contain',
      boxShadow: '0px 8px 24px -8px rgba(163, 175, 192, 0.42)',
    },
    [theme.breakpoints.only('xl')]: {
      textAlign: 'left',
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(38),
    fontFamily: 'inter-bold',
    lineHeight: '130%',
    marginBottom: theme.spacing(2.4),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
      lineHeight: '110%',
    },
  },
  descr: {
    fontSize: theme.typography.pxToRem(18),
    color: darkGray,
    lineHeight: '150%',
  },
  smallDescr: {
    fontSize: theme.typography.pxToRem(14),
    color: darkGray,
    lineHeight: '145%',
    marginBottom: theme.spacing(1),
  },
  imgLogo: {
    'width': 310,
    'marginTop': -60,
    'marginLeft': -36,
    [theme.breakpoints.down('sm')]: {
      width: 151,
      margin: '-25px auto 0px auto',
    },
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  },
}));

const FirstScreenMain = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <Box className={classes.container}>
      <Box className={classes.left}>
        <Grid container rowSpacing={3} justifyContent={{ xs: 'center', md: 'flex-start' }}>
          <Grid item xs={12}>
            <Typography className={classes.title} component="h1">
              Аналитика карьерных траекторий студентов
            </Typography>
            <Typography className={classes.descr}>
              Эффективно отслеживайте карьерный путь студента во время и после обучения. Помогайте с трудоустройством и
              выбором ДПО.
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Button fullWidth small>
              {isMobile ? 'Подключить ОУ' : 'Подключить образовательное учреждение'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.smallDescr}>При поддержке:</Typography>
            <Box className={classes.imgLogo}>
              <img src="/images/university/landing/logo-Rosskongress.svg" />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.right}>
        <Box className={classes.img}>
          <img src="/images/university/landing/firstScreen.png" />
        </Box>
      </Box>
    </Box>
  );
};

export default FirstScreenMain;
