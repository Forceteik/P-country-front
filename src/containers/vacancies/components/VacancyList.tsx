import { useRouter } from 'next/router';

import makeStyles from '@mui/styles/makeStyles';
import { Grid, Box, Hidden } from '@mui/material';

import VacancyItem from 'containers/modules/common/vacancy/VacancyItem';
import CustomPagination from 'components/CustomPagination';
import Button from 'components/Button';
import { useSession } from 'context/UserContext';
import { checkIsAllTestsPassed } from 'utils/common';
import EmptyRecordsContainer from 'components/EmptyRecordsContainer';
import VacancyItemSkeleton from 'components/skeletons/VacancyItemSkeleton';

import TestNotification from './TestNotification';
import AsideFilter from './AsideFilter';

const useStyles = makeStyles<any>((theme) => ({
  list: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  asideInfo: {
    position: 'sticky',
    top: 20,
    height: 450,
    borderRadius: 20,
    padding: '9px 12px',
    display: 'flex',
    alignItems: 'flex-end',
    backgroundImage: 'url(/images/vacancies/aside-null.png)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('sm')]: {
      height: 358,
      backgroundPosition: 'top',
    },
  },
  asideInfoInfo: {
    'cursor': 'pointer',
    'backgroundColor': '#fff',
    'borderRadius': 20,
    'padding': '24px 16px',
    'width': '100%',
    '& img': {
      marginBottom: theme.spacing(1.5),
    },
  },
  filterBtn: {
    // width: '40%',
    // margin: '0px auto',
    // [theme.breakpoints.down('sm')]: {
    //   width: '80%',
    // },
  },
  asideTitleNull: {
    fontFamily: 'inter-med',
    lineHeight: '150%',
  },
  logoList: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoListItem: {
    'flexBasis': '45%',
    'flexShrink': 0,
    '& img': {
      width: '100%',
      objectFit: 'contain',
      marginBottom: theme.spacing(1),
    },
  },
  gridFixed: {
    position: 'sticky',
    bottom: '3%',
  },
}));

const RenderItems = ({ loading, data, isAllTestPassed }) => {
  if (loading) {
    return (
      <>
        <Grid item xs={12}>
          <VacancyItemSkeleton />
        </Grid>
        <Grid item xs={12}>
          <VacancyItemSkeleton />
        </Grid>
        <Grid item xs={12}>
          <VacancyItemSkeleton />
        </Grid>
      </>
    );
  }

  return (
    <>
      {!isAllTestPassed && (
        <Grid item xs={12}>
          <TestNotification />
        </Grid>
      )}
      {data.length === 0 && (
        <Grid item xs={12}>
          <EmptyRecordsContainer descr={'К сожалению, по заданным параметрам подходящих Вам вакансий нет'} />
        </Grid>
      )}
      {data.map((item, key) => (
        <Grid item xs={12} key={key}>
          <VacancyItem item={item} />
        </Grid>
      ))}
    </>
  );
};

const VacancyList = ({ openFilter, setOpenFilter, data, pagination, dictionaryData, loading }) => {
  const classes = useStyles();
  const { currentUser } = useSession();
  const router = useRouter();

  const handlePagination = (e, page) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };
  const isAllTestPassed = checkIsAllTestsPassed(currentUser);

  return (
    <Grid container spacing={4} position={'relative'} mb={5}>
      <Grid item xs={12} md={9}>
        <Grid container spacing={5} justifyContent="center">
          <RenderItems data={data} loading={loading} isAllTestPassed={isAllTestPassed} />
        </Grid>
      </Grid>
      <Hidden mdDown>
        <Grid item xs={3} mb={2}>
          {openFilter && (
            <AsideFilter openFilter={openFilter} setOpenFilter={setOpenFilter} dictionaryData={dictionaryData} />
          )}
          {/* //Пока скрываем баннер */}
          {/* <Box className={classes.asideInfo}>
            <Box className={classes.asideInfoInfo}>
              <Box className={classes.logoList}>
                <Box className={classes.logoListItem}>
                  <img src="/images/vacancies/logo-1.png" />
                </Box>
                <Box className={classes.logoListItem}>
                  <img src="/images/vacancies/logo-2.png" />
                </Box>
                <Box className={classes.logoListItem}>
                  <img src="/images/vacancies/logo-3.png" />
                </Box>
                <Box className={classes.logoListItem}>
                  <img src="/images/vacancies/logo-4.png" />
                </Box>
                <Box className={classes.logoListItem}>
                  <img src="/images/vacancies/logo-5.png" />
                </Box>
                <Box className={classes.logoListItem}>
                  <img src="/images/vacancies/logo-6.png" />
                </Box>
              </Box>
              <Typography className={classes.asideTitleNull}>Наши партнеры готовят вакансии</Typography>
            </Box>
          </Box> */}
        </Grid>
      </Hidden>
      {pagination?.totalPages > 1 && (
        <Grid item xs={12} mt={1} mb={2}>
          <CustomPagination page={pagination.currentPage} count={pagination.totalPages} onChange={handlePagination} />
        </Grid>
      )}
      <Hidden mdUp>
        <Grid item xs={12} className={classes.gridFixed}>
          <Box className={classes.filterBtn}>
            <Button fullWidth small onClick={() => setOpenFilter(!openFilter)}>
              Расширенный поиск
            </Button>
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default VacancyList;
