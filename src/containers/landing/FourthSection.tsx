import Link from 'next/link';

import { Box, Grid, Typography, Hidden } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import TextField from 'components/TextField';
import Button from 'components/Button';

const useStyles = makeStyles<any>((theme) => ({
  container: {
    maxWidth: 1328,
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    margin: '0px auto',
    [theme.breakpoints.only('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      height: 'auto',
    },
  },
  inner: {
    paddingTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: 44,
    textAlign: 'center',
    paddingBottom: theme.spacing(10),
    color: theme.palette.secondary.dark,
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(26),
      textAlign: 'left',
      paddingBottom: theme.spacing(4),
    },
  },
  item: {},
  subscribeContainer: {
    display: 'flex',
    paddingTop: theme.spacing(10),
  },
  subscribeImg: {
    width: '100%',
  },
  subscribeTitle: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(36),
    color: theme.palette.secondary.dark,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(26),
      textAlign: 'center',
    },
  },
  subscribeDescription: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  subscribeNote: {
    fontFamily: 'inter',
    marginTop: theme.spacing(3),
    fontSize: theme.typography.pxToRem(14),
    color: 'rgba(37, 51, 65, 0.6)',
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  subscribeNoteLink: {
    textDecoration: 'underline',
  },
  subscribeButton: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  input: {
    'marginBottom': theme.spacing(2),
    '& label': {
      [theme.breakpoints.only('sm')]: {
        transform: 'translate(27px, 28px) scale(1)',
      },
      [theme.breakpoints.only('xs')]: {
        transform: 'translate(27px, 22px) scale(1)',
      },
    },
  },
}));
const FourthSection = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.container}>
        <Box className={classes.inner}>
          <Typography className={classes.title}>Что еще умеет платформа Потенциал страны</Typography>
          {/* Оля: попросили убрать блок: https://www.notion.so/preontech/1ea3163a20824ef0876442daf19c23dd */}
          {/* <Item
            imagePath="/images/landing/section_4_1.png"
            background="#DCF5F2"
            imageLeft
            title="Персонализированные рекомендации"
            description="Искусственный интеллект платформы подберет вам наиболее подходящие вакансии и даст рекомендации по саморазвитию."
          /> */}
          <Item
            imagePath="/images/landing/section_4_2.png"
            background="#F3F5FF"
            title="Индивидуальная траектория развития"
            description="Мы покажем, какие навыки вам нужны для продвижения по карьерной лестнице."
          />
          <Item
            imagePath="/images/landing/section_4_3.png"
            background="#FFF4E4"
            imageLeft
            title="Прогнозирование карьерного пути"
            description="Предложим несколько вариантов карьерного пути на основе вашего психологического портрета и покажем возможные сроки карьерного роста, а также вилки зарплат на каждом этапе."
          />

          <Box className={classes.subscribeContainer}>
            <Grid container alignItems="center" spacing={3} justifyContent="center">
              <Hidden mdDown>
                <Grid item xs={12} sm={5}>
                  <img src="/images/landing/section_4_4.png" alt="" className={classes.subscribeImg} />
                </Grid>
              </Hidden>

              <Grid item xs={12} md={6}>
                <Typography variant={'h4'} className={classes.subscribeTitle}>
                  Не пропускайте новые статьи и обновления
                </Typography>
                <Typography className={classes.subscribeDescription}>
                  Мы не будем спамить — вы будете получать рассылку с актуальными новостями, полезными материалами и
                  обновлениями платформы.
                </Typography>

                <TextField label={'Ваш e-mail'} fullWidth className={classes.input} />
                <Button fullWidth>Подписаться</Button>
                <Typography className={classes.subscribeNote}>
                  Нажимая на кнопку &#34;подписаться&#34;, вы даете свое{' '}
                  <Link href={'/agreement'}>
                    <a className={classes.subscribeNoteLink} target="_blank">
                      согласие на обработку персональных данных
                    </a>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const useItemStyles = makeStyles<any, any>((theme) => ({
  container: {
    display: 'flex',
    background: ({ background }) => background,
    padding: '40px',
    borderRadius: 40,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
      paddingLeft: '0 !important',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      paddingLeft: `${theme.spacing(2)} !important`,
    },
  },

  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(30),
    color: theme.palette.secondary.dark,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(20),
      textAlign: 'center',
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      marginBottom: theme.spacing(1),
    },
  },
  desc: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      'marginBottom': theme.spacing(2),
      'height': 250,
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    },
  },
  contentContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      padding: `0 ${theme.spacing(2)}`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
}));

const Item = ({ imagePath, title, description, background, imageLeft = false }) => {
  const classes = useItemStyles({ background, imageLeft });
  const Image = () => (
    <Box className={classes.imgContainer}>
      <img src={imagePath} alt="" />
    </Box>
  );
  const Content = () => (
    <Box className={classes.contentContainer}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Typography className={classes.desc}>{description}</Typography>
      {/*<Button>Подробнее</Button>*/}
    </Box>
  );
  return (
    <Box className={classes.container}>
      <Hidden mdDown>
        <Grid container alignItems="center">
          <Grid item sm={12} md={5}>
            {imageLeft ? <Image /> : <Content />}
          </Grid>
          <Grid item md={1}></Grid>
          <Grid item sm={12} md={5}>
            {imageLeft ? <Content /> : <Image />}
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid justifyContent="center">
          <Grid item sm={12}>
            <Image />
          </Grid>
          <Grid item sm={12}>
            <Content />
          </Grid>
        </Grid>
      </Hidden>
    </Box>
  );
};

export default FourthSection;
