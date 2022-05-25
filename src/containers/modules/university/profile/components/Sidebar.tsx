import cx from 'classnames';

import {
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import HeaderLogo from 'components/HeaderLogo';
import Chart from 'components/icons/Chart';
import Home from 'components/icons/Home';
import Paper from 'components/icons/Paper';
import People from 'components/icons/People';
import Unlock from 'components/icons/Unlock';
import Exit from 'components/icons/Exit';
import { blueMain, darkGray, gray } from 'styles/colorPalette';

import Avatar from './Avatar';

const useStyles = makeStyles<any>((theme) => ({
  drawer: {
    'width': 240,
    'flexShrink': 0,
    '& .MuiDrawer-paper': {
      'scrollbarWidth': 'none',
      'borderRight': 0,
      'boxShadow': '0px 8px 24px -8px rgba(163, 175, 192, 0.42)',
      '&::-webkit-scrollbar': {
        width: 0,
      },
    },
  },
  drawerTopInfo: {
    padding: '40px 32px 36px 24px',
    borderBottom: `1px solid ${gray}`,
  },
  universityName: {
    fontSize: theme.typography.pxToRem(14),
    fontFamily: 'inter-med',
    lineHeight: '150%',
  },
  students: {
    '& p': {
      fontSize: theme.typography.pxToRem(12),
      fontFamily: 'inter-med',
      lineHeight: '150%',
    },
  },
  studentsNum: {
    'backgroundColor': blueMain,
    'borderRadius': 4,
    'padding': '8px 12px',
    '& p': {
      color: '#fff',
      letterSpacing: '0.05em',
    },
  },
  studentsNumText: {
    textAlign: 'left',
    color: darkGray,
  },
  menu: {
    '& .MuiListItemButton-root': {
      padding: '19px 17px 18px 25px',
    },
    '& .MuiListItemIcon-root': {
      minWidth: 'unset',
      width: '24px',
      marginRight: '9px',
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: 0,
    },
    '& .MuiListItemText-primary': {
      fontSize: theme.typography.pxToRem(14),
      color: darkGray,
      fontFamily: 'inter-med',
    },
    '& .MuiListItemText-secondary': {
      fontSize: theme.typography.pxToRem(8),
      color: blueMain,
    },
    '& .MuiListItem-root.Mui-selected': {
      'backgroundColor': blueMain,
      '& .MuiListItemText-primary': {
        color: '#fff',
      },
      '& svg path': {
        fill: '#fff',
      },
    },
  },
  menuList: {
    paddingTop: '13px',
    paddingBottom: '32px',
    borderBottom: `1px solid ${gray}`,
    flexGrow: 1,
  },
}));

const menuData = [
  { id: 1, name: 'Список задач', icon: <Paper color="#535C73" /> },
  { id: 2, name: 'Страница организации', icon: <Home /> },
  { id: 3, name: 'Статистика', icon: <Chart /> },
  { id: 4, name: 'Студенты', icon: <People /> },
  { id: 5, name: 'Соц. сети ', icon: <Unlock />, status: 'progress' },
  { id: 6, name: 'Вакансии', icon: <Unlock />, status: 'progress' },
  { id: 7, name: 'Компании', icon: <Unlock />, status: 'progress' },
  { id: 8, name: 'Настройки', icon: <Unlock />, status: 'progress' },
];

const Sidebar = ({ selectedIndex, handleListItemClick }) => {
  const classes = useStyles();

  return (
    <Box component="nav" className={classes.drawer}>
      <Drawer
        variant="permanent"
        sx={{
          'display': 'block',
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
        open
      >
        <Box className={classes.drawerTopInfo}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <HeaderLogo link={'/university'} left />
            </Grid>
            <Grid item xs={12}>
              <Grid container rowSpacing={1.7}>
                <Grid item xs={12}>
                  <Avatar radius={64} src="/images/mockUniversity/logoUniversity.png" />
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.universityName}>
                    Московский государственный технический университет
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container columnSpacing={1.5} alignItems="center" className={classes.students}>
                    <Grid item>
                      <Box className={classes.studentsNum}>
                        <Typography>1200</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs>
                      <Typography className={classes.studentsNumText}>Студентов на платформе</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box className={cx(classes.menuList, classes.menu)}>
          <List>
            {menuData.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                selected={item.status === 'progress' ? false : selectedIndex === item.id}
                onClick={item.status === 'progress' ? null : (event) => handleListItemClick(event, item.id)}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {item.status === 'progress' ? (
                    <ListItemText primary={item.name} secondary="В разработке" />
                  ) : (
                    <ListItemText primary={item.name} />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className={cx(classes.exit, classes.menu)}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Exit />
                </ListItemIcon>
                <ListItemText primary={'Выход'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
