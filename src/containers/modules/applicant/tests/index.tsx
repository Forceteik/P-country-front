import useAxios from 'axios-hooks';
import Head from 'next/head';

import { Grid, Typography, Box, useMediaQuery } from '@mui/material';

import Layout from 'containers/layout/main';
import commonStyle from 'containers/modules/common/styles/commonStyle';
import TestCardSkeleton from 'components/skeletons/TestCardSkeleton';

import TestCard from './components/TestCard';

const Tests = () => {
  const classes = commonStyle();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const [{ data, loading }] = useAxios('/tests', { useCache: false });

  return (
    <Layout currentPage="Тесты">
      <Head>
        <title>Тесты</title>
        <meta property="og:title" content="Тесты" key="title" />
      </Head>
      <Box className={classes.inner} component="section">
        <Grid container spacing={isSm ? 3 : 4}>
          <Grid item xs={12}>
            <Typography className={classes.title}>Доступные тесты</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={isSm ? 3 : 4}>
              {!loading ? (
                // КОСТЫЛЬ. По задаче https://www.notion.so/preontech/7186d4de5c3d44f78301f99b8c51d6f3 убираем этот тест из списка.
                data.data
                  .filter((item) => item.title !== 'Тестирование оценки способностей')
                  .map((item, key) => <TestCard data={item} key={key} />)
              ) : (
                <>
                  <TestCardSkeleton />
                  <TestCardSkeleton />
                  <TestCardSkeleton />
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Tests;
