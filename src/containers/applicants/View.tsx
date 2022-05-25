import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useAxios from 'axios-hooks';

import { Box, Grid, Hidden, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { Layout } from 'containers/layout/main';
import SubHeader from 'containers/modules/applicant/profile/Content/SubHeader';
import { useStyles as useProfileStyles } from 'containers/modules/applicant/profile';
import NullPage from 'containers/404/NullPage';
import InfoTabs from 'containers/modules/applicant/profile/components/InfoTabs';
import EmployerBtns from 'containers/modules/applicant/profile/Content/SubHeader/EmployerBtns';
import RenderInformation from 'containers/applicants/RenderInformations';
import ProfileProvider, { useProfile } from 'context/ProfileContext';
import { getUserViewRoles } from 'utils/common';

// import downloadPdf from './pdftest';

const useStyles = makeStyles<any>((theme) => ({
  sticky: {
    position: 'sticky',
    bottom: 10,
  },
  grid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3),
    },
  },
}));

const View = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [defaultTab, setDefaultTab] = useState('about');
  // временный костыль, избавимся после, когда разделим логику /me и /profile
  const [competencyGroup, setCompetencyGroup] = useState([]);
  const profileStyles = useProfileStyles();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const classes = useStyles();

  const [{ loading, error }, getUser] = useAxios({ method: 'GET' }, { manual: true });

  const { currentUser: userFromSession } = useProfile();

  const viewRole = getUserViewRoles({ user, currentUser: userFromSession });

  // const isHideContact = viewRole.isGuest || viewRole.isGuestApplicant;

  const isGuestOrAnotherEmployee = viewRole.isGuest || viewRole.isGuestApplicant;

  const handleInviteSubmit = () => {
    // refetch();
  };

  useEffect(() => {
    if (router.query.vacancy_id) {
      setDefaultTab('test-results');
    }
  }, [router.query.vacancy_id]);

  useEffect(() => {
    const { id, vacancy_id } = router.query;

    let url = `/profile/${id}`;
    if (vacancy_id) {
      url += `?vacancy_id=${vacancy_id}`;
    }

    if (id) {
      getUser({ url }).then(({ data }) => {
        setUser(data.data);
        setCompetencyGroup(data.competency_group);
      });
    }
  }, [router.query.id]);
  if (error?.code === 'page_not_found' || error?.code === 'profile_not_found') {
    return <NullPage />;
  }

  let finalCompetencyGroup = [];

  // кандидат прошел все обязательные тесты, competencyGroup доступна
  if (competencyGroup.length !== 0) {
    finalCompetencyGroup = competencyGroup;
  } else if (viewRole.isOwner) {
    // Я владелец страницы, беру данные с сессии, он может быть как пройден, так и нет
    finalCompetencyGroup = userFromSession?.competencyGroup || [];
  }

  // useEffect(() => {
  //   if (user && !loading && competencyGroup) {
  //     downloadPdf();
  //   }
  // }, [user, loading, competencyGroup]);

  return (
    <Layout user={user}>
      {user?.employee?.position && (
        <Head>
          <title>{user.employee?.position}</title>
          <meta property="og:title" content={user.employee?.position} key="title" />
        </Head>
      )}
      {user && <SubHeader user={user} loading={loading} />}
      <Box className={profileStyles.mainBox}>
        <Grid container spacing={4} className={classes.grid}>
          <Grid item xs={12}>
            <Grid container spacing={isSm ? 2 : 7}>
              <Hidden mdDown>
                <Grid item xs={12}>
                  {user && (
                    <InfoTabs
                      user={user}
                      competencyGroup={finalCompetencyGroup}
                      loading={loading}
                      initialSelectedTab={defaultTab}
                    />
                  )}
                </Grid>
              </Hidden>
              {user && (
                <Hidden mdUp>
                  <RenderInformation loading={loading} user={user} competencyGroup={competencyGroup} />
                </Hidden>
              )}
            </Grid>
          </Grid>
        </Grid>
        {!isGuestOrAnotherEmployee && (
          <Hidden smUp>
            <Grid item xs={12} className={classes.sticky}>
              <EmployerBtns currentUser={user} handleInviteSubmit={handleInviteSubmit} />
            </Grid>
          </Hidden>
        )}
      </Box>
    </Layout>
  );
};

const ViewWrappedProfileProvider = () => (
  <ProfileProvider>
    <View />
  </ProfileProvider>
);

export default ViewWrappedProfileProvider;
