import Slider from 'react-slick';
import cx from 'classnames';

import { Box, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import 'slick-carousel/slick/slick.css';

import Button from 'components/Button';

import SliderItem from './components/SliderItem';

const fakeData = [
  {
    id: 1,
    title: 'Комплексные алгоритмы платформы Потенциал страны: новый инструмент для HR и перспективы для специалистов',
    desc: 'Из чего состоит передовая система оценки, которая позволит кандидату найти работу мечты, а бизнесу - идеального сотрудника? ',
    imgPath: '/images/blog/blog-1.jpg',
    date: '12.04.2021',
    released: true,
  },
  {
    id: 2,
    title: 'Комплексные алгоритмы платформы Потенциал страны: новый инструмент для HR и перспективы для специалистов',
    desc: 'Из чего состоит передовая система оценки, которая позволит кандидату найти работу мечты, а бизнесу - идеального сотрудника? ',
    imgPath: '/images/blog/blog-null-1.jpg',
    date: '23.11.2021',
    released: false,
  },
  {
    id: 3,
    title: 'Комплексные алгоритмы платформы Потенциал страны: новый инструмент для HR и перспективы для специалистов',
    desc: 'Из чего состоит передовая система оценки, которая позволит кандидату найти работу мечты, а бизнесу - идеального сотрудника? ',
    imgPath: '/images/blog/blog-null-2.jpg',
    date: '23.11.2021',
    released: false,
  },
];

const settings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoHeight: true,
  responsive: [
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 880,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    textAlign: 'center',
    backgroundColor: '#F0F5FB',
    borderRadius: 40,
    marginTop: theme.spacing(10),
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(15),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      marginTop: theme.spacing(5),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(10),
      borderRadius: 0,
    },
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: 44,
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    color: theme.palette.secondary.dark,
    [theme.breakpoints.only('xs')]: {
      textAlign: 'left',
      fontSize: theme.typography.pxToRem(26),
      marginBottom: 0,
    },
  },
  sliderContainer: {
    'margin': '0px auto',
    // padding: '0px 15px',
    '& .slick-track': {
      padding: '35px 0px',
      display: 'flex !important',
    },
    '& .slick-list': {
      height: 'unset',
    },
    [theme.breakpoints.only('xs')]: {
      margin: '0px -8px',
    },
  },
  slickDots: {
    'padding': 0,
    'marginBottom': theme.spacing(7),
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'center',
    'position': 'relative',
    'bottom': 0,
    [theme.breakpoints.only('xs')]: {
      bottom: 27,
      marginBottom: theme.spacing(3),
    },
    '& li': {
      padding: theme.spacing(0.5),
    },
    '& li button': {
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#BAC1C9',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      fontSize: 0,
      display: 'inline-block',
    },
    '& li.slick-active button': {
      backgroundColor: '#5468E7',
      height: theme.spacing(1.25),
      width: theme.spacing(2),
      borderRadius: '100px',
    },
  },
}));

const FifthSection = () => {
  const classes = useStyles();
  return (
    <Box className={classes.mainBox} id="block-section" component="section">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography className={classes.title} component="h2">
            Блог
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.sliderContainer}>
            <Slider dotsClass={cx('slick-dots', classes.slickDots)} {...settings}>
              <SliderItem item={fakeData[0]} />
              <SliderItem item={fakeData[1]} />
              <SliderItem item={fakeData[2]} />
            </Slider>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} lg={3}>
          <Button nextLink linkProps={{ href: '/blog' }} fullWidth>
            Все статьи
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FifthSection;
