import cx from 'classnames';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Box, Dialog, DialogContent, Typography, Grid, useMediaQuery } from '@mui/material';

import Close from 'components/icons/Close';
import Button, { SecondaryButton } from 'components/Button';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';
import AnswerPageEmployer from './components/AnswerPageEmployer';

/**
 * Вакансию можно удалить как в списке, так и при просмотре самой вакансии
 * если vacancyId !== null значить удаление происходит через список черновиков
 * @param open
 * @param handleClose
 * @param vacancyId
 * @constructor
 */
const DeleteVacancyModal = ({ open, handleClose, vacancyId = null, withQuestions }) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 751 });
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const router = useRouter();
  const [openQuestions, setOpenQuestions] = useState(false); //открытие страницы с опросом работодателя

  const [selectAnswer, setSelectAnswer] = useState(1);
  const [differText, setDifferText] = useState({ value: '', isValid: true, message: '' });

  const id = vacancyId;

  const [{ loading }, removeVacancy] = useAxios({ url: `/vacancies/${id}/delete`, method: 'PUT' }, { manual: true });

  const handleRemove = () => {
    if (withQuestions) {
      setOpenQuestions(true);
    } else {
      removeVacancy({ data: { closing_form: true } }).then(() => {
        handleClose();
        cleanData();
        router.push('/employer/profile');
      });
    }
  };

  const cleanData = () => {
    setOpenQuestions(false);
    setSelectAnswer(1);
    setDifferText({ value: '', isValid: true, message: '' });
  };

  const handleSendAnswer = () => {
    let data;

    if (selectAnswer === 4) {
      data = { candidate_search_id: selectAnswer, comment: differText.value };
    } else {
      data = { candidate_search_id: selectAnswer };
    }

    removeVacancy({ data: data }).then(() => {
      handleClose();
      cleanData();
      router.push('/employer/profile');
    });
  };

  const handleCloseModal = () => {
    if (openQuestions) {
      removeVacancy({ data: { closing_form: true } }).then(() => {
        handleClose();
        cleanData();
        router.push('/employer/profile');
      });
    } else {
      handleClose();
      cleanData();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
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
        <Box className={cx(classes.modalPaper, classes.pMeduim)}>
          <Box className={classes.closeIcon} onClick={handleCloseModal}>
            <Close color={'#fff'} />
          </Box>{' '}
          {!openQuestions && (
            <Grid container spacing={isMobile ? 3 : 5}>
              <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={10}>
                    <Typography className={classes.mainTitle} textAlign="center">
                      Вы действительно хотите удалить вакансию?
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth onClick={handleClose}>
                      Нет, оставить
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SecondaryButton fullWidth onClick={handleRemove} loading={loading}>
                      Удалить вакансию
                    </SecondaryButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {openQuestions && withQuestions && (
            <AnswerPageEmployer
              selectAnswer={selectAnswer}
              setSelectAnswer={setSelectAnswer}
              differText={differText}
              setDifferText={setDifferText}
              handleSendAnswer={handleSendAnswer}
              loading={loading}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteVacancyModal;
