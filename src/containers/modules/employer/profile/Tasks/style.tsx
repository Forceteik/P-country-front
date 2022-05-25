import { makeStyles } from '@mui/styles';

import { black, white } from 'styles/colorPalette';

export const useItemStyles = makeStyles<any, any>((theme) => ({
  root: {
    'position': 'relative',
    'display': 'flex',
    'flexDirection': 'column',
    'border': '1px solid #E1E3E8',
    'height': 297,
    'width': ({ vacancy }) => (vacancy ? 255 : 'unset'),
    'borderRadius': 20,
    'overflow': 'hidden',
    'marginRight': theme.spacing(2),
    '&:hover': {
      '& $iconBox': {
        opacity: 1,
      },
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      height: 150,
      width: () => '100%',
      marginBottom: theme.spacing(2),
      marginRight: 0,
    },
    [theme.breakpoints.down('sm')]: {
      height: 90,
    },
  },
  imgContainer: {
    'position': 'relative',
    'height': ({ vacancy }) => (vacancy ? 215 : 225),
    'flexShrink': 0,
    'display': 'flex',
    'alignItems': 'flex-end',
    'justifyContent': 'center',
    '& img': {
      height: ({ vacancy }) => (vacancy ? '100%' : 134),
      width: ({ vacancy }) => (vacancy ? '100%' : 134),
      marginBottom: ({ vacancy }) => (vacancy ? 0 : 30),
      objectFit: ({ vacancy }) => (vacancy ? 'cover' : 'unset'),
      [theme.breakpoints.down('md')]: {
        height: ({ vacancy }) => (vacancy ? '100%' : 100),
        width: ({ vacancy }) => (vacancy ? '100%' : 100),
        marginBottom: () => 0,
      },
      [theme.breakpoints.down('sm')]: {
        height: ({ vacancy }) => (vacancy ? '100%' : 50),
        width: ({ vacancy }) => (vacancy ? '100%' : 50),
      },
    },
    [theme.breakpoints.down('md')]: {
      flexBasis: '30%',
      height: () => '100%',
      alignItems: 'center',
    },
    [theme.breakpoints.only('xs')]: {
      flexBasis: '20%',
      padding: theme.spacing(1),
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
    margin: ({ vacancy }) => (vacancy ? '12px 24px 12px 24px' : '0px 24px 12px 24px'),
    overflow: 'hidden',
    [theme.breakpoints.down('lg')]: {
      margin: ({ vacancy }) => (vacancy ? '12px 16px 12px 16px' : '0px 16px 12px 16px'),
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexGrow: 1,
      alignItems: 'center',
      margin: () => '12px 16px 12px 16px',
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(16),
    color: black,
    lineHeight: '120%',
    [theme.breakpoints.up('md')]: {
      maxHeight: 71,
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

export const useTaskStyles = makeStyles<any, any>((theme) => ({
  root: {
    'marginTop': theme.spacing(5),
    '& .slick-track': {
      marginLeft: 0,
    },
    '& .slick-arrow': {
      cursor: 'pointer',
      position: 'absolute',
      top: ({ employer }) => (employer ? -39 : -51),
      fontSize: 0,
      border: 'none',
      width: 24,
      height: 24,
      backgroundColor: 'transparent',
    },
    '& .slick-prev': {
      right: ({ length, employer }) => {
        if (employer) {
          const number = length * 26;
          return number;
        }
        const number = length * 20;
        return number;
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
  titleText: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(26),
    marginBottom: theme.spacing(3),
  },
  slickDots: {
    'margin': 0,
    'padding': 0,
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'center',
    'position': 'absolute',
    'top': ({ employer }) => (employer ? -45 : -60),
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
