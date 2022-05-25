import { Box, CircularProgress, Backdrop, LinearProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { ligthGray } from 'styles/colorPalette';

const useOverlayLoaderStyles = makeStyles<any>(() => ({
  root: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  boxLoader: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: ligthGray,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxLoaderWhite: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
export const OverlayLoader = () => {
  const classes = useOverlayLoaderStyles();
  return (
    <Box className={classes.root}>
      <CircularProgress disableShrink />
    </Box>
  );
};

export const OverlayGrayLoader = () => {
  const classes = useOverlayLoaderStyles();
  return (
    <Box className={classes.boxLoader}>
      <CircularProgress disableShrink />
    </Box>
  );
};

export const OverlayBoxLoader = () => {
  const classes = useOverlayLoaderStyles();
  return (
    <Box className={classes.boxLoaderWhite}>
      <CircularProgress disableShrink />
    </Box>
  );
};

const useBackdropLoaderStyles = makeStyles<any>((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const BackdropLoader = ({ isOpen }) => {
  const classes = useBackdropLoaderStyles();
  // приходится полностью избаляться от контейнера изза этого кенса
  // https://www.notion.so/preontech/Safari-a2e3b38896434806a44c65c01c53b923
  if (!isOpen) {
    return null;
  }
  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const useLinearLoaderStyles = makeStyles<any>(() => ({
  box: {
    width: '100%',
    position: 'absolute',
    zIndex: 9999,
  },
}));

export const LinearLoader = ({ progress }) => {
  const classes = useLinearLoaderStyles();

  return (
    <Box className={classes.box}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};
