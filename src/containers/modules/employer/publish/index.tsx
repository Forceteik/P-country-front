import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { Box, Typography } from '@mui/material';

import { Layout } from 'containers/layout/main';
import useStyles from 'containers/modules/employer/publish/styles';
import Button, { TetriatyButton } from 'components/Button';
import PublishModal from 'containers/modules/common/modals/PublishModal';
import VacancyWontBePublished from 'containers/modules/common/modals/VacancyWontBePublished';
import { draftText } from 'utils/formatters';
import { useBalance } from 'context/BalanceContext';

const Publish = () => {
  const classes = useStyles();
  const router = useRouter();
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [wontPublishModalOpen, setWontPublishModalOpen] = useState(false);

  const [isVacancyStatusChecked, setIsVacancyStatusChecked] = useState(false);

  const { refetch: refetchBalance, employerVacanciesCoupons: coupons } = useBalance();

  const [{ data: vacancyData, loading: vacancyLoading, error: vacancyError }] = useAxios(
    `/vacancies/${router.query.vacancy_id}`,
    { useCache: false },
  );

  const [{ data: publishData, loading: publishDataLoading, error: publishDataError }, publishVacancy] = useAxios(
    { url: `/vacancies/${router.query.vacancy_id}/activate`, method: 'post' },
    { manual: true },
  );

  // Мы тут проверяем статус вакансии и в зависимости от статуса - или даем опубликовать вакансию или редиректим на другую страницу
  useEffect(() => {
    if (!vacancyData || vacancyError || vacancyLoading || !router.query.vacancy_id) return;

    const vacancyStatus = vacancyData.data.status;

    if (vacancyStatus === 'hidden') {
      setIsVacancyStatusChecked(true);
    }

    if (vacancyStatus === 'draft') {
      router.replace('/employer/profile');
      return;
    }

    if (vacancyStatus === 'published') {
      router.replace(`/employer/vacancies/${router.query.vacancy_id}`);
      return;
    }
  }, [vacancyData, router.query.vacancy_id]);

  const onPublishModalClose = () => {
    router.replace('/employer/profile');
  };

  const onPublishButtonClick = () => {
    publishVacancy()
      .then(() => {
        setPublishModalOpen(true);
        refetchBalance();
      })
      .catch(() => {
        toast.error('Не удалось опубликовать вакансию. Пожалуйста, попробуйте позже, или обратитесь в поддержку');
      });
  };

  const onWontPublishModalClose = () => {
    setWontPublishModalOpen(false);
  };

  const onProfileButtonClick = () => {
    if (publishData) {
      router.replace('/employer/profile');
    } else {
      setWontPublishModalOpen(true);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Публикация</title>
        <meta property="og:title" content="Публикация" key="title" />
      </Head>
      <Box className={classes.box}>
        <Typography component="h3" className={classes.heading}>
          Опубликуйте вакансию
        </Typography>
        <Box className={classes.available}>
          <Typography component="h2" className={classes.availableText}>
            К публикации доступно:
          </Typography>
          <Box className={classes.vacanciesBox}>
            <Typography component="h2" className={classes.vacanciesText}>
              {`${coupons} ${draftText(coupons)}`}
            </Typography>
          </Box>
        </Box>
        <Typography component="p" className={classes.description}>
          Для доступа к рекомендованным кандидатам и откликам опубликуйте вакансию. Вакансия будет опубликована на 30
          дней.
        </Typography>
        <Box className={classes.actionBox}>
          <Button
            loading={publishDataLoading || vacancyLoading}
            onClick={onPublishButtonClick}
            disabled={!!publishData || !vacancyData || publishDataError || vacancyError || !isVacancyStatusChecked}
          >
            Опубликовать
          </Button>
          <TetriatyButton onClick={onProfileButtonClick} className={classes.secondaryButton}>
            В профиль
          </TetriatyButton>
        </Box>
      </Box>
      <PublishModal open={publishModalOpen} handleClose={onPublishModalClose} />
      <VacancyWontBePublished open={wontPublishModalOpen} handleClose={onWontPublishModalClose} />
    </Layout>
  );
};

export default Publish;
