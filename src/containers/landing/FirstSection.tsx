import Image from 'next/image';

import { Box, Grid, Hidden, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Header from 'containers/landing/components/Header';
import { FlexibleStyleButton } from 'components/Button';
import { useSession } from 'context/UserContext';
import LandingCheckbox from 'components/icons/LandingCheckbox';
import { landingBlack } from 'styles/colorPalette';

import Container from './components/Container';
import LogoSlider from './components/LogoSlider';

const useStyles = makeStyles<any>((theme) => ({
  firstScreen: {
    position: 'relative',
    backgroundColor: '#F0F5FB',
    marginBottom: theme.spacing(22.5),
    borderRadius: '0px 0px 40px 40px',
    [theme.breakpoints.down('lg')]: {
      marginBottom: theme.spacing(15),
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(10),
      minHeight: 'unset',
      height: 'unset',
      maxHeight: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
    },
  },
  mainInner: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(19),
    },
  },
  leftContainer: {
    marginTop: theme.spacing(2),
  },
  subheader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3),
    },
  },
  subheaderText: {
    fontSize: theme.typography.pxToRem(14),
    fontFamily: 'inter-bold',
    marginLeft: theme.spacing(2),
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(44),
    marginBottom: theme.spacing(2),
    lineHeight: '130%',
    color: landingBlack,
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      fontSize: theme.typography.pxToRem(30),
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(28),
    },
  },
  descr: {
    'marginBottom': theme.spacing(5),
    'lineHeight': '180%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0),
    },
    '& span': {
      fontFamily: 'inter-bold',
      color: landingBlack,
    },
  },
  btn: {
    width: 269,
    [theme.breakpoints.down('md')]: {
      margin: '0px auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: theme.spacing(3),
    },
  },
  imgBox: {
    height: 474,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      height: 260,
    },
  },
  companies: {
    boxShadow: '0px 12px 15px rgba(43, 54, 155, 0.06)',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: theme.spacing(2.5),
    [theme.breakpoints.down('md')]: {
      padding: '24px 26px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '16px 20px',
    },
  },
  companiesText: {
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(12),
    letterSpacing: '-0.03em',
    fontFamily: 'inter-med',
    lineHeight: '136%',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
      textAlign: 'center',
    },
  },
  companiesList: {
    display: 'flex',
    alignItems: 'center',
  },
  mobileInfo: {
    padding: '0px 8px',
  },
  companiesBox: {
    position: 'absolute',
    bottom: -34,
    left: '50%',
    transform: 'translate(-50%)',
    width: '100%',
  },
}));

const FirstSection = () => {
  const classes = useStyles();
  const { currentUser } = useSession();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  return (
    <Box className={classes.firstScreen}>
      <Header />
      <Container>
        <Box className={classes.mainInner}>
          <Grid container spacing={isSm ? 2 : 5} direction={isSm ? 'column-reverse' : 'row'}>
            <Grid item sm={12} md={6}>
              <Box className={classes.leftContainer}>
                <Hidden mdDown>
                  <Box className={classes.subheader}>
                    <LandingCheckbox />
                    <Typography className={classes.subheaderText}>
                      Платформа Потенциал страны упрощает устройство на работу мечты
                    </Typography>
                  </Box>
                </Hidden>
                <Typography component="h1" className={classes.title}>
                  Пройти отбор в ТОП-100 компаний России {isMobile ? <br /> : null}за 1 тестирование
                </Typography>

                <Box className={classes.mobileInfo}>
                  <Hidden smUp>
                    <Box className={classes.btn}>
                      <FlexibleStyleButton
                        fullWidth
                        textColor="#ffffff"
                        fontFamily="inter-bold"
                        nextLink
                        linkProps={{ href: currentUser ? '/applicant/tests' : '/auth' }}
                      >
                        Пройти тест
                      </FlexibleStyleButton>
                    </Box>
                  </Hidden>

                  <Hidden mdUp>
                    <Box className={classes.subheader}>
                      <LandingCheckbox />
                      <Typography className={classes.subheaderText}>
                        Платформа Потенциал страны упрощает устройство на работу мечты
                      </Typography>
                    </Box>
                  </Hidden>

                  <Typography className={classes.descr}>
                    На платформе собраны <Typography component="span">7 групп тестов</Typography>, основанных на
                    международно признанных методологиях, оценивающие полный профиль кандидата. После прохождения -
                    рекомендательная система <Typography component="span">автоматически</Typography> отправит ваше
                    цифровое резюме в компании, которые вам подходят!
                  </Typography>
                </Box>

                <Hidden smDown>
                  <Box className={classes.btn}>
                    <FlexibleStyleButton
                      fullWidth
                      textColor="#ffffff"
                      fontFamily="inter-bold"
                      nextLink
                      linkProps={{ href: currentUser ? '/applicant/tests' : '/auth' }}
                    >
                      Пройти тест
                    </FlexibleStyleButton>
                  </Box>
                </Hidden>
              </Box>
            </Grid>
            <Grid item sm={12} md={6}>
              <Box className={classes.imgBox}>
                <Image
                  src="/images/landing/first-screen.png"
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box className={classes.companiesBox}>
        <Container>
          <Box className={classes.companies}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} md={3}>
                <Typography className={classes.companiesText}>
                  Тесты платформы Потенциал страны используют крупнейшие российские компании:
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <LogoSlider />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default FirstSection;
