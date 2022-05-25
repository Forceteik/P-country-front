import makeStyles from '@mui/styles/makeStyles';

import { darkGray, gray, midDarkGray } from 'styles/colorPalette';

const infoListStyle = makeStyles<any>((theme) => ({
  list: {
    // marginLeft: -12,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  listItems: {
    'display': 'inline-block',
    'position': 'relative',
    'marginBottom': theme.spacing(1.5),
    'marginRight': 12,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      marginLeft: 0,
      marginBottom: theme.spacing(1),
    },
    '&:not(:first-child)': {
      'paddingLeft': 12,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        left: -3,
        top: 12,
        transform: 'translateY(-50%)',
        width: 6,
        height: 6,
        backgroundColor: gray,
        borderRadius: '50%',
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
      marginRight: 0,
      paddingLeft: 0,
    },
  },
  infoItem: {
    fontSize: theme.typography.pxToRem(16),
  },
  infoItem_null: {
    color: midDarkGray,
    fontSize: theme.typography.pxToRem(16),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(0.5),
    },
  },
  infoItem_link: {
    cursor: 'pointer',
  },
  infoItem_label: {
    color: darkGray,
  },
}));

export default infoListStyle;
