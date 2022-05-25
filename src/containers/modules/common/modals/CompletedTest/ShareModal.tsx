import cx from 'classnames';

import { Box, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { useSession } from 'context/UserContext';
import { personalTypeDictionary } from 'constants/common';
import Close from 'components/icons/Close';
import { blueMain, darkGray } from 'styles/colorPalette';

import { useItemStyles } from '../styles';

import SocialList from './SocialList';

const useShareStyle = makeStyles<any>((theme) => ({
  gridContainer: {
    [theme.breakpoints.down('md')]: {
      'flexDirection': 'column-reverse',
      '& p': {
        textAlign: 'center',
      },
    },
  },
  shareTitle: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
    '& span': {
      fontSize: theme.typography.pxToRem(38),
      fontFamily: 'inter-bold',
      lineHeight: '110%',
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(26),
      },
    },
  },
  role: {
    position: 'relative',
    backgroundColor: blueMain,
    borderRadius: 4,
    display: 'inline-block',
    padding: '9px 18px 15px 18px',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      margin: '16px 0px 24px 0px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '9px 18px 9px 18px',
      width: '100%',
      marginTop: theme.spacing(1.5),
    },
  },
  percent: {
    position: 'absolute',
    bottom: -22,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'fit-content',
    color: darkGray,
    letterSpacing: '0.335em',
    fontSize: theme.typography.pxToRem(12),
  },
  roleName: {
    fontSize: theme.typography.pxToRem(38),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
    },
  },
  paragraph: {
    color: darkGray,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
    },
  },

  img: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: 'unset',
      maxHeight: 250,
    },
    [theme.breakpoints.down('md')]: {
      maxHeight: 197,
    },
  },
}));

const ShareModal = ({ handleClose }) => {
  const classes = useItemStyles();
  const shareClasses = useShareStyle();

  const currentUser = useSession().currentUser;
  const personType = currentUser.mbti.result.config_type.name;
  const personPersent = personalTypeDictionary[currentUser.mbti.result.config_type.scale];

  return (
    <Box className={cx(classes.modalPaper, classes.pShare)}>
      <Box className={classes.closeIcon} onClick={handleClose}>
        <Close color={'#fff'} />
      </Box>
      <Grid container spacing={1} className={shareClasses.gridContainer} alignItems="center">
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box className={shareClasses.shareTitle}>
                <Typography component="span">Я</Typography>
                <Box className={shareClasses.role}>
                  <Typography className={shareClasses.roleName}>{personType}</Typography>
                  <Typography className={shareClasses.percent}>{personPersent}% людей в мире</Typography>
                </Box>
                <Typography component="span">А кто ты?</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography className={shareClasses.paragraph}>
                Расскажите своим друзьям и коллегам о своем профиле на платформе Потенциал страны и сравните результаты.
                Опубликованный в социальных сетях профиль значительно увеличит ваши шансы получить интересную и
                высокооплачиваемую работу или классную стажировку!
              </Typography>
              <Typography>Нажмите на соц сеть в которой хотите разместить пост или скопируйте ссылку</Typography>
            </Grid>
            <Grid item xs={12}>
              <SocialList />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} md={4}>
          <img src="/images/modals/shareModal.png" className={shareClasses.img} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShareModal;
