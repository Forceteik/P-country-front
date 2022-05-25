import { Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { ligthGray } from 'styles/colorPalette';
import LineProgress from 'components/LineProgress';

const useStyles = makeStyles<any>((theme) => ({
  testResult: {
    borderRadius: 20,
    backgroundColor: ligthGray,
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 'unset',
    },
  },
  text: {
    flexGrow: 1,
    fontSize: theme.typography.pxToRem(14),
    marginBottom: theme.spacing(1),
  },
}));

const TestResult = ({ text, progress, color }) => {
  const classes = useStyles();
  return (
    <Box className={classes.testResult}>
      <Typography className={classes.text}>{text}</Typography>
      <LineProgress color={color} bgColor="#ffffff" progress={progress} label={`${progress}%`} />
    </Box>
  );
};

export default TestResult;
