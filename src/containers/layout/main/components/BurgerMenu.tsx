import React, { useState } from 'react';
import Link from 'next/link';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, IconButton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Close from 'components/icons/Close';
import BurgerIcon from 'components/icons/Burger';
import { black, blueActive } from 'styles/colorPalette';
import { useSession } from 'context/UserContext';
import Badge from 'components/Bagde';
import HeaderLogo from 'components/HeaderLogo';

const useStyles = makeStyles<any>((theme) => ({
  iconBtn: {
    'border': '1px solid #003b7773',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  closeIconContainer: {
    padding: theme.spacing(1),
    width: 50,
    height: 50,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#419CF9',
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
    },
  },
  container: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F0F5FB',
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  body: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: theme.spacing(1),
  },
  item: {
    'fontSize': theme.typography.pxToRem(20),
    'cursor': 'pointer',
    'fontFamily': 'inter-bold',
    'transition': 'all 0.3s',
    'color': blueActive,
    'textTransform': 'uppercase',
    'marginTop': theme.spacing(2),
    'marginBottom': theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontSize: theme.typography.pxToRem(16),
    },
    '&:hover': {
      color: black,
    },
  },
}));

const BurgerMenu = ({ data, link }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { items, showLogout } = data;
  const { logout } = useSession();

  // const {
  //   currentUser: { newResponses = 0 },
  //   refetch,
  // } = useSession();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} className={classes.iconBtn} size="large">
        <BurgerIcon />
      </IconButton>

      <SwipeableDrawer anchor={'top'} open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Box className={classes.container}>
          <Box className={classes.header}>
            <Box onClick={toggleDrawer(false)}>
              <HeaderLogo link={link} />
            </Box>
            <Box className={classes.closeIconContainer}>
              <IconButton onClick={toggleDrawer(false)} size="large">
                <Close color={'#fff'} />
              </IconButton>
            </Box>
          </Box>
          <Box className={classes.body}>
            {items.map((item, key) =>
              item.badge ? (
                <Badge badgeContent={`+${item.badge}`} key={key}>
                  <Link href={item.link}>
                    <a>
                      <Typography className={classes.item}>{item.label}</Typography>
                    </a>
                  </Link>
                </Badge>
              ) : (
                <Link href={item.link} key={key}>
                  <a>
                    <Typography className={classes.item}>{item.label}</Typography>
                  </a>
                </Link>
              ),
            )}
            {showLogout && (
              <Typography className={classes.item} onClick={handleLogout}>
                Выход
              </Typography>
            )}
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default BurgerMenu;
