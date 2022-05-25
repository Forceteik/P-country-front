import makeStyles from '@mui/styles/makeStyles';

import { black, blueMain, darkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    'marginTop': theme.spacing(8),
    'color': darkGray,
    'lineHeight': '150%',
    '& button': {
      padding: '22px 76px',
      [theme.breakpoints.down('sm')]: {
        padding: '15px 45px',
      },
    },
    '& p': {
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(12),
        lineHeight: '130%',
      },
    },
    '& a': {
      color: blueMain,
    },
  },
  accentText: {
    fontFamily: 'inter-med',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: '130%',
    },
  },
  accentWord: {
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: '130%',
    },
  },
  list: {
    'paddingTop': 0,
    'marginTop': -14,
    '& li': {
      'paddingTop': 2,
      'paddingBottom': 2,
      '& span': {
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.typography.pxToRem(12),
          lineHeight: '130%',
        },
      },
    },
    '& .MuiListItem-gutters': {
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(1),
      },
    },
  },
  innerList: {
    'paddingTop': 0,
    'marginTop': 0,
    '& li': {
      'paddingTop': 0,
      'paddingBottom': 0,
      '& span': {
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.typography.pxToRem(12),
          lineHeight: '130%',
        },
      },
    },
    '& .MuiListItem-gutters': {
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(1),
      },
    },
  },
  contactsList: {
    'paddingLeft': 0,
    'paddingTop': 0,
    '& li': {
      'paddingLeft': 0,
      'paddingTop': 0,
      '& span': {
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.typography.pxToRem(12),
          lineHeight: '130%',
        },
      },
    },
    '& .MuiListItem-gutters': {
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(0),
      },
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(38),
    color: black,
    fontFamily: 'inter-bold',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(22),
      lineHeight: '130%',
      marginBottom: theme.spacing(3),
    },
  },
  subTitle: {
    fontSize: theme.typography.pxToRem(26),
    color: black,
    fontFamily: 'inter-bold',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(19),
      lineHeight: '120%',
      marginBottom: theme.spacing(2),
    },
  },
  blockTitle: {
    fontSize: theme.typography.pxToRem(18),
    color: black,
    fontFamily: 'inter-bold',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      marginBottom: theme.spacing(1),
      lineHeight: '130%',
    },
  },
  blockSubTitle: {
    fontSize: theme.typography.pxToRem(16),
    color: black,
    fontFamily: 'inter-bold',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(3),
    fontStyle: 'italic',
    [theme.breakpoints.down('sm')]: {
      lineHeight: '130%',
    },
  },
  accentItem: {
    color: black,
    fontFamily: 'inter-bold',
  },
  block: {
    marginBottom: theme.spacing(4),
  },
  blockPrivacy: {
    marginBottom: theme.spacing(1),
  },
}));

export default useStyles;
