import makeStyles from '@mui/styles/makeStyles';

import { gray, darkGray, blueMain } from 'styles/colorPalette';

const usePaperStyles = makeStyles<any>((theme) => ({
  root: {
    'background': 'transparent',
    'boxShadow': 'none',
    'overflow': 'unset',
    'width': 650,
    [theme.breakpoints.down('sm')]: {
      'width': '100%',
      'margin': '0px 20px',
      'heigth': '100%',
      '& .MuiDialogContent-root': {
        padding: 0,
      },
    },
    '& .MuiDialogContent-root': {
      overflow: 'unset',
    },
    '& .MuiDialog-paperWidthSm': {
      width: 650,
      maxWidth: '95%',
    },
  },
}));

const usePaperStylesFlexibleWidth = makeStyles<any, any>((theme) => ({
  root: {
    'background': 'transparent',
    'boxShadow': 'none',
    'overflow': 'unset',
    'margin': 0,
    'width': ({ width }) => width,
    [theme.breakpoints.down('sm')]: {
      'width': '100%',
      'heigth': '100%',
      '& .MuiDialogContent-root': {
        padding: 0,
      },
    },
    '& .MuiDialogContent-root': {
      overflow: 'unset',
    },
    '&.MuiDialog-paperWidthSm': {
      width: ({ width }) => width,
      maxWidth: '96%',
    },
  },
}));

const useItemStyles = makeStyles<any>((theme) => ({
  scroll: {
    overflowY: 'scroll',
  },
  modalPaper: {
    'position': 'relative',
    'background': 'white',
    'borderRadius': 20,
    '& a': {
      color: blueMain,
    },
  },
  pBig: {
    padding: '56px 42px',
    [theme.breakpoints.down('md')]: {
      padding: '44px 24px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '44px 16px',
    },
  },
  pMeduim: {
    padding: '42px 32px',
    [theme.breakpoints.down('md')]: {
      padding: '32px 24px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '45px 16px',
    },
  },
  pShare: {
    padding: '62px 16px 25px 40px',
    [theme.breakpoints.down('md')]: {
      padding: '16px 16px 32px 16px',
      marginBottom: theme.spacing(2),
    },
  },
  imgDocument: {
    'width': '100%',
    'maxHeight': 400,
    'borderRadius': 16,
    'overflow': 'hidden',
    'textAlign': 'center',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      display: 'block',
    },
  },
  mainTitle: {
    fontSize: theme.typography.pxToRem(26),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
  },
  whiteTitle: {
    color: '#fff',
    fontSize: theme.typography.pxToRem(38),
    lineHeight: '110%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(28),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  blackTitle: {
    fontSize: theme.typography.pxToRem(38),
    lineHeight: '110%',
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(28),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  smallTitle: {
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
  },
  mainDescr: {
    color: darkGray,
    lineHeight: '150%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  regularDescr: {
    color: darkGray,
    lineHeight: '150%',
  },
  boldDescr: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-bold',
    textAlign: 'left',
  },
  whiteDescr: {
    color: '#fff',
    textAlign: 'center',
  },
  closeIcon: {
    height: 24,
    width: 24,
    position: 'absolute',
    top: '2px',
    right: '-34px',
    cursor: 'pointer',
    zIndex: 10,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: darkGray,
      right: 10,
      top: 10,
      height: 32,
      width: 32,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
  },
  fileInput: {
    '&:focus': {
      'outline-width': 0,
      'outline-color': 'transparent',
      'outline': 'none',
      '-webkit-appearance': 'none',
      '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
    },
  },
  modalIcon: {
    '& img': {
      width: 82,
      height: 82,
      objectFit: 'contain',
    },
  },
}));

const useDropzoneStyle = makeStyles<any>((theme) => ({
  inner: {
    width: '70%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
  title: {
    'textAlign': 'center',
    'lineHeight': '150%',
    'fontFamily': 'inter-bold',
    '& span': {
      color: blueMain,
      lineHeight: '150%',
      fontFamily: 'inter-bold',
    },
  },
  descr: {
    color: gray,
    lineHeight: '150%',
    fontSize: theme.typography.pxToRem(14),
    textAlign: 'center',
    fontFamily: 'inter',
  },
}));

export { usePaperStyles, useItemStyles, usePaperStylesFlexibleWidth, useDropzoneStyle };
