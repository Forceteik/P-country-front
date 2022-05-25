import { useRouter } from 'next/router';

import { Box, Dialog, DialogContent, Grid, Typography } from '@mui/material';

import Button, { TetriatyButton } from 'components/Button';
import Close from 'components/icons/Close';
import { darkGray } from 'styles/colorPalette';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const VacancyWontBePublished = ({ open, handleClose }) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 610 });
  const router = useRouter();

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
              <Typography className={classes.smallTitle}>Вакансия не будет опубликована</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color={darkGray} fontSize={18} textAlign="center">
                Вакансия перейдет в раздел &quot;Неактивные&quot;. <br />
                Вы всегда сможете опубликовать вакансию оттуда.
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <Button nextLink linkProps={{ href: `/employer/vacancies/${router.query.vacancy_id}` }} fullWidth small>
                Вернуться к публикации
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TetriatyButton nextLink linkProps={{ href: `/employer/profile` }} fullWidth small>
                В профиль
              </TetriatyButton>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VacancyWontBePublished;
