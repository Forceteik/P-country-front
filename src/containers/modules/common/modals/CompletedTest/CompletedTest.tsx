import { useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';

import Button, { SecondaryButton } from 'components/Button';

import { useItemStyles, usePaperStylesFlexibleWidth } from '../styles';

import ShareModal from './ShareModal';

const CompletedTest = ({ open, setOpen = null, mbti = false, ...other }) => {
  const classes = useItemStyles();
  const [openShare, setOpenShare] = useState(false);
  const paperClasses = usePaperStylesFlexibleWidth({ width: openShare ? 1008 : 650 });
  const router = useRouter();

  const handleClose = () => {
    if (setOpen) {
      setOpen(false);
    }
    router.push('/applicant');
  };

  const handleShare = () => {
    setOpenShare(true);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      classes={{
        scrollPaper: classes.scroll,
      }}
      PaperProps={{
        classes: paperClasses,
      }}
      BackdropProps={{
        style: {
          background: 'rgba(35, 38, 47, 0.8)',
          backdropFilter: 'blur(29px)',
        },
      }}
    >
      <DialogContent>
        {!openShare ? (
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Box textAlign="center" className={classes.modalIcon}>
                <img src="/images/icons/completed-modals.png" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.whiteTitle}>
                {other.name ? `Отлично! Вы завершили "${other.name}"` : 'Отлично! Вы завершили этот тест'}{' '}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.whiteDescr}>
                Результаты вашего тестирования уже обновлены и отправлены компаниям-партнерам
              </Typography>
            </Grid>
            {other.fullReportLink ? (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button nextLink fullWidth linkProps={{ href: other.fullReportLink }}>
                      Полный отчет
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {mbti ? (
                      <SecondaryButton fullWidth onClick={handleShare}>
                        Поделиться
                      </SecondaryButton>
                    ) : (
                      <SecondaryButton nextLink fullWidth linkProps={{ href: '/applicant' }} onClick={handleClose}>
                        В профиль
                      </SecondaryButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      nextLink
                      fullWidth
                      linkProps={{ href: other.testLink || '/applicant/tests' }}
                      // onClick={handleClose}
                    >
                      К тестам
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SecondaryButton nextLink fullWidth linkProps={{ href: '/applicant' }} onClick={handleClose}>
                      В профиль
                    </SecondaryButton>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        ) : (
          <ShareModal handleClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CompletedTest;
