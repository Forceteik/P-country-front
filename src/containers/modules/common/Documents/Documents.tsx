import { useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';

import { Box, Grid, Hidden } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import AddItem from 'containers/modules/common/modals/AddDocument';
import { ProfileTitle } from 'components/Titles';
import { getUserViewRoles } from 'utils/common';
import { black, white } from 'styles/colorPalette';
import { useProfile } from 'context/ProfileContext';

import SliderDocModal from '../modals/SliderDocModal';

import DocumentItem from './DocumentItem';

import 'slick-carousel/slick/slick.css';

const useStyles = makeStyles<any, any>((theme) => ({
  root: {
    '& .slick-track': {
      marginLeft: 0,
    },
    '& .slick-arrow': {
      cursor: 'pointer',
      position: 'absolute',
      top: -53,
      fontSize: 0,
      border: 'none',
      width: 24,
      height: 24,
      backgroundColor: 'transparent',
    },
    '& .slick-prev': {
      right: ({ length, isGuest }) => {
        if (isGuest) {
          return length * 17;
        }
        return length * 20;
      },
      backgroundImage: 'url(/images/icons/arrowLeft.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    '& .slick-next': {
      right: 5,
      backgroundImage: 'url(/images/icons/arrowRight.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  slickDots: {
    'margin': 0,
    'padding': 0,
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'center',
    'position': 'absolute',
    'top': -63,
    'right': 35,
    '& li': {
      padding: theme.spacing(0.5),
    },
    '& li button': {
      cursor: 'pointer',
      border: '1px solid #E1E3E8',
      backgroundColor: white,
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      fontSize: 0,
      display: 'inline-block',
      padding: 0,
    },
    '& li button:before': {
      display: 'none',
    },
    '& li.slick-active button': {
      backgroundColor: black,
      width: '13px',
      height: '13px',
    },
  },
}));

/**
 * todo: перепилисть логику. Она должна учитывать след. кейсы:
 * 1. Я владелец страницы. Всегда показывать заголовок Документы, всегда давать возможность добавлять документы
 * 2. Я гость страницы. Заголовок показывать если есть как мин. один документы.
 * @param user
 * @constructor
 */
const Documents = ({ user = null }) => {
  const currentUserFromSession = useProfile().currentUser;
  const currentUser = user || currentUserFromSession;

  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isGuest = !viewRole.isOwner;
  const isOwner = viewRole.isOwner;

  const { documents } = currentUser;
  const length = documents?.length;
  const [openSliderMod, setOpenSliderMod] = useState(false);
  const [initialSlide, setInitialSlide] = useState('0');
  const classes = useStyles({ length, isGuest });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
  };

  if (documents?.length === 0 && !isOwner) {
    return null;
  }

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProfileTitle title="Документы" />
        </Grid>

        {documents?.length > 0 ? (
          <Grid item xs={12}>
            <Hidden mdDown>
              <Slider dotsClass={cx('slick-dots', classes.slickDots)} {...settings}>
                {isOwner && <AddItem sliderItem />}
                {documents.map((item, key) => (
                  <DocumentItem
                    item={item}
                    key={key}
                    setOpenSliderMod={setOpenSliderMod}
                    hadleInitial={() => setInitialSlide(key)}
                    guest={isGuest}
                  />
                ))}
              </Slider>
            </Hidden>
            <Hidden mdUp>
              <Box>
                {documents.map((item, key) => (
                  <DocumentItem
                    item={item}
                    key={key}
                    setOpenSliderMod={setOpenSliderMod}
                    hadleInitial={() => setInitialSlide(key)}
                    guest={isGuest}
                  />
                ))}
                {isOwner && <AddItem />}
              </Box>
            </Hidden>
          </Grid>
        ) : (
          isOwner && (
            <Grid item xs={12}>
              <AddItem />
            </Grid>
          )
        )}
      </Grid>
      <SliderDocModal
        openSliderMod={openSliderMod}
        setOpenSliderMod={setOpenSliderMod}
        initialSlide={initialSlide}
        currentUser={currentUser}
      />
    </Box>
  );
};

export default Documents;
