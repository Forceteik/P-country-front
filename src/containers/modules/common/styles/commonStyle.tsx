import makeStyles from '@mui/styles/makeStyles';

const commonStyle = makeStyles<any>((theme) => ({
  inner: {
    marginTop: theme.spacing(7.7),
    marginBottom: theme.spacing(11),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4),
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(38),
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  publicationTitle: {
    fontSize: theme.typography.pxToRem(26),
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(22),
    },
  },
  mediumTitle: {
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
  },
}));

export default commonStyle;
