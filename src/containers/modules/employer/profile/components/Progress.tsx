import Link from 'next/link';
import Slider from 'react-slick';

import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { generateProfileData } from 'utils/common';
import 'slick-carousel/slick/slick.css';
import { greenWhite, pinkWhite } from 'styles/colorPalette';
import { draftText, responsesText } from 'utils/formatters';
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
        marginRight: theme.spacing(-2),
        marginLeft: theme.spacing(-1),
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
}));

const Progress = ({ draftCount, specializationsCount, loading }) => {
  const { currentUser } = useProfile();
  const {
    currentUser: { newResponses = 0 },
  } = useProfile();
  const classes = useStyles();
  const profileData = generateProfileData(currentUser.employer.fullness);

  return (
    <Box className={classes.slider}>
      <Slider {...settings}>
        <Box height={'100%'}>
          <Box className={classes.sliderItemInner}>
            <Link href={'/employer/profile/settings'}>
              <a>
                <ProgressItem {...profileData} progress={currentUser.employer.fullness} linked />
              </a>
            </Link>
          </Box>
        </Box>
        <Box height={'100%'}>
          <Box className={classes.sliderItemInner}>
            {!!newResponses && (
              <Link href="/employer/responses">
                <a>
                  <ProgressItem
                    progress={10}
                    title={`${newResponses} ${responsesText(newResponses)} без ответа`}
                    desc={'Вы не ответили на отклики. Ответьте на них как можно скорее'}
                    img={true}
                    backgroundColor={pinkWhite}
                    linked={true}
                  />
                </a>
              </Link>
            )}
            {!newResponses && !!specializationsCount && (
              <ProgressItem
                progress={10}
                title={'0 откликов без ответа'}
                desc={'У вас нет непросмотренных откликов'}
                img={true}
                backgroundColor={greenWhite}
                imgLink="/images/profile/like.png"
              />
            )}
            {!newResponses && !specializationsCount && (
              <Link href="/employer/vacancies/create">
                <a>
                  <ProgressItem
                    progress={10}
                    title={'У вас нет откликов'}
                    desc={'Разместите новую вакансию для получения откликов'}
                    img={true}
                    backgroundColor={pinkWhite}
                    linked={true}
                  />
                </a>
              </Link>
            )}
          </Box>
        </Box>
        <Box className={classes.item}>
          <Box className={classes.sliderItemInner}>
            {draftCount && draftCount > 0 ? (
              <ProgressItem
                loading={loading}
                progress={10}
                backgroundColor={pinkWhite}
                title={`${draftCount} ${draftText(draftCount)} в черновике`}
                desc={'Заполните и опубликуйте оставшиеся вакансии или удалите их'}
                img={true}
                linked={false}
                imgLink="/images/profile/draft.png"
              />
            ) : (
              <ProgressItem
                progress={10}
                loading={loading}
                backgroundColor={greenWhite}
                title={'0 вакансий в черновике'}
                desc={'У вас нет незавершенных или неопубликованных вакансий'}
                img={true}
                linked={false}
                imgLink="/images/profile/check.png"
              />
            )}
          </Box>
        </Box>
      </Slider>
    </Box>
  );
};

export default Progress;
