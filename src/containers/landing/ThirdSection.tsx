import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    color: theme.palette.secondary.dark,
    marginTop: theme.spacing(10),
  },
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
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(10),
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(44),
    marginBottom: theme.spacing(8),
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(26),
      textAlign: 'left',
      marginBottom: theme.spacing(4),
    },
  },
}));
const ThirdSection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.container}>
        <Box className={classes.inner}>
          <Typography className={classes.title}>Кому будет полезно?</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Item
                title={'Школьникам'}
                description={
                  'Сможете определить свой карьерный путь уже сейчас и начать заранее развивать актуальные навыки.'
                }
                backgroundColor={'#FFF5E5'}
                imagePath="/images/landing/section_3_1.png"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Item
                title={'Студентам'}
                description={
                  'Скорректируете свой карьерный путь, получите полезные рекомендации и приглашения в компании.'
                }
                backgroundColor={'#FFEAF3'}
                imagePath="/images/landing/section_3_2.png"
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Item
                title={'Специалистам'}
                description={
                  'Узнаете актуальные требования и навыки, нужные для вашей профессии. Подберете те вакансии, в которых сможете максимально раскрыть свой потенциал.'
                }
                backgroundColor={'#DBDEFF'}
                imagePath="/images/landing/section_3_3.png"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const useItemStyles = makeStyles<any, any>((theme) => ({
  container: {
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    borderRadius: 15,
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 'unset',
    },
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  box_img: {
    height: '60%',
    [theme.breakpoints.down('lg')]: {
      height: 300,
    },
    [theme.breakpoints.down('md')]: {
      maxHeight: 200,
    },
  },
  infoContainer: {
    height: '38%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(33),
    textAlign: 'center',
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.typography.pxToRem(30),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(28),
    },
  },
  desc: {
    textAlign: 'center',
  },
}));

const Item = ({ imagePath, title, description, backgroundColor }) => {
  const classes = useItemStyles({ backgroundColor });

  return (
    <Box className={classes.container}>
      <Box className={classes.box_img}>
        <img src={imagePath} alt="" className={classes.img} />
      </Box>
      <Box className={classes.infoContainer}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Typography className={classes.desc}>{description}</Typography>
      </Box>
    </Box>
  );
};

export default ThirdSection;
