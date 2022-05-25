import { makeStyles } from '@mui/styles';

import { blueMain, white } from 'styles/colorPalette';

export const useSliderStyles = makeStyles<any, any>((theme) => ({
  root: {
    '& .slick-arrow': {
      cursor: 'pointer',
      position: 'absolute',
      top: -50,
      fontSize: 0,
      border: 'none',
      width: 9,
      height: 16,
      backgroundColor: 'transparent',
    },
    '& .slick-prev': {
      right: ({ length }) => length * 18 + 55,
      backgroundImage: 'url(/images/icons/arrowLeft.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    '& .slick-next': {
      right: 24,
      backgroundImage: 'url(/images/icons/arrowRight.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  slick: {
    marginRight: theme.spacing(-2),
    marginLeft: theme.spacing(-2),
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(26),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(18),
      marginBottom: theme.spacing(2),
    },
  },
  slickDots: {
    '& li:first-child': {
      display: 'none',
    },
    'margin': 0,
    'padding': 0,
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'center',
    'position': 'absolute',
    'top': -63,
    'right': 45,
    '& li': {
      padding: theme.spacing(0.5),
    },
    '& li button': {
      cursor: 'pointer',
      border: '1px solid #E1E3E8',
      backgroundColor: white,
      width: 10,
      height: 10,
      borderRadius: '50%',
      fontSize: 0,
      display: 'inline-block',
      padding: 0,
    },
    '& li button:before': {
      display: 'none',
    },
    '& li.slick-active button': {
      backgroundColor: blueMain,
      width: 10,
      height: 10,
      border: `1px solid ${blueMain}`,
    },
  },
}));
