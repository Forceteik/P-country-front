import { useState } from 'react';

import { Grid, Box, Tooltip } from '@mui/material';

import Button, { SecondaryButton } from 'components/Button';
import { useTooltipBasicStyles } from 'components/TextField';
import DeleteVacancyModal from 'containers/modules/common/modals/DeleteVacancyModal';
import { generateCandidatesLink } from 'utils/common';
import { useProfile } from 'context/ProfileContext';
import { useBalance } from 'context/BalanceContext';

const VacancyButtons = ({ item, guest, ...otherProps }) => {
  const tooltipClasses = useTooltipBasicStyles();
  const { employerVacanciesCoupons } = useBalance();

  const { role } = useProfile();
  const isEmployee = role === 'employee';

  const [openTooltip, setOpenTooltip] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const finalHref = generateCandidatesLink(item);

  const getPublishLink = (id) => {
    if (employerVacanciesCoupons !== 0) {
      return `/employer/publish?vacancy_id=${id}`;
    }

    return `/employer/publish/created?vacancy_id=${id}`;
  };

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleTooltipOpen = () => {
    if (!otherProps.isAllTestPassed) {
      setOpenTooltip(true);
    }
  };

  if (item.status && item.status === 'draft') {
    const handleCloseModal = () => {
      setOpenDeleteModal(false);
      otherProps.refetch();
      otherProps.refetchProfileProgress();
    };

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SecondaryButton
            fullWidth
            small
            nextLink
            linkProps={{ href: `/employer/vacancies/update/${item.id}?is_draft=1` }}
          >
            Завершить заполнение
          </SecondaryButton>
        </Grid>
        <Grid item xs={12} sm={3}>
          <SecondaryButton fullWidth type="warning" small onClick={() => setOpenDeleteModal(!openDeleteModal)}>
            Удалить
          </SecondaryButton>
          {openDeleteModal && (
            <DeleteVacancyModal
              open={openDeleteModal}
              handleClose={handleCloseModal}
              vacancyId={item.id}
              withQuestions={false}
            />
          )}
        </Grid>
      </Grid>
    );
  }

  if (item.status && item.status === 'hidden') {
    return (
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} lg={6}>
            <Button fullWidth small nextLink linkProps={{ href: getPublishLink(item.id) }}>
              Опубликовать вакансию
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <SecondaryButton fullWidth small nextLink linkProps={{ href: `/employer/vacancies/update/${item.id}` }}>
              Редактировать
            </SecondaryButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  if (item.status && item.status === 'published' && !guest) {
    return (
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button fullWidth small nextLink linkProps={{ href: finalHref }}>
              Подходящие кандидаты
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <SecondaryButton
              fullWidth
              small
              nextLink
              linkProps={{ href: `/employer/responses/${item.id}?status=responded` }}
            >
              Просмотр откликов
            </SecondaryButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  if (item.status && item.status === 'published') {
    if (otherProps.isResponseSent?.status === 'invited') {
      return (
        <Grid item xs={12} sm={7} md={6} lg={5}>
          <Button fullWidth small disabled>
            Вас пригласили
          </Button>
        </Grid>
      );
    }
    if (otherProps.isResponseSent?.status === 'rejection') {
      return (
        <Grid item xs={12} sm={7} md={6} lg={5}>
          <Button fullWidth small disabled>
            Вам отказали
          </Button>
        </Grid>
      );
    }

    if (otherProps.isResponseSent) {
      return (
        <Grid item xs={12} sm={7} md={6} lg={5}>
          <Button fullWidth small disabled>
            Вы откликнулись
          </Button>
        </Grid>
      );
    }

    if (isEmployee) {
      return (
        <Grid item xs={12} sm={7} md={6} lg={4}>
          <Tooltip
            title="Пройдите тестирование чтобы отправить отклик"
            arrow
            PopperProps={{ disablePortal: true }}
            placement={'top'}
            classes={tooltipClasses}
            onOpen={handleTooltipOpen}
            onClose={handleTooltipClose}
            open={openTooltip}
          >
            <Box>
              <Button
                fullWidth
                small
                onClick={otherProps.handleSendResponse}
                loading={otherProps.loading}
                disabled={!otherProps.isAllTestPassed}
              >
                Откликнуться
              </Button>
            </Box>
          </Tooltip>
        </Grid>
      );
    }
  }
  return null;
};

export default VacancyButtons;
