import Link from 'next/link';
import Slider from 'react-slick';

import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import 'slick-carousel/slick/slick.css';

import { generateProfileData, generateRatingData } from 'utils/common';
import { pinkWhite, pinkMain, greenMain, greenWhite } from 'styles/colorPalette';
import { useProfile } from 'context/ProfileContext';

import ProgressItem from './ProgressItem';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2.5,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 1.7,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1.25,
        dots: false,
      },
    },
  ],
};

const useStyles = makeStyles<any>((theme) => ({
  slider: {
    '& .slick-list': {
      marginRight: theme.spacing(-2),
      marginLeft: theme.spacing(-2),
      [theme.breakpoints.down('lg')]: {
        marginRight: theme.spacing(-3),
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(-1),
        marginRight: theme.spacing(-2),
      },
    },
    '& .slick-track': {
      display: 'flex !important',
    },
    '& .slick-slide': {
      display: 'flex',
      height: 'inherit !important',
    },
    '& .slick-slide > div': {
      width: '100%',
    },
  },
  sliderItemInner: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  },
  item: {
    height: '100%',
  },
}));

const Progress = ({ user = null }) => {
  const sessionUser = useProfile().currentUser;
  const currentUser = user || sessionUser;

  const classes = useStyles();
  let testProps = {
    color: pinkMain,
    backgroundColor: pinkWhite,
    title: 'Незаконченный тест',
    desc: 'Вы не завершили прохождение теста. Закончите его, пока не вышло время',
  };

  if (currentUser.mbti?.status === 'completed') {
    testProps = {
      color: greenMain,
      backgroundColor: greenWhite,
      title: 'Завершенный тест',
      desc: 'Вы успешно завершили тест. Ознакомьтесь с результатами ниже',
    };
  }

  const ratingData = generateRatingData(currentUser.rating);
  const profileData = generateProfileData(currentUser.employee.fullness);

  return (
    <Box className={classes.slider}>
      <Slider {...settings}>
        <Box className={classes.item}>
          <Box className={classes.sliderItemInner}>
            <ProgressItem {...profileData} progress={currentUser.employee.fullness} />
          </Box>
        </Box>
        <Box className={classes.item}>
          <Box className={classes.sliderItemInner}>
            <ProgressItem {...ratingData} progress={currentUser.rating} />
          </Box>
        </Box>
        <Box className={classes.item}>
          <Box className={classes.sliderItemInner}>
            <Link href="/applicant/tests/1">
              <a>
                <ProgressItem progress={20} img={true} {...testProps} linked={true} />
              </a>
            </Link>
          </Box>
        </Box>
      </Slider>
    </Box>
  );
};

export default Progress;
