import makeStyles from '@mui/styles/makeStyles';

import { darkGray, black } from 'styles/colorPalette';

const progressItemProfileStyle = makeStyles<any, any>((theme) => ({
  progressItem: {
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    borderRadius: 20,
    padding: theme.spacing(3.5),
    display: 'flex',
    height: '100%',
    cursor: ({ linked }) => (linked ? 'pointer' : 'auto'),
    [theme.breakpoints.down('sm')]: {
      padding: '16px 10px',
    },
  },
  imgBox: {
    'width': 88,
    'height': 88,
    'margin': '0px auto',
    'borderRadius': '50%',
    'overflow': 'hidden',
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: 44,
      height: 44,
    },
  },
  circularBox: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  colorPrimary: {
    color: ({ color }) => color,
  },
  circle: {
    strokeLinecap: 'round',
  },
  text_box: {
    top: 0,
    left: 8,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      left: 3,
    },
  },
  circularPercentage: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(18),
    color: ({ color }) => color,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(9),
    },
  },
  title: {
    color: black,
    fontFamily: 'inter-med',
    marginBottom: theme.spacing(0.5),
    fontSize: theme.typography.pxToRem(14),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
  desc: {
    lineHeight: '150%',
    fontSize: theme.typography.pxToRem(14),
    color: darkGray,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
}));

export default progressItemProfileStyle;
