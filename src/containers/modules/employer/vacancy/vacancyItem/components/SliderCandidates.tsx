import Slider from 'react-slick';
import cx from 'classnames';

import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import 'slick-carousel/slick/slick.css';

import { white, blueMain } from 'styles/colorPalette';

import SliderCandidateItem from './SliderCandidateItem';

const useStyles = makeStyles<any, any>((theme) => ({
  slider: {
    '& .slick-dots': {
      top: -52,
      [theme.breakpoints.down('sm')]: {
        top: 'unset',
        bottom: -30,
      },
    },
    '& .slick-dots li:first-child': {
      display: 'block',
    },
    '& .slick-list': {
      marginLeft: -16,
      marginRight: -16,
    },
    '& .slick-track': {
      display: 'flex !important',
      marginLeft: 'unset',
      marginRight: 'unset',
    },
    '& .slick-arrow': {
      cursor: 'pointer',
      position: 'absolute',
      top: -39,
      fontSize: 0,
      border: 'none',
      width: 9,
      height: 16,
      backgroundColor: 'transparent',
    },
    '& .slick-prev': {
      right: ({ length }) => length * 18 + 20,
      backgroundImage: 'url(/images/icons/arrowLeft.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      [theme.breakpoints.down('md')]: {
        right: ({ length }) => length * 18 + 32,
      },
    },
    '& .slick-next': {
      right: 24,
      backgroundImage: 'url(/images/icons/arrowRight.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  slickDots: {
    '& li:first-child': {
      display: 'none',
    },
    'margin': 0,
    'padding': 0,
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'center',
    'position': 'absolute',
    'top': -63,
    'right': 45,
    [theme.breakpoints.down('sm')]: {
      right: '50%',
      transform: 'translateX(50%)',
    },
    '& li': {
      padding: theme.spacing(0.5),
    },
    '& li button': {
      cursor: 'pointer',
      border: '1px solid #E1E3E8',
      backgroundColor: white,
      width: 10,
      height: 10,
      borderRadius: '50%',
      fontSize: 0,
      display: 'inline-block',
      padding: 0,
    },
    '& li button:before': {
      display: 'none',
    },
    '& li.slick-active button': {
      backgroundColor: blueMain,
      width: 10,
      height: 10,
      border: `1px solid ${blueMain}`,
    },
  },
}));

const SliderCandidates = ({ candidates = [], vacancy = null }) => {
  const candidatesNumber = candidates.length || 1;
  const classes = useStyles({ length: candidatesNumber });

  const settings = {
    dots: true,
    arrows: true,
    speed: 500,
    slidesToShow: candidatesNumber > 2 ? 3 : 2,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box className={classes.slider}>
      <Slider dotsClass={cx('slick-dots', classes.slickDots)} {...settings}>
        {candidates.map((candidate, id) => (
          <SliderCandidateItem key={id} vacancy={vacancy} candidate={candidate} />
        ))}
      </Slider>
    </Box>
  );
};

export default SliderCandidates;
