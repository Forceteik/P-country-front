import { useRouter } from 'next/router';

import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueMain, darkGray, ligthGray } from 'styles/colorPalette';

const useStyles = makeStyles<any, any>((theme) => ({
  switchBox: {
    display: 'flex',
    backgroundColor: ligthGray,
    width: 'fit-content',
    borderRadius: 14,
    alignItems: 'center',
    padding: 6,
    [theme.breakpoints.down('md')]: {
      padding: 5,
    },
    [theme.breakpoints.down('sm')]: {
      width: ({ fullWidth }) => (fullWidth ? '100%' : 'fit-content'),
    },
  },
  switchItem: {
    fontSize: theme.typography.pxToRem(16),
    textAlign: 'center',
    fontFamily: 'inter-med',
    color: darkGray,
    padding: '10px 28px',
    cursor: 'pointer',
    borderRadius: 10,
    [theme.breakpoints.down('md')]: {
      padding: '10px 14px',
      fontSize: ({ fullWidth }) => (fullWidth ? theme.typography.pxToRem(16) : theme.typography.pxToRem(12)),
      flexBasis: 'unset',
      flexGrow: 1,
    },
  },
  activeItem: {
    fontSize: theme.typography.pxToRem(16),
    textAlign: 'center',
    fontFamily: 'inter-med',
    color: '#fff',
    backgroundColor: blueMain,
    padding: '10px 28px',
    cursor: 'pointer',
    borderRadius: 10,
    [theme.breakpoints.down('md')]: {
      padding: '10px 14px',
      fontSize: ({ fullWidth }) => (fullWidth ? theme.typography.pxToRem(16) : theme.typography.pxToRem(12)),
      flexBasis: 'unset',
      flexGrow: 1,
    },
  },
}));

const DoubleSwitch = ({ items, active, className = null, click = null, fullWidth = false }) => {
  const classes = useStyles({ fullWidth });
  const router = useRouter();

  const handleClick = (link = null, i = 0) => {
    if (click) {
      click(link, i);
    } else {
      router.push(link);
    }
  };
  return (
    <Box className={className}>
      <Box className={classes.switchBox}>
        {items.map((item, i) => (
          <Box
            key={i}
            onClick={() => (item.link ? handleClick(item.link, i) : handleClick())}
            className={i === active ? classes.activeItem : classes.switchItem}
          >
            {item.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DoubleSwitch;
