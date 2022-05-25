import Head from 'next/head';

import { Box, Grid, Hidden } from '@mui/material';

import Header from 'containers/auth/components/Header';
import Slider from 'containers/auth/components/Slider';

import useStyles from '../styles';

const RegisterLayout = ({ children, activeRole = 0 }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.grid_container}>
      <Grid item xs={12} md={6}>
        <Head>
          <title>Регистрация</title>
          <meta property="og:title" content="Регистрация" key="title" />
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

// RegisterLayout.getInitialProps = () => {
//   return {
//     metaTags: {
//       ogTitle: "Hereee",
//     },
//   };
// };

export default RegisterLayout;
