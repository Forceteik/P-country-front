import makeStyles from '@mui/styles/makeStyles';

import {
  black,
  blueMain,
  darkGray,
  gray,
  greenMain,
  ligthGray,
  midDarkGray,
  orangeMain,
  pinkMain,
} from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    'marginTop': theme.spacing(5.6),
    'marginBottom': theme.spacing(11),
    '& li': {
      'listStyleType': 'none',
      '& p': {
        margin: 0,
      },
    },
    '& ul': {
      padding: 0,
    },
  },
  accordionTitle: {
    fontSize: theme.typography.pxToRem(18),
  },
  row: {
    'marginBottom': theme.spacing(4),
    '& .MuiAccordion-root': {
      borderRadius: 20,
      padding: '11px 24px 11px 32px',
      border: `1px solid ${gray}`,
      boxShadow: 'none',
      [theme.breakpoints.down('md')]: {
        padding: '5px 16px 5px 22px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '5px 16px',
      },
    },
    '& .MuiAccordion-root.Mui-expanded': {
      border: `1px solid ${blueMain}`,
      padding: '24px 24px 32px 32px',
      [theme.breakpoints.down('sm')]: {
        padding: '14px 24px 24px 24px',
      },
    },
    '& .MuiAccordionSummary-root': {
      'padding': 0,
      '&.Mui-expanded': {
        minHeight: 'unset',
      },
    },
    '& .MuiAccordionSummary-content': {
      fontSize: theme.typography.pxToRem(18),
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      'margin': 0,
      'minHeight': 'unset',
      '& h3': {
        fontSize: theme.typography.pxToRem(26),
        fontFamily: 'inter-bold',
        [theme.breakpoints.down('md')]: {
          fontSize: theme.typography.pxToRem(22),
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.typography.pxToRem(18),
          lineHeight: '120%',
        },
      },
    },
    '& .MuiAccordionDetails-root': {
      marginTop: theme.spacing(3),
      display: 'block',
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(2.5),
      },
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2.5),
    },
  },
  accordionTitleExpanded: {
    display: 'none',
  },
  accordionTitleEmployer: {
    fontFamily: 'inter-med',
    fontSize: theme.typography.pxToRem(18),
    paddingRight: 10,
  },
  rowLider: {
    '& $accordionTitle': {
      fontFamily: 'inter-med',
    },
    'marginBottom': theme.spacing(4),
    '& .MuiAccordion-root.Mui-expanded $accordionTitleExpanded': {
      display: 'block',
    },
    '& .MuiAccordion-root.Mui-expanded $accordionTitle': {
      display: 'none',
    },
    '& .MuiAccordion-root': {
      borderRadius: 20,
      padding: '11px 24px 11px 32px',
      border: `1px solid ${gray}`,
      boxShadow: 'none',
      [theme.breakpoints.down('md')]: {
        padding: '5px 16px 5px 22px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '5px 16px',
      },
    },
    '& .MuiAccordion-root.Mui-expanded': {
      border: `1px solid ${blueMain}`,
      padding: '24px 24px 32px 32px',
      [theme.breakpoints.down('sm')]: {
        padding: '24px 16px',
      },
    },
    '& .MuiAccordionSummary-root': {
      'padding': 0,
      '&.Mui-expanded': {
        minHeight: 'unset',
      },
    },
    '& .MuiAccordionSummary-content': {
      fontSize: theme.typography.pxToRem(18),
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      'margin': 0,
      'minHeight': 'unset',
      '& h3': {
        fontSize: theme.typography.pxToRem(16),
        fontFamily: 'inter-bold',
        [theme.breakpoints.down('sm')]: {
          lineHeight: '120%',
        },
      },
    },
    '& .MuiAccordionDetails-root': {
      marginTop: 10,
      display: 'block',
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(2.5),
      },
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2.5),
    },
  },
  container: {
    flexGrow: 1,
  },
  mainContainer: {
    marginBottom: theme.spacing(11),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(5),
    },
  },
  content: {
    paddingTop: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3),
    },
  },
  accordionSummmary: {
    '& .MuiAccordionSummary-content': {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
    },
  },
  boxSummary: {
    border: `1px solid ${gray}`,
    borderRadius: 20,
    padding: '32px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '32px 16px',
    },
  },
  progress: {
    marginLeft: 0,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },
  },
  link: {
    marginBottom: theme.spacing(1.5),
    color: midDarkGray,
    fontSize: theme.typography.pxToRem(12),
    cursor: 'pointer',
  },
  linkText: {
    marginLeft: '5px',
    display: 'inline-block',
    fontSize: '12px',
  },
  subTitle: {
    color: darkGray,
    fontSize: theme.typography.pxToRem(16),
  },
  subTitleBold: {
    fontSize: theme.typography.pxToRem(32),
    color: black,
    fontFamily: 'inter-bold',
    lineHeight: '110%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
    },
  },
  title: {
    marginTop: theme.spacing(7.8),
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(2.5),
    },
  },
  titleTitle: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(32),
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
    },
  },
  titleImg: {
    width: 30,
    height: 30,
    [theme.breakpoints.down('sm')]: {
      width: 24,
      height: 24,
    },
  },
  titleDescr: {
    color: darkGray,
  },
  titleWithIcon: {
    'display': 'flex',
    'alignItems': 'center',
    'marginBottom': theme.spacing(1),
    '& img': {
      width: 24,
      height: 24,
    },
  },
  titleIcon: {
    marginLeft: theme.spacing(1),
    fontFamily: 'inter-med',
    lineHeight: '110%',
    fontSize: theme.typography.pxToRem(18),
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
  titleWithMark: {
    'fontFamily': 'inter-bold',
    'paddingLeft': theme.spacing(2),
    'position': 'relative',
    '&:before': {
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      content: '""',
      borderRadius: 23,
      width: 4,
      height: 24,
    },
  },
  littleTitleWithMark: {
    'paddingLeft': theme.spacing(1.5),
    'fontSize': theme.typography.pxToRem(12),
    'marginBottom': theme.spacing(0.5),
    'color': midDarkGray,
    'position': 'relative',
    '&:before': {
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      content: '""',
      borderRadius: 23,
      width: 4,
      height: 18,
    },
  },
  descrWithMark: {
    'paddingLeft': theme.spacing(1.5),
    'color': darkGray,
    'position': 'relative',
    'lineHeight': '150%',
    '&:before': {
      position: 'absolute',
      left: 0,
      top: 2.5,
      content: '""',
      borderRadius: 23,
      width: 4,
      height: 18,
    },
  },
  positiveTitle: {
    '&:before': {
      backgroundColor: greenMain,
    },
  },
  neutralTitle: {
    '&:before': {
      backgroundColor: orangeMain,
    },
  },
  negativeTitle: {
    '&:before': {
      backgroundColor: pinkMain,
    },
  },
  accordionDown: {
    display: 'flex',
    alignItems: 'center',
  },
  accordionDownTitle: {
    fontFamily: 'inter-med',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
      marginRight: theme.spacing(1.5),
    },
  },
  accordionDownIcon: {
    flexShrink: 0,
    transition: 'all 0.5s',
  },
  imgBox: {
    width: '100%',
    border: '1px solid #E1E3E8',
    borderRadius: 20,
    padding: 32,
  },
  abilityRow: {
    'marginBottom': theme.spacing(3.5),
    '& .MuiAccordion-root': {
      borderRadius: 20,
      padding: '32px 20px',
      border: `1px solid ${gray}`,
      boxShadow: 'none',
      [theme.breakpoints.down('sm')]: {
        padding: '24px 20px',
      },
    },
    '& .MuiAccordionSummary-root': {
      padding: 0,
    },
    '& .MuiAccordionSummary-content': {
      fontSize: theme.typography.pxToRem(18),
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      '& $accordionDownIcon': {
        transform: 'rotate(180deg)',
      },
      '& $accordionDown': {
        marginBottom: theme.spacing(2),
      },
    },
    '& .MuiAccordionDetails-root': {
      display: 'block',
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
    },
  },
  hallRow: {
    marginBottom: theme.spacing(4),
    border: `1px solid ${gray}`,
    borderRadius: 20,
    padding: '32px 24px 8px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: '26px 20px 8px 20px',
    },
  },
  hallTitle: {
    marginLeft: theme.spacing(1.5),
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
  },
  firstAbilityRow: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(7.5),
  },
  mainGrid: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
  block: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(7),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(4),
      },
    },
  },
  backgroundBlock: {
    backgroundColor: ligthGray,
    padding: '40px 26px 40px 34px',
    borderRadius: 20,
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      padding: '29px 23px 29px 21px',
    },
  },
  paragraph: {
    color: darkGray,
    lineHeight: '150%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      lineHeight: '140%',
      fontSize: theme.typography.pxToRem(14),
    },
  },
  blockTitle: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(26),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(22),
      marginBottom: theme.spacing(2.5),
    },
  },
  secondTitle: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(22),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(20),
      marginBottom: theme.spacing(1),
    },
  },
  role: {
    'marginBottom': theme.spacing(3),
    '& span': {
      textTransform: 'uppercase',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2.5),
    },
  },
  badge: {
    border: `1px solid ${gray}`,
    borderRadius: 20,
    padding: '28px 24px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '24px 20px',
    },
  },
  badgeTitle: {
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    color: greenMain,
    lineHeight: '110%',
  },
  textBadge: {
    marginLeft: theme.spacing(1),
    fontSize: theme.typography.pxToRem(12),
    color: blueMain,
  },
  textBadgeWithIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  progressBadge: {
    marginLeft: 0,
  },
  moto: {
    'backgroundColor': ligthGray,
    'borderRadius': 12,
    'padding': '7px 18px',
    'display': 'flex',
    'marginBottom': theme.spacing(3.5),
    '& img': {
      marginRight: theme.spacing(1),
      objectFit: 'contain',
    },
    [theme.breakpoints.down('md')]: {
      'alignItems': 'flex-start',
      '& img': {
        paddingTop: theme.spacing(0.5),
      },
    },
  },
  accentText: {
    'color': darkGray,
    'marginBottom': theme.spacing(2),
    '& span': {
      color: black,
    },
  },
  accentTextWithoutMargin: {
    'color': darkGray,
    '& span': {
      color: black,
    },
  },
  list: {
    'display': 'flex',
    'flexWrap': 'wrap',
    'alignItems': 'stretch',
    'justifyContent': 'space-between',
    // "marginBottom": theme.spacing(3),
    '& .MuiListSubheader-root': {
      flexBasis: '100%',
      paddingLeft: 0,
      color: black,
      fontSize: theme.typography.pxToRem(18),
      marginBottom: theme.spacing(1),
      lineHeight: '150%',
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
      },
    },
    '& li': {
      'color': darkGray,
      'marginBottom': theme.spacing(2),
      'padding': 0,
      'paddingLeft': theme.spacing(2),
      'position': 'relative',
      '&:before': {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        content: '""',
        borderRadius: 23,
        width: 4,
        height: 24,
      },
    },
    [theme.breakpoints.down('sm')]: {
      'marginBottom': theme.spacing(1),
      '& p': {
        fontSize: theme.typography.pxToRem(14),
      },
    },
  },
  topMark: {
    '& li:before': {
      top: '9%',
      transform: 'unset',
      [theme.breakpoints.down('sm')]: {
        top: 0,
        transform: 'translateY(50%)',
      },
    },
  },
  threeColumn: {
    '& li': {
      flexBasis: '33%',
      [theme.breakpoints.down('lg')]: {
        flexBasis: '48%',
      },
      [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
      },
    },
  },
  twoColumn: {
    '& li': {
      flexBasis: '48%',
      [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
      },
    },
  },
  positiveList: {
    '& li': {
      '&:before': {
        backgroundColor: greenMain,
      },
    },
  },
  negativeList: {
    '& li': {
      '&:before': {
        backgroundColor: pinkMain,
      },
    },
  },
  textWithTitle: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3),
      },
    },
  },
  text: {
    color: darkGray,
  },
  motivationInfo: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('md')]: {
        marginBottom: 0,
      },
    },
  },
  motivationInfoBox: {
    borderRadius: 20,
    padding: theme.spacing(3),
    border: `1px solid ${gray}`,
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  motivationInfoText: {
    'fontFamily': 'inter-med',
    'fontSize': theme.typography.pxToRem(18),
    'lineHeight': '150%',
    'color': darkGray,
    'marginBottom': theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '140%',
    },
    '& span': {
      color: black,
      fontFamily: 'inter-med',
      fontSize: theme.typography.pxToRem(18),
      lineHeight: '150%',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(16),
        lineHeight: '140%',
      },
    },
  },
  height: {
    height: '100%',
  },
  progressText: {
    lineHeight: '110%',
    fontSize: theme.typography.pxToRem(14),
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      textAlign: 'left',
    },
  },
  strong: {
    color: black,
    fontFamily: 'inter-med',
    fontSize: theme.typography.pxToRem(18),
  },
  indicatorDesc: {
    marginBottom: theme.spacing(4),
    whiteSpace: 'pre-wrap',
  },
  socialDescr: {
    color: darkGray,
    marginBottom: theme.spacing(3),
  },
  competencyBox: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  competencyItem: {
    'backgroundColor': '#F6F7FA',
    'borderRadius': 60,
    'padding': '10px 18px',
    'marginRight': 12,
    'marginBottom': 12,
    '& p': {
      textTransform: 'uppercase',
      fontSize: theme.typography.pxToRem(12),
      letterSpacing: '0.03em',
      color: '#535C73',
      fontFamily: 'inter-med',
    },
  },
}));

export default useStyles;
