import { useCallback, useState } from 'react';
import Link from 'next/link';
import get from 'lodash.get';

import { Typography, Grid } from '@mui/material';

import TextField from 'components/TextField';
import Button from 'components/Button';
import useStyles from 'containers/auth/styles';
import { Rules } from 'utils/validators';
import Select from 'components/Select';
import { GENDER_OPTIONS } from 'constants/common';

const StartApplicantRegister = ({ onGoTo, request }) => {
  const classes = useStyles();
  const initLastName = get(request, 'surname', '');
  const initFirstName = get(request, 'name', '');
  const initGender = get(request, 'gender', '');

  const [lastName, setLastName] = useState({ value: initLastName, isValid: !!initLastName, message: '' });
  const [firstName, setFirstName] = useState({ value: initFirstName, isValid: !!initFirstName, message: '' });
  const [gender, setGender] = useState({ value: initGender, isValid: true, message: '' });

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleNext();
    }
  };

  const handleChange =
    (setState) =>
    (e, { isValid }) => {
      setState({ value: e.target.value, isValid, message: '' });
    };

  const handleBlur =
    (setState) =>
    (e, { isValid, message }) => {
      setState({ value: e.target.value, isValid, message });
    };

  const handleGender = (value) => {
    if (value !== '') {
      setGender({ value, isValid: true, message: '' });
    } else {
      setGender({ value, isValid: false, message: 'Поле обязательно для заполнения' });
    }
  };

  // const handleGenderClose = (value) => {
  //   if (value !== '') {
  //     setGender({ value, isValid: true, message: '' });
  //   } else {
  //     setGender({ value, isValid: false, message: 'Поле обязательно для заполнения' });
  //   }
  // };

  const handleNext = useCallback(() => {
    if (firstName.isValid && lastName.isValid && gender.value !== '') {
      const requestData = {
        user_type: 'employee',
        name: firstName.value.trim(),
        surname: lastName.value.trim(),
        gender: gender.value,
      };
      onGoTo({ step: 'secondStep', newRequestData: requestData });
    } else {
      if (firstName.value === '') {
        setFirstName({ ...firstName, isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (lastName.value === '') {
        setLastName({ ...lastName, isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (gender.value === '') {
        setGender({ ...lastName, isValid: false, message: 'Поле обязательно для заполнения' });
      }
    }
  }, [firstName.value, lastName.value, gender.value]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.title}>Регистрация</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.subTitle}>После регистрации обязательно пройдите первый тест :)</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Фамилия"
              fullWidth
              value={lastName.value}
              error={!lastName.isValid}
              helperText={lastName.message}
              onChange={handleChange(setLastName)}
              onBlur={handleBlur(setLastName)}
              onKeyDown={handleKeyDown}
              rules={[Rules.REQUIRED, Rules.LETTERS_DASH_SPACE_ONLY]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Имя"
              fullWidth
              value={firstName.value}
              error={!firstName.isValid}
              helperText={firstName.message}
              onChange={handleChange(setFirstName)}
              onBlur={handleBlur(setFirstName)}
              onKeyDown={handleKeyDown}
              rules={[Rules.REQUIRED, Rules.LETTERS_DASH_SPACE_ONLY]}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label={'Пол'}
              name={'gender'}
              options={GENDER_OPTIONS}
              onChange={handleGender}
              // onClose={handleGenderClose}
              error={!gender.isValid}
              helperText={gender.message}
              // defaultValue={gender}
              value={gender.value}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleNext}>
              Дальше
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.helperInfo}>
              Уже есть аккаунт?{' '}
              <Link href="/auth">
                <a>Войти</a>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StartApplicantRegister;
