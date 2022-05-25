import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Danger from 'components/icons/Danger';
import { blueLight, darkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  danger: {
    'backgroundColor': blueLight,
    'borderRadius': 20,
    'padding': 19,
    'display': 'flex',
    'alignItems': 'flex-start',
    '& svg': {
      flexShrink: 0,
      marginTop: theme.spacing(0.2),
    },
  },
  dangerText: {
    color: darkGray,
    fontFamily: 'inter-med',
    marginLeft: theme.spacing(1.1),
    textAlign: 'left',
  },
}));

const DangerBlock = ({ text }) => {
  const classes = useStyles();
  return (
    <Box className={classes.danger}>
      <Danger />
      <Typography className={classes.dangerText}>{text}</Typography>
    </Box>
  );
};

export default DangerBlock;
