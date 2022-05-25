import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Typography } from '@mui/material';

import { Layout } from 'containers/layout/main';
import useStyles from 'containers/modules/employer/publish/styles';
import Button, { TetriatyButton } from 'components/Button';
import VacancyWontBePublished from 'containers/modules/common/modals/VacancyWontBePublished';

const Created = () => {
  const classes = useStyles();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const onModalClose = (): void => {
    setModalOpen(false);
  };

  const onModalOpen = (): void => {
    setModalOpen(true);
  };

  return (
    <Layout>
      <Head>
        <title>Публикация</title>
        <meta property="og:title" content="Публикация" key="title" />
      </Head>
      <Box className={classes.box}>
        <Typography component="h3" className={classes.heading}>
          Вакансия создана, <br /> но не опубликована
        </Typography>
        <Typography component="p" className={classes.description}>
          Поздравляем, ваша вакансия создана и доступна в неактивных вакансиях.
          <br />
          Для доступа к рекомендациям и кандидатам, оплатите публикацию вакансии.
        </Typography>
        <Box className={classes.actionBox}>
          <Button
            nextLink
            linkProps={{ href: `/employer/balance?vacancy_id=${router.query.vacancy_id}` }}
            className={classes.button}
          >
            Перейти к оплате
          </Button>
          <TetriatyButton onClick={onModalOpen} className={classes.secondaryButton}>
            В профиль
          </TetriatyButton>
        </Box>
      </Box>
      <VacancyWontBePublished open={modalOpen} handleClose={onModalClose} />
    </Layout>
  );
};

export default Created;
