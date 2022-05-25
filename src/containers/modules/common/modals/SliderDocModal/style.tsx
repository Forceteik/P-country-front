import { makeStyles } from '@mui/styles';

export const usePaperStyle = makeStyles<any>((theme) => ({
  root: {
    'background': 'transparent',
    'boxShadow': 'none',
    'overflow': 'unset',
    'maxWidth': '80%',
    'maxHeight': '80%',
    [theme.breakpoints.down('sm')]: {
      'width': '100%',
      'margin': 0,
      'heigth': '100%',
      '& .MuiDialogContent-root': {
        padding: 0,
      },
    },
    '& .MuiDialogContent-root': {
      overflow: 'unset',
    },
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '80%',
      maxHeight: '80%',
    },
  },
}));

export const useSlideStyle = makeStyles<any>((theme) => ({
  root: {
    '& .slick-track': {
      marginLeft: 0,
    },
    '& .slick-arrow': {
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      fontSize: 0,
      border: 'none',
      width: 24,
      height: 24,
      backgroundColor: 'transparent',
    },
    '& .slick-prev': {
      left: 0,
      backgroundImage: 'url(/images/icons/ArrowLeftBig.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    '& .slick-next': {
      right: 0,
      backgroundImage: 'url(/images/icons/ArrowRightBig.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    '& .slick-slider': {
      position: 'unset',
    },
  },
  docRoot_icon_box: {
    'position': 'absolute',
    'top': '26px',
    'right': '-15px',
    'cursor': 'pointer',
    'display': 'flex',
    '& svg': {
      marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      top: '-40px',
      right: '0px',
    },
  },
  imgContainer: {
    'margin': '0px auto',
    'maxWidth': '80%',
    'maxHeight': 475,
    '& img': {
      width: '100%',
      maxHeight: 475,
      objectFit: 'contain',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
    },
  },
  userIcons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  slickDots: {
    'margin': 0,
    'padding': 0,
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'center',
    'position': 'absolute',
    'bottom': '-50px',
    'right': '50%',
    'transform': 'translateX(50%)',
    '& li': {
      padding: theme.spacing(0.5),
    },
    '& li button': {
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#fff',
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
      backgroundColor: '#000',
      width: '13px',
      height: '13px',
    },
  },
}));
