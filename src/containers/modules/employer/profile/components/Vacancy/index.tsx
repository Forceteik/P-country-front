import { useState } from 'react';
import useAxios from 'axios-hooks';

import { Box, Grid, Typography, Hidden } from '@mui/material';

import profileStyle from 'containers/modules/common/profile/style';
import Button from 'components/Button';
import BeforeCreateVacancy from 'containers/modules/common/modals/BeforeCreateVacancy';
import { getUserViewRoles } from 'utils/common';
import { useProfile } from 'context/ProfileContext';

import DraftBlock from './DraftBlock';
import { useStyles } from './styles';
import InactiveBlock from './InactiveBlock';
import ActiveBlock from './ActiveBlock';
import SkeletonVanancy from './SkeletonVanancy';

const Vacancy = ({ user = null, refetchProfileProgress = null, isExpanded = 'null', setIsExpanded = null }) => {
  const commonStyle = profileStyle();
  const [openModal, setOpenModal] = useState(false);

  //для того, чтобы после модалки с информацией о попадании всех вакансий в черновики был открыт аккордеон Черновики
  const handleChange = (panel) => (event, newExpanded) => {
    setIsExpanded(newExpanded ? panel : false);
  };

  const currentUserFromSession = useProfile().currentUser;
  const currentUser = user || currentUserFromSession;

  const userId = currentUser.id;
  const classes = useStyles();

  const [{ data, loading }, refetch] = useAxios(`/vacancies/employer/${userId}`, { useCache: false });

  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isGuest = !viewRole.isOwner;

  const handleCreateVacancy = () => {
    setOpenModal(true);
  };

  if (loading) {
    return <SkeletonVanancy />;
  }

  const draft = data.data.draft_list;
  const hidden = data.data.hidden_list;
  const specializations = data.data.specializations;

  if (isGuest && specializations.length === 0) {
    return null;
  }

  return (
    <Box component="section" className={classes.vacancy}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Typography className={commonStyle.blockTitleAbout} component="h2">
                Размещенные вакансии
              </Typography>
            </Grid>
            {!isGuest && (
              <Hidden mdDown>
                <Grid item xs={3.1}>
                  <Button fullWidth small onClick={handleCreateVacancy}>
                    Создать вакансию
                  </Button>
                </Grid>
              </Hidden>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} className={classes.accordion}>
            {draft?.count > 0 && (
              <DraftBlock
                isExpanded={isExpanded}
                handleChange={handleChange}
                items={draft}
                refetch={refetch}
                refetchProfileProgress={refetchProfileProgress}
              />
            )}

            {hidden?.count > 0 && <InactiveBlock items={hidden} />}

            {specializations?.length > 0 && <ActiveBlock items={specializations} isGuest={isGuest} />}
          </Grid>
        </Grid>
      </Grid>
      <BeforeCreateVacancy open={openModal} setOpen={setOpenModal} />
    </Box>
  );
};

export default Vacancy;
