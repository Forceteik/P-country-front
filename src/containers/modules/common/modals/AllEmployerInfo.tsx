import { useState } from 'react';

import { Box, Dialog, DialogContent, Typography, Grid, Hidden } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Button from 'components/Button';
import Close from 'components/icons/Close';
import { ligthGray } from 'styles/colorPalette';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const useModalStyle = makeStyles<any>((theme) => ({
  leftSide: {
    textAlign: 'left',
    padding: '65px 5px 65px 45px',
    [theme.breakpoints.down('md')]: {
      padding: '42px 32px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '42px 16px',
    },
  },
  rightSide: {
    'backgroundColor': ligthGray,
    'padding': '32px 0px 0px 15px',
    'borderRadius': '0px 20px 20px 0px',
    '& img': {
      width: '100%',
      maxHeight: 470,
      objectFit: 'contain',
      marginBottom: -5,
    },
    [theme.breakpoints.down('md')]: {
      'borderRadius': '20px 20px 0px 0px',
      'padding': '32px 20px 19px 14px',
      '& img': {
        width: 'unset',
        maxHeight: 250,
      },
    },
  },
  icon: {
    width: 15,
    height: 16,
    display: 'inline-block',
    marginBottom: theme.spacing(-0.3),
  },
  grid: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },
}));

const AllEmployerInfo = ({ open, onClose, onGoToDrafts }) => {
  const classes = useItemStyles();
  const modalClasses = useModalStyle();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 881 });
  const [step, setStep] = useState(1);

  const handleClose = () => {
    onClose();
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
        <Box className={classes.modalPaper} textAlign="center">
          <Box className={classes.closeIcon} onClick={handleClose}>
            <Close color={'#fff'} />
          </Box>
          {step === 1 ? (
            <Grid container className={modalClasses.grid} alignItems="center">
              <Grid item xs={12} md={6} className={modalClasses.leftSide}>
                <Grid container spacing={3} justifyContent="flex-start">
                  <Grid item xs={12}>
                    <Typography className={classes.blackTitle}>Добрый день!</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.mainDescr}>
                      Мы обновили функции «Подбора кандидатов» и «Создания вакансии».
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button fullWidth onClick={() => setStep(2)}>
                      Далее
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Hidden mdDown>
                <Grid item xs={12} md={6} className={modalClasses.rightSide}>
                  <img src="/images/modals/employerInfo2.png" alt="employerInfo" />
                </Grid>
              </Hidden>
            </Grid>
          ) : (
            <Grid container className={modalClasses.grid} alignItems="center">
              <Grid item xs={12} md={6} className={modalClasses.leftSide}>
                <Grid container spacing={3} justifyContent="flex-start">
                  <Grid item xs={12}>
                    <Typography className={classes.blackTitle}>Важная информация!</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.mainDescr}>
                      Также вакансии были переведены в состояние «черновик». Просим обновить вакансии, дозаполнив
                      недостающие поля 👍🏻
                    </Typography>
                    <Typography className={classes.mainDescr}>1 вакансия займет 5 мин 🕓</Typography>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <Button fullWidth onClick={onGoToDrafts}>
                      Перейти к черновикам
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Hidden mdDown>
                <Grid item xs={12} md={6} className={modalClasses.rightSide}>
                  <img src="/images/modals/employerInfo3.png" alt="employerInfo" />
                </Grid>
              </Hidden>
            </Grid>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AllEmployerInfo;
