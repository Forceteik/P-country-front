import { useState } from 'react';

import { Grid, Typography, Box, useMediaQuery } from '@mui/material';

import Skills, { SkillsItem } from 'components/Skills';
import UniversityInput from 'components/UniversityInput';

import useVacancyStyles from '../style';

const Universities = (props) => {
  const classes = useVacancyStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  const { universities, onChange } = props;

  const handleRemoveSkill = (value) => {
    let universitiesArr = [...universities];
    universitiesArr = universitiesArr.filter((item) => item.value !== value);
    onChange(universitiesArr);
  };

  const handleSkillChange = (newValue) => {
    if (!newValue || newValue.id === 0) return;

    if (universities.length > 40) {
      setInputErrorMessage('Вы уже добавили максимальное количество университетов');
      return;
    }

    const universitiesArr = [...universities];

    if (universitiesArr.some((item) => item.value === newValue.id)) {
      setInputErrorMessage('Вы уже выбрали этот университет');
      return;
    }

    universitiesArr.push({ value: newValue.id, label: newValue.name });
    onChange(universitiesArr);
    setInputErrorMessage('');
  };

  return (
    <Grid container spacing={isMobile ? 2 : 3}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <Typography component="h2" className={classes.blockTitle}>
            Предпочтительные ВУЗы кандидатов
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Skills>
          {universities.map(
            (item) => item.value && <SkillsItem name={item.label} onDelete={() => handleRemoveSkill(item.value)} />,
          )}
        </Skills>
      </Grid>

      <Grid item xs={12} className={classes.skills}>
        <UniversityInput
          onChange={handleSkillChange}
          selectedOption={{ value: '', label: '' }}
          helperText={inputErrorMessage}
          selectedUniv={universities}
        />
      </Grid>
    </Grid>
  );
};

export default Universities;
