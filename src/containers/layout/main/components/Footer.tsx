import Link from 'next/link';

import { Box, Container, Grid, List, ListItem, ListItemText, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueMain, darkGray, gray, midDarkGray } from 'styles/colorPalette';
import Vk from 'components/icons/Vk';
import Telegram from 'components/icons/Telegram';
import { useSession } from 'context/UserContext';

const useStyles = makeStyles<any>((theme) => ({
  footer: {
    'borderTop': `1px solid ${gray}`,
    'paddingTop': theme.spacing(5),
    'paddingBottom': theme.spacing(5),
    '& ul': {
      'display': 'flex',
      'alignItems': 'center',
      'flexWrap': 'wrap',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
      },
      '& .MuiListItem-root': {
        width: 'unset',
      },
    },
    '& span': {
      color: darkGray,
      cursor: 'pointer',
    },
  },
  mainGrid: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  menuList: {
    '& .MuiListItemText-root': {
      flexWrap: 'nowrap',
      alignItems: 'flex-end',
      display: 'flex',
    },

    '& .MuiListItemText-secondary': {
      color: blueMain,
      marginLeft: theme.spacing(0.5),
    },
    '& li': {
      paddingLeft: 0,
      paddingRight: 42,
      [theme.breakpoints.down('md')]: {
        padding: '5px 10px',
      },
    },
  },
  socialList: {
    '& li': {
      paddingRight: 0,
      paddingLeft: 35,
      [theme.breakpoints.down('md')]: {
        paddingLeft: '15px',
      },
    },
  },
  copyrightText: {
    cursor: 'pointer',
    color: darkGray,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  copyrightTextInfo: {
    cursor: 'default',
    color: midDarkGray,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
}));

const generateFooterData = [
  {
    role: 'employer',
    items: [
      {
        link: '/employer/profile',
        label: 'Профиль',
      },
      {
        link: '/employer/responses',
        label: 'Отклики',
      },
      {
        link: '/employer/profile/settings',
        label: 'Настройки',
      },
      {
        link: '/employer/balance',
        label: 'Баланс',
      },
    ],
  },
  {
    role: 'employee',
    items: [
      {
        link: '/applicant',
        label: 'Профиль',
      },
      {
        link: '/applicant/responses',
        label: 'Отклики',
      },
      {
        link: '/applicant/profile/settings',
        label: 'Настройки',
      },
    ],
  },
  {
    role: 'guest',
    items: [
      {
        link: '/',
        label: 'Главная',
      },
    ],
  },
];

const Footer = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.only('md'));

  const role = useSession().role || 'guest';

  const menuData = generateFooterData.find((item) => item.role === role);

  return (
    <Box className={classes.footer}>
      <Container maxWidth={'lg'}>
        <Grid container alignItems="center" justifyContent="space-between" spacing={2} className={classes.mainGrid}>
          <Grid item md={12} lg={'auto'}>
            <List className={classes.menuList} disablePadding>
              {menuData.items.map((item, key) => (
                <ListItem key={key}>
                  <Link href={item.link}>
                    <a>
                      <ListItemText primary={item.label} />
                    </a>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item md={12} lg={'auto'}>
            <Grid
              container
              spacing={isMobile ? 1 : 3}
              justifyContent={isMd ? 'flex-start' : isSm ? 'center' : 'flex-end'}
            >
              <Grid item xs={12} sm={'auto'}>
                <Link href={'/oferta'}>
                  <a>
                    <Typography className={classes.copyrightText}>Оферта об оказании услуг</Typography>
                  </a>
                </Link>
              </Grid>
              <Grid item xs={12} sm={'auto'}>
                <Link href={'/privacy'}>
                  <a>
                    <Typography className={classes.copyrightText}>
                      Политика в области обработки персональных данных
                    </Typography>
                  </a>
                </Link>
              </Grid>
              <Grid item xs={12} sm={'auto'}>
                <Link href={'/agreement'}>
                  <a>
                    <Typography className={classes.copyrightText}>Пользовательское соглашение</Typography>
                  </a>
                </Link>
              </Grid>
              <Grid item>
                <a href="/docs/prikaz.pdf" target="_blank">
                  <Typography className={classes.copyrightText}>Приказ</Typography>
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className={classes.copyrightTextInfo}>
              © {new Date().getFullYear()} Потенциал страны. Все права защищены.
            </Typography>
          </Grid>
          <Grid item>
            <List className={classes.socialList} disablePadding>
              <ListItem>
                <a href="https://vk.com/talanty.online" aria-label="В контакте" target={'_blank'} rel="noreferrer">
                  <Vk />
                </a>
              </ListItem>
              <ListItem>
                <a href="https://t.me/p_strana" aria-label="Телеграм" target={'_blank'} rel="noreferrer">
                  <Telegram />
                </a>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
