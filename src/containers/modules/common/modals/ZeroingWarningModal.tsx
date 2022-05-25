import cx from 'classnames';

import { Box, Dialog, DialogContent, Typography, Grid, useMediaQuery } from '@mui/material';

import Button, { SecondaryButton } from 'components/Button';
import Close from 'components/icons/Close';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const ZeroingWarningModal = ({ open, handleClose, reset }) => {
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
          <Box className={classes.closeIcon} onClick={handleClose}>
            <Close color={'#fff'} />
          </Box>
          <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <Box textAlign="center" className={classes.modalIcon}>
                    <img src="/images/vacancies/paper.png" />
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography className={classes.mainTitle}>Внимание!</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography className={classes.mainDescr}>
                    При внесении изменений в Название вакансии и Проф. области, все отклики и просмотры будут удалены
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button fullWidth onClick={handleClose}>
                Да, изменить
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SecondaryButton onClick={reset} fullWidth>
                Нет, оставить
              </SecondaryButton>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ZeroingWarningModal;
