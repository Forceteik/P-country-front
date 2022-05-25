import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles<any>((theme) => ({
  container: {
    maxWidth: 1190,
    margin: '0px auto',
    padding: '0px 40px',
    [theme.breakpoints.down('md')]: {
      padding: '0px 24px',
    },
  },
}));

const Container = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.container}>{children}</Box>;
};

export default Container;
