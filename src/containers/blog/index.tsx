import Head from 'next/head';

import { Box, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Header from 'containers/landing/components/Header';
import { blueLight } from 'styles/colorPalette';
import SliderItem from 'containers/landing/components/SliderItem';

import Footer from '../landing/components/Footer';

import SubscribeItem from './components/SubscribeItem';

const fakeData = [
  {
    id: 1,
    title: 'Комплексные алгоритмы платформы Потенциал страны: новый инструмент для HR и перспективы для специалистов',
    desc: 'Из чего состоит передовая система оценки, которая позволит кандидату найти работу мечты, а бизнесу - идеального сотрудника? ',
    imgPath: '/images/blog/blog-1.jpg',
    date: '12.04.2021',
    released: true,
  },
];

const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    backgroundColor: blueLight,
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.down('lg')]: {
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(5),
    },
  },
  container: {
    maxWidth: 1134,
    margin: '0px auto',
    padding: '0px 60px',
    [theme.breakpoints.down('lg')]: {
      padding: '0px 40px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 16px',
    },
  },
  title: {
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(44),
    color: '#003B77',
    fontFamily: 'inter-bold',
    marginBottom: theme.spacing(6),
    marginTop: theme.spacing(8),
    [theme.breakpoints.down('lg')]: {
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
      marginBottom: theme.spacing(3),
    },
  },
}));

const Blog = () => {
  const classes = useStyles();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.only('sm'));
  const isXs = useMediaQuery<any>((theme) => theme.breakpoints.only('xs'));

  return (
    <>
      <Head>
        <title>Все статьи</title>
        <meta property="og:title" content={'Все статьи'} key="title" />
      </Head>
      <Box className={classes.mainBox}>
        <Header />
        <Box className={classes.container}>
          <Typography component="h1" className={classes.title}>
            Все статьи
          </Typography>
          <Grid container spacing={isSm ? 4 : isXs ? 3 : 6}>
            {fakeData.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <SliderItem item={item} list={true} />
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <SubscribeItem />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Blog;
