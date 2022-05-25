import cx from 'classnames';

import { Box, Dialog, DialogContent, Typography, Grid, useMediaQuery } from '@mui/material';

import Button, { SecondaryButton } from 'components/Button';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const EditVacancyModal = ({ open, handleClose, newId }) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 587 });
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <Box className={cx(classes.modalPaper, classes.pMeduim)} textAlign="center">
          <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <Box textAlign="center" className={classes.modalIcon}>
                    <img src="/images/icons/completed-modals.png" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography className={classes.mainTitle}>Поздравляем! Вакансия обновлена</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button fullWidth nextLink linkProps={{ href: `/employer/vacancies/${newId}` }}>
                Просмотр вакансии
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SecondaryButton onClick={handleClose} fullWidth nextLink linkProps={{ href: '/employer/profile' }}>
                В профиль
              </SecondaryButton>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditVacancyModal;
