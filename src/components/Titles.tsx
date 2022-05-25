import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles<any>((theme) => ({
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(26),
    lineHeight: '110%',
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
}));

export const ProfileTitle = ({ title }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.title} component="h3">
      {title}
    </Typography>
  );
};
