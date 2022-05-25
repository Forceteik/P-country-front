import React, { useState } from 'react';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Close from 'components/icons/Close';
import Button from 'components/Button';
import HeaderLogo from 'components/HeaderLogo';
import BurgerUniversity from 'components/icons/BurgerUniversity';

const headerStyle = makeStyles<any>((theme) => ({
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
    fontSize: theme.typography.pxToRem(18),
    cursor: 'pointer',
    fontFamily: 'inter-bold',
    transition: 'all 0.3s',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontSize: theme.typography.pxToRem(16),
    },
  },
}));

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const classes = headerStyle();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} size="large" disableRipple>
        <BurgerUniversity />
      </IconButton>

      <SwipeableDrawer anchor={'top'} open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Box className={classes.container}>
          <Grid container alignItems={'center'} justifyContent="space-between">
            <Grid item>
              <Box onClick={toggleDrawer(false)}>
                <HeaderLogo link={'/'} />
              </Box>
            </Grid>
            <Grid item>
              <IconButton onClick={toggleDrawer(false)} size="large">
                <Close />
              </IconButton>
            </Grid>
          </Grid>
          <Box className={classes.body}>
            <Box onClick={toggleDrawer(false)}>
              <Typography className={classes.item}>Аналитика карьерных траекторий студентов</Typography>
            </Box>

            <Box onClick={() => setOpen(false)}>
              <a href="#advantages">
                <Typography className={classes.item}>Преимущества использования системы “Карьерный TRACK”</Typography>
              </a>
            </Box>

            <Box onClick={() => setOpen(false)}>
              <a href="#questions">
                <Typography className={classes.item}>Вопросы и ответы</Typography>
              </a>
            </Box>
          </Box>
          <Box margin={'0px auto'}>
            <Button>Личный кабинет</Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default BurgerMenu;
