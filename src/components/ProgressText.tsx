import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { gray, greenMain, orangeMain, pinkMain } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  compatibilityNum: {
    'fontFamily': 'inter-bold',
    'lineHeight': '180%',
    '& span': {
      fontSize: theme.typography.pxToRem(8),
      color: gray,
      lineHeight: '180%',
      fontFamily: 'inter',
    },
  },
}));

const ProgressText = ({ progress }) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.compatibilityNum}
      color={progress <= 30 ? pinkMain : progress > 80 ? greenMain : orangeMain}
    >
      {progress}
      <Typography component={'span'}> %</Typography>
    </Typography>
  );
};

export default ProgressText;
