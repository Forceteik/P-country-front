import { Grid } from '@mui/material';

import PassRestore from 'containers/modules/common/settings/PassRestore';
import Email from 'containers/modules/common/settings/Email';
import Login from 'containers/modules/common/settings/Login';
import DeleteAccount from 'components/DeleteAccount';

const Security = (props) => {
  const { value = 0, index = 0 } = props;

  return (
    <>
      {value === index && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <PassRestore type="employer" />
          </Grid>
          <Grid item xs={12}>
            <Email />
          </Grid>
          <Grid item xs={12}>
            <Login />
          </Grid>
          <Grid item xs={12}>
            <DeleteAccount />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Security;
