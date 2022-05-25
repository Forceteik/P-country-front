import cx from 'classnames';
import Slider from 'react-slick';

import { Box, Dialog, DialogContent, Typography, Hidden } from '@mui/material';

import { useSession } from 'context/UserContext';
import Close from 'components/icons/Close';
import { IMG_EXTENSIONS } from 'constants/common';

import DocumentRemove from '../../Documents/DocumentRemove';
import DownloadDoc from '../../Documents/DownloadDoc';
import EditDocument from '../EditDocument';

import { usePaperStyle, useSlideStyle } from './style';

const SliderDocModal = ({ openSliderMod, setOpenSliderMod, initialSlide, currentUser }) => {
  const slideStyle = useSlideStyle();
  const paperClasses = usePaperStyle();

  const handleClose = () => {
    setOpenSliderMod(false);
  };

  const settings = {
    dots: true,
    infinite: false,
    initialSlide: initialSlide,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box>
      <Dialog
        open={openSliderMod}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          classes: paperClasses,
        }}
        BackdropProps={{
          style: {
            background: 'rgba(35, 38, 47, 0.8)',
            backdropFilter: 'blur(29px)',
          },
        }}
      >
        <DialogContent>
          <Box className={slideStyle.root}>
            <Box className={slideStyle.docRoot_icon_box}>
              <Box></Box>
              <Box onClick={handleClose}>
                <Close color={'#fff'} />
              </Box>
            </Box>
            <Slider dotsClass={cx('slick-dots', slideStyle.slickDots)} {...settings}>
              {currentUser.documents?.map((item, key) => (
                <ItemModal item={item} key={key} />
              ))}
            </Slider>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const ItemModal = ({ item }) => {
  const slideStyle = useSlideStyle();
  const { role } = useSession();

  const { name, media } = item;
  let img;

  if (IMG_EXTENSIONS.includes(media?.extension)) {
    img = media.original_url;
  } else {
    img = '/images/profile/document-sample.jpg';
  }

  return (
    <Box textAlign={'center'}>
      <Box className={slideStyle.userIcons}>
        <Box mr={0.5}>
          <DownloadDoc url={media.original_url} />
        </Box>
        <Hidden smUp>
          {role === 'employee' && <EditDocument item={item} />}
          {role === 'employee' && <DocumentRemove itemId={item.id} />}
        </Hidden>
      </Box>
      <Box className={slideStyle.imgContainer}>
        <img src={img} alt="" />
      </Box>
      <Typography color={'#fff'} pt={2}>
        {name}
      </Typography>
    </Box>
  );
};

export default SliderDocModal;
