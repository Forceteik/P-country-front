import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import { Box, Grid, Hidden, Tooltip, Typography, useMediaQuery } from '@mui/material';

import { Layout } from 'containers/layout/main';
import PrevLink from 'components/PrevLink';
import VacancyItem from 'containers/modules/common/vacancy/VacancyItem';
import Button from 'components/Button';
import { useSession } from 'context/UserContext';
import { useTooltipOneLineStyles } from 'components/TextField';
import TaskItem from 'containers/modules/employer/profile/Tasks/TaskItem';
import ShowTaskModal from 'containers/modules/common/modals/ShowTaskModal';
import ResponseSentModal from 'containers/modules/common/modals/ResponseSentModal';
import StackItem from 'containers/modules/common/vacancy/StackItem';
import NullPage from 'containers/404/NullPage';
import VacancyPageSkeleton from 'components/skeletons/VacancyPageSkeleton';
import { checkIsAllTestsPassed, showSalary } from 'utils/common';

import { useViewStyles } from './style';

const VacancyView = () => {
  const classes = useViewStyles();
  const tooltipClasses = useTooltipOneLineStyles();

  const router = useRouter();
  const { id, from } = router.query;

  const { currentUser, role } = useSession();
  const isGuest = currentUser === null;
  const isEmployee = role === 'employee';

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const [{ data, loading, error }] = useAxios(`/vacancies/${id}`);

  const [sendResponseState, sendResponse] = useAxios(
    { url: `/responses/response/${id}`, method: 'post' },
    { manual: true },
  );

  const [isResponseSent, setIsResponseSent] = useState(false);
  const [openTaskShow, setOpenTaskShow] = useState(false);
  const [openResponseSentModal, setOpenResponseSentModal] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [status, setStatus] = useState(data?.data?.response?.status || 'default');

  useEffect(() => {
    if (data) {
      if (data.data.response) {
        setIsResponseSent(data.data.response);
        setStatus(data.data.response.status);
      }
    }
  }, [loading]);

  const handleClickSendResponse = (e) => {
    e.preventDefault();
    if (vacancyData.document) {
      setOpenResponseSentModal(true);
    } else {
      sendResponse().then(() => {
        setIsResponseSent(true);
        if (process.env.NEXT_PUBLIC_BUILD_MODE === 'prod') {
          //@ts-ignore
          window.ym(80438017, 'reachGoal', 'otklik');
        }
      });
    }
  };

  // когда отправка отклика происходит с модалки
  const handleResponseSubmit = () => {
    setIsResponseSent(true);
  };

  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };

  const handleOpenTooltip = () => {
    if (!isAllTestPassed) {
      setOpenTooltip(true);
    }
  };

  const ResponseButton = () => {
    if (isGuest) {
      return (
        <Button fullWidth small nextLink linkProps={{ href: '/register' }}>
          Зарегистрироваться
        </Button>
      );
    }

    if (isEmployee) {
      if (status === 'rejection') {
        return (
          <Button fullWidth small disabled>
            Вам отказали
          </Button>
        );
      }
      if (status === 'invited') {
        return (
          <Button fullWidth small disabled>
            Вас пригласили
          </Button>
        );
      }
      if (isResponseSent) {
        return (
          <Button fullWidth small disabled>
            Вы откликнулись
          </Button>
        );
      }

      return (
        <Tooltip
          title="Пройдите тестирование чтобы отправить отклик"
          PopperProps={{ disablePortal: true }}
          arrow
          placement={'top'}
          classes={tooltipClasses}
          onOpen={handleOpenTooltip}
          onClose={handleCloseTooltip}
          open={openTooltip}
        >
          <Box>
            <Button
              fullWidth
              small
              onClick={handleClickSendResponse}
              loading={sendResponseState.loading}
              disabled={!isAllTestPassed}
            >
              Откликнуться
            </Button>
          </Box>
        </Tooltip>
      );
    }
    return null;
  };

  if (loading || !data) {
    return <VacancyPageSkeleton />;
  }

  if (error && error.code === 'page_not_found') {
    return <NullPage />;
  }

  const vacancyData = data.data;
  const similar = data.similar;
  const isAllTestPassed = checkIsAllTestsPassed(currentUser);

  const companyLink = `/employers/${vacancyData.owner?.id}`;

  return (
    <Layout>
      <Head>
        <title>{vacancyData.name}</title>
        <meta property="og:title" content={`${vacancyData.name}`} key="title" />
      </Head>
      <Box mt={2.2} mb={11}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {from !== 'responses' && !isGuest && window.history.length > 2 && (
              <Box onClick={() => router.back()}>
                <PrevLink withoutLink text={'Назад к вакансиям'} />
              </Box>
            )}
            <Box className={classes.header}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={12} md={9}>
                  <Grid container alignItems="center" justifyContent="space-between" wrap="wrap-reverse" spacing={2}>
                    <Grid item>
                      <Link href={companyLink}>
                        <a className={classes.link} target="_blank">
                          <Box className={classes.companyTitle}>
                            <Typography className={classes.company}>{vacancyData.owner?.employer.name}</Typography>
                          </Box>
                        </a>
                      </Link>
                    </Grid>

                    <Hidden mdUp>
                      <Grid item>
                        {vacancyData.owner.media && (
                          <Link href={companyLink}>
                            <a className={classes.link} target="_blank">
                              <img src={vacancyData.owner?.media.original_url} height="32" alt="company logo" />
                            </a>
                          </Link>
                        )}
                      </Grid>
                    </Hidden>
                  </Grid>
                  <Typography className={classes.name} component="h1">
                    {vacancyData.name}
                  </Typography>
                </Grid>
                <Hidden mdDown>
                  <Grid item xs={3}>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                      {vacancyData.owner?.media && (
                        <Link href={companyLink}>
                          <a className={classes.link} target="_blank">
                            <img
                              src={vacancyData.owner?.media.original_url}
                              className={classes.img}
                              alt="company logo"
                            />
                          </a>
                        </Link>
                      )}
                    </Box>
                  </Grid>
                </Hidden>
              </Grid>
            </Box>

            <Box className={classes.infoList}>
              {vacancyData.salary_after_interview ? (
                <Tooltip
                  title="Зарплата по результатам собеседования"
                  arrow
                  placement={'top-start'}
                  classes={tooltipClasses}
                >
                  <Box className={classes.infoListItem}>
                    <Typography>
                      {showSalary(vacancyData.salary_from, vacancyData.salary_to, vacancyData.salary_after_interview)}
                    </Typography>
                  </Box>
                </Tooltip>
              ) : (
                <Box className={classes.infoListItem}>
                  <Typography>
                    {showSalary(vacancyData.salary_from, vacancyData.salary_to, vacancyData.salary_after_interview)}
                  </Typography>
                </Box>
              )}
              {vacancyData.city && (
                <Box className={classes.infoListItem}>
                  <Typography>{vacancyData.city.name}</Typography>
                </Box>
              )}

              <Box className={classes.infoListItem}>
                <Typography>{vacancyData.experiency.name}</Typography>
              </Box>
              <Box className={classes.infoListItem}>
                <Typography>{vacancyData.work_schedules.map((item) => item.work_schedule.name).join(', ')}</Typography>
              </Box>
              <Box className={classes.infoListItem}>
                <Typography>
                  {vacancyData.employment_types.map((item) => item.employment_type.name).join(', ')}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} lg={9}>
            <Grid container spacing={7}>
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Box dangerouslySetInnerHTML={{ __html: vacancyData.description }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="h2" className={classes.blockTitle}>
                      Требуемые навыки
                    </Typography>
                    <Box>
                      {vacancyData.qualities.map((item, key) => (
                        <StackItem key={key} text={item.name.name} />
                      ))}
                    </Box>
                  </Grid>

                  {vacancyData.document && (
                    <Grid item xs={12}>
                      <Typography component="h2" className={classes.blockTitle}>
                        Материалы для соискателя
                      </Typography>
                      <TaskItem
                        item={vacancyData.document}
                        setOpenTaskShow={setOpenTaskShow}
                        // hadleInitial={() => setOpenTaskShow(true)}
                        vacancy
                        guest={true}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              {similar.length > 1 && (
                <Grid item xs={12}>
                  <Grid container spacing={isMobile ? 3 : 4}>
                    <Grid item xs={12}>
                      <Typography component="h2" className={classes.secondTitle}>
                        Похожие вакансии
                      </Typography>
                    </Grid>
                    {similar.map((item, id) => (
                      <Grid item xs={12} key={id}>
                        <VacancyItem item={item} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Hidden lgDown>
            <Grid item xs={3}>
              <Box position={'sticky'} top={20}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <ResponseButton />
                  </Grid>
                  {/* //Пока скрываем банер */}
                  {/* <Grid item xs={12}>
                    <Box className={classes.asideInfo}>
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
                    </Box>
                  </Grid> */}
                </Grid>
              </Box>
            </Grid>
          </Hidden>
          <Hidden lgUp>
            <Grid item xs={12} position={'sticky'} bottom={'-1%'}>
              <Box className={classes.filterBtn}>
                <ResponseButton />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
      {vacancyData.document && (
        <ShowTaskModal item={vacancyData.document} openTaskShow={openTaskShow} setOpenTaskShow={setOpenTaskShow} />
      )}

      <ResponseSentModal
        vacancyId={vacancyData.id}
        open={openResponseSentModal}
        setOpen={setOpenResponseSentModal}
        onSubmit={handleResponseSubmit}
      />
    </Layout>
  );
};

export default VacancyView;
