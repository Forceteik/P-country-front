import makeStyles from '@mui/styles/makeStyles';

import { black, blueLight, darkGray, gray, greenWhite, orangeWhite, orangeMain } from 'styles/colorPalette';

const viewStyles = makeStyles<any>((theme) => ({
  content: {
    'marginBottom': theme.spacing(12.5),
    'marginTop': theme.spacing(6.3),
    '& .MuiListItem-root': {
      paddingBottom: 0,
      paddingTop: theme.spacing(0.2),
      paddingLeft: theme.spacing(1),
    },

    '& .MuiAccordion-root': {
      marginBottom: theme.spacing(2.5),
      borderRadius: 20,
      border: `1px solid ${gray}`,
      boxShadow: 'none',
    },
    '& .MuiAccordion-root:before': {
      display: 'none',
    },
    '& .MuiAccordionSummary-root': {
      padding: '0px 33px',
      [theme.breakpoints.down('sm')]: {
        padding: '0px 21px',
      },
    },
    '& .MuiAccordionSummary-content': {
      margin: '23px 0px',
      [theme.breakpoints.down('sm')]: {
        margin: '16px 0px',
      },
    },
    '& .MuiAccordion-root.Mui-expanded:last-child': {
      marginBottom: theme.spacing(2),
    },
    ' & .MuiAccordionDetails-root': {
      padding: '0px 32px 32px',
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        padding: '0px 21px 24px',
      },
    },

    '& .MuiButton-label': {
      textTransform: 'none',
      fontSize: theme.typography.pxToRem(18),
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(16),
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(6),
    },
  },
  left: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
      marginTop: theme.spacing(0),
    },
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(38),
    lineHeight: '110%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
    },
  },
  subtitle: {
    fontSize: theme.typography.pxToRem(18),
  },
  secondTitle: {
    fontFamily: 'inter-med',
  },
  text: {
    'color': darkGray,
    'fontSize': '1rem',
    'fontFamily': 'inter',
    'lineHeight': '162%',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
    'whiteSpace': 'pre-wrap',
  },
  timeBox: {
    display: 'flex',
    alignItems: 'center',
  },
  timeText: {
    marginTop: '1.5px',
    color: darkGray,
    marginLeft: theme.spacing(0.5),
    fontSize: theme.typography.pxToRem(14),
  },
  desc: {
    'color': darkGray,
    'fontSize': theme.typography.pxToRem(18),
    'lineHeight': '158%',
    '& $descItem:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
    '& p, & span': {
      color: darkGray,
      fontSize: theme.typography.pxToRem(18),
      lineHeight: '156%',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(16),
        lineHeight: '162%',
      },
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '162%',
    },
  },
  img: {
    maxWidth: '100%',
    objectFit: 'contain',
  },
  descItem: {},
  right: {
    'borderRadius': 24,
    'overflow': 'hidden',
    'height': 680,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  itemTitle: {
    fontSize: theme.typography.pxToRem(18),
    color: black,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  icon: {
    'width': 24,
    'height': 24,
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  detailsText: {
    color: darkGray,
    lineHeight: '162%',
  },
  expandIconButton: {
    transform: 'none !important',
  },
  doneTest: {
    '& .MuiButtonBase-root': {
      cursor: 'default !important',
    },

    '& .MuiAccordion-root': {
      backgroundColor: greenWhite,
      border: `1px solid ${greenWhite}`,
    },
    '& .MuiAccordionSummary-content': {
      flexDirection: 'column',
    },
  },
  header: {
    'display': 'flex',
    'width': '100%',
    'alignItems': 'center',
    'justifyContent': 'space-between',
    '& img': {
      objectFit: 'contain',
    },
  },
  bottom: {
    marginTop: 8,
  },
  notification: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    padding: '16px 24px 16px 16px',
    borderRadius: 20,
    backgroundColor: blueLight,
  },
  notificationText: {
    fontSize: theme.typography.pxToRem(14),
    marginLeft: theme.spacing(1),
  },
  instructionImg: {
    'overflow': 'hidden',
    'marginTop': theme.spacing(5.8),
    'height': 380,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  },
  instructionBottom: {
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column-reverse',
    },
  },
  skeletonCover: {
    objectFit: 'cover',
  },
  success: {
    backgroundColor: greenWhite,
    padding: '20px 32px',
    borderRadius: 20,
  },
  successHeader: {
    'display': 'flex',
    'alignItems': 'center',
    'marginBottom': 12,
    '& p': {
      marginLeft: 12,
      fontSize: theme.typography.pxToRem(18),
    },
  },
  successDescr: {
    'color': '#535C73',
    '& span': {
      color: '#23262F',
    },
  },
  badge: {
    'backgroundColor': orangeWhite,
    'padding': '7px 18px',
    'borderRadius': 60,
    'width': 'fit-content',
    '& p': {
      color: orangeMain,
      textTransform: 'uppercase',
      fontSize: theme.typography.pxToRem(12),
      fontFamily: 'inter-med',
      letterSpacing: '0.03em',
    },
  },
}));

export { viewStyles };
