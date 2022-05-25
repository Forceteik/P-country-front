import { makeStyles } from '@mui/styles';

import {
  blueMain,
  blueVisited,
  darkGray,
  gray,
  greenMain,
  greenWhite,
  ligthGray,
  orangeMain,
  orangeWhite,
  pinkMain,
  pinkWhite,
} from 'styles/colorPalette';

export const useVacancyItemStyles = makeStyles<any, any>((theme) => ({
  vacancyBox: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'relative',
    padding: '42px 32px 42px 42px',
    borderRadius: 20,
    border: `1px solid ${gray}`,
    [theme.breakpoints.down('md')]: {
      padding: '28px 20px 24px',
    },
  },
  company: {
    'display': 'flex',
    'alignItems': 'center',
    'width': '70%',
    '& p': {
      marginRight: theme.spacing(1),
    },
  },
  name: {
    maxWidth: '75%',
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    lineHeight: '120%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      maxWidth: '100%',
    },
  },
  link: {
    'color': ({ disabledView }) => (disabledView ? darkGray : blueMain),
    '&:visited': {
      color: blueVisited,
    },
  },
  descr: {
    'overflow': 'hidden',
    'maxHeight': 200,
    'color': darkGray,
    'position': 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      background:
        'linear-gradient(180deg, rgba(255,255,255,0.01) 0%,rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.3) 85%, rgba(255,255,255,0.7) 90%, rgba(255,255,255,0.9) 98%, rgba(255,255,255,1) 100%)',
      top: 0,
      left: 0,
    },
    '& ol': {
      paddingInlineStart: theme.spacing(2.6),
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    '& ul': {
      paddingInlineStart: theme.spacing(2.6),
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
  },
  stackItem: {
    'display': 'inline-block',
    'backgroundColor': ligthGray,
    'borderRadius': 60,
    'padding': '10px 18px',
    'marginRight': theme.spacing(2),
    'marginBottom': theme.spacing(2),
    '& p': {
      color: darkGray,
      fontFamily: 'inter-med',
      fontSize: theme.typography.pxToRem(12),
    },
    [theme.breakpoints.down('sm')]: {
      padding: '6px 8px',
      borderRadius: 14,
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.8),
    },
  },
  date: {
    textAlign: 'right',
    color: darkGray,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  logo: {
    'position': 'absolute',
    'top': 42,
    'right': 32,
    'width': 120,
    'height': 50,
    'textAlign': 'center',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
    [theme.breakpoints.down('sm')]: {
      top: 14,
      right: 17,
    },
  },
  compatibility: {
    'whiteSpace': 'nowrap',
    'position': 'absolute',
    'top': -37,
    'right': 31,
    'borderRadius': '8px 8px 0px 0px',
    'padding': '9px 16px',
    '& p': {
      textTransform: 'uppercase',
      fontFamily: 'inter-med',
      fontSize: theme.typography.pxToRem(12),
    },
    [theme.breakpoints.down('sm')]: {
      right: '50%',
      transform: 'translateX(50%)',
    },
  },
  progress: {
    position: 'absolute',
    right: 35,
    top: 35,
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      top: 19,
      right: 19,
    },
  },
  red: {
    'backgroundColor': pinkWhite,
    '& p': {
      color: pinkMain,
    },
  },
  green: {
    'backgroundColor': greenWhite,
    '& p': {
      color: greenMain,
    },
  },
  orange: {
    'backgroundColor': orangeWhite,
    '& p': {
      color: orangeMain,
    },
  },
  task: {
    'display': 'flex',
    'alignItems': 'center',
    '& p': {
      marginLeft: theme.spacing(1),
    },
  },
}));

export const useStackItemStyles = makeStyles<any>((theme) => ({
  stackItem: {
    'display': 'inline-block',
    'backgroundColor': ligthGray,
    'borderRadius': 60,
    'padding': '10px 18px',
    'marginRight': theme.spacing(2),
    'marginBottom': theme.spacing(2),
    '& p': {
      color: darkGray,
      whiteSpace: 'nowrap',
      fontFamily: 'inter-med',
      fontSize: theme.typography.pxToRem(12),
    },
    [theme.breakpoints.down('sm')]: {
      padding: '6px 8px',
      borderRadius: 14,
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.8),
    },
  },
}));
