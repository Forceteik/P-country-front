import { Grid } from '@mui/material';

import EmptyRecordsContainer from 'components/EmptyRecordsContainer';
import ResponseItem from 'containers/modules/employer/responses/ResponseItem';
import EmployerResponseItemSkeleton from 'components/skeletons/EmployerResponseItemSkeleton';

const RenderResponses = ({ data, loading = true }) => {
  if (loading) {
    return (
      <>
        <Grid item xs={12}>
          <EmployerResponseItemSkeleton />
        </Grid>
        <Grid item xs={12}>
          <EmployerResponseItemSkeleton />
        </Grid>
        <Grid item xs={12}>
          <EmployerResponseItemSkeleton />
        </Grid>
      </>
    );
  }

  return (
    <Grid item xs={12}>
      {data?.data?.length === 0 && <EmptyRecordsContainer />}
      {data?.data?.map((item, key) => (
        <ResponseItem item={item} key={key} />
      ))}
    </Grid>
  );
};

export default RenderResponses;
