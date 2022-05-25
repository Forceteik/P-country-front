import { Box, Typography, LinearProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { midDarkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any, any>((theme) => ({
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  percentage: {
    textAlign: 'right',
    color: midDarkGray,
    fontSize: theme.typography.pxToRem(14),
  },
  colorPrimary: {
    backgroundColor: ({ bgColor }) => bgColor,
    borderRadius: 40,
    height: 8,
  },
  barColorPrimary: {
    backgroundColor: ({ color }) => color,
    borderRadius: 40,
  },
}));

const LineProgress = ({ progress, color, bgColor = '#F6F7FA', label = '0%', withoutLabel = false }) => {
  const classes = useStyles({ color, bgColor });

  return (
    <Box className={classes.progressContainer}>
      <Box width="100%" mr={withoutLabel ? 0 : 1}>
        <LinearProgress
          variant="determinate"
          value={progress}
          classes={{
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
        />
      </Box>
      {!withoutLabel && (
        <Box minWidth={35}>
          <Typography className={classes.percentage}>{label}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default LineProgress;
