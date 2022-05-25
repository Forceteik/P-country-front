import Head from 'next/head';

import { Grid, Hidden } from '@mui/material';

import Header from 'containers/auth/components/Header';
import Slider from 'containers/auth/components/Slider';

import useStyles from '../styles';

const LoginLayout = ({ children, activeRole = 1 }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.grid_container}>
      <Grid item xs={12} md={6}>
        <Head>
          <title>Вход</title>
          <meta property="og:title" content="Вход" key="title" />
        </Head>
        <Header />
        {children}
      </Grid>
      <Hidden mdDown>
        <Grid item md={6}>
          <Slider activeRole={activeRole} />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default LoginLayout;
