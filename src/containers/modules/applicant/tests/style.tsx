import makeStyles from '@mui/styles/makeStyles';

import { darkGray, gray, greenMain, orangeMain } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  title: {
    marginTop: theme.spacing(5.5),
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(36),
  },
}));

const useItemStyles = makeStyles<any, any>((theme) => ({
  root: {
    'borderRadius': 20,
    'border': `1px solid ${gray}`,
    'display': 'flex',
    'flexDirection': 'column',
    'position': 'relative',
    'height': '100%',
    'overflow': 'hidden',
    'transition': 'all 0.5s ease',
    '&:hover': {
      boxShadow: ({ isReleased }) => {
        if (isReleased) {
          return `5px 1px 10px 6px ${gray}`;
        }
        return 'none';
      },
    },
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('lg')]: {
      objectPosition: 'bottom',
    },
  },
  img_box: {
    height: '200px',
    cursor: 'pointer',
    filter: ({ isReleased }) => (isReleased ? 'none' : 'blur(4px)'),
  },
  content: {
    filter: ({ isReleased }) => (isReleased ? 'none' : 'blur(4px)'),
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.only('xs')]: {
      paddingBottom: theme.spacing(3),
    },
  },
  topContent: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  durationBox: {
    display: 'flex',
    alignItems: 'center',
  },
  subTitle: {
    color: '#535C73',
    fontSize: theme.typography.pxToRem(14),
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(22),
    marginBottom: theme.spacing(2),
    lineHeight: '110%',
    [theme.breakpoints.only('xs')]: {
      marginBottom: 0,
    },
  },
  desc: {
    color: '#535C73',
    lineHeight: '150%',
  },
  duration: {
    color: '#535C73',
    fontSize: theme.typography.pxToRem(14),
    marginLeft: theme.spacing(0.5),
  },
  required: {
    'backgroundColor': '#FFF5E5',
    'borderRadius': 60,
    'padding': `${theme.spacing(1)} ${theme.spacing(2)}`,
    'position': 'absolute',
    'top': 20,
    'left': 20,
    '& p': {
      color: '#F28601',
      textTransform: 'uppercase',
      fontSize: theme.typography.pxToRem(12),
    },
  },
  noRelease_box: {
    borderRadius: 20,
    overflow: 'hidden',
    cursor: 'unset',
    padding: theme.spacing(3),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
  },
  noRelease_title: {
    textAlign: 'center',
    marginBottom: theme.typography.pxToRem(5),
  },
  noRelease_text: {
    textAlign: 'center',
    fontFamily: 'inter-med',
    fontSize: theme.typography.pxToRem(18),
  },
  done: {
    color: greenMain,
  },
  notDone: {
    color: darkGray,
  },
  notFullDone: {
    color: orangeMain,
  },
}));

export { useStyles, useItemStyles };
