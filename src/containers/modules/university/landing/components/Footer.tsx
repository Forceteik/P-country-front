import Link from 'next/link';

import { makeStyles } from '@mui/styles';
import { Box, Grid, Hidden, List, ListItem, ListItemText, ListSubheader, Typography } from '@mui/material';

import HeaderLogo from 'components/HeaderLogo';
import { darkGray } from 'styles/colorPalette';

import Container from './Container';

const useStyles = makeStyles<any>((theme) => ({
  footer: {
    backgroundColor: '#f9f9fb',
    paddingTop: '50px',
    paddingBottom: theme.spacing(4),
  },
  descr: {
    color: darkGray,
    fontSize: theme.typography.pxToRem(14),
    marginBottom: '21px',
  },
  contactItem: {
    'display': 'flex',
    'alignItems': 'center',
    '& a': {
      marginLeft: 6,
      fontFamily: 'inter-med',
    },
  },
  listTitle: {
    color: darkGray,
    textTransform: 'uppercase',
    fontSize: theme.typography.pxToRem(12),
    fontFamily: 'inter-med',
  },
  listItem: {
    fontFamily: 'inter-med',
  },
  list: {
    '& .MuiList-root': {
      padding: 0,
    },
    '& .MuiListSubheader-root': {
      backgroundColor: 'transparent',
      paddingLeft: 0,
      paddingRight: 0,
      color: darkGray,
      textTransform: 'uppercase',
      lineHeight: '150%',
      marginBottom: theme.spacing(2),
      fontSize: theme.typography.pxToRem(12),
    },
    '& .MuiListItem-root': {
      padding: 0,
    },
    '& .MuiListItem-root:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiListItemText-root': {
      'marginTop': 0,
      'marginBottom': 0,
      '& span': {
        fontFamily: 'inter-med',
      },
      '&:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
  },
  top: {
    paddingBottom: theme.spacing(5),
    borderBottom: '1px solid #979DAD',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(4),
    },
  },
  copyrightText: {
    cursor: 'pointer',
    fontSize: theme.typography.pxToRem(12),
    color: '#535C73 !important',
    paddingTop: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  footerOfert: {
    'paddingTop': 37,
    'textAlign': 'center',
    '& a': {
      'color': darkGray,
      'fontFamily': 'inter-med',
      'transition': 'all 0.3s',
      '&:hover': {
        color: '#3770FF',
      },
    },
    [theme.breakpoints.down('md')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: 26,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box component={'footer'} className={classes.footer}>
      <Container>
        <Box className={classes.top}>
          <Grid container rowSpacing={2}>
            <Grid item>
              <HeaderLogo link={'/university/landing'} />
            </Grid>
            <Grid item xs={12} container rowSpacing={{ xs: 8, sm: 6.5 }} columnSpacing={4}>
              <Grid item xs={12} md={4.8}>
                <Typography className={classes.descr}>
                  Первая в России интеллектуальная платформа тестирования, профориентации и устройства молодых кадров и
                  дальнейшего ведения их по карьерной лестнице
                </Typography>
                <Grid container columnSpacing={1} rowSpacing={{ xs: 2, lg: 4 }}>
                  <Grid item xs={12} lg={6}>
                    <Box className={classes.contactItem}>
                      <img src="/images/university/landing/icons/email.svg" />
                      <a href="mailto:info@talanty.online">info@talanty.online</a>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Box className={classes.contactItem}>
                      <img src="/images/university/landing/icons/phone.svg" />
                      <a href="tel:89252151057">+7 (925) 215-10-57</a>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display={'flex'}>
                      <Typography color={darkGray} marginRight={2}>
                        Наши социальные сети:
                      </Typography>
                      <a href="https://t.me/p_strana" target={'_blank'} rel="noopener noreferrer">
                        <img src="/images/university/landing/icons/telegram.svg" />
                      </a>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container rowSpacing={3}>
                  <Grid item xs={12}>
                    <Grid container columnSpacing={5} rowSpacing={{ xs: 4, sm: 5 }} className={classes.list}>
                      <Grid item xs={6} md={3.5}>
                        <List
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                              Соискателям
                            </ListSubheader>
                          }
                        >
                          <ListItem>
                            <Link href={'/applicant/register'}>
                              <a>
                                <ListItemText primary="Регистрация" />
                              </a>
                            </Link>
                          </ListItem>
                          <ListItem>
                            <Link href={'/applicant/register'}>
                              <a>
                                <ListItemText primary="Тестирование" />
                              </a>
                            </Link>
                          </ListItem>
                          <ListItem>
                            <Link href={'/blog'}>
                              <a>
                                <ListItemText primary="Блог" />
                              </a>
                            </Link>
                          </ListItem>
                        </List>
                      </Grid>

                      <Grid item xs={6} md={3.5}>
                        <List
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                              Работодателям
                            </ListSubheader>
                          }
                        >
                          <ListItem>
                            <Link href={'/employer/register'}>
                              <a>
                                <ListItemText primary="Регистрация" />
                              </a>
                            </Link>
                          </ListItem>
                          <ListItem>
                            <Link href={'/'}>
                              <a>
                                <ListItemText primary="Подключить ОУ" />
                              </a>
                            </Link>
                          </ListItem>
                        </List>
                      </Grid>

                      <Grid item xs={6} md={3.5}>
                        <List
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                          subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                              О Talanty
                            </ListSubheader>
                          }
                        >
                          <ListItem>
                            <Link href={'/team'}>
                              <a>
                                <ListItemText primary="Команда" />
                              </a>
                            </Link>
                          </ListItem>
                        </List>
                      </Grid>

                      <Hidden mdUp>
                        <Grid item xs={6} md={12} className={classes.list}>
                          <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                              <ListSubheader component="div" id="nested-list-subheader">
                                Образовательным учреждениям
                              </ListSubheader>
                            }
                          >
                            <ListItem>
                              <Link href={'/'}>
                                <a>
                                  <ListItemText primary="Подключить ОУ" />
                                </a>
                              </Link>
                            </ListItem>
                          </List>
                        </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                  <Hidden mdDown>
                    <Grid item xs={6} md={12} className={classes.list}>
                      <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                          <ListSubheader component="div" id="nested-list-subheader">
                            Образовательным учреждениям
                          </ListSubheader>
                        }
                      >
                        <ListItem>
                          <Link href={'/'}>
                            <a>
                              <ListItemText primary="Подключить ОУ" />
                            </a>
                          </Link>
                        </ListItem>
                      </List>
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.bottom}>
          <Grid container spacing={3} flexDirection={{ xs: 'row-reverse', md: 'row' }}>
            <Grid item>
              <Grid container spacing={3} justifyContent="center">
                <Hidden mdDown>
                  <Grid item xs={12} sm={'auto'}>
                    <Typography className={classes.copyrightText}>
                      © {new Date().getFullYear()} Потенциал страны
                    </Typography>
                  </Grid>
                </Hidden>

                <Grid item xs={12} sm={'auto'}>
                  <img src="/images/landing/leaders-awards.svg" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid container spacing={3} className={classes.footerOfert}>
                <Grid item xs={12} md={'auto'}>
                  <a href="/agreement" target="_blank">
                    Пользовательское соглашение
                  </a>
                </Grid>

                <Grid item xs={12} md={'auto'}>
                  <a href="/oferta" target="_blank">
                    Публичная оферта
                  </a>
                </Grid>
                <Grid item xs={12} md={'auto'}>
                  <a href="/privacy" target="_blank">
                    Политика конфиденциальности
                  </a>
                </Grid>
                <Hidden mdUp>
                  <Grid item xs={12}>
                    <Typography className={classes.copyrightText}>
                      © {new Date().getFullYear()} Потенциал страны
                    </Typography>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
