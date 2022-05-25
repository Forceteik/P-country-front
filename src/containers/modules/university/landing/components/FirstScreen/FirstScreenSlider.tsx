import Slider from 'react-slick';
import cx from 'classnames';

import { Grid, Typography, Box, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import 'slick-carousel/slick/slick.css';

import { blueMain } from 'styles/colorPalette';

import Container from '../Container';

import { useEffect, useRef } from 'react';

const useStyles = makeStyles<any, any>((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    lineHeight: '150%',
    width: '30%',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('lg')]: {
      width: '40%',
    },
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      width: '80%',
    },
  },
  sliderItem: {
    width: '100%',
    height: '100%',
  },
  sliderItemInner: {
    marginLeft: '15px',
    marginRight: '15px',
    backgroundColor: '#fff',
    borderRadius: '0px 30px',
    padding: '32px 24px',
    height: '100%',
  },
  imgLogo: {
    'width': 60,
    'height': '60px !important',
    'borderRadius': '50%',
    'backgroundColor': '#F3F4F6',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    '& img': {
      width: '80%',
      height: '80%',
      objectFit: 'contain',
    },
  },
  label: {
    'backgroundColor': blueMain,
    'borderRadius': 4,
    'padding': '2px 12px',
    'height': 'unset !important',
    '& p': {
      fontSize: theme.typography.pxToRem(12),
      fontFamily: 'inter-med',
      letterSpacing: '0.03em',
      color: '#fff',
    },
  },
  sliderBox: {
    'paddingLeft': 'max(40px, calc((100% - 1110px) / 2))',
    '& .slick-list': {
      overflow: 'visible',
    },
    '& .slick-track': {
      display: 'flex',
      marginLeft: -15,
      marginRight: -15,
    },
    '& .slick-slide': {
      'height': 'inherit !important',
      '& div:first-child': {
        height: '100%',
      },
    },
  },
  name: {
    fontSize: theme.typography.pxToRem(14),
    fontFamily: 'inter-med',
  },
  slickDots: {
    'padding': 0,
    'marginBottom': theme.spacing(7),
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'flex-start',
    'paddingLeft': '24px',
    'position': 'relative',
    '&:before': {
      content: '"01"',
      position: 'absolute',
      left: 0,
      top: '40%',
      width: '10px',
      fontSize: theme.typography.pxToRem(12),
      height: '10px',
      zIndex: 20,
    },
    '&:after': {
      content: ({ isMd }) => (isMd ? '"03"' : '"02"'),
      position: 'absolute',
      left: 120,
      top: '40%',
      width: '10px',
      height: '10px',
      fontSize: theme.typography.pxToRem(12),
      zIndex: 20,
    },
    'bottom': 0,
    [theme.breakpoints.only('xs')]: {
      bottom: 27,
      marginBottom: theme.spacing(3),
    },
    '& li button': {
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#fff',
      width: '44px',
      height: '4px',
      borderRadius: 4,
      fontSize: 0,
      display: 'inline-block',
      [theme.breakpoints.down('lg')]: {
        width: '22px',
      },
    },
    '& li.slick-active button': {
      backgroundColor: '#5468E7',
      height: 4,
      width: 44,
      borderRadius: 4,
    },
  },
  grid: {
    height: 'unset !important',
  },
}));

const sliderData = [
  {
    name: 'РЭУ им. Г. В. Плеханова',
    logo: '/images/university/landing/logos/1.png',
  },
  {
    name: 'СПбПУ Петра Великого',
    logo: '/images/university/landing/logos/2.png',
  },
  {
    name: 'СЗИУ РАНХиГС',
    logo: '/images/university/landing/logos/3.png',
  },
  {
    name: 'МГТУ им. Н. Э. Баумана',
    logo: '/images/university/landing/logos/4.png',
  },
  {
    name: 'РГУ им. Косыгина',
    logo: '/images/university/landing/logos/5.png',
  },
  {
    name: 'ДВФУ',
    logo: '/images/university/landing/logos/6.png',
  },
];

const FirstScreenSlider = () => {
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.down('lg'));
  const classes = useStyles({ isMd });

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2.5,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          dots: false,
        },
      },
    ],
  };

  //-----Этот блок кода нужен для того, чтобы можно было скролить слайдер колесиком мышки или тачпадом
  const slider = useRef(null);
  const scroll = (e) => {
    if (slider === null) return 0;

    e.wheelDelta > 0 ? slider.current.slickNext() : slider.current.slickPrev();
  };
  useEffect(() => {
    window.addEventListener('wheel', scroll, true);
    return () => {
      window.removeEventListener('wheel', scroll, true);
    };
  }, []);
  //-----

  return (
    <>
      <Container>
        <Typography className={classes.title}>Вузы и колледжи, которые уже есть на платформе</Typography>
      </Container>
      <Box className={classes.sliderBox}>
        <Slider dotsClass={cx('slick-dots', classes.slickDots)} {...settings} id="slider" ref={slider}>
          {sliderData.map((item, i) => (
            <Box key={i} className={classes.sliderItem}>
              <Box className={classes.sliderItemInner}>
                <Grid
                  container
                  spacing={1.5}
                  alignItems="center"
                  justifyContent={'space-between'}
                  className={classes.grid}
                >
                  <Grid item>
                    <Box className={classes.imgLogo}>
                      <img src={item.logo} />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box className={classes.label}>
                      <Typography>ВУЗ</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.name}>{item.name}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default FirstScreenSlider;
