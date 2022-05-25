import { makeStyles } from '@mui/styles';

export const useMainContentStyles = makeStyles<any>((theme) => ({
  header: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(22),
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(0),
      paddingLeft: theme.spacing(0),
      fontSize: theme.typography.pxToRem(18),
    },
  },
  wrapper: {
    borderRadius: 20,
    border: '1px solid #E1E3E8',
    marginTop: theme.spacing(2),
  },
  rootItem: {
    'display': 'flex',
    'flexDirection': 'column',
    'padding': '26px 45px 24px 32px',
    '&:not(:last-child)': {
      borderBottom: '1px solid #E1E3E8',
    },
    [theme.breakpoints.down('sm')]: {
      border: '1px solid #E1E3E8',
      borderRadius: 20,
      padding: '24px 16px',
      margin: '24px 16px 0px 16px',
    },
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: '1rem',
  },
  accordionRoot: {
    '&:before': {
      height: 0,
    },
  },
  accordionDetails: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  accordionSummmary: {
    'padding': 0,
    '& .MuiAccordionSummary-content': {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
    },
  },
  accordionDownTitle: {
    fontFamily: 'inter-med',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  tabsRoot: {
    'flexGrow': 1,
    'width': '100%',
    '& .MuiTab-wrapper': {
      textTransform: 'capitalize',
      fontSize: theme.typography.pxToRem(16),
      fontFamily: 'inter-med',
    },
    '& .MuiTab-root': {
      'padding': 0,
      [theme.breakpoints.down('sm')]: {
        '&:first-child': {
          marginLeft: theme.spacing(2),
        },
      },

      '&:not(:last-child)': {
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
          marginRight: theme.spacing(7),
        },
      },
    },
    '& .MuiTabScrollButton-root': {
      width: 15,
    },
  },
}));
