import cx from 'classnames';
import Link from 'next/link';

import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Step from 'containers/landing/components/Step';
import Button from 'components/Button';
import { useSession } from 'context/UserContext';
import { landingBlack } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    color: landingBlack,
  },
  container: {
    maxWidth: 1328,
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    margin: '0px auto',
    [theme.breakpoints.down('lg')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.only('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  boxItem: {
    marginBottom: theme.spacing(10),
    [theme.breakpoints.only('xs')]: {
      marginBottom: theme.spacing(2),
    },
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(44),
    textAlign: 'center',
    marginBottom: theme.spacing(10),
    width: '80%',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(33),
      marginBottom: theme.spacing(6),
      width: '100%',
    },
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(26),
      textAlign: 'left',
      marginBottom: theme.spacing(0),
    },
  },
  item: {
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  itemImg: {
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      marginTop: theme.spacing(5),
    },
  },
  paddingLeft: {
    paddingLeft: theme.spacing(10),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(6),
    },
    [theme.breakpoints.only('xs')]: {
      paddingLeft: 0,
    },
  },
  paddingRight: {
    paddingRight: theme.spacing(10),
    [theme.breakpoints.only('xs')]: {
      paddingRight: 0,
    },
  },
  // itemContent: {
  //   width: "80%"
  // },
  itemTitle: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(30),
    color: theme.palette.secondary.dark,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
      fontSize: theme.typography.pxToRem(23),
    },
  },
  itemDesc: {
    // width: "80%",
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
      width: '100%',
    },
  },
  button: {
    [theme.breakpoints.only('xs')]: {
      marginTop: theme.spacing(3),
    },
  },
}));
const SecondSection = () => {
  const classes = useStyles();
  const { currentUser } = useSession();
  return (
    <Box className={classes.mainBox}>
      <Box className={classes.container}>
        <Box className={classes.inner}>
          <Typography variant="h3" className={classes.title}>
            Потенциал страны поможет раскрыть ваши таланты и получить работу мечты
          </Typography>
          <Box className={classes.boxItem}>
            <Grid container alignItems="center">
              <Grid item xs={12} md={1} />
              <Grid item xs={12} sm={6} md={5}>
                <img
                  src="/images/landing/section_2_1.png"
                  alt=""
                  className={cx(classes.itemImg, classes.paddingRight)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Step number={1} backgroundColor="#F0F5FB" />
                <Typography variant="h4" className={classes.itemTitle}>
                  Тестирование всех сторон личности
                </Typography>
                <Typography className={classes.itemDesc}>
                  Алгоритм платформы Потенциал страны включает 7 групп тестов для оценки интеллекта, мотивации,
                  компетенций, психологических качеств и др. За 120 минут вы получите рекомендации по выбору профессии,
                  карьерного пути, развитию сильных сторон, зонам роста для достижения ваших целей и предложение о
                  собеседовании или трудоустройстве.
                </Typography>
              </Grid>
              <Grid item xs={12} md={2} />
            </Grid>
          </Box>
          <Box className={classes.boxItem}>
            <Grid container alignItems="center" className={classes.item}>
              <Grid item xs={12} md={2} />
              <Grid item xs={12} sm={6} md={4}>
                <Step number={2} backgroundColor="#DCF5F2" />
                <Typography variant="h4" className={classes.itemTitle}>
                  Резюме, которое отражает ваш настоящий потенциал
                </Typography>
                <Typography className={classes.itemDesc}>
                  Вам больше не придется думать, чем заполнить графу “опыт”. На платформе Потенциал страны ваш
                  потенциальный работодатель будет оценивать только ваши реальные навыки и личные качества
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <img
                  src="/images/landing/section_2_2.png"
                  alt=""
                  className={cx(classes.itemImg, classes.paddingLeft)}
                />
              </Grid>
              <Grid item xs={12} md={1} />
            </Grid>
          </Box>
          <Box className={classes.boxItem}>
            <Grid container alignItems="center">
              <Grid item xs={12} md={1} />
              <Grid item xs={12} sm={6} md={5}>
                <img
                  src="/images/landing/section_2_3.png"
                  alt=""
                  className={cx(classes.itemImg, classes.paddingRight)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Step number={3} backgroundColor="#FFEFF6" />
                <Typography variant="h4" className={classes.itemTitle}>
                  Идеальный работодатель найдет вас сам
                </Typography>
                <Typography className={classes.itemDesc}>
                  Вам не придется откликаться на тысячи вакансий, проходить сотни напряженных собеседований. Алгоритм
                  платформы Потенциал страны предложит самые подходящие именно вам вакансии, в рамках которых
                  работодатель заинтересован в вас также сильно, как и вы в нем
                </Typography>
              </Grid>
              <Grid item xs={12} md={2} />
            </Grid>
          </Box>
          <Box className={classes.button} display="flex" justifyContent="center">
            <Link href={currentUser ? '/applicant/tests' : '/auth'}>
              <Button>Пройти тестирование</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SecondSection;
