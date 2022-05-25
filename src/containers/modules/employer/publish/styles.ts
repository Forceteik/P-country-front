import makeStyles from '@mui/styles/makeStyles';

import { black, blueLight, blueMain, darkGray, white } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  box: {
    maxWidth: 810,
    width: '100%',
    backgroundColor: blueLight,
    padding: '48px 40px',
    borderRadius: 20,
    margin: '62px auto 50px auto',
    background: 'url(/images/icons/lightbulb.png) no-repeat calc(100% - 20px) 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '30px 20px',
      margin: '50px auto',
      backgroundImage: 'none',
    },
  },
  heading: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(24),
    color: black,
    lineHeight: 1.2,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  available: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  availableText: {
    fontFamily: 'inter-med',
    fontSize: theme.typography.pxToRem(16),
  },
  vacanciesBox: {
    backgroundColor: blueMain,
    borderRadius: 8,
    padding: '8px 12px',
  },
  vacanciesText: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(22),
    color: white,
  },
  description: {
    fontSize: theme.typography.pxToRem(14),
    color: darkGray,
    marginTop: 16,
  },
  actionBox: {
    marginTop: 40,
    display: 'grid',
    gap: 15,
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
      gap: 30,
    },
  },
  secondaryButton: {
    'backgroundColor': blueLight,
    '&:hover': {
      backgroundColor: blueLight,
    },
  },
  button: {
    width: '100%',
  },
}));

export default useStyles;
