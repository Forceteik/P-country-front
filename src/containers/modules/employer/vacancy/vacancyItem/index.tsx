import { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Box, Grid, Hidden, Typography, useMediaQuery } from '@mui/material';

import Layout from 'containers/layout/main';
import PrevLink from 'components/PrevLink';
import Button from 'components/Button';
import { OverlayLoader } from 'components/Loaders';
import NullPage from 'containers/404/NullPage';
import { generateCandidatesLink } from 'utils/common';
import { useSession } from 'context/UserContext';
import StackItem from 'containers/modules/common/vacancy/StackItem';
import EmployerQuestionModal from 'containers/modules/common/modals/EmployerQuestionModal';
import BalanceProvider from 'context/BalanceContext';

import VacancySetting from './components/VacancySetting';
import Candidates from './components/Candidates';
import { useStyles } from './styles';
import VacancyInfoList from './components/VacancyInfoList';
import VacancyDocuments from './components/VacancyDocuments';

const VacancyItem = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const classes = useStyles();

  const { currentUser } = useSession();
  const [openTaskShow, setOpenTaskShow] = useState(false);
  const [openModalWithQuestion, setOpenModalWithQuestion] = useState(true);
  const router = useRouter();
  const isLg = useMediaQuery<any>((theme) => theme.breakpoints.down('lg'));

  useEffect(() => {
    setOpenSettings(false);
  }, [isLg]);

  const { id } = router.query;
  const [{ data, loading, error }] = useAxios(`/vacancies/${id}`, { useCache: false });

  const [{ data: dataC, loading: loadingC }] = useAxios(`employee/search/vacancy/${id}?`);
  const candidatesCount = dataC?.pagination.count;
  const candidates = dataC?.data || [];

  const [{ data: dataQ, loading: loadingQ }] = useAxios(`/vacancies/${id}/candidate_search`);
  const [{ data: dataIsShowQuestion }, refetch] = useAxios(`/vacancies/${id}/candidate_search`, { useCache: false });

  if (loading || loadingQ) {
    return <OverlayLoader />;
  }

  if (error?.code === 'page_not_found') {
    return <NullPage linkText="Вернуться в профиль" link="/employer/profile" />;
  }

  if (data?.data?.owner.id !== currentUser?.id) {
    return <NullPage linkText="Вернуться в профиль" link="/employer/profile" />;
  }

  const v = data.data;
  const responsesCount = data?.responses_count;

  //ссылка с рекомендованными кандидатами по данной вакансии
  const recommendedCandidatesLink = generateCandidatesLink(v);

  return (
    <Layout>
      <Head>
        <title>{v.name}</title>
        <meta property="og:title" content={v.name} key="title" />
      </Head>
      {!openSettings ? (
        <Box className={classes.mainBox}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PrevLink link={'/employer/profile'} text={'Назад к профилю'} />
            </Grid>
            <Grid item xs={12}>
              <Grid container columnSpacing={4}>
                <Grid item xs={12} lg={9}>
                  <Grid container rowGap={4}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Box display={'flex'} alignItems={'center'}>
                            <Typography className={classes.companyTitle}>{v.owner.employer.name}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className={classes.name} component="h1">
                            {v.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} overflow="hidden">
                          <VacancyInfoList vacancy={v} />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Candidates
                        vacancy={v}
                        candidatesCount={candidatesCount}
                        loading={loadingC}
                        candidates={candidates}
                        recommendedCandidatesLink={recommendedCandidatesLink}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box dangerouslySetInnerHTML={{ __html: v.description }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component="h3" className={classes.blockTitle}>
                        Профессиональные навыки
                      </Typography>
                      <Box>
                        {v.qualities.map((item, key) => (
                          <StackItem key={key} text={item.name.name} />
                        ))}
                      </Box>
                    </Grid>
                    {v.document && (
                      <VacancyDocuments vacancy={v} setOpenTaskShow={setOpenTaskShow} openTaskShow={openTaskShow} />
                    )}
                  </Grid>
                </Grid>
                <Hidden lgDown>
                  <Grid item xs={3}>
                    <VacancySetting
                      responsesCount={responsesCount}
                      item={v}
                      candidatesCount={candidatesCount}
                      recommendedCandidatesLink={recommendedCandidatesLink}
                      dataIsShowQuestion={dataIsShowQuestion}
                    />
                  </Grid>
                </Hidden>
                <Hidden lgUp>
                  <Grid item xs={12} position={'sticky'} bottom={'-3%'}>
                    <Box className={classes.filterBtn}>
                      <Button fullWidth small onClick={() => setOpenSettings(!openSettings)}>
                        Управление вакансией
                      </Button>
                    </Box>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Hidden lgUp>
          <VacancySetting
            responsesCount={responsesCount}
            openSettings={openSettings}
            setOpenSettings={setOpenSettings}
            item={v}
            candidatesCount={candidatesCount}
            recommendedCandidatesLink={recommendedCandidatesLink}
            dataIsShowQuestion={dataIsShowQuestion}
          />
        </Hidden>
      )}
      {v.status === 'hidden' && dataQ.data.candidate_search_show && (
        <EmployerQuestionModal
          open={openModalWithQuestion}
          handleClose={() => setOpenModalWithQuestion(false)}
          vacancyId={v.id}
          refetch={refetch}
        />
      )}
    </Layout>
  );
};

const VacancyItemWrapperBalanceProvider = () => (
  <BalanceProvider>
    <VacancyItem />
  </BalanceProvider>
);

export default VacancyItemWrapperBalanceProvider;
