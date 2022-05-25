import { makeStyles } from '@mui/styles';

import { darkGray } from 'styles/colorPalette';

export const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(11),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(5),
    },
  },
  companyTitle: {
    fontFamily: 'inter-med',
    fontSize: theme.typography.pxToRem(18),
    marginRight: theme.spacing(1),
    color: darkGray,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  name: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(38),
    lineHeight: '110%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
  },
  blockTitle: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(22),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  descr: {
    '& p': {
      color: darkGray,
    },
    '& p:not(:last-child)': {
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1.5),
      },
    },
  },
  secondTitle: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(26),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
  },
  filterBtn: {
    width: '40%',
    margin: '0px auto',
    marginBottom: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}));
