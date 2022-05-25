import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

import { Box, Grid, Hidden, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Progress from 'containers/modules/applicant/profile/components/Progress';
import Invites from 'containers/modules/common/profile/Invites';
import InfoTabs from 'containers/modules/applicant/profile/components/InfoTabs';
import EducationApplicantInfo from 'containers/modules/common/modals/EducationApplicantInfo';
import Layout from 'containers/layout/main';
import { EDUCATION_RELEASE_TIME } from 'constants/common';
import ProfileProvider, { useProfile } from 'context/ProfileContext';
import EveryMonthQuestionModal from 'containers/modules/common/modals/EveryMonthQuestionModal';

import About from '../../common/profile/About';

import TestAndCompetency from './Content/TestAndCompetency';
import Contacts from './Content/Contacts/Contacts';
import Activity from './Content/Activity';
import SubHeader from './Content/SubHeader';

export const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    marginBottom: theme.spacing(7),
    marginTop: theme.spacing(4),
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3),
    },
  },
  infoGrid: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
  footerBox: {
    [theme.breakpoints.down('md')]: {
      marginTop: '10px',
    },
  },
  sticky: {
    position: 'sticky',
    top: 10,
  },
}));

const Index = () => {
  const classes = useStyles();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  const profile = useProfile();
  const currentUser = profile.currentUser;

  const competencyGroup = currentUser.competencyGroup;

  const [isEducationApplicantInfoModalOpen, setIsEducationApplicantInfoModalOpen] = useState<boolean>(false);
  const [isEveryMonthQuestionModalOpen, setEveryMonthQuestionModalOpen] = useState<boolean>(
    profile.employmentStatus.employment_status_show,
  );
  const [selectedInitialTab, setSelectedInitialTab] = useState<string>('about');

  // реф для того чтобы можно было доскроллить пользователя до табов
  const educationScrollRef = useRef(null);
  const checkForPopupInfo = () => {
    //если это новый пользователь, ничего не делаем, не отобржаем модалку
    if (currentUser.createTime > EDUCATION_RELEASE_TIME) {
      return null;
    }

    // делаем таймаут, тк при логие происходит перезагрузка страницы
    setTimeout(() => {
      const token = localStorage.getItem('talantyEmployeeEducationModalShownDate');
      const isHigherEducation = !!currentUser.education.filter(
        (item) => item.type === 'master' || item.type === 'bachelor',
      ).length;

      // У пользователя нет ни даты последнего показа (ни разу не показывали модалку) ни высшего образования
      // Открываем модалку и записываем последнюю дату открытия
      if (!token && !isHigherEducation) {
        localStorage.setItem('talantyEmployeeEducationModalShownDate', Date.now().toString());
        setIsEducationApplicantInfoModalOpen(true);
        return;
      }

      // У пользователя есть дата последнего показа, но нет высшего образования
      if (token && parseInt(token) && !isHigherEducation) {
        // Проверяем прошла ли неделя с момента последнего открытия модалки
        const isWeekPassedOnToken = Date.now() - parseInt(token) > 604800000;

        // Если прошла, то открываем модалку и записываем последнюю дату открытия
        if (isWeekPassedOnToken) {
          localStorage.setItem('talantyEmployeeEducationModalShownDate', Date.now().toString());
          setIsEducationApplicantInfoModalOpen(true);
        }
      }
    }, 2000);
  };
  // вычисляет есть ли у пользователя высшее образование и насколько давно мы показывали ему модалку с просьбой заполнения образования
  useEffect(() => {
    checkForPopupInfo();
  }, []);

  // Закрываем модалку, открываем табу образования, скроллим до табов
  const handleAcceptEducationInfoModal = () => {
    setSelectedInitialTab('about');
    setIsEducationApplicantInfoModalOpen(false);
    educationScrollRef.current.scrollIntoView();
  };

  const handleCloseModal = (setState) => {
    setState(false);
  };

  return (
    <Layout currentPage="Профиль">
      <Head>
        <title>Профиль</title>
        <meta property="og:title" content="Профиль" key="title" />
      </Head>
      <SubHeader loading={false} />
      <Progress />
      <Box className={classes.mainBox}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container spacing={4} className={classes.infoGrid}>
              <Hidden mdDown>
                <Grid item xs={8}>
                  <Invites view="employee" />
                </Grid>
              </Hidden>
              <Grid item xs={12} md={4}>
                <Activity title="Активность" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={isSm ? 1 : 7}>
              <Hidden mdDown>
                <Grid item xs={12}>
                  <div ref={educationScrollRef} />
                  <InfoTabs
                    initialSelectedTab={selectedInitialTab}
                    competencyGroup={competencyGroup}
                    user={currentUser}
                  />
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <div ref={educationScrollRef} />
                <Grid item xs={12}>
                  <About title="О себе" user={currentUser} />
                </Grid>
                <Grid item xs={12}>
                  <Contacts />
                </Grid>
                <Grid item xs={12}>
                  <TestAndCompetency user={currentUser} isOwner={true} competencyGroup={competencyGroup} />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <EducationApplicantInfo
        open={isEducationApplicantInfoModalOpen}
        onClose={() => handleCloseModal(setIsEducationApplicantInfoModalOpen)}
        onGoToEducation={handleAcceptEducationInfoModal}
        gender={currentUser.employee.gender}
        name={currentUser.name}
        surname={currentUser.surname}
      />
      <EveryMonthQuestionModal
        open={isEveryMonthQuestionModalOpen}
        onClose={() => handleCloseModal(setEveryMonthQuestionModalOpen)}
      />
    </Layout>
  );
};

const IndexWrappedProfileProvider = () => (
  <ProfileProvider>
    <Index />
  </ProfileProvider>
);

export default IndexWrappedProfileProvider;
