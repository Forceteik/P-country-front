import { makeStyles } from '@mui/styles';

import { blueMain, blueVisited, gray } from 'styles/colorPalette';

export const useViewStyles = makeStyles<any>((theme) => ({
  header: {
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1.5),
      marginTop: theme.spacing(2.5),
    },
  },
  companyTitle: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  company: {
    fontFamily: 'inter-med',
    fontSize: theme.typography.pxToRem(18),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  name: {
    marginTop: theme.spacing(1.5),
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(38),
    lineHeight: '110%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
  },
  link: {
    'color': blueMain,
    '&:visited': {
      color: blueVisited,
    },
  },
  infoList: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  infoListItem: {
    'display': 'inline-block',
    'marginRight': 12,
    'paddingRight': 12,
    'position': 'relative',
    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translate(50%, -50%)',
      width: 6,
      height: 6,
      backgroundColor: gray,
      borderRadius: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      'display': 'block',
      'marginRight': 0,
      'paddingRight': 0,
      '&:not(:last-child)::after': {
        display: 'none',
      },
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
  secondTitle: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(26),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
  },
  asideInfo: {
    position: 'sticky',
    top: 20,
    height: 450,
    borderRadius: 20,
    padding: '9px 12px',
    display: 'flex',
    alignItems: 'flex-end',
    backgroundImage: 'url(/images/vacancies/aside-null.png)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('sm')]: {
      height: 358,
      backgroundPosition: 'top',
    },
  },
  asideInfoInfo: {
    'cursor': 'pointer',
    'backgroundColor': '#fff',
    'borderRadius': 20,
    'padding': '24px 16px',
    'width': '100%',
    '& img': {
      marginBottom: theme.spacing(1.5),
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
  asideTitleNull: {
    fontFamily: 'inter-med',
    lineHeight: '150%',
  },
  logoList: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoListItem: {
    'flexBasis': '45%',
    'flexShrink': 0,
    '& img': {
      width: '100%',
      objectFit: 'contain',
      marginBottom: theme.spacing(1),
    },
  },
  img: {
    height: 75,
    maxWidth: 300,
  },
}));
