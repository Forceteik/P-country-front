import { useState } from 'react';

import { Box, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import IconButton from '@mui/material/IconButton';

import DocumentRemove from 'containers/modules/common/Documents/DocumentRemove';
import Search from 'components/icons/Search';
import EditTask from 'containers/modules/common/modals/EditTask';

import { useItemStyles } from './style';

const TaskItem = ({ item, setOpenTaskShow, hadleInitial = null, guest = false, vacancy = false }) => {
  const classes = useItemStyles({ vacancy });
  const { name } = item;
  const [openEdit, setOpenEdit] = useState(false);

  const handleItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenTaskShow(true);
    if (hadleInitial) {
      hadleInitial();
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.imgContainer}>
        <img src={vacancy ? '/images/tasks/task-vacancy.png' : '/images/tasks/task.png'} alt="" />
      </Box>
      <Box className={classes.textContainer}>
        <Typography className={classes.title}>{name}</Typography>
      </Box>
      {!guest ? (
        <Box className={classes.iconBox}>
          <Box className={classes.boxIcon} mr={0.5}>
            <IconButton onClick={handleItemClick} size="large">
              <Search fontSize={28} />
            </IconButton>
          </Box>
          <EditTask item={item} open={openEdit} setOpen={setOpenEdit} />
          <DocumentRemove itemId={item.id} url={`/employer/profile/document/${item.id}`} />
        </Box>
      ) : (
        <Box className={classes.iconBox}>
          <Box className={classes.boxIcon} mr={0.5}>
            <IconButton onClick={handleItemClick} size="large">
              <Search fontSize={28} />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TaskItem;
