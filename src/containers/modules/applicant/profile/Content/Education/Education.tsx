import { useState } from 'react';

import { Box, Typography, Grid } from '@mui/material';

import EductionItem from 'containers/modules/applicant/profile/Content/Education/EductionItem';
import { ProfileTitle } from 'components/Titles';
import { educationOptions } from 'constants/common';
import { getSortEducation, getUserViewRoles } from 'utils/common';
import { useProfile } from 'context/ProfileContext';

import PlusBtn from '../../../../common/profile/PlusBtn';
import profileStyle from '../../../../common/profile/style';

import EducationForm from './EducationForm';
import EducationRemove from './EducationRemove';

const Education = ({ user = null }) => {
  const commonStyle = profileStyle();
  const currentUserFromSession = useProfile().currentUser;
  const currentUser = user || currentUserFromSession;
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editRowId, setEditRowId] = useState(0);

  const education = getSortEducation(currentUser.education);

  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isGuest = !viewRole.isOwner;

  const close = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  };

  const handleEdit = (rowId) => {
    setEditRowId(rowId);
    setOpenEdit(!openEdit);
  };

  const educationToRender = (
    <>
      {education &&
        education.map((item, key) => {
          if (openEdit && item.id === editRowId) {
            return (
              <Grid item xs={12}>
                <EducationForm key={key} item={item} closeFnc={close} mode={'edit'} />
              </Grid>
            );
          }

          if (item.type === 'school') {
            return (
              <Grid item xs={12}>
                <EductionItem
                  item={{
                    id: item.id,
                    imagePath: educationOptions.find((i) => i.value === item.type).imagePath,
                    name: item.name,
                    city: item.city?.name,
                    expirationYear: item.year_of_ending,
                    typeName: educationOptions.find((i) => i.value === item.type).label,
                  }}
                  isUniversity
                  handleEdit={handleEdit}
                  key={key}
                  RemoveComponent={() => <EducationRemove itemId={item.id} />}
                  guest={isGuest}
                />
              </Grid>
            );
          }

          if (item.type === 'college') {
            return (
              <Grid item xs={12}>
                <EductionItem
                  item={{
                    id: item.id,
                    imagePath: educationOptions.find((i) => i.value === item.type).imagePath,
                    name: item.name,
                    faculty: item.faculty,
                    speciality: item.specialization,
                    city: item.city?.name,
                    expirationYear: item.year_of_ending,
                    typeName: educationOptions.find((i) => i.value === item.type).label,
                  }}
                  isUniversity
                  handleEdit={handleEdit}
                  key={key}
                  RemoveComponent={() => <EducationRemove itemId={item.id} />}
                  guest={isGuest}
                />
              </Grid>
            );
          }

          if (
            item.type === 'bachelor' ||
            item.type === 'master' ||
            item.type === 'specialist' ||
            item.type === 'postgraduate' ||
            item.type === 'internship'
          ) {
            return (
              <Grid item xs={12}>
                <EductionItem
                  item={{
                    id: item.id,
                    imagePath: educationOptions.find((i) => i.value === item.type).imagePath,
                    name: item.education.name,
                    faculty: item.faculty,
                    speciality: item.specialization,
                    city: item.city.name,
                    expirationYear: item.year_of_ending,
                    typeName: educationOptions.find((i) => i.value === item.type).label,
                  }}
                  isUniversity
                  handleEdit={handleEdit}
                  key={key}
                  RemoveComponent={() => <EducationRemove itemId={item.id} />}
                  guest={isGuest}
                />
              </Grid>
            );
          }

          if (item.type === 'skills_enhancement' || item.type === 'professional_retraining') {
            return (
              <Grid item xs={12}>
                <EductionItem
                  item={{
                    id: item.id,
                    imagePath: educationOptions.find((i) => i.value === item.type).imagePath,
                    name: item.name,
                    speciality: item.specialization,
                    city: item.city.name,
                    expirationYear: item.year_of_ending,
                    typeName: educationOptions.find((i) => i.value === item.type).label,
                  }}
                  isUniversity
                  handleEdit={handleEdit}
                  key={key}
                  RemoveComponent={() => <EducationRemove itemId={item.id} />}
                  guest={isGuest}
                />
              </Grid>
            );
          }
        })}
      {isGuest && education.length === 0 && (
        <Grid item xs={12}>
          <Typography className={commonStyle.desc_null}>Кандидат ещё не заполнил образование</Typography>
        </Grid>
      )}
      {openAdd ? (
        <Grid item xs={12}>
          <EducationForm closeFnc={close} />
        </Grid>
      ) : (
        !isGuest && (
          <Grid item xs={12}>
            <PlusBtn text={'Добавить образование'} onClick={() => setOpenAdd(true)} />
          </Grid>
        )
      )}
    </>
  );

  return (
    <Box className={commonStyle.box}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProfileTitle title="Образование" />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {educationToRender}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Education;
