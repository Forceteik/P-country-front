import { useRouter } from 'next/router';

import { Grid, Hidden, useMediaQuery } from '@mui/material';

import CustomPagination from 'components/CustomPagination';
import RenderCandidateItems from 'containers/modules/employer/applicants/RenderCandidateItems';

import AsideFilter from './AsideFilter';

const CandidatsList = ({
  openFilter,
  setOpenFilter,
  data,
  pagination,
  dictionaryData,
  vacancySpecifiedSearch = false,
  loading,
}) => {
  // const classes = useStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const router = useRouter();

  const handlePagination = (e, page) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  // const Buttons = [
  //   ({ item }) => (
  //     <Button
  //       fullWidth
  //       small
  //       nextLink
  //       linkProps={{ href: `/employer/applicants/${item.id}` }}
  //       nativelinkprops={{ target: "_blank" }}
  //     >
  //       Перейти в профиль
  //     </Button>
  //   ),
  // ];

  return (
    <Grid container spacing={4} position={'relative'}>
      <Grid item xs={12} md={9}>
        <Grid container spacing={isMobile ? 3 : 4}>
          <RenderCandidateItems data={data} loading={loading} vacancySpecifiedSearch={vacancySpecifiedSearch} />
        </Grid>
      </Grid>
      <Hidden mdDown>
        <Grid item xs={3}>
          {openFilter && (
            <AsideFilter openFilter={openFilter} setOpenFilter={setOpenFilter} dictionaryData={dictionaryData} />
          )}
        </Grid>
      </Hidden>
      {pagination && pagination.totalPages > 1 && (
        <Grid item xs={12}>
          <CustomPagination page={pagination.currentPage} count={pagination.totalPages} onChange={handlePagination} />
        </Grid>
      )}
    </Grid>
  );
};

export default CandidatsList;
