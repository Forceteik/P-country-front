import makeStyles from '@mui/styles/makeStyles';

import { blueMain, darkGray, orangeMain, pinkMain } from 'styles/colorPalette';

const activityStyle = makeStyles<any>((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-bold',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  text: {
    fontSize: theme.typography.pxToRem(14),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
  label: {
    color: darkGray,
  },
  iconText: {
    color: darkGray,
    marginLeft: theme.spacing(0.8),
    marginBottom: -3,
  },
  orange: {
    color: orangeMain,
  },
  blue: {
    color: blueMain,
  },
  pink: {
    color: pinkMain,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default activityStyle;
