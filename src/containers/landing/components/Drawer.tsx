import React, { useState } from 'react';
import Link from 'next/link';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, IconButton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Button from 'components/Button';
import Close from 'components/icons/Close';
import BurgerIcon from 'components/icons/Burger';
import { black, blueActive } from 'styles/colorPalette';
import { useSession } from 'context/UserContext';

const useStyles = makeStyles<any>((theme) => ({
  iconContainer: {
    'padding': theme.spacing(1),
    'border': '1px solid #a7bcd3',
    'borderRadius': 100,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'width': 48,
    'height': 48,
    '& .MuiIconButton-root:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    color: '#003b77',
    fontSize: 12,
  },
  closeIconContainer: {
    padding: theme.spacing(1),
    width: 54,
    height: 54,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#419CF9',
  },
  closeIcon: {
    color: 'white',
    fontSize: 14,
  },
  container: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F0F5FB',
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  body: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  item: {
    'fontSize': theme.typography.pxToRem(20),
    'fontFamily': 'inter-bold',
    'color': blueActive,
    'textTransform': 'uppercase',
    'marginTop': theme.spacing(2),
    'marginBottom': theme.spacing(2),
    'transition': 'all 0.3s',
    'cursor': 'pointer',
    '&:hover': {
      color: black,
    },
  },
  buttonContainer: {
    'position': 'absolute',
    'bottom': 0,
    'left': 0,
    'right': 0,
    '& button': {
      borderRadius: '0px !important',
      height: '68px !important',
    },
  },
  btn: {
    '& button': {
      'backgroundColor': '#ffce85',
      '&:hover': {
        backgroundColor: '#eaae5b',
      },
    },
  },
}));

const Drawer = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { currentUser } = useSession();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <Box className={classes.iconContainer}>
        <IconButton onClick={toggleDrawer(true)} size="large">
          <BurgerIcon />
        </IconButton>
      </Box>
      <SwipeableDrawer anchor={'top'} open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        <Box className={classes.container}>
          <Box className={classes.header}>
            <Box onClick={toggleDrawer(false)}>
              <Link href={'/'}>
                <a>
                  <img src="/images/logo/logo.svg" alt="Логотип Потенциал страны" />
                </a>
              </Link>
            </Box>
            <Box className={classes.closeIconContainer}>
              <IconButton onClick={toggleDrawer(false)} size="large">
                <Close color={'#fff'} />
              </IconButton>
            </Box>
          </Box>
          <Box className={classes.body}>
            {currentUser?.type === 'employee' && (
              <Link href={'/applicant/tests'}>
                <a>
                  <Typography className={classes.item} onClick={toggleDrawer(false)}>
                    Тесты
                  </Typography>
                </a>
              </Link>
            )}
            <Link href={'/team'}>
              <a>
                <Typography className={classes.item} onClick={toggleDrawer(false)}>
                  Команда
                </Typography>
              </a>
            </Link>
            <Link href={'/blog'}>
              <a>
                <Typography className={classes.item} onClick={toggleDrawer(false)}>
                  Блог
                </Typography>
              </a>
            </Link>
            {/* {currentUser?.type === 'employer' && (
              <Link href={'/employer/applicants'}>
                <Typography className={classes.item} onClick={toggleDrawer(false)}>
                  Поиск сотрудников
                </Typography>
              </Link>
            )} */}
          </Box>
          <Box className={classes.buttonContainer}>
            {currentUser && currentUser.type !== 'employer' ? null : currentUser && currentUser.type === 'employer' ? (
              <Box className={classes.btn}>
                <Button fullWidth nextLink linkProps={{ href: '/employer/vacancies/create' }}>
                  Разместить вакансию
                </Button>
              </Box>
            ) : (
              <Box className={classes.btn}>
                <Button fullWidth nextLink linkProps={{ href: '/employer/register' }}>
                  Разместить вакансию
                </Button>
              </Box>
            )}
            {currentUser ? (
              <Button
                fullWidth
                nextLink
                linkProps={currentUser.type === 'employer' ? { href: '/employer/profile' } : { href: '/applicant' }}
              >
                Личный кабинет
              </Button>
            ) : (
              <Button fullWidth nextLink linkProps={{ href: '/register' }}>
                Зарегистрироваться
              </Button>
            )}
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default Drawer;
