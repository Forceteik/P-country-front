import { useRouter } from 'next/router';

import { Grid } from '@mui/material';

import Button from 'components/Button';
import SendIcon from 'components/icons/Send';
import InviteCandidateModal from 'containers/modules/common/modals/InviteCandidateModal';
import { white } from 'styles/colorPalette';

const EmployerBtns = ({ currentUser, handleInviteSubmit }) => {
  const router = useRouter();

  const { vacancy_id } = router.query;

  const InviteButton = (props) => (
    <Button small fullWidth startIcon={<SendIcon color={white} />} {...props}>
      Пригласить на собеседование
    </Button>
  );

  if (!currentUser) {
    return null;
  }

  return (
    <Grid container spacing={3} justifyContent="flex-end">
      {/*<Grid item xs={12} lg={10}>*/}
      {/*  <GreenButton fullWidth small startIcon={<Download color={white} />}>*/}
      {/*    Отчет по кандидату*/}
      {/*  </GreenButton>*/}
      {/*</Grid>*/}
      <Grid item xs={12} lg={10}>
        <InviteCandidateModal
          CustomButton={InviteButton}
          vacancyId={vacancy_id}
          employeeId={currentUser.id}
          onSubmit={handleInviteSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default EmployerBtns;
