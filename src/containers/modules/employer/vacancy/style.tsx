import makeStyles from '@mui/styles/makeStyles';

import { black, blueLight, blueMain, darkGray, gray, ligthGray, midDarkGray, red } from 'styles/colorPalette';

const useVacancyStyles = makeStyles<any>((theme) => ({
  mainBox: {
    margin: '64px 0px 90px 0px',
  },
  mainTitle: {
    fontSize: theme.typography.pxToRem(38),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(32),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
    },
  },
  blockTitle: {
    'fontSize': theme.typography.pxToRem(26),
    'fontFamily': 'inter-bold',
    'lineHeight': '110%',
    '& span': {
      color: red,
      fontSize: theme.typography.pxToRem(26),
      fontFamily: 'inter-bold',
      lineHeight: '110%',
    },
    [theme.breakpoints.down('md')]: {
      'fontSize': theme.typography.pxToRem(22),
      '& span': {
        fontSize: theme.typography.pxToRem(22),
      },
    },
    [theme.breakpoints.down('sm')]: {
      'fontSize': theme.typography.pxToRem(18),
      '& span': {
        fontSize: theme.typography.pxToRem(18),
      },
    },
  },
  titleSpan: {
    color: darkGray,
    fontSize: theme.typography.pxToRem(18),
    lineHeight: '180%',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      fontSize: theme.typography.pxToRem(14),
    },
  },
  addProfSkill: {
    marginLeft: theme.spacing(2),
    cursor: 'pointer',
  },
  notification: {
    backgroundColor: blueLight,
    borderRadius: 20,
    padding: '20px 20px 20px 26px',
    [theme.breakpoints.down('sm')]: {
      'padding': '30px 20px 30px 20px',
      '& .MuiGrid-container': {
        flexDirection: 'column-reverse',
      },
    },
  },
  notificationTitle: {
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('sm')]: {
      // textAlign: "left",
      marginBottom: theme.spacing(1),
    },
  },
  notificationText: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '150%',
    [theme.breakpoints.down('sm')]: {
      // textAlign: "left",
    },
  },
  descr: {
    'color': darkGray,
    '& b': {
      fontWeight: 700,
      color: black,
    },
  },
  checkBox: {
    '& .MuiTypography-root': {
      color: midDarkGray,
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(14),
      },
    },
    [theme.breakpoints.down('sm')]: {
      '& svg': {
        width: 24,
        height: 24,
      },
    },
  },
  disabilityCheckBox: {
    '& .MuiTypography-root': {
      color: black,
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(14),
      },
    },
    [theme.breakpoints.down('sm')]: {
      '& svg': {
        width: 24,
        height: 24,
      },
    },
  },
  gridInput: {
    '& input': {
      [theme.breakpoints.down('sm')]: {
        height: '35px !important',
      },
    },
  },
  skills: {
    [theme.breakpoints.down('sm')]: {
      '& .MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
        paddingRight: '0px !important',
      },
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
}));

const useProgressStyles = makeStyles<any>((theme) => ({
  wrapper: {
    position: 'sticky',
    top: 30,
  },
  root: {
    border: `1px solid ${gray}`,
    borderRadius: 20,
    padding: '32px 24px 0px 24px',
    marginTop: theme.spacing(5.6),
    // marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
  },
  title: {
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.typography.pxToRem(20),
      lineHeight: '120%',
      marginRight: theme.spacing(1),
    },
  },
  progress: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-bold',
    color: blueMain,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(6.6),
  },
  firstCircle: {
    'width': 30,
    'height': 30,
    'borderRadius': '50%',
    'backgroundColor': ligthGray,
    'marginRight': theme.spacing(1.5),
    'position': 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 16,
      height: 16,
      transform: 'translate(-50%, -50%)',
      backgroundColor: blueMain,
      borderRadius: '50%',
    },
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: ligthGray,
    marginRight: theme.spacing(1.5),
    position: 'relative',
  },
  circleActive: {
    'width': 30,
    'height': 30,
    'borderRadius': '50%',
    'marginRight': theme.spacing(1.5),
    'position': 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: blueMain,
      borderRadius: '50%',
    },
  },
  label: {
    fontSize: theme.typography.pxToRem(14),
    color: midDarkGray,
  },
  labelActive: {
    fontSize: theme.typography.pxToRem(14),
    color: blueMain,
  },
  progressItem: {
    'position': 'relative',
    'paddingLeft': theme.spacing(3.5),
    'paddingBottom': theme.spacing(3),
    '& div': {
      position: 'absolute',
      width: 18,
      height: 18,
      left: 0,
      borderRadius: '50%',
      boxShadow: '-1px 0px 16px -1px rgb(163 175 192 / 45%)',
      backgroundColor: '#fff',
    },
    '& span': {
      fontFamily: 'inter-med',
      fontSize: theme.typography.pxToRem(14),
      cursor: 'pointer',
    },
  },
  progressCurrent: {
    '& div': {
      '&:before': {
        position: 'absolute',
        content: "''",
        height: 8,
        width: 8,
        backgroundColor: blueMain,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
      },
    },
  },
  progressValid: {
    '& div': {
      backgroundColor: blueMain,
      backgroundImage: 'url(/images/icons/check.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    '& span': {
      'cursor': 'pointer',
      'transition': 'all 0.5s',
      '&:hover': {
        color: blueMain,
      },
    },
  },
  progressBlocked: {
    '& div': {
      backgroundColor: blueMain,
      backgroundImage: 'url(/images/icons/check.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    '& span': {
      color: 'gray',
      cursor: 'not-allowed',
      transition: 'all 0.5s',
    },
  },
  stepNumber: {
    fontSize: theme.typography.pxToRem(14),
    color: midDarkGray,
    marginBottom: theme.spacing(0.5),
  },
  progressStep: {
    'position': 'relative',
    '&::before': {
      position: 'absolute',
      content: "''",
      height: '100%',
      width: 4,
      backgroundColor: blueLight,
      left: 6,
    },
  },
  progressDefault: {
    '& div': {
      '&:before': {
        position: 'absolute',
        content: "''",
        height: 8,
        width: 8,
        backgroundColor: blueLight,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
      },
    },
    '& span': {
      color: midDarkGray,
    },
  },
}));

export { useProgressStyles };

export default useVacancyStyles;
