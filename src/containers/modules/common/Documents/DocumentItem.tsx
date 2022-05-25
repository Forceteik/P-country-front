import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import 'slick-carousel/slick/slick.css';
import IconButton from '@mui/material/IconButton';

import { IMG_EXTENSIONS } from 'constants/common';
import Search from 'components/icons/Search';

import EditDocument from '../modals/EditDocument';

import DocumentRemove from './DocumentRemove';

const useItemStyles = makeStyles<any>((theme) => ({
  root: {
    'position': 'relative',
    'display': 'flex',
    'flexDirection': 'column',
    'border': '1px solid #E1E3E8',
    'height': 297,
    'borderRadius': 20,
    'overflow': 'hidden',
    'marginRight': theme.spacing(2),
    '&:hover': {
      '& $iconBox': {
        opacity: 1,
      },
    },
    [theme.breakpoints.only('sm')]: {
      flexDirection: 'row',
      height: 150,
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'row',
      height: 90,
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  },
  imgContainer: {
    'position': 'relative',
    'height': 215,
    'flexShrink': 0,
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
    },
    [theme.breakpoints.only('sm')]: {
      flexBasis: '30%',
      height: '100%',
    },
    [theme.breakpoints.only('xs')]: {
      flexBasis: '20%',
      height: '100%',
    },
  },
  iconBox: {
    position: 'absolute',
    top: 8,
    right: 8,
    display: 'flex',
    opacity: 0,
    transition: 'all 0.3s',
  },
  boxIcon: {
    '& .MuiIconButton-root': {
      'borderRadius': '12px',
      'backgroundColor': 'rgba(0, 0, 0, 0.6)',
      'padding': theme.spacing(0.8),
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
  },
  textContainer: {
    margin: '12px 16px',
    overflow: 'hidden',
  },
  title: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '120%',
    color: '#23262F',
    [theme.breakpoints.up('md')]: {
      maxHeight: 61,
      lineClamp: 3,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: 'box',
      boxOrient: 'vertical',
    },
    [theme.breakpoints.down('md')]: {
      flexBasis: '70%',
      fontSize: theme.typography.pxToRem(14),
      lineHeight: '120%',
      maxHeight: '100%',
    },
  },
}));

const DocumentItem = ({ item, setOpenSliderMod, hadleInitial, guest = false }) => {
  const classes = useItemStyles();
  const { name, media } = item;
  let img;

  if (IMG_EXTENSIONS.includes(media?.extension)) {
    img = media.original_url;
  } else {
    img = '/images/profile/document-sample.jpg';
  }
  const handleItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // if (e.target.localName === "div") {
    setOpenSliderMod(true);
    hadleInitial();
    // }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.imgContainer}>
        <img src={img} alt="Фото документа" />
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
          <EditDocument item={item} />
          <DocumentRemove itemId={item.id} />
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

export default DocumentItem;
