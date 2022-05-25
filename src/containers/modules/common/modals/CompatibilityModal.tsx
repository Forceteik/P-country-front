import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';

import { Box, Dialog, DialogContent, Grid, useMediaQuery } from '@mui/material';

import Button, { SecondaryButton } from 'components/Button';
import Close from 'components/icons/Close';
import InviteCandidateModal from 'containers/modules/common/modals/InviteCandidateModal';
import CompetencyInfo from 'components/CompetencyInfo';
import { OverlayBoxLoader } from 'components/Loaders';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const CompatibilityModal = ({
  open,
  handleClose,
  compatibility,
  profileLink,
  employeeId,
  showInviteButton = true,
  expectation,
}) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 532 });
  const router = useRouter();
  const { vacancy_id } = router.query;
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const [{ data: vacancyData, loading }] = useAxios(`/vacancies/${vacancy_id}`, { useCache: false });

  const handleInviteSubmit = () => {
    // refetch();
  };

  const InviteButton = (props) => (
    <Button fullWidth {...props}>
      Пригласить на собеседование
    </Button>
  );

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      onBackdropClick={handleClose}
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
        <Box className={classes.modalPaper} padding={isMobile ? '42px 24px 32px' : '42px'} textAlign="center">
          <Box className={classes.closeIcon} onClick={handleClose}>
            <Close color={'#fff'} />
          </Box>
          {loading ? (
            <OverlayBoxLoader />
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CompetencyInfo
                  compatibility={compatibility}
                  expectation={expectation}
                  vacancyData={vacancyData}
                  modal
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={isMobile ? 2 : 3}>
                  {showInviteButton && (
                    <Grid item xs={12}>
                      <InviteCandidateModal
                        CustomButton={InviteButton}
                        employeeId={employeeId}
                        vacancyId={vacancy_id}
                        onSubmit={handleInviteSubmit}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <SecondaryButton
                      fullWidth
                      nextLink
                      linkProps={{ href: profileLink }}
                      nativelinkprops={{ target: '_blank' }}
                    >
                      Перейти в профиль
                    </SecondaryButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CompatibilityModal;
