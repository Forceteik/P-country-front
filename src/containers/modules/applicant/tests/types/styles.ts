import makeStyles from '@mui/styles/makeStyles';

import { darkGray, midDarkGray } from 'styles/colorPalette';

export const useStyles = makeStyles<any>((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    paddingBottom: theme.spacing(11),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(5),
    },
  },
  iqRoot: {
    marginTop: theme.spacing(5.5),
    marginBottom: theme.spacing(5),
  },
  iqButton: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
  },
  container: {
    maxWidth: 810,
    minHeight: '100vh',
    margin: '0 auto',
    padding: '0px 40px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 25px',
    },
  },
  header: {
    boxShadow: '0px 4px 16px -8px rgba(163, 175, 192, 0.39)',
    borderRadius: 20,
    padding: '12px 24px 24px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  headerProgress: {
    marginTop: theme.spacing(2),
  },
  questionHelper: {
    marginBottom: theme.spacing(2),
    color: darkGray,
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
  nextButton: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    marginBottom: theme.spacing(10),
    borderRadius: 20,
    [theme.breakpoints.down('md')]: {
      paddingLeft: '15%',
      paddingRight: '15%',
    },
  },
  finishButton: {
    marginTop: theme.spacing(3),
    color: '#535C73',
    cursor: 'pointer',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '50%',
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: theme.typography.pxToRem(18),
    color: midDarkGray,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  task: {
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  imgIq: {
    objectFit: 'cover',
    maxWidth: '100%',
  },
  helperText: {
    fontSize: theme.typography.pxToRem(14),
    fontFamily: 'inter-bold',
    lineHeight: '150%',
  },
  helperTextIQ: {
    fontSize: theme.typography.pxToRem(14),
    color: darkGray,
    lineHeight: '150%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
  countdownBox: {
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownBoxIQ: {
    width: 140,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countdownBoxAbility: {
    width: 140,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 26,
    right: 16,
    [theme.breakpoints.down('sm')]: {
      top: 17,
    },
  },
  remine: {
    color: midDarkGray,
    fontSize: theme.typography.pxToRem(16),
    marginRight: theme.spacing(1),
  },
  img: {
    marginBottom: theme.spacing(4),
  },
  relativeGrid: {
    position: 'relative',
    boxShadow: '0px 4px 16px -8px rgba(163, 175, 192, 0.39)',
    borderRadius: 20,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  gridBtn: {
    marginTop: theme.spacing(4),
  },
}));
