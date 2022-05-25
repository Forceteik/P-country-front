import { useState } from 'react';
import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import Head from 'next/head';

import { Box, Grid, Hidden, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import queryString from 'querystring';

import Layout from 'containers/layout/main';
import Button from 'components/Button';

import Filter from './Filter';
import CandidatsList from './CandidatsList';
import AsideFilter from './AsideFilter';

const useStyles = makeStyles<any>((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(38),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  mainBox: {
    marginTop: theme.spacing(7.7),
    marginBottom: theme.spacing(11),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(8),
    },
  },
  bottomFilterBtn: {
    position: 'sticky',
    bottom: '2%',
  },
  filterBtn: {
    width: '40%',
    margin: '0px auto',
    marginBottom: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      marginBottom: 0,
    },
  },
}));

const Candidats = () => {
  const classes = useStyles();
  const [openFilter, setOpenFilter] = useState(false);
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const router = useRouter();

  const stringified = queryString.stringify(router.query);

  let axiosParams = `/employee/search?${stringified}`;
  let isVacancySpecifiedSearch = false;

  if (router.query?.vacancy_id) {
    isVacancySpecifiedSearch = true;
    const query = { ...router.query };
    delete query.vacancy_id;

    axiosParams = `/employee/search/vacancy/${router.query.vacancy_id}?${queryString.stringify(query)}`;
  }

  const [{ data, loading }] = useAxios(axiosParams);
  const [dictionaryState] = useAxios('/vacancies/dictionary');

  return (
    <>
      <Head>
        <title>Поиск сотрудников</title>
        <meta property="og:title" content="Поиск сотрудников" key="title" />
      </Head>
      {!(isSm && openFilter) && (
        <Layout>
          <Box className={classes.mainBox}>
            <Grid container spacing={isMobile ? 4 : 5}>
              <Grid item xs={12}>
                <Typography component="h1" className={classes.title}>
                  Кандидаты
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Filter
                  vacancySpecifiedSearch={isVacancySpecifiedSearch}
                  vacancyData={data?.vacancy}
                  openFilter={openFilter}
                  setOpenFilter={setOpenFilter}
                  total={data?.pagination.total}
                />
              </Grid>
              <Grid item xs={12}>
                <CandidatsList
                  openFilter={openFilter}
                  setOpenFilter={setOpenFilter}
                  data={data?.data}
                  pagination={data?.pagination}
                  dictionaryData={dictionaryState.data}
                  vacancySpecifiedSearch={isVacancySpecifiedSearch}
                  loading={loading}
                />
              </Grid>
              <Hidden mdUp>
                <Grid item xs={12} className={classes.bottomFilterBtn}>
                  <Box className={classes.filterBtn}>
                    <Button fullWidth small onClick={() => setOpenFilter(!openFilter)}>
                      Расширенный поиск
                    </Button>
                  </Box>
                </Grid>
              </Hidden>
            </Grid>
          </Box>
        </Layout>
      )}
      <Hidden mdUp>
        {openFilter && (
          <AsideFilter openFilter={openFilter} setOpenFilter={setOpenFilter} dictionaryData={dictionaryState.data} />
        )}
      </Hidden>
    </>
  );
};

export default Candidats;
