import { useEffect, useState, useRef } from 'react';
import useAxios from 'axios-hooks';
import Head from 'next/head';

import { Box, Grid, Hidden, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Layout from 'containers/layout/main';
import Contacts from 'containers/modules/common/profile/Contacts/Contacts';
import Invites from 'containers/modules/common/profile/Invites';
import { OverlayLoader } from 'components/Loaders';
import Button from 'components/Button';
import BeforeCreateVacancy from 'containers/modules/common/modals/BeforeCreateVacancy';
import AllEmployerInfo from 'containers/modules/common/modals/AllEmployerInfo';
import { EDUCATION_RELEASE_TIME } from 'constants/common';
import ProfileProvider, { useProfile } from 'context/ProfileContext';
import BalanceProvider from 'context/BalanceContext';

import Tasks from './Tasks';
import Activity from './components/Activity';
import Vacancy from './components/Vacancy';
import About from './components/About';
import Progress from './components/Progress';
import SubHeader from './components/SubHeader';

const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(4),
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4),
    },
  },
  infoGrid: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
  bottomBtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'sticky',
    bottom: '3%',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { currentUser } = useProfile();
  const [openModal, setOpenModal] = useState(false);
  const [isEmployerInfoOpenModal, setIsEmployerInfoOpenModal] = useState(false);

  //для того, чтобы после модалки с информацией о попадании всех вакансий в черновики был открыт аккордеон Черновики
  const [isExpanded, setIsExpanded] = useState('null');
  // реф для того чтобы можно было доскроллить пользователя до черновиков
  const draftScrollRef = useRef(null);

  const {
    currentUser: { views = 0, responses = 0 },
    profileLoading,
  } = useProfile();

  const userId = currentUser.id;
  const [{ data, loading }, refetch] = useAxios(`/vacancies/employer/${userId}`, { useCache: false });
  const draftCount = data?.data?.draft_list.count;
  const specializationsCount = data?.data?.specializations.length;

  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  const checkForDraftPopup = () => {
    //если это новый пользователь, ничего не делаем, не отобржаем модалку
    if (currentUser.createTime > EDUCATION_RELEASE_TIME) {
      return null;
    }

    //чтобы модалка появилась после обновления страницы
    setTimeout(() => {
      const isEmployerInfoModalViewed = !!localStorage.getItem('isEmployerInfoModalViewed2');
      if (!isEmployerInfoModalViewed) {
        setIsEmployerInfoOpenModal(true);
      }
    }, 2000);
  };

  useEffect(() => {
    checkForDraftPopup();
  }, []);

  const handleCreateVacancy = () => {
    setOpenModal(true);
  };

  if (profileLoading) {
    return <OverlayLoader />;
  }

  //просто закрываем модалку, не скролим
  const handleEmployerInfoCloseModal = () => {
    localStorage.setItem('isEmployerInfoModalViewed2', 'true');
    setIsEmployerInfoOpenModal(false);
  };

  // Закрываем модалку, скроллим до черновиков
  const handleAcceptEmployerInfoModal = () => {
    localStorage.setItem('isEmployerInfoModalViewed2', 'true');
    setIsEmployerInfoOpenModal(false);
    setIsExpanded('draftExpanded');
    draftScrollRef.current.scrollIntoView();
  };

  return (
    <Layout currentPage="Профиль">
      <Head>
        <title>Профиль</title>
        <meta property="og:title" content="Профиль" key="title" />
      </Head>
      <SubHeader />
      <Progress draftCount={draftCount} specializationsCount={specializationsCount} loading={loading} />
      <Box className={classes.mainBox}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container spacing={4} className={classes.infoGrid}>
              <Hidden mdDown>
                <Grid item xs={8}>
                  <Invites title="Общая статистика откликов" />
                </Grid>
              </Hidden>
              <Grid item xs={12} md={4}>
                <Activity responseCount={responses} viewsCount={views} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={8}>
            <Grid container spacing={isSm ? 5 : 7}>
              <Grid item xs={12}>
                <About title="О компании" />
              </Grid>
              <Hidden mdUp>
                <Grid item xs={12}>
                  <Contacts employer />
                </Grid>
              </Hidden>
              <Grid item xs={12}>
                <div ref={draftScrollRef} />
                <Vacancy refetchProfileProgress={refetch} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
              </Grid>
            </Grid>
          </Grid>
          <Hidden mdUp>
            <Grid item xs={12} sm={6} className={classes.bottomBtn}>
              <Button fullWidth small onClick={handleCreateVacancy}>
                Создать вакансию
              </Button>
            </Grid>
          </Hidden>
          <Hidden mdDown>
            <Grid item md={4}>
              <Grid container direction="column" spacing={7}>
                <Grid item>
                  <Contacts employer />
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
          <Grid item xs={12}>
            <Tasks />
          </Grid>
        </Grid>
      </Box>
      <BeforeCreateVacancy open={openModal} setOpen={setOpenModal} />
      <AllEmployerInfo
        open={isEmployerInfoOpenModal}
        onClose={handleEmployerInfoCloseModal}
        onGoToDrafts={handleAcceptEmployerInfoModal}
      />
    </Layout>
  );
};

const WrappedProfileProvider = () => (
  <ProfileProvider>
    <BalanceProvider>
      <Profile />
    </BalanceProvider>
  </ProfileProvider>
);

export default WrappedProfileProvider;
