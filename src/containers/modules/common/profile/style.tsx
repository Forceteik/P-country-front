import makeStyles from '@mui/styles/makeStyles';

import { midDarkGray } from 'styles/colorPalette';

const profileStyle = makeStyles<any>((theme) => ({
  box: {
    '& .MuiAccordion-root': {
      padding: 0,
      boxShadow: 'none',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
    },
    '& .MuiAccordionSummary-root': {
      paddingLeft: 0,
    },
    '& .MuiAccordionSummary-content': {
      'margin': 0,
      '& h3': {
        fontSize: theme.typography.pxToRem(26),
        fontFamily: 'inter-bold',
        [theme.breakpoints.down('md')]: {
          fontSize: theme.typography.pxToRem(22),
        },
      },
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      '& h3': {
        fontSize: theme.typography.pxToRem(26),
        fontFamily: 'inter-bold',
        [theme.breakpoints.down('md')]: {
          fontSize: theme.typography.pxToRem(22),
        },
      },
    },
    '& .MuiAccordionDetails-root': {
      display: 'block',
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  selectRoot: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  inputRoot: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
  },
  blockTitleAbout: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(26),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  checkboxRoot: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  sticky: {
    position: 'sticky',
    top: 20,
  },
  desc_null: {
    color: midDarkGray,
    whiteSpace: 'pre-line',
  },
}));

export default profileStyle;
