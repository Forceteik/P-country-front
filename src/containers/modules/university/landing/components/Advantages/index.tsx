import { useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Box, Grid, Typography, Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@mui/material';

import { black, blueMain, darkGray } from 'styles/colorPalette';
import CheckGreenRound from 'components/icons/CheckGreenRound';
import Button from 'components/Button';

import Container from '../Container';

const useStyles = makeStyles<any>((theme) => ({
  advantagesRoot: {
    backgroundColor: '#F9F9FB',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7.5),
      paddingBottom: theme.spacing(7.5),
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(32),
    fontFamily: 'inter-bold',
    lineHeight: '150%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
      lineHeight: '110%',
    },
  },
  tabs: {
    '& .MuiTabs-indicator': {
      display: 'none',
    },
    '& .MuiButtonBase-root': {
      backgroundColor: '#fff',
      borderRadius: '0px 30px',
      width: '31.5%',
      padding: theme.spacing(3),
      textAlign: 'left',
      alignItems: 'center',
      textTransform: 'none',
      color: black,
      fontFamily: 'inter-med',
      lineHeight: '145%',
    },
    '& .Mui-selected.MuiButtonBase-root': {
      'backgroundColor': blueMain,
      'position': 'relative',
      'color': '#fff',
      '&:before': {
        content: 'url(/images/university/landing/check.svg)',
        position: 'absolute',
        width: '24px',
        height: '24px',
        top: 13,
        right: 19,
        [theme.breakpoints.down('lg')]: {
          display: 'none',
        },
      },
    },
    '& .MuiButtonBase-root:first-child': {
      paddingRight: theme.spacing(20),
      [theme.breakpoints.down('lg')]: {
        paddingRight: theme.spacing(3),
      },
    },
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-between',
    },
  },
  tabItemRoot: {
    display: 'flex',
    margin: -24,
    marginLeft: 0,
    paddingLeft: 'max(40px, calc((100% - 1110px) / 2))',
    alignItems: 'center',
    height: '510px',
  },
  left: {
    flexShrink: 0,
    width: 552,
    height: '100%',
    backgroundColor: '#fff',
    padding: '56px 32px 32px 32px',
  },
  right: {
    width: 'calc(100% - 552px)',
    backgroundColor: '#E0EEFE',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  list: {
    'padding': 0,
    '& .MuiListItemText-root': {
      margin: 0,
    },
    '& .MuiTypography-root': {
      color: darkGray,
    },
    '& .MuiListItemIcon-root': {
      minWidth: 'unset',
      marginRight: 12,
    },
    '& .MuiListItem-root': {
      paddingLeft: 0,
      paddingBottom: 16,
    },
  },
  itemTitle: {
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    lineHeight: '150%',
    marginBottom: theme.spacing(1.4),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  imgBox: {
    'height': 455,
    'width': '110%',
    'marginLeft': '-77px',
    '& img': {
      height: '100%',
      objectFit: 'contain',
      boxShadow: '0px 8px 24px -8px rgba(163, 175, 192, 0.42)',
    },
  },
  mobileItem: {
    'paddingLeft': 'max(24px, calc((100% - 1110px) / 2))',
    'zIndex': 10,
    'position': 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '84%',
      height: '100%',
      backgroundColor: '#E0EEFE',
      top: -11,
      right: 0,
      zIndex: -1,
    },
    '&:not(:last-child)': {
      marginBottom: 59,
    },
    '& .MuiListItem-root': {
      'paddingLeft': 0,
      'paddingRight': 0,
      '&:not(:last-child)': {
        paddingBottom: 8,
      },
    },
  },
  bottom: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 16,
    padding: '32px 24px',
    marginTop: 6,
  },
  mobileImg: {
    boxShadow: '0px 8px 24px -8px rgba(163, 175, 192, 0.42)',
    objectFit: 'contain',
    borderRadius: 10,
    [theme.breakpoints.down('md')]: {
      height: 450,
    },
    [theme.breakpoints.down('sm')]: {
      height: 215,
    },
  },
}));

const Advantages = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      'id': `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box className={classes.advantagesRoot} component="section" id="advantages">
      <Container>
        <Grid container rowSpacing={7} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography className={classes.title} component="h2">
              Преимущества использования системы “Карьерный TRACK”
            </Typography>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} className={classes.tabs}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Детальная аналитика по студентам" {...a11yProps(0)} />
                <Tab label="Автоматизированная система трудоустройства" {...a11yProps(1)} />
                <Tab label="Привлекательная страница образовательного учреждения" {...a11yProps(2)} />
              </Tabs>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
      <Hidden mdDown>
        <Box mt={5}>
          <TabPanel value={value} index={0}>
            <Box className={classes.tabItemRoot}>
              <Box className={classes.left}>
                <Grid container rowSpacing={2.2}>
                  <Grid item xs={9.3}>
                    <Typography className={classes.itemTitle} component="h3">
                      Получение полной
                      <br /> информации о студентах:
                    </Typography>
                    <List className={classes.list}>
                      <ListItem>
                        <ListItemIcon>
                          <CheckGreenRound />
                        </ListItemIcon>
                        <ListItemText primary="Уровни развития компетенций, soft-skills, мотивации и тд." />
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <CheckGreenRound />
                        </ListItemIcon>
                        <ListItemText primary="Карьерные интересы - в какие компании и на какие вакансии они хотят попасть" />
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <CheckGreenRound />
                        </ListItemIcon>
                        <ListItemText primary="Зарплатные ожидания, статусы поиска работы (ищет/не ищет) и многое другое" />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={4.5}>
                    <Button small fullWidth>
                      Подключить ОУ
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Box className={classes.right}>
                <Box className={classes.imgBox}>
                  <img src="/images/university/landing/advantages-1.png" />
                </Box>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box className={classes.tabItemRoot}>
              <Box className={classes.left}>
                <Grid container rowSpacing={4}>
                  <Grid item xs={10}>
                    <Typography className={classes.itemTitle} component="h3">
                      Автоматизированная система трудоустройства
                    </Typography>
                    <List className={classes.list}>
                      <ListItem>
                        <ListItemIcon>
                          <CheckGreenRound />
                        </ListItemIcon>
                        <ListItemText primary="Вакансии от работодателей партнеров Talanty" />
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <CheckGreenRound />
                        </ListItemIcon>
                        <ListItemText primary="Вакансии от работодателей партнеров ОУ" />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={4.5}>
                    <Button small fullWidth>
                      Подключить ОУ
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Box className={classes.right}>
                <Box className={classes.imgBox}>
                  <img src="/images/university/landing/advantages-2.png" />
                </Box>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box className={classes.tabItemRoot}>
              <Box className={classes.left}>
                <Grid container rowSpacing={4}>
                  <Grid item xs={10}>
                    <Typography className={classes.itemTitle} component="h3">
                      Привлекательная страница образовательного учреждения
                    </Typography>
                    <List className={classes.list}>
                      <ListItem>
                        <ListItemIcon>
                          <CheckGreenRound />
                        </ListItemIcon>
                        <ListItemText primary="Подборки вакансий для студентов" />
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <CheckGreenRound />
                        </ListItemIcon>
                        <ListItemText primary="Карьерные мероприятия от партнеров образовательного учреждения" />
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <CheckGreenRound />
                        </ListItemIcon>
                        <ListItemText primary="Присутствие ОУ на динамично развивающейся платформе" />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={4.5}>
                    <Button small fullWidth>
                      Подключить ОУ
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Box className={classes.right}>
                <Box className={classes.imgBox}>
                  <img src="/images/university/landing/advantages-3.png" />
                </Box>
              </Box>
            </Box>
          </TabPanel>
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Box mt={7.8} className={classes.mobile}>
          <Box className={classes.mobileItem} component="article">
            <Box className={classes.top}>
              <img src="/images/university/landing/advantages-1.png" className={classes.mobileImg} />
            </Box>
            <Box className={classes.bottom}>
              <Grid container rowSpacing={2.2}>
                <Grid item xs={12} sm={9.3}>
                  <Typography className={classes.itemTitle} component="h3">
                    Получение полной информации о студентах:
                  </Typography>
                  <List className={classes.list}>
                    <ListItem>
                      <ListItemIcon>
                        <CheckGreenRound />
                      </ListItemIcon>
                      <ListItemText primary="Уровни развития компетенций, soft-skills, мотивации и тд." />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <CheckGreenRound />
                      </ListItemIcon>
                      <ListItemText primary="Карьерные интересы - в какие компании и на какие вакансии они хотят попасть" />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <CheckGreenRound />
                      </ListItemIcon>
                      <ListItemText primary="Зарплатные ожидания, статусы поиска работы (ищет/не ищет) и многое другое" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={9} md={4.5}>
                  <Button small fullWidth>
                    Подключить ОУ
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box className={classes.mobileItem} component="article">
            <Box className={classes.top}>
              <img src="/images/university/landing/advantages-2.png" className={classes.mobileImg} />
            </Box>
            <Box className={classes.bottom}>
              <Grid container rowSpacing={4}>
                <Grid item xs={12} sm={9.3}>
                  <Typography className={classes.itemTitle} component="h3">
                    Автоматизированная система трудоустройства
                  </Typography>
                  <List className={classes.list}>
                    <ListItem>
                      <ListItemIcon>
                        <CheckGreenRound />
                      </ListItemIcon>
                      <ListItemText primary="Вакансии от работодателей партнеров Talanty" />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <CheckGreenRound />
                      </ListItemIcon>
                      <ListItemText primary="Вакансии от работодателей партнеров ОУ" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={9} md={4.5}>
                  <Button small fullWidth>
                    Подключить ОУ
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box className={classes.mobileItem} component="article">
            <Box className={classes.top}>
              <img src="/images/university/landing/advantages-3.png" className={classes.mobileImg} />
            </Box>
            <Box className={classes.bottom}>
              <Grid container rowSpacing={4}>
                <Grid item xs={12} sm={9.3}>
                  <Typography className={classes.itemTitle} component="h3">
                    Привлекательная страница образовательного учреждения
                  </Typography>
                  <List className={classes.list}>
                    <ListItem>
                      <ListItemIcon>
                        <CheckGreenRound />
                      </ListItemIcon>
                      <ListItemText primary="Подборки вакансий для студентов" />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <CheckGreenRound />
                      </ListItemIcon>
                      <ListItemText primary="Карьерные мероприятия от партнеров образовательного учреждения" />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <CheckGreenRound />
                      </ListItemIcon>
                      <ListItemText primary="Присутствие ОУ на динамично развивающейся платформе" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={9} md={4.5}>
                  <Button small fullWidth>
                    Подключить ОУ
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};

export default Advantages;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
