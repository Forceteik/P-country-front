import Link from 'next/link';

import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Button from 'components/Button';
import TextField from 'components/TextField';

const useStyles = makeStyles<any, any>((theme) => ({
  subscribe: {
    textAlign: 'left',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 24,
    height: 500,
    boxShadow: '1px 12px 18px -3px rgb(0 0 0 / 7%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: ({ withFooter }) => (withFooter ? theme.spacing(3) : theme.spacing(6)),
    [theme.breakpoints.down('sm')]: {
      height: 'unset',
      padding: '32px 16px !important',
      justifyContent: 'flex-start',
      boxShadow: 'none',
    },
  },
  subscrTitle: {
    color: '#003B77',
    fontSize: theme.typography.pxToRem(24),
    fontFamily: 'inter-med',
    lineHeight: '120%',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      textAlign: 'center',
    },
  },
  input: {
    'marginBottom': theme.spacing(2),
    '& input': {
      'borderRadius': 14,
      'backgroundColor': '#F0F5FB',
      '&:focus': {
        borderRadius: 14,
      },
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 49%, #F0F5FB 50%, #F0F5FB 100%)',
    },
  },
  button: {
    'marginBottom': theme.spacing(2.5),
    '& button': {
      backgroundColor: '#419CF9',
    },
  },
  subscrNote: {
    color: '#7C858D',
    fontSize: theme.typography.pxToRem(14),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
  subscrLink: {
    fontSize: theme.typography.pxToRem(14),
    textDecoration: 'underline',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
  footer: {
    'borderTop': '1px solid #D4D5D6',
    'paddingTop': theme.spacing(2),
    'marginTop': theme.spacing(3),
    '& p': {
      fontFamily: 'inter-med',
    },
  },
  socialList: {
    display: 'flex',
  },
  socialItem: {
    margin: '10px 20px 0px 0px',
    cursor: 'pointer',
  },
}));

const SubscribeItem = ({ withFooter = false }) => {
  const classes = useStyles({ withFooter });
  // const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <Box className={classes.subscribe}>
      <Typography className={classes.subscrTitle}>Не пропускайте новые статьи и обновления</Typography>
      <Box className={classes.input}>
        <TextField label={'Ваш e-mail'} fullWidth small />
      </Box>
      <Box className={classes.button}>
        <Button fullWidth small>
          Подписаться
        </Button>
      </Box>
      <Typography className={classes.subscrNote} component="div">
        Нажимая на кнопку &#34;подписаться&#34;, вы даете свое{' '}
        <Link href={'/agreement'}>
          <a target="_blank">
            <Typography component="span" className={classes.subscrLink}>
              согласие на обработку персональных данных
            </Typography>
          </a>
        </Link>
      </Typography>
      {withFooter && (
        <Box className={classes.footer}>
          <Typography>Поделиться</Typography>
          <Box className={classes.socialList}>
            <Box className={classes.socialItem}>
              <img src="/images/icons/social/twitter.svg" alt="twitter" />
            </Box>
            <Box className={classes.socialItem}>
              <img src="/images/icons/social/facebook.svg" alt="facebook" />
            </Box>
            <Box className={classes.socialItem}>
              <img src="/images/icons/social/google.svg" alt="google" />
            </Box>
            <Box className={classes.socialItem}>
              <img src="/images/icons/social/vk.svg" alt="vk" />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SubscribeItem;
