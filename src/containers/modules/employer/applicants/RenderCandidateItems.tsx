import { Grid } from '@mui/material';

import CandidateItemSkeleton from 'components/skeletons/CandidateItemSkeleton';
import EmptyRecordsContainer from 'components/EmptyRecordsContainer';
import CandidateItem from 'containers/modules/employer/applicants/CandidateItem';

const RenderCandidateItems = ({ loading, data, vacancySpecifiedSearch }) => {
  if (loading) {
    return (
      <>
        <CandidateItemSkeleton />
        <CandidateItemSkeleton />
        <CandidateItemSkeleton />
      </>
    );
  }

  return (
    <>
      {data.length === 0 && (
        <Grid item xs={12}>
          <EmptyRecordsContainer
            title={'Не найдено'}
            descr={'К сожалению, по заданным параметрам подходящих Вам кандидатов нет'}
          />
        </Grid>
      )}
      {data.map((item, key) => (
        <Grid item xs={12} key={key}>
          <CandidateItem item={item} status="search" vacancySpecifiedSearch={vacancySpecifiedSearch} />
        </Grid>
      ))}
    </>
  );
};

export default RenderCandidateItems;
