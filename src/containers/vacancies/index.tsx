import { useState } from 'react';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Grid, Hidden, useMediaQuery } from '@mui/material';

import Layout from 'containers/layout/main';

import ProfileProvider from '../../context/ProfileContext';

import SubHeader from './components/SubHeader';
import Filter from './components/Filter';
import VacancyList from './components/VacancyList';
import AsideFilter from './components/AsideFilter';

import { prepareQueryParamsForVacancies } from 'utils/common';

const Vacancy = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const router = useRouter();

  const queryParams = prepareQueryParamsForVacancies(router.query);

  const [{ data, loading }] = useAxios(`/vacancies/search?${queryParams}`, { useCache: false });
  const [{ data: dictionaryData, loading: dictionaryLoading }] = useAxios('/vacancies/dictionary');

  return (
    <>
      <Head>
        <title>Поиск вакансий</title>
        <meta property="og:title" content="Поиск вакансий" key={'title'} />
      </Head>
      {!(isSm && openFilter) && (
        <Layout>
          <Grid container spacing={isMobile ? 4 : 5}>
            <Grid item xs={12}>
              <SubHeader />
            </Grid>
            <Grid item xs={12}>
              <Filter openFilter={openFilter} setOpenFilter={setOpenFilter} total={data?.pagination?.total} />
            </Grid>
            <Grid item xs={12}>
              <VacancyList
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                data={data?.data}
                pagination={data?.pagination}
                dictionaryData={dictionaryData?.data}
                loading={loading}
              />
            </Grid>
          </Grid>
        </Layout>
      )}
      {!dictionaryLoading && (
        <Hidden mdUp>
          {openFilter && (
            <AsideFilter openFilter={openFilter} setOpenFilter={setOpenFilter} dictionaryData={dictionaryData?.data} />
          )}
        </Hidden>
      )}
    </>
  );
};

const VacancyWrappedProfileProvider = () => (
  <ProfileProvider>
    <Vacancy />
  </ProfileProvider>
);

export default VacancyWrappedProfileProvider;
