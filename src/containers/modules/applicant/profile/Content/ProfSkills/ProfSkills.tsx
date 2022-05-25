import { useState } from 'react';
import useAxios from 'axios-hooks';

import { Box, Grid } from '@mui/material';

import { ProfileTitle } from 'components/Titles';
import QualityInput from 'components/QualityInput';
import Skills, { SkillsItem } from 'components/Skills';
import { getUserViewRoles } from 'utils/common';
import { useProfile } from 'context/ProfileContext';

const ProfSkills = ({ title, user = null }) => {
  const { currentUser: currentUserFromSession, refetch } = useProfile();
  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isOwner = viewRole.isOwner;

  const [{ loading: addSkillLoading }, addSkill] = useAxios(
    { url: 'employee/qualities', method: 'post' },
    { manual: true },
  );

  const [, removeSkill] = useAxios({ method: 'DELETE' }, { manual: true });

  const qualities = user?.qualities || [];

  const [inputErrorMessage, setInputErrorMessage] = useState('');

  const handleChangeSkill = (newValue) => {
    if (qualities.some((item) => item.name.name.toLowerCase() === newValue.label.toLowerCase())) {
      setInputErrorMessage('Такой навык у Вас уже существует');
      return;
    }

    addSkill({ data: { quality_id: newValue.value } }).then(() => {
      refetch();
    });
    setInputErrorMessage('');
  };

  const handleRemoveSkill = (id) => {
    removeSkill({ url: `employee/qualities/${id}` }).then(() => {
      refetch();
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProfileTitle title={title} />
      </Grid>
      <Grid item xs={12}>
        {isOwner && (
          <QualityInput
            onChange={handleChangeSkill}
            selectedOption={{ value: '', label: '' }}
            disabled={qualities.length >= 20}
            helperText={inputErrorMessage}
            onInputChange={() => setInputErrorMessage('')}
          />
        )}

        {(!!qualities.length || addSkillLoading) && (
          <Box marginTop={isOwner ? 4 : 0}>
            <Skills>
              {qualities.map(
                (item, key) =>
                  item.id && (
                    <SkillsItem
                      name={item.name.name}
                      onDelete={isOwner && (() => handleRemoveSkill(item.id))}
                      key={key}
                    />
                  ),
              )}
              {addSkillLoading && <SkillsItem name="" isLoading />}
            </Skills>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfSkills;
