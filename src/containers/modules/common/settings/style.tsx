import makeStyles from '@mui/styles/makeStyles';

import { black, blueMain, darkGray, gray, greenMain, pinkMain } from 'styles/colorPalette';

const useSettingsStyle = makeStyles<any>((theme) => ({
  subheader: {
    marginTop: theme.spacing(7.7),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      '& .MuiFormControlLabel-root': {
        marginLeft: 0,
        marginRight: 0,
      },
      'marginTop': theme.spacing(4),
      'marginBottom': theme.spacing(3),
    },
  },
  errorMessage: {
    color: pinkMain,
    fontSize: theme.typography.pxToRem(14),
  },
  rightBox: {
    border: `1px solid ${gray}`,
    borderRadius: 20,
    padding: theme.spacing(5),
    marginBottom: theme.spacing(10),
  },
  title: {
    fontSize: theme.typography.pxToRem(38),
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
  },
  sectionTitle: {
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
  },
  subTitle: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-med',
  },
  textBox: {
    'marginBottom': theme.spacing(2),
    '& p': {
      color: darkGray,
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(14),
      },
    },
    '& span': {
      fontFamily: 'inter-med',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(14),
      },
    },
    '& ul': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    '& li': {
      paddingLeft: 0,
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  textBtn: {
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      '& p': {
        fontSize: theme.typography.pxToRem(12),
      },
    },
  },
  textInfo: {
    fontFamily: 'inter-med',
    [theme.breakpoints.down('sm')]: {
      display: 'inline-block',
    },
  },
  textBtnBlue: {
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    color: blueMain,
    [theme.breakpoints.down('sm')]: {
      '& p': {
        fontSize: theme.typography.pxToRem(12),
      },
    },
  },
  tabs: {
    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    '& .MuiTab-labelIcon .MuiTab-wrapper > *:first-child': {
      marginBottom: 0,
      marginRight: theme.spacing(2.5),
    },
    '& .MuiTab-root': {
      'padding': 0,
      'maxWidth': '100%',
      'textTransform': 'none',
      'fontWeight': 400,
      'fontFamily': 'inter-med',
      'fontSize': theme.typography.pxToRem(16),
      'flexDirection': 'row',
      'justifyContent': 'flex-start',
      'color': darkGray,
      '&.Mui-selected': {
        color: black,
        // '& svg path':{
        //   fill: black
        // }
      },
      '& svg': {
        marginRight: theme.spacing(2),
      },
    },
    '& .MuiTab-labelIcon': {
      minHeight: 55,
    },
    '& .MuiTabs-indicator': {
      display: 'none',
    },
  },
  disabilityCheckBox: {
    'paddingTop': '15px !important',
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
  textInput: {
    'position': 'relative',
    '& input': {
      paddingRight: theme.spacing(10),
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('sm')]: {
        paddingRight: 0,
      },
    },
    '&:hover': {
      '& $edit': {
        opacity: 1,
      },
    },
  },
  textArea: {
    '& textarea': {
      height: 'unset',
      paddingLeft: 12,
      paddingRight: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(1),
        fontSize: theme.typography.pxToRem(14),
        paddingTop: 0,
        paddingRight: theme.spacing(3.2),
      },
    },
  },
  edit: {
    'position': 'absolute',
    'cursor': 'pointer',
    'right': 42,
    'top': 54,
    'transform': 'translateY(-50%)',
    'opacity': 1,
    'transition': 'all 0.3s',
    '& svg path': {
      transition: 'all 0.3s',
    },
    '&:hover': {
      '& svg path': {
        stroke: black,
      },
    },
    [theme.breakpoints.down('sm')]: {
      right: 27,
      top: 41,
    },
  },
  switch: {
    width: 'fit-content',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  status: {
    'display': 'flex',
    'alignItems': 'center',
    '& p': {
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(12),
      },
    },
  },
  check: {
    '& p': {
      color: darkGray,
    },
  },
  success: {
    '& p': {
      color: greenMain,
    },
  },
  error: {
    '& p': {
      color: pinkMain,
    },
  },
  checkBox: {
    '& label': {
      marginRight: 0,
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    '& .MuiTypography-body1': {
      fontSize: theme.typography.pxToRem(18),
      lineHeight: '150%',
      marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      '& svg': {
        width: 24,
        height: 24,
      },
    },
  },
  accordion: {
    'boxShadow': 'none',
    '& .MuiAccordionSummary-root': {
      padding: 0,
    },
    '& .MuiAccordionDetails-root': {
      padding: 0,
      paddingTop: theme.spacing(1),
    },
    '& .MuiCollapse-wrapperInner': {
      marginBottom: theme.spacing(5),
    },
  },
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  titleIcon: {
    marginLeft: theme.spacing(2),
  },
  autoComplete: {
    [theme.breakpoints.down('sm')]: {
      '& .MuiOutlinedInput-root': {
        height: 52,
      },
    },
  },
  phone: {
    [theme.breakpoints.down('sm')]: {
      '& .flag-dropdown': {
        paddingLeft: `${theme.spacing(1.5)} !important`,
      },
      '& input': {
        padding: '0px 7px 0px 43px !important',
        height: '60px !important',
      },
    },
  },
  stepTwoHelperInfo: {
    color: darkGray,
  },
  stepTwoPhone: {
    color: 'black !important',
    fontFamily: 'inter-bold',
  },
  subtitle: {
    color: darkGray,
    marginTop: 18,
    fontSize: theme.typography.pxToRem(16),
  },
}));

export default useSettingsStyle;
