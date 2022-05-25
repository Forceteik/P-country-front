import { makeStyles } from '@mui/styles';

import { blueLight } from 'styles/colorPalette';

export const useTeamListStyles = makeStyles<any>((theme) => ({
  teamItem: {
    padding: '22px 26px 26px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: 20,
    boxShadow: '0px 4px 20px rgba(43, 54, 155, 0.06)',
    [theme.breakpoints.down('md')]: {
      padding: '18px 20px 24px',
    },
  },
  header: {
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(2.5),
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0),
    },
  },
  avatar: {
    'width': 120,
    'height': 120,
    'borderRadius': '50%',
    'overflow': 'hidden',
    'display': 'flex',
    'flexShrink': 0,
    '& img': {
      objectFit: 'cover',
      display: 'block',
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: 83,
      height: 83,
    },
  },
  headerInfo: {
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '13px',
    },
  },
  prof: {
    color: '#419CF9',
    fontSize: theme.typography.pxToRem(14),
    marginBottom: theme.spacing(1),
    fontFamily: 'inter-bold',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
  name: {
    color: '#003B77',
    fontSize: theme.typography.pxToRem(26),
    fontFamily: 'inter-med',
    lineHeight: '110%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  infoBox: {
    'backgroundColor': '#F9FAFB',
    'flexGrow': 1,
    'borderRadius': 24,
    'padding': '20px 20px 16px',
    '& li': {
      color: '#253341',
    },
    [theme.breakpoints.down('md')]: {
      backgroundColor: '#fff',
      padding: 0,
    },
  },
  infoItem: {
    'padding': '0px 0px 16px 22px',
    'position': 'relative',
    '&:before': {
      position: 'absolute',
      left: 0,
      top: 8,
      content: '""',
      borderRadius: '50%',
      backgroundColor: '#419CF9',
      width: 10,
      height: 10,
      [theme.breakpoints.down('lg')]: {
        top: 6,
      },
    },
    [theme.breakpoints.down('sm')]: {
      'padding': '0px 0px 14px 20px',
      '& .MuiTypography-root': {
        fontSize: theme.typography.pxToRem(14),
      },
    },
  },
}));

export const useTeamBannerStyles = makeStyles<any>((theme) => ({
  mainBanner: {
    backgroundColor: '#419CF9',
    borderRadius: 20,
    width: '84%',
    margin: '0 auto',
    padding: '13px 33px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      width: '95%',
      padding: '44px 34px 39px 25px',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  text: {
    color: '#fff',
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(18),
    textAlign: 'center',
    padding: '0px 15px',
    [theme.breakpoints.down('md')]: {
      padding: '20px 0px',
    },
  },
  mailLink: {
    'transition': 'all 0.3s',
    'backgroundColor': '#FFCE85',
    'borderRadius': 8,
    'padding': '9px 45px',
    'color': '#003B77',
    'fontSize': theme.typography.pxToRem(18),
    '&:hover': {
      backgroundColor: '#F3B860',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px 20px',
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export const useTeamStyles = makeStyles<any>((theme) => ({
  mainBox: {
    backgroundColor: blueLight,
    borderRadius: '0px 0px 40px 40px',
    paddingBottom: 88,
    [theme.breakpoints.down('lg')]: {
      paddingBottom: 50,
    },
  },
  container: {
    maxWidth: 1134,
    margin: '0px auto',
    padding: '0px 60px',
    [theme.breakpoints.down('lg')]: {
      padding: '0px 40px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 16px',
    },
  },
  topText: {
    textAlign: 'center',
    marginTop: theme.spacing(7.5),
    marginBottom: theme.spacing(7.5),
    [theme.breakpoints.down('lg')]: {
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(5),
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(44),
    color: '#003B77',
    fontFamily: 'inter-bold',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('lg')]: {
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
      marginBottom: theme.spacing(3),
    },
  },
  descr: {
    color: '#253341',
    lineHeight: '136%',
    fontFamily: 'inter-med',
    width: '60%',
    margin: '0px auto',
    [theme.breakpoints.down('lg')]: {
      width: '80%',
    },
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
}));
