import { useRouter } from 'next/router';
import moment from 'moment';

import { Box, Dialog, DialogContent, Grid, Typography } from '@mui/material';

import Button from 'components/Button';
import Close from 'components/icons/Close';
import { darkGray } from 'styles/colorPalette';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const PublishModal = ({ open, handleClose }) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 450 });
  const router = useRouter();

  const generateDate = () => {
    return moment().add(1, 'M').format('D MMMM');
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
          <Box className={classes.closeIcon} onClick={handleClose}>
            <Close color={'#fff'} />
          </Box>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.smallTitle}>Ваша вакансия опубликована</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color={darkGray} fontSize={18} textAlign="center">
                Срок действия до {generateDate()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth small nextLink linkProps={{ href: `/employer/vacancies/${router.query.vacancy_id}` }}>
                Перейти к вакансии
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PublishModal;
