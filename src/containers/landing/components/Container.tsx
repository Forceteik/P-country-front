import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles<any, any>((theme) => ({
  container: {
    maxWidth: 1280,
    margin: '0px auto',
    padding: ({ withoutPadding }) => (withoutPadding ? '0px' : '0px 40px'),
    [theme.breakpoints.down('md')]: {
      padding: ({ withoutPadding }) => (withoutPadding ? '0px' : '0px 24px'),
    },
    [theme.breakpoints.down('sm')]: {
      padding: ({ withoutPadding }) => (withoutPadding ? '0px' : '0px 16px'),
    },
  },
}));

const Container = ({ children, withoutPadding = false }) => {
  const classes = useStyles({ withoutPadding });
  return <Box className={classes.container}>{children}</Box>;
};

export default Container;
