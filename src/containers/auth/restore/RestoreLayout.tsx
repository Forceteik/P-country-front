import Head from 'next/head';

import { Box, Grid, Hidden } from '@mui/material';

import useStyles from 'containers/auth/styles';
import Header from 'containers/auth/components/Header';
import Slider from 'containers/auth/components/Slider';

const RestoreLayout = ({ children, bypass = false, activeRole = 0 }) => {
  const classes = useStyles();
  if (bypass) {
    return children;
  }

  return (
    <Grid container className={classes.grid_container}>
      <Grid item xs={12} md={6}>
        <Head>
          <title>Восстановление</title>
          <meta property="og:title" content="Восстановление" key="title" />
        </Head>
        <Header />
        <Box className={classes.leftContainer}>{children}</Box>
      </Grid>
      <Hidden mdDown>
        <Grid item md={6}>
          <Slider activeRole={activeRole} />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default RestoreLayout;
