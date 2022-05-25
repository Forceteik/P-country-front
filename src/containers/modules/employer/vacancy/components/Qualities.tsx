import { useState } from 'react';

import { Grid, Typography, Box, useMediaQuery } from '@mui/material';

import Skills, { SkillsItem } from 'components/Skills';
import QualityInput from 'components/QualityInput';

import useVacancyStyles from '../style';

const Qualities = (props) => {
  const classes = useVacancyStyles();

  const { qualities, onChange } = props;
  const [inputErrorMessage, setInputErrorMessage] = useState('');

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const handleRemoveSkill = (value) => {
    let qualitiesArr = [...qualities];
    qualitiesArr = qualitiesArr.filter((item) => item.value !== value);
    onChange(qualitiesArr);
  };

  const handleSkillChange = (newValue) => {
    if (!newValue) return;

    const qualitiesArr = [...qualities];

    if (qualitiesArr.some((item) => item.value === newValue.value)) {
      setInputErrorMessage('Вы уже выбрали этот навык');
      return;
    }

    qualitiesArr.push(newValue);
    onChange(qualitiesArr);
    setInputErrorMessage('');
  };

  return (
    <Grid container spacing={isMobile ? 2 : 3}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <Typography component="h2" className={classes.blockTitle}>
            Профессиональные навыки <Typography component="span">*</Typography>
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Skills>
          {qualities.map(
            (item) => item.value && <SkillsItem name={item.label} onDelete={() => handleRemoveSkill(item.value)} />,
          )}
        </Skills>
      </Grid>

      <Grid item xs={12} className={classes.skills}>
        <QualityInput
          onChange={handleSkillChange}
          selectedOption={{ value: '', label: '' }}
          disabled={qualities.length >= 10}
          helperText={inputErrorMessage}
          onInputChange={() => setInputErrorMessage('')}
        />
      </Grid>
    </Grid>
  );
};

export default Qualities;
