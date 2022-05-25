import { useEffect, useState, useRef } from 'react';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import isEmpty from 'lodash.isempty';

import { Grid, Typography, useMediaQuery, Box } from '@mui/material';

import useSettingsStyle from 'containers/modules/common/settings/style';
import Avatar from 'containers/modules/common/profile/Avatar';
import TextField, { DateInputPure } from 'components/TextField';
import { SecondaryButton } from 'components/Button';
import LocationInput from 'components/LocationInput';
import { Rules } from 'utils/validators';
import Position from 'containers/modules/applicant/settings/Position';
import { GENDER_OPTIONS } from 'constants/common';
import Select from 'components/Select';
import { parseFormErrors } from 'utils/common';
import Additional from 'containers/modules/applicant/settings/Additional';
import { useProfile } from 'context/ProfileContext';

const Personal = (props) => {
  const { value = 0, index = 0 } = props;
  const { currentUser, refetch } = useProfile();

  const [firstName, setFirstName] = useState({ value: '', isValid: false });
  const [lastName, setLastName] = useState({ value: '', isValid: false });
  const [gender, setGender] = useState({ value: '', isValid: true, message: '' });
  const [city, setCity] = useState({ label: '', value: {} });
  const [birthDate, setBirthDate] = useState({ value: '', isValid: true });
  const [about, setAbout] = useState({ value: '', isValid: true });

  const [{ loading: uLoading }, updateProfile] = useAxios({ url: 'employee/profile', method: 'put' }, { manual: true });

  useEffect(() => {
    if (currentUser) {
      setFirstName({ value: currentUser.name, isValid: true });
      setLastName({ value: currentUser.surname, isValid: true });

      const employee = currentUser.employee;

      if (employee.birth_day) {
        setBirthDate({ value: employee.birth_day, isValid: true });
      }
      if (employee.gender) {
        setGender({ value: currentUser.employee.gender, isValid: true, message: '' });
      }

      if (employee.city) {
        setCity({
          label: employee.city.name,
          value: { name: employee.city.name, code: employee.city.code },
        });
      }
      if (currentUser.employee.about_me) {
        setAbout({
          value: currentUser.employee.about_me,
          isValid: true,
        });
      }
    }
  }, []);

  const toastId = useRef(null);

  const classes = useSettingsStyle();

  const handleChange = (value, setState, isValid) => {
    setState({
      value,
      isValid,
    });
  };

  const handleGender = (value) => {
    if (value !== '') {
      setGender({ value, isValid: true, message: '' });
    } else {
      setGender({ value, isValid: false, message: 'Поле обязательно для заполнения' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (isFormValid()) {
        handleSubmit();
      }
    }
  };

  const handleCityChange = (option) => {
    setCity(option);
  };

  const handleSubmit = () => {
    let data = {
      name: firstName.value,
      surname: lastName.value,
      about_me: about.value,
      gender: gender.value,
    };

    if (birthDate.value !== '') {
      data = { ...data, ...{ birth_day: birthDate.value } };
    }
    if (city?.value && !isEmpty(city.value)) {
      data = { ...data, ...{ city: city.value } };
    }
    updateProfile({
      data,
    })
      .then(() => {
        refetch();
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.info('Данные успешно сохранены', {
            autoClose: 3000,
            closeOnClick: true,
          });
        }
      })
      .catch((e) => {
        if (e.code === 'validation_failed') {
          const formErrors = parseFormErrors(e.fields);
          formErrors.forEach((item) => {
            if (item.attr === 'gender') {
              setGender({ ...gender, ...{ isValid: false, message: item.message } });
            }
          });
        }
      });
  };

  const isFormValid = () =>
    firstName.isValid && lastName.isValid && birthDate.isValid && about.isValid && gender.isValid;

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      {value === index && (
        <Grid container spacing={isMobile ? 3 : 4}>
          <Grid item xs={12}>
            <Box onKeyDown={handleKeyDown}>
              <Grid container spacing={isMobile ? 3 : 4}>
                <Grid item xs={12}>
                  <Typography className={classes.sectionTitle} component="h2">
                    Личные данные
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center" spacing={isMobile ? 2 : 4}>
                    <Grid item xs={12} sm={'auto'}>
                      <Typography fontSize={18} fontFamily="inter-med">
                        Аватар (ваше фото)
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Avatar
                        defaultImg="/images/avatar/placeholder-avatar-employee-2.png"
                        radius={100}
                        withButton
                        currentUser={currentUser}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Фамилия"
                    value={lastName.value}
                    onChange={(e, { isValid }) => handleChange(e.target.value, setLastName, isValid)}
                    rules={[Rules.REQUIRED, Rules.LETTERS_ONLY]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Имя"
                    value={firstName.value}
                    onChange={(e, { isValid }) => handleChange(e.target.value, setFirstName, isValid)}
                    rules={[Rules.REQUIRED, Rules.LETTERS_ONLY]}
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
                    defaultValue={gender.value}
                    value={gender.value}
                  />
                </Grid>
                <Grid item xs={12} className={classes.autoComplete}>
                  <LocationInput onChange={handleCityChange} selectedOption={city} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Дата рождения"
                    value={birthDate.value}
                    onChange={(e, { isValid }) => handleChange(e.target.value, setBirthDate, isValid)}
                    rules={[Rules.IS_VALID_DATE]}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder={'DD.MM.YYYY'}
                    InputProps={{
                      inputComponent: DateInputPure,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="О себе"
                    value={about.value}
                    multiline
                    styleMultiline
                    rows={6}
                    onChange={(e, { isValid }) => handleChange(e.target.value, setAbout, isValid)}
                    rules={[[Rules.MAX_STRING, 1000]]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <SecondaryButton fullWidth onClick={handleSubmit} disabled={!isFormValid()} loading={uLoading}>
                    Сохранить
                  </SecondaryButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Additional />
          </Grid>
          <Grid item xs={12}>
            <Position />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Personal;
