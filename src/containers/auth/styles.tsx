import makeStyles from '@mui/styles/makeStyles';

import { blueHover, blueLight, blueMain, darkGray, midDarkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  grid_container: {
    height: '100%',
    minHeight: 750,
    [theme.breakpoints.down('sm')]: {
      minHeight: 650,
    },
  },
  headerContainer: {
    'maxWidth': 520,
    'marginLeft': 'auto',
    'marginRight': 'auto',
    'padding': '50px 30px',
    '& img': {
      cursor: 'pointer',
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 600,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  leftContainer: {
    maxWidth: 520,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0px 30px',
    [theme.breakpoints.down('md')]: {
      maxWidth: 600,
      margin: '0 auto',
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      marginTop: theme.spacing(5),
      paddingTop: '12px',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  title: {
    fontSize: `${theme.typography.pxToRem(42)} !important`,
    fontFamily: 'inter-bold !important',
    lineHeight: '110% !important',
    [theme.breakpoints.down('sm')]: {
      fontSize: `${theme.typography.pxToRem(38)} !important`,
    },
  },
  switch: {
    width: 'fit-content',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  codeInputBox: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  title_restore: {
    marginBottom: '42px !important',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  title_sms: {
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      fontSize: theme.typography.pxToRem(38),
    },
  },
  subTitle: {
    color: darkGray,
    lineHeight: '150%',
  },
  restoreLink: {
    color: blueMain,
    cursor: 'pointer',
  },
  phone: {
    color: 'black !important',
    fontFamily: 'inter-bold',
  },
  button: {
    '& span': {
      fontSize: theme.typography.pxToRem(18),
    },
    'height': 70,
    'marginBottom': `24px !important`,
    'marginTop': `10px !important`,
    'borderRadius': 20,
    [theme.breakpoints.down('sm')]: {
      'padding': theme.spacing(2),
      'height': 52,
      'marginBottom': `20px !important`,
      'marginTop': `8px !important`,
      'borderRadius': 14,
      '& span': {
        fontSize: theme.typography.pxToRem(16),
      },
    },
  },
  btnApplicantBox: {
    marginBottom: `24px !important`,
  },
  restoreBtn: {
    marginBottom: `30px !important`,
  },
  buttonEmpl: {
    marginBottom: `16px !important`,
  },
  helperInfo: {
    'textAlign': 'center',
    '& a': {
      color: blueMain,
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
      },
    },
  },
  helperProfileInfo: {
    'textAlign': 'left',
    'marginTop': '8px !important',
    'marginBottom': '16px !important',
    '& a': {
      color: blueMain,
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        marginBottom: '0px !important',
      },
    },
    '& span:hover': {
      color: blueHover,
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginBottom: theme.spacing(1),
    },
  },
  resendLink: {
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginBottom: '8px !important',
    },
  },
  smsCounter: {
    marginLeft: theme.spacing(1),
    color: '#b3b3b3 !important',
  },
  rightContainer: {},
  socialIconsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  socialIcons: {
    'color': 'white',
    'fontSize': `${theme.typography.pxToRem(36)} !important`,
    'margin': `0 ${theme.spacing(2)}`,
    'cursor': 'pointer',
    'transition': 'all 0.3s !important',
    '&:hover': {
      transform: 'scale(1.1) !important',
    },
  },
  checkbox: {
    '& .MuiFormGroup-root': {
      marginLeft: 0,
      flexDirection: 'column',
    },
  },
  itemCheckbox: {
    'padding': theme.spacing(2),
    'borderRadius': 16,
    'border': '1px solid #E1E3E8',
    'marginBottom': theme.spacing(2),
    'marginRight': 0,
    '& .MuiFormControlLabel-label': {
      fontSize: theme.typography.pxToRem(18),
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(16),
      },
    },
  },
  itemCheckboxChecked: {
    'padding': theme.spacing(2),
    'borderRadius': 16,
    'backgroundColor': blueLight,
    'color': blueMain,
    'border': `1px solid ${blueLight}`,
    'marginBottom': theme.spacing(2),
    'marginRight': 0,
    '& .MuiFormControlLabel-label': {
      fontSize: theme.typography.pxToRem(18),
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(16),
      },
    },
  },
  companyContainer: {
    'display': 'flex',
    'marginLeft': theme.spacing(4),
    'marginBottom': theme.spacing(4),
    'alignItems': 'center',
    '& > p': {
      marginLeft: theme.spacing(1),
      fontSize: theme.typography.pxToRem(14),
      color: midDarkGray,
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  notAllowed: {
    cursor: 'not-allowed',
  },
  argeementText: {
    'color': darkGray,
    'fontSize': theme.typography.pxToRem(14),
    'paddingTop': theme.spacing(1),
    '& a': {
      color: blueMain,
      wordWrap: 'break-word',
    },
  },
}));

export default useStyles;
