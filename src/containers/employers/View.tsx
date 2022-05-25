import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';

import { Box, Grid, Hidden, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

import Layout from 'containers/layout/main';
import SubHeader from 'containers/modules/employer/profile/components/SubHeader';
// import About from "containers/modules/common/profile/About";
import Contacts from 'containers/modules/common/profile/Contacts/Contacts';
import Vacancy from 'containers/modules/employer/profile/components/Vacancy';
import Tasks from 'containers/modules/employer/profile/Tasks/index';
import NullPage from 'containers/404/NullPage';
import { getUserViewRoles } from 'utils/common';
import About from 'containers/modules/employer/profile/components/About';
import { useProfile } from 'context/ProfileContext';

const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(4),
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4),
    },
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(26),
    marginBottom: theme.spacing(3),
  },
  fixed: {
    position: 'sticky',
    top: 0,
  },
  infoGrid: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
}));

const Profile = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [{ loading, error }, getUser] = useAxios({ method: 'GET' }, { manual: true });

  const sessionUser = useProfile().currentUser;
  const viewRole = getUserViewRoles({ user, currentUser: sessionUser });
  const isGuest = viewRole.isGuest;

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getUser({ url: `/profile/${id}` }).then(({ data }) => {
        setUser(data.data);
      });
    }
  }, [router.query.id]);

  if (error?.code === 'page_not_found' || error?.code === 'profile_not_found') {
    return <NullPage />;
  }

  return (
    <Layout>
      <Head>
        {user?.employer.name && (
          <>
            <title>{user.employer.name}</title>
            <meta property="og:title" content={user.employer.name} key="title" />
          </>
        )}
      </Head>
      {user && <SubHeader user={user} loading={loading} />}
      <Box className={classes.mainBox}>
        <Grid container spacing={4}>
          <Grid item sm={12} md={8}>
            <Grid container spacing={isMobile ? 2 : 7}>
              <Grid item xs={12}>
                {loading ? (
                  <>
                    <Skeleton height={40} width={250} />
                    <Box mt={2}>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width={150} />
                    </Box>
                  </>
                ) : (
                  user && <About user={user} title="О работодателе" />
                )}
              </Grid>
              <Hidden mdUp>
                {!isGuest && (
                  <Grid item xs={12} sm={6}>
                    <Contacts user={user} employer loading={loading} />
                  </Grid>
                )}
              </Hidden>
              {!loading && user && (
                <Grid item xs={12}>
                  <Vacancy user={user} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Hidden mdDown>
            <Grid item md={4}>
              <Grid container direction="column" spacing={7}>
                {!isGuest && (
                  <Grid item>
                    <Contacts user={user} employer loading={loading} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Hidden>
          {!loading && user && (
            <Grid item xs={12}>
              <Tasks user={user} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Profile;
