import React, { useState } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import { Menu, MenuItem, ListItemText, Box } from '@mui/material';

import { useSession } from 'context/UserContext';
import { blueMain, darkGray, gray, greenMain } from 'styles/colorPalette';

const useStyles = makeStyles<any, any>((theme) => ({
  avatarBox: {
    'width': 52,
    'height': 52,
    'cursor': 'pointer',
    'position': 'relative',
    'borderRadius': '50%',
    'border': ({ employer }) => (employer ? `1px solid ${gray}` : 'none'),
    'padding': ({ employer }) => (employer ? theme.spacing(0.7) : 0),
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    '& img': {
      width: ({ employer }) => (employer ? `85%` : '100%'),
      height: ({ employer }) => (employer ? `85%` : '100%'),
      borderRadius: ({ employer }) => (employer ? '0%' : '50%'),
      objectFit: ({ employer }) => (employer ? 'contain' : 'cover'),
    },
  },
  avatarNull: {
    'width': 52,
    'height': 52,
    'cursor': 'pointer',
    'position': 'relative',
    'borderRadius': '50%',
    'border': 'none',
    'padding': 0,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    '& img': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover',
    },
  },
  online: {
    'position': 'absolute',
    'top': -2,
    'right': -2,
    'content': '""',
    'zIndex': 5,
    'width': 15,
    'height': 15,
    'backgroundColor': '#fff',
    'borderRadius': '50%',
    '&:after': {
      position: 'absolute',
      top: '50%',
      zIndex: 10,
      right: '50%',
      transform: 'translate(50%, -50%)',
      content: '""',
      width: 10,
      height: 10,
      backgroundColor: greenMain,
      borderRadius: '50%',
    },
  },
  menuList: {
    '& .MuiListItem-button': {
      backgroundColor: 'unset',
    },
    '& .MuiListItem-button:hover': {
      'backgroundColor': 'unset',
      '& .MuiListItemText-primary': {
        color: blueMain,
      },
    },
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: darkGray,
      transition: 'all 0.3s',
    },
  },
}));

const HeaderAvatarMenu = ({ role }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, logout } = useSession();
  const avatar = currentUser?.media;
  const employer = role === 'employer' ? true : false;

  const classes = useStyles({ employer });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Box className={avatar ? classes.avatarBox : classes.avatarNull} onClick={handleClick}>
        {avatar ? (
          <img src={avatar.preview_url || avatar.original_url} alt="Аватар пользователя" />
        ) : (
          <img
            src={
              employer
                ? '/images/avatar/placeholder-avatar-employer.png'
                : '/images/avatar/placeholder-avatar-employee.png'
            }
            alt="Аватар пользователя"
          />
        )}
        <Box className={classes.online}></Box>
      </Box>
      <Menu
        classes={{ list: classes.menuList }}
        elevation={0}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        // getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemText primary="Выход" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderAvatarMenu;
