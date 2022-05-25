import ReactSlick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import cx from 'classnames';

import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  autoplaySpeed: 5000,
};

const useStyles = makeStyles<any>((theme) => ({
  itemContainer: {
    display: 'flex !important',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    minHeight: 750,
    padding: theme.spacing(4),
  },
  slick_main: {
    'height': '100%',
    'minHeight': '100vh',
    '& div': {
      height: '100%',
      minHeight: '100vh',
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 650,
    },
  },
  first: {
    backgroundColor: '#FFF1F7',
  },
  second: {
    backgroundColor: '#EAFAF7',
  },
  third: {
    backgroundColor: '#F1F8FF',
  },
  slickDots: {
    'zIndex': 5,
    'position': 'absolute',
    'bottom': theme.spacing(2),
    'left': '50%',
    'transform': 'translateX(-50%)',
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'center',
    '& li': {
      padding: theme.spacing(0.5),
    },
    '& li button': {
      cursor: 'pointer',
      backgroundColor: '#BAC1C9',
      border: 'none',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      fontSize: 0,
      display: 'inline-block',
    },
    '& li.slick-active button': {
      backgroundColor: '#3770FF',
      height: theme.spacing(1.25),
      width: theme.spacing(2),
      borderRadius: '100px',
    },
  },
  img: {
    width: '55%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {},
  },
  title: {
    fontSize: theme.typography.pxToRem(30),
    textAlign: 'center',
    fontFamily: 'inter-bold',
    lineHeight: '110%',
    marginBottom: theme.spacing(3),
    color: '#23262F',
    width: '75%',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  subTitle: {
    fontSize: theme.typography.pxToRem(16),
    textAlign: 'center',
    color: '#535C73',
    lineHeight: '150%',
    width: '75%',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
}));

const Slider = ({ activeRole }) => {
  const classes = useStyles();
  return (
    <>
      {activeRole === 0 ? (
        <ReactSlick dotsClass={cx('slick-dots', classes.slickDots)} {...settings} className={classes.slick_main}>
          <Box className={cx(classes.itemContainer, classes.third)}>
            <img src="/images/auth/auth_employer-1.png" alt="" className={classes.img} />
            <Typography className={classes.title}>Найдите лучших сотрудников уже сегодня</Typography>
            <Typography className={classes.subTitle}>
              Заполните профиль компании, разместите вакансию и искусственный интеллект платформы подберет вам наиболее
              подходящих кандидатов.
            </Typography>
          </Box>
        </ReactSlick>
      ) : (
        <ReactSlick dotsClass={cx('slick-dots', classes.slickDots)} {...settings} className={classes.slick_main}>
          <Box className={cx(classes.itemContainer, classes.first)}>
            <img src="/images/auth/auth_user-1.png" alt="" className={classes.img} />
            <Typography className={classes.title}>Найдите лучшую работу уже сегодня</Typography>
            <Typography className={classes.subTitle}>
              Пройдите тесты, заполните профиль и лучшие работодатели предложат вам работу мечты
            </Typography>
          </Box>
          <Box className={cx(classes.itemContainer, classes.second)}>
            <img src="/images/auth/auth_user-2.png" alt="" className={classes.img} />
            <Typography className={classes.title}>Привяжите свой телефон и узнавайте о новинках</Typography>
            <Typography className={classes.subTitle}>
              Пройдите тесты, заполните профиль и лучшие работодатели предложат вам работу мечты
            </Typography>
          </Box>
        </ReactSlick>
      )}
    </>
  );
};

export default Slider;
