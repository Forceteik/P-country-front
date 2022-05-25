import { Box, Dialog, DialogContent, Typography, Grid, Hidden } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Button from 'components/Button';
import Close from 'components/icons/Close';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const useModalStyle = makeStyles<any>((theme) => ({
  leftSide: {
    textAlign: 'left',
    padding: '65px 42px',
    [theme.breakpoints.down('md')]: {
      padding: '42px 32px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '42px 16px',
    },
  },
  rightSide: {
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

const EducationApplicantInfo = ({ open, onClose, onGoToEducation, name, surname, gender }) => {
  const classes = useItemStyles();
  const modalClasses = useModalStyle();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 812 });

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
          <Box className={classes.closeIcon} onClick={onClose}>
            <Close color={'#fff'} />
          </Box>
          <Grid container className={modalClasses.grid} alignItems="center">
            <Grid item xs={12} md={7} className={modalClasses.leftSide}>
              <Grid container spacing={3} justifyContent="flex-start">
                <Grid item xs={12}>
                  <Typography className={classes.blackTitle}>
                    {gender === 2 ? 'Уважаемая' : 'Уважаемый'} {name} {surname}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.mainDescr}>
                    В связи с изменениями на платформе, просим обновить информацию в графе «образование». Так у вас
                    будет выше шанс быть найденым подходящим работодателем.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth onClick={onGoToEducation}>
                    Перейти к образованию
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={12} md={5} className={modalClasses.rightSide}>
                <img src="/images/modals/applicantInfo.png" alt="applicant education modal info" />
              </Grid>
            </Hidden>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EducationApplicantInfo;
