import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';

import Button, { SecondaryButton } from 'components/Button';

import { usePaperStyles, useItemStyles } from './styles';

const RemoveModal = ({ open, handleClose, handleSubmit, rloading, text = 'Вы действительно хотите удалить?' }) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStyles();

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
        <Box>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Box textAlign="center" className={classes.modalIcon}>
                <img src="/images/icons/sad-smile.png" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.whiteTitle}>{text}</Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <SecondaryButton onClick={handleClose} fullWidth>
                Нет, оставить
              </SecondaryButton>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Button fullWidth onClick={handleSubmit} loading={rloading}>
                Да, удалить
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveModal;
