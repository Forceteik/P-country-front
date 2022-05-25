import makeStyles from '@mui/styles/makeStyles';

import { black, blueMain, darkGray } from 'styles/colorPalette';

const headerStyle = makeStyles<any>((theme) => ({
  header: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(3),
  },
  menu: {
    '& ul': {
      display: 'flex',
      flexWrap: 'wrap',
    },
    '& li': {
      'marginRight': theme.spacing(3.5),
      'cursor': 'pointer',
      'textAlign': 'left',
      'paddingTop': 0,
      'paddingBottom': 0,
      'paddingLeft': 0,
      'width': 'unset',
      '&:hover': {
        '& span': {
          color: black,
        },
      },
    },
    '& .MuiListItem-gutters': {
      paddingRight: 0,
    },
    '& span': {
      transition: 'all 0.3s',
      whiteSpace: 'nowrap',
      color: darkGray,
    },
  },
  active: {
    'flexWrap': 'nowrap',
    'alignItems': 'flex-end',
    'display': 'flex',
    '& .MuiListItemText-secondary': {
      color: blueMain,
      marginLeft: theme.spacing(0.5),
    },
    '& span': {
      color: black,
    },
  },
  notActive: {
    'flexWrap': 'nowrap',
    'alignItems': 'flex-end',
    'display': 'flex',
    '& .MuiListItemText-secondary': {
      color: blueMain,
      marginLeft: theme.spacing(0.5),
    },
    '& span': {
      color: darkGray,
    },
  },
  logo: {
    marginBottom: 3,
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
}));

export default headerStyle;
