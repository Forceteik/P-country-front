import { Box, CircularProgress, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import {
  orangeMain,
  pinkMain,
  greenMain,
  ligthGray,
  gray,
  orangeWhite,
  pinkWhite,
  greenWhite,
} from 'styles/colorPalette';

const useStyles = makeStyles<any, any>((theme) => ({
  circularPercentage: {
    fontFamily: 'inter-bold',
    fontSize: ({ small }) => (small ? theme.typography.pxToRem(12) : theme.typography.pxToRem(18)),
    color: ({ color }) => color,
  },
  circularBox: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  colorPrimary: {
    color: ({ color }) => color,
  },
  text_box: {
    top: 1,
    left: ({ small }) => (small ? 2 : 8),
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xl')]: {
      top: 2,
      left: 6,
    },
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

const useVacancyStyle = makeStyles<any, any>((theme) => ({
  circularPercentage: {
    'fontFamily': 'inter-bold',
    'fontSize': theme.typography.pxToRem(18),
    'color': ({ color }) => color,
    '& span': {
      fontSize: theme.typography.pxToRem(8),
      color: gray,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  circularBox: {
    position: 'relative',
    width: ({ size }) => size + 2,
    height: ({ size }) => size + 2,
  },
  top: {
    position: 'absolute',
    right: 1,
  },
  bottom: {
    position: 'absolute',
    right: 1,
  },
  colorPrimary: {
    color: ({ color }) => color,
  },
  colorBg: {
    color: ligthGray,
  },
  text_box: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-47%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      transform: 'translate(-47%, -54%)',
    },
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

/**
 * todo: Переименовать просто на CircularProgress
 * @param progress
 * @param size
 * @param small
 * @constructor
 */
const CustomCircularProgress = ({ progress, size, small = false }) => {
  const color = progress <= 30 ? pinkMain : progress > 80 ? greenMain : orangeMain;
  const classes = useStyles({ color, small });

  return (
    <Box className={classes.circularBox}>
      <CircularProgress
        variant="determinate"
        value={progress}
        size={size}
        classes={{
          colorPrimary: classes.colorPrimary,
          circle: classes.circle,
        }}
      />
      <Box className={classes.text_box}>
        <Typography variant="caption" component="div" className={classes.circularPercentage}>{`${Math.round(
          progress,
        )}%`}</Typography>{' '}
      </Box>
    </Box>
  );
};

export const VacancyCircularProgress = ({ progress, size = 62 }) => {
  const color = progress <= 30 ? pinkMain : progress > 80 ? greenMain : orangeMain;
  const classes = useVacancyStyle({ color, size });

  return (
    <Box className={classes.circularBox}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        className={classes.bottom}
        classes={{
          colorPrimary: classes.colorBg,
          circle: classes.circle,
        }}
      />
      <CircularProgress
        variant="determinate"
        value={progress}
        size={size}
        className={classes.top}
        classes={{
          colorPrimary: classes.colorPrimary,
          circle: classes.circle,
        }}
      />
      <Box className={classes.text_box}>
        <Typography variant="caption" component="div" className={classes.circularPercentage}>
          {`${Math.round(progress)}`}
          <Typography component="span"> %</Typography>
        </Typography>
      </Box>
    </Box>
  );
};

const useBgStyle = makeStyles<any, any>((theme) => ({
  circularPercentage: {
    'fontFamily': 'inter-bold',
    'fontSize': theme.typography.pxToRem(18),
    'color': ({ color }) => color,
    '& span': {
      fontSize: theme.typography.pxToRem(8),
      color: gray,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  circularBox: {
    position: 'relative',
    width: ({ size }) => size + 2,
    height: ({ size }) => size + 2,
  },
  top: {
    position: 'absolute',
    right: 1,
  },
  bottom: {
    position: 'absolute',
    right: 1,
  },
  colorPrimary: {
    color: ({ color }) => color,
  },
  colorBg: {
    color: ({ bgColor }) => bgColor,
  },
  text_box: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-47%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      transform: 'translate(-48%, -50%)',
    },
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

export const BgCircularProgress = ({ progress, size = 100 }) => {
  const color = progress <= 30 ? pinkMain : progress > 80 ? greenMain : orangeMain;
  const bgColor = progress <= 30 ? pinkWhite : progress > 80 ? greenWhite : orangeWhite;
  const classes = useBgStyle({ color, bgColor, size });

  return (
    <Box className={classes.circularBox}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        className={classes.bottom}
        classes={{
          colorPrimary: classes.colorBg,
          circle: classes.circle,
        }}
      />
      <CircularProgress
        variant="determinate"
        value={progress}
        size={size}
        className={classes.top}
        classes={{
          colorPrimary: classes.colorPrimary,
          circle: classes.circle,
        }}
      />
      <Box className={classes.text_box}>
        <Typography variant="caption" component="div" className={classes.circularPercentage}>
          {`${Math.round(progress)}`}%
        </Typography>
      </Box>
    </Box>
  );
};

const useCircularProgressImgStyle = makeStyles<any, any>((theme) => ({
  circularPercentage: {
    'fontFamily': 'inter-bold',
    'fontSize': theme.typography.pxToRem(18),
    'color': ({ color }) => color,
    '& span': {
      fontSize: theme.typography.pxToRem(8),
      color: gray,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  circularBox: {
    position: 'relative',
    width: 82,
    height: 82,
  },
  top: {
    position: 'absolute',
    right: 1,
  },
  bottom: {
    position: 'absolute',
    right: -0.9,
    top: -1.4,
  },
  colorPrimary: {
    color: ({ color }) => color,
  },
  colorBg: {
    color: '#edf1f7',
  },
  img: {
    'top': '50%',
    'left': '50%',
    'position': 'absolute',
    'transform': 'translate(-46%, -55%)',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'borderRadius': 50,
    'overflow': 'hidden',
    'width': 52,
    'height': 52,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    },
    // [theme.breakpoints.down('md')]: {
    //   transform: 'translate(-48%, -50%)',
    // },
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

export const CircularProgressWithImg = ({ progress, imgSrc }) => {
  const color = progress <= 30 ? pinkMain : progress > 80 ? greenMain : orangeMain;
  const classes = useCircularProgressImgStyle({ color });

  return (
    <Box className={classes.circularBox}>
      <img src="/images/icons/bgCircle.svg" className={classes.bottom} />
      <CircularProgress
        variant="determinate"
        value={progress}
        size={77}
        thickness={3.2}
        className={classes.top}
        classes={{
          colorPrimary: classes.colorPrimary,
          circle: classes.circle,
        }}
      />
      <Box className={classes.img}>
        <img src={imgSrc} />
      </Box>
    </Box>
  );
};

export default CustomCircularProgress;
