import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';

import Button from 'components/Button';
import Close from 'components/icons/Close';
import { darkGray } from 'styles/colorPalette';

import { useItemStyles, usePaperStylesFlexibleWidth } from '../styles';

const PayModal = ({ open, handleClose, handleClosePayAndOpenAdd }) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 450 });
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
          <Box className={classes.closeIcon} onClick={handleClose}>
            <Close color={'#fff'} />
          </Box>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.smallTitle}>У вас недостаточно средств</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color={darkGray} fontSize={18} textAlign="center">
                Пополните баланс для покупки выбранной услуги
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth small onClick={handleClosePayAndOpenAdd}>
                Пополнить баланс
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PayModal;
