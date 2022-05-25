import { useState } from 'react';
import cx from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import { Box, Hidden, Typography } from '@mui/material';

import ShowTaskModal from 'containers/modules/common/modals/ShowTaskModal';
import AddTask from 'containers/modules/common/modals/AddTask';
import { getUserViewRoles } from 'utils/common';
import { useProfile } from 'context/ProfileContext';

import { useTaskStyles } from './style';
import TaskItem from './TaskItem';

const Tasks = ({ user = null }) => {
  const currentUserFromSession = useProfile().currentUser;
  const currentUser = user || currentUserFromSession;

  const { documents } = currentUser;
  const [openTaskShow, setOpenTaskShow] = useState(false);
  const [showItem, setShowItem] = useState('0');

  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isGuest = !viewRole.isOwner;

  const length = isGuest ? documents?.length - 1 : documents?.length;
  const classes = useTaskStyles({ length, isGuest });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
  };

  return (
    <Box className={classes.root}>
      {!(isGuest && documents?.length == 0) && (
        <Typography className={classes.titleText}>Дополнительные материалы</Typography>
      )}
      {documents?.length > 0 ? (
        <>
          <Hidden mdDown>
            <Slider dotsClass={cx('slick-dots', classes.slickDots)} {...settings}>
              {!isGuest && <AddTask sliderItem />}
              {documents.map((item, key) => (
                <TaskItem
                  item={item}
                  key={key}
                  setOpenTaskShow={setOpenTaskShow}
                  hadleInitial={() => setShowItem(key)}
                  guest={isGuest}
                />
              ))}
            </Slider>
          </Hidden>
          <Hidden mdUp>
            <Box>
              {documents.map((item, key) => (
                <TaskItem
                  item={item}
                  key={key}
                  setOpenTaskShow={setOpenTaskShow}
                  hadleInitial={() => setShowItem(key)}
                  guest={isGuest}
                />
              ))}
              {!isGuest && <AddTask />}
            </Box>
          </Hidden>
        </>
      ) : (
        !isGuest && <AddTask />
      )}
      {documents?.length > 0 && (
        <ShowTaskModal item={documents[showItem]} openTaskShow={openTaskShow} setOpenTaskShow={setOpenTaskShow} />
      )}
    </Box>
  );
};

export default Tasks;
