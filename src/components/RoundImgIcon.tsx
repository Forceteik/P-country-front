import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { ligthGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>(() => ({
  iconContainer: {
    'backgroundColor': ligthGray,
    'borderRadius': '50%',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'width': 52,
    'height': 52,
    'flexShrink': 0,
    '& img': {
      width: 28,
      height: 28,
    },
  },
}));

const RoundImgIcon = ({ imageSrc }) => {
  const classes = useStyles();
  return (
    <Box className={classes.iconContainer}>
      <img src={imageSrc} alt="" />
    </Box>
  );
};

export default RoundImgIcon;
