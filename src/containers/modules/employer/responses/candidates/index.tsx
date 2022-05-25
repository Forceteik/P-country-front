import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';

import { Grid, Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import queryString from 'querystring';

import { withClearPagination } from 'utils/common';
import Layout from 'containers/layout/main';
import PrevLink from 'components/PrevLink';
import DoubleSwitch from 'components/DoubleSwitch';
import { SelectText } from 'components/Select';
import CustomPagination from 'components/CustomPagination';
import { vacancyResponseOptions } from 'constants/common';
import EmptyRecordsContainer from 'components/EmptyRecordsContainer';
import NullPage from 'containers/404/NullPage';
import CandidateItemSkeleton from 'components/skeletons/CandidateItemSkeleton';

import CandidateItem from '../../applicants/CandidateItem';
import Activity from '../../profile/components/Activity';

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
  switch: {
    marginLeft: 'auto',
    width: 'fit-content',
    [theme.breakpoints.down('md')]: {
      marginLeft: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

export const roles = (vacancyId) => [
  { label: 'Новые отклики', value: 'responded', link: `/employer/responses/${vacancyId}?status=responded`, index: 0 },
  {
    label: 'Приглашенные кандидаты',
    value: 'invited',
    link: `/employer/responses/${vacancyId}?status=invited`,
    index: 1,
  },
];

const ResponsesCandidates = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const stringified = queryString.stringify(router.query);

  const [{ data, loading, error }, refetch] = useAxios(`/responses/employer/vacancy/${id}?${stringified}`);
  const [rejectResponseState, rejectResponse] = useAxios({ method: 'put' }, { manual: true });
  const [removeState, removeResponse] = useAxios({ method: 'delete' }, { manual: true });

  const handleReject = (e, responseId, fullName) => {
    rejectResponse({
      url: `/responses/${responseId}/rejection`,
      data: {
        text: rejectDefaultText({ fullName, vacancyName: data.vacancy.name }),
      },
    }).then(() => {
      refetch();
    });
  };

  const handleRemove = (e, responseId) => {
    removeResponse({
      url: `/responses/${responseId}`,
    }).then(() => {
      refetch();
    });
  };

  const handleFilterChange = (e) => {
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

  const handleInviteSubmit = () => {
    refetch();
  };

  if (error?.code === 'page_not_found') {
    return <NullPage />;
  }

  const responseValue = router.query?.filter ? router.query.filter : 'all';
  const status = router.query?.status || 'responded';
  const statusIndex = roles(id).find((item) => item.value === status).index;

  return (
    <Layout>
      <Box className={classes.inner} component="section">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box onClick={() => router.back()}>
              <PrevLink withoutLink text={'Назад к откликам'} />
            </Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item sm={12} md={6} lg={7}>
                <Typography component="h1" fontSize={26} fontFamily={'inter-bold'}>
                  {data?.vacancy.name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={5}>
                <DoubleSwitch items={roles(id)} active={statusIndex} className={classes.switch} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <SelectText
              label={status === 'responded' ? 'Отклики' : 'Приглашения'}
              options={vacancyResponseOptions}
              selectedValue={responseValue}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                {data?.data.length === 0 && (
                  <EmptyRecordsContainer
                    title={
                      status === 'responded' ? 'Откликов нет, но вы держитесь!' : 'Приглашений нет, но вы держитесь!'
                    }
                    descr={
                      status === 'responded'
                        ? 'Пока по вашей вакансии нет откликов'
                        : 'Пока по этой вакансии нет приглашений'
                    }
                    // showButton
                    // textButton="Поиск сотрудников"
                    // linkButton="/employer/applicants"
                  />
                )}

                <Grid container spacing={3}>
                  {loading ? (
                    <Grid item xs={12}>
                      <CandidateItemSkeleton />
                    </Grid>
                  ) : (
                    <>
                      {data.data.map(
                        (item, key) =>
                          item.user && (
                            <Grid item xs={12} key={key}>
                              <CandidateItem
                                item={item}
                                extraData={{ responseId: item.id, text: item.text }}
                                status={status}
                                vacancyId={id}
                                handleInviteSubmit={handleInviteSubmit}
                                handleReject={handleReject}
                                rejectResponseState={rejectResponseState}
                                removeState={removeState}
                                handleRemove={handleRemove}
                                createDate={item.created_at || null}
                                vacancySpecifiedSearch
                                showInviteButton={false}
                                profileLink={`/applicants/${item.user.id}?vacancy_id=${id}`}
                              />
                            </Grid>
                          ),
                      )}
                    </>
                  )}
                  <Grid item xs={12}>
                    {data?.pagination?.totalPages > 1 && (
                      <CustomPagination
                        page={data.pagination.currentPage}
                        count={data.pagination.totalPages}
                        onChange={handlePagination}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Activity
                  responses
                  title="Общая статистика"
                  responseCount={data?.response_count}
                  viewsCount={data?.views}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default ResponsesCandidates;

const rejectDefaultText = ({ fullName, vacancyName }) =>
  `Здравствуйте, ${fullName}! \n Благодарим за интерес к вакансии ${vacancyName}. Мы внимательно ознакомились с Вашей кандидатурой, но, к сожалению, не готовы сделать Вам предложение о работе. Возможно, мы вернемся к Вашему резюме в случае, если нам понадобится кандидат со схожим профессиональным опытом.`;
