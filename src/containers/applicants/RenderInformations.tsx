import { Grid, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import About from 'containers/modules/common/profile/About';
import Contacts from 'containers/modules/common/profile/Contacts/Contacts';
import TestAndCompetency from 'containers/modules/applicant/profile/Content/TestAndCompetency';

const RenderInformation = ({ loading, user, competencyGroup }) => {
  if (loading) {
    return (
      <>
        <Grid item xs={12}>
          <Typography component="h3">
            <Skeleton variant="text" width="50%" />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h3">
            <Skeleton variant="text" width="50%" />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="h3">
            <Skeleton variant="text" width="50%" />
          </Typography>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid item xs={12}>
        <About title="О кандидате" user={user} />
      </Grid>
      <Grid item xs={12}>
        <Contacts user={user} />
      </Grid>
      {user && (
        <Grid item xs={12}>
          <TestAndCompetency user={user} isOwner={true} competencyGroup={competencyGroup} />
        </Grid>
      )}
    </>
  );
};

export default RenderInformation;
