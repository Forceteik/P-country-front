import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Grid, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';

import queryString from 'querystring';

import Layout from 'containers/layout/main';
import ResponseItem from 'containers/modules/applicant/responses/ResponseItem';
import CustomPagination from 'components/CustomPagination';
import { SelectText } from 'components/Select';
import { responsesOptions } from 'constants/common';
import { withClearPagination } from 'utils/common';
import EmptyRecordsContainer from 'components/EmptyRecordsContainer';
import commonStyle from 'containers/modules/common/styles/commonStyle';
import ResponseItemSkeleton from 'components/skeletons/ResponseItemSkeleton';

import Activity from '../profile/Content/Activity';

const Responses = () => {
  const router = useRouter();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const stringified = queryString.stringify(router.query);
  const [{ data, loading }, refetch] = useAxios(`/responses/employee?${stringified}`);
  const classes = commonStyle();

  const handleOptionChange = (e) => {
    router.push({
      query: {
        ...withClearPagination(router.query),
        filter: e.target.value,
      },
    });
  };

  const handlePagination = (e, page) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };
  const handleRemove = () => {
    refetch();
  };

  const selectedValue = router.query?.filter || 'all';

  return (
    <Layout currentPage="Отклики">
      <Head>
        <title>Отклики</title>
        <meta property="og:title" content="Отклики" key="title" />
      </Head>
      <Box className={classes.inner} component="section">
        <Grid container spacing={isSm ? 2 : 3}>
          <Grid item xs={12}>
            <Typography component="h1" className={classes.title}>
              Отклики
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={isSm ? 2 : 3}>
              <Grid item xs={12}>
                <SelectText
                  label={'Отклики'}
                  options={responsesOptions}
                  selectedValue={selectedValue}
                  onChange={handleOptionChange}
                />
              </Grid>
              <Grid item md={8} lg={9}>
                <Grid container spacing={isSm ? 2 : 4}>
                  {data?.data.length === 0 && (
                    <Grid item xs={12}>
                      <EmptyRecordsContainer
                        title="Откликайтесь на вакансии чаще"
                        descr="Если работодатель не отвечает на ваш отклик более 5 дней, то рекомендуем откликнуться на другие вакансии"
                        showButton
                        textButton="Поиск вакансий"
                        linkButton="/vacancies"
                      />
                    </Grid>
                  )}

                  {loading && (
                    <>
                      <Grid item xs={12}>
                        <ResponseItemSkeleton />
                      </Grid>
                      <Grid item xs={12}>
                        <ResponseItemSkeleton />
                      </Grid>
                      <Grid item xs={12}>
                        <ResponseItemSkeleton />
                      </Grid>
                    </>
                  )}

                  {data?.data.map((item, key) => (
                    <Grid item xs={12} key={key}>
                      <ResponseItem item={item} onRemove={handleRemove} />
                    </Grid>
                  ))}
                  {data?.pagination.totalPages > 1 && (
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
              <Grid item xs={12} md={4} lg={3}>
                <Activity
                  responses={true}
                  title="Общая статистика"
                  views={data?.views}
                  invitations={data?.count_invites}
                  rejections={data?.count_rejection}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Responses;
