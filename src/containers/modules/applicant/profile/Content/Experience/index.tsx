import { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import profileStyle from 'containers/modules/common/profile/style';
import PlusBtn from 'containers/modules/common/profile/PlusBtn';
import { useProfile } from 'context/ProfileContext';
import { getUserViewRoles } from 'utils/common';

import ExperienceRemove from './ExperienceRemove';
import ExperienceItem from './ExperienceItem';
import ExperienceForm from './ExperienceForm';

const Experience = ({ user = null }) => {
  const commonStyle = profileStyle();
  const [openForm, setOpenForm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editRowId, setEditRowId] = useState(0);

  const currentUserFromSession = useProfile().currentUser;
  const currentUser = user || currentUserFromSession;
  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isGuest = !viewRole.isOwner;

  const { experiences } = currentUser;

  const filterDateExperience = (experiences) => {
    const newArr = experiences.sort((a, b) => Number(b.start_date.slice(0, 4)) - Number(a.start_date.slice(0, 4)));
    return newArr;
  };

  const handleEdit = (rowId) => {
    setEditRowId(rowId);
    setOpenEdit(!openEdit);
  };

  const close = () => {
    setOpenForm(false);
    setOpenEdit(false);
  };

  return (
    <Grid container rowSpacing={3} component="section">
      <Grid item xs={12}>
        <Typography className={commonStyle.blockTitleAbout} component="h2">
          Опыт работы
        </Typography>
      </Grid>

      {experiences && experiences.length > 0 && (
        <Grid item xs={12}>
          <Grid container rowSpacing={3}>
            {filterDateExperience(experiences).map((item, id) => (
              <Grid item xs={12} lg={10} key={id}>
                {openEdit && item.id === editRowId ? (
                  <ExperienceForm item={item} closeFnc={close} mode={'edit'} />
                ) : (
                  <ExperienceItem
                    item={item}
                    handleEdit={handleEdit}
                    guest={isGuest}
                    RemoveComponent={() => <ExperienceRemove itemId={item.id} />}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}

      {isGuest && experiences.length === 0 && (
        <Grid item xs={12}>
          <Typography className={commonStyle.desc_null}>Кандидат ещё не добавил опыт работы</Typography>
        </Grid>
      )}

      {openForm ? (
        <Grid item xs={12}>
          <ExperienceForm closeFnc={close} />
        </Grid>
      ) : (
        !isGuest && (
          <Grid item xs={12}>
            <PlusBtn text={'Добавить опыт работы'} onClick={() => setOpenForm(true)} />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default Experience;
