import DefaultBadge from '@mui/material/Badge';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles<any, any>((theme) => ({
  root: {
    '& .MuiBadge-anchorOriginTopRightRectangular': {
      transform: 'none',
      transformOrigin: 'unset',
    },
  },
  badge: {
    display: ({ badgeContent }) => (badgeContent === '+0' ? 'none' : 'block'),
    borderRadius: 4,
    color: 'white !important',
    right: -5,
    top: 6,
    position: 'relative',

    lineHeight: '20px',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      right: 'unset',
      left: 110,
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
}));

const Badge = (props) => {
  const badgeContent = props.badgeContent;
  const classes = useStyles({ badgeContent });
  const { ...other } = props;
  return <DefaultBadge color="primary" overlap={'rectangle'} classes={classes} {...other} />;
};

export default Badge;
