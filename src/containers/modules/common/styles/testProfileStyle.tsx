import makeStyles from '@mui/styles/makeStyles';

import { blueMain, gray } from 'styles/colorPalette';

const testProfileStyle = makeStyles<any, any>((theme) => ({
  flexGrow: {
    flexGrow: 1,
  },
  gridContainer: {
    display: 'flex',
    border: ({ report }) => (report ? 'none' : '1px solid #E1E3E8'),
    borderRadius: ({ report }) => (report ? 'none' : 20),
    borderLeft: ({ report }) => (report ? 'none' : '1px solid #E1E3E8'),
    overflow: 'hidden',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      borderLeft: ({ report }) => (report ? 'none' : '1px solid #E1E3E8'),
      borderTop: ({ report }) => (report ? '1px solid #E1E3E8' : '1px solid #E1E3E8'),
      borderBottom: '1px solid #E1E3E8',
    },
  },
  paddingLeftTest: {
    display: 'flex',
    height: '100%',
    padding: ({ report }) => (report ? theme.spacing(3) : '25px 35px 25px 25px'),
    [theme.breakpoints.down('lg')]: {
      padding: ({ report }) => (report ? theme.spacing(2) : theme.spacing(3)),
    },
    [theme.breakpoints.down('sm')]: {
      padding: ({ report }) => (report ? '24px 16px 24px 16px' : theme.spacing(2)),
    },
  },
  padding: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2.5),
    },
  },
  titleTest: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-med',
  },
  nullImgBox: {
    'position': 'relative',
    'width': '100%',
    'height': '100%',
    'minHeight': 300,
    'maxHeight': 400,
    'borderRadius': 20,
    'overflow': 'hidden',
    'border': `1px solid ${gray}`,
    '& img': {
      width: '100%',
      height: '100%',
      minHeight: 300,
      [theme.breakpoints.down('md')]: {
        width: 'unset',
        objectFit: 'contain',
      },
    },
  },
  nullTitle: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-med',
    marginBottom: theme.spacing(1.5),
  },
  nullText: {
    color: '#535C73',
    lineHeight: '150%',
    marginBottom: theme.spacing(2),
  },
  nullInfo: {
    width: '80%',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  nullBtnWidth: {
    width: '18%',
    margin: '0px auto',
    [theme.breakpoints.down('lg')]: {
      width: '28%',
    },
    [theme.breakpoints.down('md')]: {
      width: '55%',
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  progressName: {
    textAlign: 'left',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: theme.typography.pxToRem(14),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  undoneBox: {
    borderTop: `1px solid ${gray}`,
    position: 'relative',
    backgroundImage: 'url(/images/tests/bg-blur/testUndone.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '100%',
    height: 135,
  },
  undoneInfo: {
    position: 'absolute',
    padding: '22px 30px',
    paddingTop: '7%',
    textAlign: 'center',
    zIndex: 10,
    width: '80%',
    left: '50%',
    transform: 'translate(-50%)',
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(1),
      top: '60%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  undoneInfoLink: {
    cursor: 'pointer',
    color: blueMain,
  },
}));

export default testProfileStyle;
