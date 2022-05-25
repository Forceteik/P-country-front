import { useState } from 'react';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';

import { Box, Dialog, DialogContent, Grid, Typography } from '@mui/material';

import Button, { TetriatyButton } from 'components/Button';
import Close from 'components/icons/Close';
import { darkGray } from 'styles/colorPalette';
import { useItemStyles, usePaperStylesFlexibleWidth } from 'containers/modules/common/modals/styles';
import { useBalance } from 'context/BalanceContext';

const PurchaseModal = ({ open, handleClose, tariff }) => {
  const classes = useItemStyles();
  const router = useRouter();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 610 });
  const [step, setStep] = useState('confirmation');
  const { refetch } = useBalance();
  const [{ loading }, purchase] = useAxios(
    { url: `/payment/tariffs/${tariff.id}/buy`, method: 'post' },
    { manual: true },
  );
  const [, activate] = useAxios(
    { url: `/vacancies/${router.query.vacancy_id}/activate`, method: 'post' },
    { manual: true },
  );

  const handleMakePaymentButtonClick = () => {
    purchase()
      .then((res) => {
        if (res.data.success) {
          if (router.query.vacancy_id) {
            activate().then(() => {
              setStep('successActivation');
              refetch();
            });
          } else {
            setStep('successPurchase');
            refetch();
          }
        }
      })
      .catch(() => {
        setStep('error');
      });
  };

  const handleModalClose = () => {
    handleClose();

    // небольшой костыль, чтобы сбрасывать состояние модалки при ее закрытии. Без таймаута состояние модалки будет меняться быстрее, чем она будет скрыта
    setTimeout(() => {
      setStep('confirmation');
    }, 200);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        classes: paperClasses,
      }}
      classes={{
        scrollPaper: classes.scroll,
      }}
      BackdropProps={{
        style: {
          background: 'rgba(35, 38, 47, 0.8)',
          backdropFilter: 'blur(29px)',
        },
      }}
    >
      <DialogContent>
        <Box className={classes.modalPaper} padding="54px 38px 54px 32px" textAlign="center">
          <Box className={classes.closeIcon} onClick={handleModalClose}>
            <Close color={'#fff'} />
          </Box>
          {step === 'confirmation' && (
            <>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Typography className={classes.smallTitle}>Вы уверены что хотите оплатить?</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color={darkGray} fontSize={18} textAlign="center">
                    С вашего счета будут списаны средства
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth small loading={loading} onClick={handleMakePaymentButtonClick}>
                    Да, уверен
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TetriatyButton fullWidth small onClick={handleModalClose}>
                    Отменить
                  </TetriatyButton>
                </Grid>
              </Grid>
            </>
          )}
          {step === 'successActivation' && (
            <>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Typography className={classes.smallTitle}>Оплата прошла успешно</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color={darkGray} fontSize={18} textAlign="center">
                    Ваша вакансия доступна по кнопке ниже
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} mt={3}>
                <Button
                  fullWidth
                  small
                  nextLink
                  onClick={handleModalClose}
                  linkProps={{ href: `/employer/vacancies/${router.query.vacancy_id}` }}
                  nativelinkprops={{ style: { width: '100%' } }}
                >
                  Перейти к вакансии
                </Button>
              </Grid>
            </>
          )}
          {step === 'successPurchase' && (
            <>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Typography className={classes.smallTitle}>Вакансия куплена</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color={darkGray} fontSize={18} textAlign="center">
                    Теперь вы можете активировать нужную вакансию
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} mt={3}>
                <Button fullWidth small onClick={handleModalClose}>
                  Понятно
                </Button>
              </Grid>
            </>
          )}
          {step === 'error' && (
            <>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Typography className={classes.smallTitle}>Разрыв соединения</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color={darkGray} fontSize={18} textAlign="center">
                    Проверьте ваше интернет соединения <br />и вернитесь в предыдущему шагу
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} mt={3}>
                <Button fullWidth small onClick={() => setStep('confirmation')}>
                  Вернуться
                </Button>
              </Grid>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;
