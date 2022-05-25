import { useState } from 'react';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';

import queryString from 'querystring';

import TextField from 'components/TextField';
import Layout from 'containers/layout/main';
import CustomPagination from 'components/CustomPagination';
import { SelectText } from 'components/Select';
import Button from 'components/Button';
import { employerResponsesOptions } from 'constants/common';
import { withClearPagination } from 'utils/common';
import RenderResponses from 'containers/modules/employer/responses/RenderResponses';

import Activity from '../profile/components/Activity';

const useStyles = makeStyles<any>((theme) => ({
  inner: {
    marginTop: theme.spacing(7.7),
    marginBottom: theme.spacing(11),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(4),
    },
  },
  title: {
    fontSize: 38,
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('md')]: {
      fontSize: 32,
    },
  },
}));

const Responses = () => {
  const classes = useStyles();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const router: any = useRouter();

  const stringified = queryString.stringify(router.query);

  const [{ data, loading }] = useAxios(`/responses/employer?${stringified}`);
  const [dictionaryState] = useAxios('/vacancies/dictionary ');

  const [search, setSearch] = useState('');

  const handleSearchClick = () => {
    if (search === '') {
      const finalQuery = { ...router.query };
      delete finalQuery.query;
      router.push({
        query: {
          ...withClearPagination(finalQuery),
        },
      });
    } else {
      router.push({
        query: {
          ...withClearPagination(router.query),
          query: search,
        },
      });
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearchClick();
    }
  };

  const handleSortChange = (e) => {
    const splittedValue = e.target.value.split('-');
    router.push({
      query: {
        ...withClearPagination(router.query),
        sort_field: splittedValue[0],
        sort_direction: splittedValue[1],
      },
    });
  };

  const handleSpecialization = (e) => {
    const value = e.target.value;
    if (value === 'all') {
      const finalQuery = { ...router.query };
      delete finalQuery.specialization_id;

      router.push({
        query: {
          ...withClearPagination(finalQuery),
        },
      });
    } else {
      router.push({
        query: {
          ...withClearPagination(router.query),
          specialization_id: value,
        },
      });
    }
  };

  const handlePagination = (e, page) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  let specOptions = dictionaryState.data?.specializations?.map((item) => ({ value: item.id, label: item.name }));
  specOptions = specOptions && [{ value: 'all', label: 'Все' }, ...specOptions];

  const sortValue = router.query?.sort_field
    ? `${router.query.sort_field}-${router.query.sort_direction}`
    : 'response_new-desc';

  const specializationValue = router.query?.specialization_id ? parseInt(router.query?.specialization_id) : 'all';

  return (
    <Layout currentPage="Отклики">
      <Head>
        <title>Отклики</title>
        <meta property="og:title" content="Отклики" key="title" />
      </Head>
      <Box className={classes.inner} component="section">
        <Grid container spacing={isSm ? 3 : 4}>
          <Grid item xs={12}>
            <Typography component="h1" className={classes.title}>
              Отклики
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={isMobile ? 2 : 3}>
              <Grid item xs={12} sm={8} md={9}>
                <TextField label="Введите вакансию" value={search} onChange={handleSearch} onKeyDown={handleKeyDown} />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Button fullWidth onClick={handleSearchClick}>
                  Найти
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={isSm ? 0 : 3}>
              <Grid item xs={12} md={'auto'}>
                <SelectText
                  compact
                  label={'Сортировать по'}
                  options={employerResponsesOptions}
                  selectedValue={sortValue}
                  onChange={handleSortChange}
                />
              </Grid>
              {specOptions && (
                <Grid item xs={12} md={'auto'}>
                  <SelectText
                    withCheckBox={true}
                    compact
                    label={'Проф область'}
                    options={specOptions}
                    selectedValue={specializationValue}
                    onChange={handleSpecialization}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item md={8} lg={9}>
                <Grid container spacing={4}>
                  <RenderResponses data={data} loading={loading} />
                  {data?.pagination?.totalPages > 1 && (
                    <Grid item xs={12}>
                      <CustomPagination
                        page={data.pagination.currentPage}
                        count={data.pagination.totalPages}
                        onChange={handlePagination}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              {!loading && (
                <Grid item md={4} lg={3}>
                  <Activity
                    responses
                    title="Общая статистика"
                    responseCount={data.response_count}
                    viewsCount={data.views_count}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Responses;
