import makeStyles from '@mui/styles/makeStyles';

import { blueMain, gray } from 'styles/colorPalette';

const slickDotsStyle = makeStyles<any>((theme) => ({
  slickDots: {
    '& li:first-child': {
      display: 'none',
    },
    'padding': 0,
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'center',
    'margin': 0,
    'bottom': -50,
    '& li': {
      padding: theme.spacing(0.5),
    },
    '& li button': {
      cursor: 'pointer',
      border: 'none',
      backgroundColor: gray,
      width: 8,
      height: 8,
      borderRadius: '50%',
      fontSize: 0,
      display: 'inline-block',
      padding: 0,
    },
    '& li button:before': {
      display: 'none',
    },
    '& li.slick-active button': {
      backgroundColor: blueMain,
    },
  },
}));

export default slickDotsStyle;
