import ReactSlick from 'react-slick';

import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Button from 'components/Button';
import Close from 'components/icons/Close';
import { blueLight } from 'styles/colorPalette';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';
import 'slick-carousel/slick/slick.css';

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  autoplaySpeed: 3000,
  pauseOnHover: false,
  pauseOnFocus: false,
};

const useModalStyle = makeStyles<any>((theme) => ({
  leftSide: {
    textAlign: 'left',
    padding: '65px 42px',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
    },
  },
  rightSide: {
    'backgroundColor': blueLight,
    'padding': '48px 20px 19px 15px',
    'borderRadius': '0px 20px 20px 0px',
    '& img': {
      width: '100%',
      maxHeight: 390,
      objectFit: 'contain',
      margin: '0px auto',
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

const BeforeCreateVacancy = ({ open, setOpen }) => {
  const classes = useItemStyles();
  const modalClasses = useModalStyle();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 1009 });

  const handleClose = () => {
    setOpen(false);
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
          <Grid container className={modalClasses.grid}>
            <Grid item xs={12} md={6} className={modalClasses.leftSide}>
              <Grid container spacing={3} justifyContent="flex-start">
                <Grid item xs={12}>
                  <Typography className={classes.blackTitle}>Перед созданием вакансии</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.mainDescr} component="div">
                    Внимательно заполняйте вакансию. Вакансия состоит из нескольких этапов. Для того, чтобы получить
                    наиболее подходящих кандидатов, необходимо заполнить все доступные поля.
                    {/* <img src="/images/icons/thumb-up.png" className={modalClasses.icon} /> */}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={9}>
                  <Button fullWidth nextLink linkProps={{ href: '/employer/vacancies/create' }} onClick={handleClose}>
                    Начать
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} className={modalClasses.rightSide}>
              <ReactSlick {...settings}>
                <Box>
                  <img src="/images/vacancies/beforeCreat.png" />
                </Box>
                <Box>
                  <img src="/images/vacancies/beforeCreat-2.png" />
                </Box>
                <Box>
                  <img src="/images/vacancies/beforeCreat-3.png" />
                </Box>
              </ReactSlick>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BeforeCreateVacancy;
