import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { blueLight } from 'styles/colorPalette';

const useStyles = makeStyles<any, any>(() => ({
  avatar: {
    'width': ({ radius }) => radius,
    'height': ({ radius }) => radius,
    'borderRadius': '50%',
    'backgroundColor': blueLight,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    '& img': {
      width: '80%',
      height: '80%',
      objectFit: 'contain',
    },
  },
}));

const Avatar = ({ src, radius = 64 }) => {
  const classes = useStyles({ radius });
  return (
    <Box className={classes.avatar}>
      <img src={src} />
    </Box>
  );
};

export default Avatar;
