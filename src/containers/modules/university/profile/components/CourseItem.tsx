import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';

import DocumentRemove from 'containers/modules/common/Documents/DocumentRemove';
import Search from 'components/icons/Search';
import EditTask from 'containers/modules/common/modals/EditTask';
import { useItemStyles } from 'containers/modules/employer/profile/Tasks/style';
import { blueMain, darkGray } from 'styles/colorPalette';

const useCourseItemStyles = makeStyles<any>((theme) => ({
  imgContainer: {
    'position': 'relative',
    'height': 162,
    'flexShrink': 0,
    'display': 'flex',
    'alignItems': 'flex-end',
    'justifyContent': 'center',
    '& img': {
      height: '100%',
      width: '100%',
      marginBottom: 16,
      objectFit: 'cover',
    },
  },
  info: {
    '& a': {
      color: blueMain,
    },
  },
  descr: {
    fontSize: theme.typography.pxToRem(12),
    color: darkGray,
    lineHeight: '145%',
    lineClamp: 3,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
  },
}));

const CourseItem = ({ item, setOpenTaskShow, hadleInitial = null, guest = false, vacancy = false }) => {
  const classes = useItemStyles({ vacancy });
  const courseItemClasses = useCourseItemStyles();
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
      <Box className={courseItemClasses.imgContainer}>
        <img src="/images/mockUniversity/coursesBg.png" />
      </Box>
      <Box className={classes.textContainer}>
        <Grid container rowSpacing={1} className={courseItemClasses.info}>
          {item.link && (
            <Grid item xs={12}>
              <a href={`https://${item.link}`} target={'_blank'} rel="noreferrer">
                {item.link}
              </a>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography fontFamily={'inter-med'}>{name}</Typography>
          </Grid>
          {item.description && (
            <Grid item xs={12}>
              <Typography className={courseItemClasses.descr}>{item.description}</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      {!guest ? (
        <Box className={classes.iconBox}>
          <Box className={classes.boxIcon} mr={0.5}>
            <IconButton onClick={handleItemClick} size="large">
              <Search fontSize={28} />
            </IconButton>
          </Box>
          <EditTask item={item} open={openEdit} setOpen={setOpenEdit} university />
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

export default CourseItem;
