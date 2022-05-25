import { useState } from 'react';
import Link from 'next/link';

import { Box, Typography, Grid } from '@mui/material';

import Button from 'components/Button';
import TextField from 'components/TextField';
import useStyles from 'containers/auth/styles';
import PrevLink from 'components/PrevLink';
import Select from 'components/Select';
import { EDUCATION_OPTIONS } from 'constants/common';
import { LocationInputV2 as LocationInput } from 'components/LocationInput';

const EducationApplicantRegister = () => {
  const classes = useStyles();
  const [education, setEducation] = useState({ value: null, isValid: true, message: '' });
  const [university, setUniversity] = useState('');
  const [city, setCity] = useState({ label: '', value: {} });
  const [faculty, setFaculty] = useState('');
  const [year, setYear] = useState('');
  const [specialisation, setSpecialisation] = useState('');

  const handleBack = () => {
    // onGoTo({ step: "secondStep" });
  };

  const handleEducation = (value) => {
    if (value !== '') {
      setEducation({ value, isValid: true, message: '' });
    } else {
      setEducation({ value, isValid: false, message: 'Поле обязательно для заполнения' });
    }
  };

  const handleCityChange = (option) => {
    setCity(option);
  };

  return (
    <Box mb={2.5}>
      <Box onClick={handleBack} mb={1.5}>
        <PrevLink withoutLink text={'Назад'} />
      </Box>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className={classes.title}>Регистрация</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.subTitle}>
                Укажите ваше последнее (текущее) образования если такое имеется.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Select
                label={'Уровень (например, магистр)'}
                name={'education'}
                options={EDUCATION_OPTIONS}
                onChange={handleEducation}
                // onClose={handleGenderClose}
                error={!education.isValid}
                helperText={education.message}
                // defaultValue={gender}
                value={education.value}
              />
            </Grid>
            {(education.value === 1 || education.value === 2) && (
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField label="Вуз" value={university} onChange={(e) => setUniversity(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <LocationInput onChange={handleCityChange} selectedOption={city} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Факультет" value={faculty} onChange={(e) => setFaculty(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Специлизация"
                      value={specialisation}
                      onChange={(e) => setSpecialisation(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Год окончания" value={year} onChange={(e) => setYear(e.target.value)} />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Button fullWidth>Зарегистрироваться</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.helperInfo}>
                Нажимая &quot;Зарегистрироваться&quot; вы даете согласие на{' '}
                <Typography component="span">
                  <Link href={'/agreement'}>
                    <a target="_blank">Обработку персональных данных</a>
                  </Link>
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EducationApplicantRegister;
