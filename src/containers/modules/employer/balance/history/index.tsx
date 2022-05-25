import Head from 'next/head';
import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import EmptyRecordsContainer from 'components/EmptyRecordsContainer';
import Layout from 'containers/layout/main';
import PrevLink from 'components/PrevLink';
import DoubleSwitch from 'components/DoubleSwitch';
import TableSkeleton from 'components/skeletons/TableSkeleton';

import AddHistory from './components/AddHistory';
import SubtractHistory from './components/SubtractHistory';

const useStyles = makeStyles<any>((theme) => ({
  inner: {
    marginTop: theme.spacing(4.5),
    marginBottom: theme.spacing(11),
  },
}));

export const historyOptions = [
  { label: 'Пополнения', link: 'deposit' },
  { label: 'Списание', link: 'purchase' },
];

type ParamsType = {
  page: number;
  filterType: Array<'deposit' | 'refund' | 'purchase'>;
  sortColumn: 'type' | 'status' | 'value' | 'created_at';
  sortDirection: 'asc' | 'desc';
};

const History = () => {
  const classes = useStyles();
  const [tab, setTab] = useState('deposit'); //'deposit' - страница пополнения, "purchase" - страница списания
  const [active, setActive] = useState(0);

  const [transactionsData, setTransactionsData] = useState([]);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [params, setParams] = useState<ParamsType>({
    page: 1,
    filterType: ['deposit', 'refund'],
    sortColumn: 'created_at',
    sortDirection: 'desc',
  });

  const [{ loading: transactionsLoading }, getTransactions] = useAxios({ method: 'GET' }, { manual: true });

  useEffect(() => {
    getTransactions({
      url: '/payment/transactions',
      params: {
        page: params.page,
        filter_types: params.filterType,
        sort_by: params.sortColumn,
        sort_dir: params.sortDirection,
      },
    })
      .then(({ data }) => {
        setTransactionsData(data.data);
        setPaginationData({
          currentPage: data.pagination.currentPage,
          totalPages: data.pagination.totalPages,
        });
      })
      .catch(() => {
        setTransactionsData([]);
        setPaginationData({
          currentPage: 1,
          totalPages: 1,
        });
      });
  }, [params]);

  const handleSwitchPage = (value, i) => {
    const newParamValue = value === 'deposit' ? ['deposit', 'refund'] : ['purchase'];
    handleChangeParam('filterType', newParamValue);
    handleChangeParam('page', 1);
    handleChangeParam('sortDirection', 'desc');

    setTab(value);
    setActive(i);
  };

  const handleChangeParam = (key, value) => {
    setParams((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const handleChangePage = (newPage) => {
    handleChangeParam('page', newPage);
  };

  const handleChangeSortDirection = () => {
    handleChangeParam('sortDirection', params.sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Layout currentPage="Баланс">
      <Head>
        <title>История пополнений и списаний</title>
        <meta property="og:title" content="История пополнений и списаний" key="title" />
      </Head>
      <Box component="section" className={classes.inner}>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <Grid container rowSpacing={1}>
              <Grid item>
                <PrevLink link={'/employer/balance'} text={'Назад к услугам'} />
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent={'space-between'} alignItems="center" rowSpacing={{ xs: 2, md: 0 }}>
                  <Grid item>
                    <Typography fontSize={26} fontFamily="inter-bold">
                      История пополнений и списаний
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={'auto'}>
                    <DoubleSwitch items={historyOptions} active={active} click={handleSwitchPage} fullWidth />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {transactionsLoading ? (
            <Grid item xs={12}>
              <TableSkeleton />
            </Grid>
          ) : (
            <>
              {tab === 'deposit' && (
                <Grid item xs={12}>
                  {transactionsData.length > 0 ? (
                    <AddHistory
                      items={transactionsData}
                      pagination={paginationData}
                      onPageChange={handleChangePage}
                      sortOrder={params.sortDirection}
                      onSortDirectionChange={handleChangeSortDirection}
                    />
                  ) : (
                    <EmptyRecordsContainer title="Нет историй пополнений" descr="Вы еще не совершали операции" />
                  )}
                </Grid>
              )}

              {tab === 'purchase' && (
                <Grid item xs={12}>
                  {transactionsData.length > 0 ? (
                    <SubtractHistory
                      items={transactionsData}
                      pagination={paginationData}
                      onPageChange={handleChangePage}
                      sortOrder={params.sortDirection}
                      onSortDirectionChange={handleChangeSortDirection}
                    />
                  ) : (
                    <EmptyRecordsContainer title="Нет истории операций" descr="Вы еще не совершали операции" />
                  )}
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default History;
