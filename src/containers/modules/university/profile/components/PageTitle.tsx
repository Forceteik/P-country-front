import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles<any>((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    lineHeight: '11x0%',
  },
}));

const PageTitle = ({ text }) => {
  const classes = useStyles();
  return (
    <Typography component={'h1'} className={classes.title}>
      {text}
    </Typography>
  );
};

export default PageTitle;
