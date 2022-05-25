import Head from 'next/head';

import { Box, Typography } from '@mui/material';

import Header from 'containers/landing/components/Header';

import Footer from '../landing/components/Footer';

import TeamList from './TeamList';
import Banner from './Banner';
import { useTeamStyles } from './style';

const Team = () => {
  const classes = useTeamStyles();
  return (
    <>
      <Head>
        <title>Команда</title>
        <meta property="og:title" content={'Команда'} key="title" />
      </Head>
      <Box className={classes.mainBox}>
        <Header />
        <Box className={classes.container}>
          <Box className={classes.topText}>
            <Typography component="h1" className={classes.title}>
              Команда
            </Typography>
            <Typography className={classes.descr}>
              Мы – команда увлеченных своим делом высококлассных специалистов. В любой проект мы вкладываем весь свой
              немалый опыт и талант, доводя каждую работу до совершенства.
            </Typography>
          </Box>
          <TeamList />
          <Banner />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Team;
