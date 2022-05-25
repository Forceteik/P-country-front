import Link from 'next/link';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueMain } from 'styles/colorPalette';
import { useSession } from 'context/UserContext';

const useStyles = makeStyles<any>((theme) => ({
  container: {
    maxWidth: 1328,
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    margin: '0px auto',
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      height: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
  },

  lastTitle: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  footerLogo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(15),
    [theme.breakpoints.only('xs')]: {
      marginTop: theme.spacing(8),
    },
  },
  footerText: {
    fontSize: theme.typography.pxToRem(14),
    marginTop: theme.spacing(3),
    width: '60%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
  },
  gridContainer: {
    marginTop: theme.spacing(7.5),
  },
  sourceMapTitle: {
    color: theme.palette.secondary.dark,
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(20),
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  sourceMapItem: {
    'fontFamily': 'inter',
    'margin': `${theme.spacing(1)} 0`,
    'paddingRight': theme.spacing(4),
    '&>a': {
      'color': theme.palette.secondary.dark,
      'transition': 'all 0.3s',
      '&:hover': {
        color: blueMain,
      },
    },
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      paddingRight: 0,
    },
  },
  contactBlock: {
    backgroundColor: '#F3F5FF',
    borderRadius: 24,
    padding: '40px 32px',
    display: 'flex',
    flexDirection: 'column',
  },
  contactLink: {
    'display': 'flex',
    'alignItems': 'center',
    'color': '#003B77',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
    '& img': {
      marginRight: theme.spacing(2),
    },
    '&:hover': {
      color: '#003B77',
    },
  },
  footerFooter: {
    'paddingBottom': theme.spacing(2),
    'marginTop': theme.spacing(7.5),
    'borderTop': '1px solid #D3E0F8',
    '& a': {
      'color': '#778AB1',
      'transition': 'all 0.3s',
      '&:hover': {
        color: '#003B77',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(16),
      },
    },
    [theme.breakpoints.down('lg')]: {
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  footerMenu: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      marginBottom: theme.spacing(3),
    },
  },
  copyrightDivider: {
    marginTop: theme.spacing(5),
    border: '1px solid #D3E0F8',
  },
  copyrightText: {
    cursor: 'pointer',
    fontFamily: 'inter-med',
    color: '#778AB1 !important',
    paddingTop: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  footerOfert: {
    paddingTop: theme.spacing(4.5),
    textAlign: 'center',
    [theme.breakpoints.down('lg')]: {
      paddingTop: 0,
    },
  },
  reverseGrid: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  const { currentUser } = useSession();
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.down('lg'));

  return (
    <Box>
      <Box className={classes.container}>
        <Box className={classes.inner}>
          <Box className={classes.footerLogo}>
            <a href="#top">
              <img src="/images/logo/logo.svg" alt="Логотип Поетнциал Страны" />
            </a>
            <Typography className={classes.footerText}>
              Интеллектуальная платформа тестирования, профориентации и устройства молодых кадров и дальнейшего ведения
              их по карьерной лестнице
            </Typography>
          </Box>

          <Grid container justifyContent="center" alignItems="center" className={classes.gridContainer}>
            <Grid item xs={12} sm={7} md={4} lg={3} className={classes.footerMenu}>
              <Typography variant="h6" className={classes.sourceMapTitle}>
                Студентам
              </Typography>
              <Typography className={classes.sourceMapItem}>
                <Link href={currentUser ? '/applicant/tests' : '/auth'}>Тесты</Link>
              </Typography>
              <Typography className={classes.sourceMapItem}>
                <Link href={'/blog'}>Блог</Link>
              </Typography>
              <Typography className={classes.sourceMapItem}>
                <Link href={'/team'}>Команда</Link>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={7} md={4}>
              <Box className={classes.contactBlock}>
                <a className={classes.contactLink} href="mailto:info@talanty.online">
                  <img src="/images/landing/footer-mail.png" />
                  info@talanty.online
                </a>
                <a className={classes.contactLink} href="tel:+79252151057">
                  <img src="/images/landing/footer-tel.png" />
                  +7 (925) 215-10-57
                </a>
                <a
                  className={classes.contactLink}
                  href="https://t.me/p_strana"
                  target={'_blank'}
                  rel="noopener noreferrer"
                >
                  <img src="/images/landing/telegram.png" />
                  t.me/p_strana
                </a>
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Box className={classes.footerFooter}>
                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item xs={12} lg={'auto'}>
                    <Grid container spacing={isMd ? 3 : 5} justifyContent="center" className={classes.reverseGrid}>
                      <Grid item xs={12} sm={'auto'}>
                        <Typography className={classes.copyrightText}>
                          © {new Date().getFullYear()} Потенциал страны
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={'auto'}>
                        <img src="/images/landing/leaders-awards.svg" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} className={classes.footerOfert} justifyContent="center">
                      <Grid item>
                        <Link href={'/oferta'}>
                          <a>Оферта об оказании услуг</a>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href={'/agreement'}>
                          <a>Пользовательское соглашение</a>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href={'/privacy'}>
                          <a>Политика в области обработки персональных данных</a>
                        </Link>
                      </Grid>
                      <Grid item>
                        <a href="/docs/prikaz.pdf" target="_blank">
                          Приказ
                        </a>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
