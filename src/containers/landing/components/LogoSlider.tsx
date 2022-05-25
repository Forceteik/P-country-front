import Slider from 'react-slick';

import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import 'slick-carousel/slick/slick.css';

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 2500,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};

const useStyles = makeStyles<any>((theme) => ({
  company: {
    'display': 'flex !important',
    'alignItems': 'center',
    'justifyContent': 'center',
    'height': '100%',
    '& img': {
      maxHeight: 34,
      maxWidth: 100,
      objectFit: 'contain',
      [theme.breakpoints.down('sm')]: {
        maxWidth: 70,
      },
    },
  },
  slider: {
    '& .slick-track': {
      display: 'flex !important',
      marginLeft: 'unset',
      marginRight: 'unset',
    },
    '& .slick-slide': {
      'flexShrink': 0,
      'display': 'flex',
      'height': 'inherit !important',
      '& div': {
        '&:focus-visible': {
          outline: 'none',
        },
      },
    },
    '& .slick-slide > div': {
      width: '100%',
      flexShrink: 0,
    },
  },
}));

const LogoSlider = () => {
  const classes = useStyles();
  return (
    <Box className={classes.slider}>
      <Slider {...settings}>
        <Box className={classes.company}>
          <img src="/images/landing/companies/1.svg" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/2.svg" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/3.png" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/4.svg" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/5.svg" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/6.png" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/7.png" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/8.svg" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/9.svg" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/10.svg" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/11.svg" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/12.png" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/13.svg" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/14.svg" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/15.png" />
        </Box>
        <Box className={classes.company}>
          <img src="/images/landing/companies/16.png" />
        </Box>
      </Slider>
    </Box>
  );
};

export default LogoSlider;
