import { makeStyles } from '@mui/styles';

import { blueLight } from 'styles/colorPalette';

export const useSubHeaderStyles = makeStyles<any, any>((theme) => ({
  mainTitle: {
    fontSize: theme.typography.pxToRem(38),
    fontFamily: 'inter-bold',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(36),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
      marginBottom: theme.spacing(3),
    },
  },
  slickDots: {
    'padding': 0,
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'center',
    'position': 'absolute',
    'top': -79,
    'right': 30,
    [theme.breakpoints.down('md')]: {
      top: -88,
    },
    '& li': {
      padding: theme.spacing(0.5),
    },
    '& li button': {
      padding: 0,
      cursor: 'pointer',
      border: 'none',
      backgroundColor: blueLight,
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      fontSize: 0,
      display: 'inline-block',
    },
    '& li.slick-active button': {
      backgroundColor: '#5468E7',
      height: 8,
      width: 16,
      borderRadius: 42,
    },
  },
  slider: {
    'position': 'relative',
    '& .slick-arrow': {
      cursor: 'pointer',
      position: 'absolute',
      top: -53,
      fontSize: 0,
      border: 'none',
      width: 24,
      height: 24,
      backgroundColor: 'transparent',
      [theme.breakpoints.down('md')]: {
        top: -63,
      },
      [theme.breakpoints.down('sm')]: {
        top: -57,
      },
    },
    '& .slick-disabled.slick-prev': {
      backgroundImage: 'url(/images/vacancies/arrow-left.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    '& .slick-prev': {
      right: ({ length }) => length * 16 + 6,
      backgroundImage: 'url(/images/vacancies/arrow-left-active.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      [theme.breakpoints.down('lg')]: {
        right: ({ length }) => length * 20 + 10,
      },
      [theme.breakpoints.down('md')]: {
        right: ({ length }) => length * 23 + 15,
      },
      [theme.breakpoints.down('sm')]: {
        right: 32,
      },
    },
    '& .slick-disabled.slick-next': {
      backgroundImage: 'url(/images/vacancies/arrow-right.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    '& .slick-next': {
      right: 5,
      backgroundImage: 'url(/images/vacancies/arrow-right-active.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    '& .slick-list': {
      marginRight: theme.spacing(-1.5),
      marginLeft: theme.spacing(-1.5),
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(-1.25),
        marginLeft: theme.spacing(-1.25),
      },
    },
    '& .slick-track': {
      display: 'flex !important',
      marginLeft: 'unset',
      marginRight: 'unset',
    },
    '& .slick-slide': {
      '& div:first-child': {
        height: '100% !important',
      },
      'height': 'inherit !important',
    },
  },
  sliderItemInner: {
    borderRadius: 20,
    padding: theme.spacing(2),
    display: 'flex !important',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: theme.spacing(1.5),
    marginLeft: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1.25),
      marginLeft: theme.spacing(1.25),
    },
  },
  sliderChoosen: {
    'boxShadow': 'inset 0px 0px 100px 0px rgb(0 0 0 / 30%)',
    '& p': {
      marginRight: theme.spacing(1),
    },
    '& $check': {
      opacity: 1,
    },
  },
  itemText: {
    'marginLeft': theme.spacing(1.5),
    '& p': {
      color: '#fff',
      marginBottom: theme.spacing(0.5),
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(14),
      },
    },
  },
  check: {
    opacity: 0,
  },
}));
