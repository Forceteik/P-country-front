import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LinearProgress from '@mui/material/LinearProgress';

const useLineStyles = makeStyles<any, any>(() => ({
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  colorPrimary: {
    backgroundColor: '#fff',
    borderRadius: 40,
    height: 8,
  },
  barColorPrimary: {
    backgroundColor: ({ color }) => color,
    borderRadius: 40,
  },
}));

const ActivityLineProgress = ({ progress, color }) => {
  const classes = useLineStyles({ color });
  return (
    <Box className={classes.progressContainer}>
      <Box width="100%">
        <LinearProgress
          variant="determinate"
          value={progress}
          classes={{
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
        />
      </Box>
    </Box>
  );
};

export default ActivityLineProgress;
