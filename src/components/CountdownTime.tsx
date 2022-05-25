import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

const useCountDownStyles = makeStyles<any, any>((theme) => ({
  root: {
    fontSize: theme.typography.pxToRem(16),
    color: ({ color }) => color,
    marginLeft: theme.spacing(1),
    cursor: 'default',
    width: ({ width }) => (width ? width : 'auto'),
  },
}));

const CountdownTime = ({ time, color, width = null }) => {
  const classes = useCountDownStyles({ color, width });
  return (
    <Typography component={'span'} className={classes.root}>
      {time}
    </Typography>
  );
};

export default CountdownTime;
