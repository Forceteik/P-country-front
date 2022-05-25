import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import theme from 'styles/theme';
const useStyles = makeStyles<any, any>(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    padding: theme.spacing(0.5),
    paddingRight: theme.spacing(3),
    borderRadius: 30,
    width: 'fit-content',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      margin: `${theme.spacing(3)} auto`,
    },
  },
  text: {
    fontSize: 14,
    fontFamily: 'inter-bold',
    marginLeft: theme.spacing(0.5),
  },
}));

const Step = ({ number, backgroundColor }) => {
  const classes = useStyles({ backgroundColor });
  return (
    <Box className={classes.container}>
      <img src="/images/Frame%2034.svg" alt="" />
      <Typography className={classes.text}>ШАГ №{number}</Typography>
    </Box>
  );
};

export default Step;
