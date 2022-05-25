import cx from 'classnames';

import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';

import Button, { SecondaryButton } from 'components/Button';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const CreateDraftModal = ({ open, handleCreateNewVacancy }) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 600 });

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
        <Box className={cx(classes.modalPaper, classes.pMeduim)} textAlign="center">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className={classes.modalIcon} textAlign="center">
                    <img src="/images/vacancies/paper.png" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography className={classes.mainTitle}>Черновик вакансии создан.</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.mainDescr}>Вы можете увидеть его в вашем профиле</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button fullWidth onClick={handleCreateNewVacancy}>
                Создание вакансии
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SecondaryButton fullWidth nextLink linkProps={{ href: '/employer/profile' }}>
                В профиль
              </SecondaryButton>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDraftModal;
