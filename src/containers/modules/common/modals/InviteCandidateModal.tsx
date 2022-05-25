import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import cx from 'classnames';
import { toast } from 'react-toastify';

import { Box, Dialog, DialogContent, Grid, Typography } from '@mui/material';

import { Rules } from 'utils/validators';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Close from 'components/icons/Close';
import Autocomplete from 'components/Autocomplete';
import { OverlayGrayLoader } from 'components/Loaders';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const InviteCandidateModal = ({ employeeId, ...otherProps }) => {
  const classes = useItemStyles();
  const [open, setOpen] = useState(false);
  const [vacancy, setVacancy] = useState(null);
  const [vacancyStatus, setVacancyStatus] = useState({ isValid: true, message: '' });
  const [message, setMessage] = useState({ value: '', isValid: false, message: '' });

  const [{ data: vacanciesData, loading: vacanciesLoading }, refetch] = useAxios(`/vacancies/invite/${employeeId}`);

  const [{ loading }, inviteEmployee] = useAxios(
    { url: `/responses/invite/${vacancy?.value}/employee/${employeeId}`, method: 'POST' },
    { manual: true },
  );

  // При успешном  отправлении должна появиться другая модалка с информацией об успешной отправке
  const [send, setSend] = useState(false);

  const paperClasses = usePaperStylesFlexibleWidth({ width: send ? 587 : 800 });

  const handleVacancyChange = (e, option) => {
    if (option) {
      setVacancy(option);
      setVacancyStatus({ isValid: true, message: '' });
      if (option.length === 0) {
        setVacancyStatus({ isValid: false, message: 'Поле обязательно для заполнения' });
      }
    } else {
      setVacancy(null);
      setVacancyStatus({ isValid: false, message: 'Поле обязательно для заполнения' });
    }
  };

  useEffect(() => {
    if (vacanciesData) {
      const vacancyOptions = vacanciesData.data.map((item) => ({
        value: item.id,
        label: item.name,
        disabled: item.response?.status === 'invited' || item.response?.status === 'rejection',
      }));
      const selectedVacancy = vacancyOptions.find((item) => item.value === parseInt(otherProps.vacancyId)) || null;
      setVacancy(selectedVacancy);
    }
  }, [vacanciesLoading]);

  const handleSubmit = () => {
    inviteEmployee({ data: { text: message.value } })
      .then(() => {
        refetch();
        setSend(true);
        setVacancy(null);

        if (process.env.NEXT_PUBLIC_BUILD_MODE === 'prod') {
          //@ts-ignore
          ym(80438017, 'reachGoal', 'priglashenie');
        }

        otherProps.onSubmit && otherProps.onSubmit();
      })
      .catch((e) => {
        if (e.code === 'response_invite_already_sent') {
          toast.error(`Приглашение по данной вакансии уже отправлена`);
        }
      });
  };

  const handleChange = (value, setState, isValid) => {
    setState({
      value,
      isValid,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setMessage({ value: '', isValid: false, message: '' });
    setOpen(false);
    // refetch();
  };

  const handleCloseModal = () => {
    setSend(false);
    handleClose();
  };

  if (vacanciesLoading) {
    return <OverlayGrayLoader />;
  }

  const vacancyOptions = vacanciesData.data.map((item) => ({
    value: item.id,
    label: item.name,
    disabled: item.response?.status === 'invited' || item.response?.status === 'rejection',
  }));

  // const selectedVacancyValue = vacancyOptions.find((item) => item.value === vacancyId);
  const isFormValid = () => vacancyStatus.isValid && message.isValid;
  const CustomButton = otherProps.CustomButton;
  return (
    <>
      {CustomButton ? (
        <CustomButton onClick={handleClickOpen} />
      ) : (
        <Button fullWidth small onClick={handleClickOpen}>
          Пригласить
        </Button>
      )}

      <Dialog
        open={open}
        fullWidth={true}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          classes: paperClasses,
        }}
        classes={{
          scrollPaper: classes.scroll,
        }}
        onBackdropClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        BackdropProps={{
          onClick: () => {
            // console.log("ON BACKDROP", e);
          },
          style: {
            background: 'rgba(35, 38, 47, 0.8)',
            backdropFilter: 'blur(29px)',
          },
        }}
      >
        <DialogContent>
          {!send ? (
            <Box className={cx(classes.modalPaper, classes.pMeduim)}>
              <Box className={classes.closeIcon} onClick={handleCloseModal}>
                <Close color={'#fff'} />
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography className={classes.smallTitle}>Форма приглашения кандидата</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.mainDescr}>
                    Выберите вакансию для кандидата, опишите все условия для кандидата и выберите удобный способ связи.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    column={1}
                    value={vacancy}
                    onChange={handleVacancyChange}
                    options={vacancyOptions}
                    label="Выбранная вакансия"
                    error={!vacancyStatus.isValid}
                    helperText={vacancyStatus.message}
                    noOptionsText={'Вакансия не найдена'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Сообщение"
                    value={message.value}
                    error={!message.isValid}
                    helperText={message.message}
                    multiline
                    styleMultiline
                    rows={8}
                    onChange={(e, { isValid }) => handleChange(e.target.value, setMessage, isValid)}
                    rules={[[Rules.MAX_STRING, 1000], Rules.REQUIRED]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button fullWidth onClick={handleSubmit} loading={loading} disabled={!isFormValid()}>
                    Отправить
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box className={cx(classes.modalPaper, classes.pMeduim)} textAlign="center">
              <Box className={classes.closeIcon} onClick={handleCloseModal}>
                <Close color={'#fff'} />
              </Box>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <Box textAlign="center" className={classes.modalIcon}>
                    <img src="/images/icons/completed-modals.png" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.mainTitle}>Приглашение для кандидата отправлено!</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.mainDescr}>
                    Вы можете закрыть окно и отправить приглашение на собеседование другим кандидатам или вернуться в
                    профиль.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6}>
                  <Button nextLink fullWidth linkProps={{ href: '/employer/profile' }} onClick={handleCloseModal}>
                    В профиль
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InviteCandidateModal;
