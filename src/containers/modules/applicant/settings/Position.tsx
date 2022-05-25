import React, { useEffect, useState, useRef } from 'react';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

import useSettingsStyle from 'containers/modules/common/settings/style';
import TextField, { NumberFormatCustom } from 'components/TextField';
import Autocomplete from 'components/Autocomplete';
import { SecondaryButton } from 'components/Button';
import { Rules } from 'utils/validators';
import { parseFormErrors } from 'utils/common';
import { useProfile } from 'context/ProfileContext';
import ChipContainer, { SkillsItem as ChipItem } from 'components/Skills';

const Position = () => {
  // const { children, value = 0, index = 0, ...other } = props;
  const { currentUser, refetch } = useProfile();

  const [specialization, setSpecialization] = useState([]);
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [specializationStatus, setSpecializationStatus] = useState({ isValid: true, message: '' });
  const [specializationOpen, setSpecializationOpen] = useState(false);

  const [desiredPosition, setDesiredPosition] = useState({ value: '', isValid: true, message: '' });
  const [desiredSalary, setDesiredSalary] = useState({ value: '', isValid: false, message: '' });

  const [experience, setExperience] = useState({ label: '', value: '' });
  const [experienceOptions, setExperienceOptions] = useState([]);
  const [experienceStatus, setExperienceStatus] = useState({ isValid: true, message: '' });

  // const [{ loading: uLoading }, updateProfile] = useAxios({ url: 'employee/profile', method: 'put' }, { manual: true });
  const [positionState, updatePosition] = useAxios({ url: 'employee/position', method: 'put' }, { manual: true });
  const [specializationState] = useAxios('employee/specializations');
  const [experienceState] = useAxios('employee/experiences');

  const [workSchedule] = useAxios('work-schedules');
  const [workScheduleOptions, setWorkScheduleOptions] = useState([]);
  const [workScheduleList, setWorkScheduleList] = useState([]);

  const [employmentType] = useAxios('employment-types');
  const [employmentTypeOptions, setEmploymentTypeOptions] = useState([]);
  const [employmentTypeList, setEmploymentTypeList] = useState([]);

  useEffect(() => {
    if (workSchedule.data) {
      const workScheduleOptions = workSchedule.data.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setWorkScheduleOptions(workScheduleOptions);
    }
  }, [workSchedule.loading]);

  useEffect(() => {
    if (employmentType.data) {
      const employmentTypeOptions = employmentType.data.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setEmploymentTypeOptions(employmentTypeOptions);
    }
  }, [employmentType.loading]);

  useEffect(() => {
    validateDependencies();
  }, [specialization, experience, desiredPosition.value]);

  useEffect(() => {
    if (currentUser) {
      const employee = currentUser.employee;
      if (employee.salary) {
        setDesiredSalary({
          value: employee.salary,
          isValid: true,
          message: '',
        });
      }
      if (employee.position) {
        setDesiredPosition({
          value: employee.position,
          isValid: true,
          message: '',
        });
      }
      if (currentUser.work_schedules) {
        const list = currentUser.work_schedules.map((item) => ({
          label: item.work_schedule.name,
          value: item.work_schedule.id,
        }));
        setWorkScheduleList(list);
      }
      if (currentUser.specializations) {
        const list = currentUser.specializations.map((item) => ({
          label: item.specialization.name,
          value: item.specialization.id,
        }));
        setSpecialization(list);
      }
      if (currentUser.employment_types) {
        const list = currentUser.employment_types.map((item) => ({
          label: item.employment_type.name,
          value: item.employment_type.id,
        }));
        setEmploymentTypeList(list);
      }
    }
  }, []);

  useEffect(() => {
    if (specializationState.data) {
      const specializationOptions = specializationState.data.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setSpecializationOptions(specializationOptions);
      const employee = currentUser.employee;
      if (employee.specialization) {
        setSpecialization(specializationOptions.find((item) => item.value === employee.specialization.id));
        setSpecializationStatus({ isValid: true, message: '' });
      }
    }
  }, [specializationState.loading]);

  useEffect(() => {
    if (experienceState.data) {
      const experienceOptions = experienceState.data.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setExperienceOptions(experienceOptions);
      const employee = currentUser.employee;
      if (employee.experience) {
        setExperience(experienceOptions.find((item) => item.value === employee.experience.id));
        setExperienceStatus({ isValid: true, message: '' });
      }
    }
  }, [experienceState.loading]);

  const toastId = useRef(null);

  const classes = useSettingsStyle();

  const handleChange = (value, setState, isValid, message) => {
    setState({
      value,
      isValid,
      message,
    });
  };

  const handleAutocomplete = (e, option, setState, setStatus) => {
    if (option) {
      setState(option);
      setStatus({ isValid: true, message: '' });
    } else {
      setState({ value: '', label: '' });
      setStatus({ isValid: true, message: '' });
    }
  };

  const handlePositionSubmit = () => {
    updatePosition({
      data: {
        specializations: specialization.map((item) => item.value),
        position: desiredPosition.value,
        salary: parseInt(desiredSalary.value) || null,
        experience_id: experience.value,
        work_schedules: workScheduleList.map((item) => item.value),
        employment_types: employmentTypeList.map((item) => item.value),
      },
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
            if (item.attr === 'salary') {
              setDesiredSalary({ ...desiredSalary, ...{ isValid: false, message: item.message } });
            }
          });
        }
      });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (isFormValid()) {
        handlePositionSubmit();
      }
    }
  };

  const isFormValid = () =>
    specializationStatus.isValid && desiredPosition.isValid && experienceStatus.isValid && desiredSalary.isValid;

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  // Если указана Профессиональная область, то поле желаемая должность и опыт работы обязательны для заколнения
  const validateDependencies = () => {
    const isSpecValid = specialization && specialization.length !== 0;
    const isPositionValid = desiredPosition.value === '';
    const isExperienceValid = experience && experience.value !== '';

    if (isSpecValid) {
      if (!experience || experience?.value === '') {
        setExperienceStatus({ isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (isPositionValid) {
        setDesiredPosition({ ...desiredPosition, isValid: false, message: 'Поле обязательно для заполнения' });
      }
    }
    if (isExperienceValid) {
      if (!specialization || specialization?.length === 0) {
        setSpecializationStatus({ isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (desiredPosition.value === '') {
        setDesiredPosition({ ...desiredPosition, isValid: false, message: 'Поле обязательно для заполнения' });
      }
    }
    if (desiredPosition.value !== '') {
      if (!specialization || specialization?.length === 0) {
        setSpecializationStatus({ isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (!experience || experience?.value === '') {
        setExperienceStatus({ isValid: false, message: 'Поле обязательно для заполнения' });
      }
    }

    //Если все стерто, то поля не обязательны для заполнения
    if (specialization.length === 0 && desiredPosition.value === '' && experience?.value === '') {
      setSpecializationStatus({ isValid: true, message: '' });
      setExperienceStatus({ isValid: true, message: '' });
      setDesiredPosition({ ...desiredPosition, isValid: true, message: '' });
    }
  };
  const positionRules = !desiredPosition.isValid ? [Rules.REQUIRED] : [];

  const handleScheduleItemDelete = (item) => {
    const newScheduleList = workScheduleList.filter((el) => el.value !== item.value);
    setWorkScheduleList(newScheduleList);
  };

  const handleSpecializationItemDelete = (item) => {
    const newSpecialization = specialization.filter((el) => el.value !== item.value);
    setSpecialization(newSpecialization);
  };

  const handleEmploymentTypeItemDelete = (item) => {
    const newEmploymentTypeList = employmentTypeList.filter((el) => el.value !== item.value);
    setEmploymentTypeList(newEmploymentTypeList);
  };

  const handleSpecializationOpen = () => {
    if (specialization.length < 3) {
      setSpecializationOpen(true);
    }
  };

  return (
    <Box onKeyDown={handleKeyDown}>
      <Grid container spacing={isMobile ? 3 : 4}>
        <Grid item xs={12}>
          <Typography>Желаемая должность и зарплата</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Укажите до 3 профессиональных областей
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.select}>
          {specialization.length !== 0 && (
            <Box marginBottom={1}>
              <ChipContainer>
                {specialization.map((item) => (
                  <ChipItem name={item.label} onDelete={() => handleSpecializationItemDelete(item)} key={item.value} />
                ))}
              </ChipContainer>
            </Box>
          )}
          <Autocomplete
            multiple
            value={specialization}
            onChange={(e, option) => handleAutocomplete(e, option, setSpecialization, setSpecializationStatus)}
            onOpen={handleSpecializationOpen}
            open={specializationOpen}
            onClose={() => setSpecializationOpen(false)}
            options={specializationOptions}
            label="Профессиональная область"
            name={'specialization'}
            loading={specializationState.loading}
            loadingText={'Поиск профессии...'}
            noOptionsText={'профессия не найдена'}
            error={!specializationStatus.isValid}
            helperText={specializationStatus.message}
            renderTags={() => null}
            isOptionEqualToValue={(option, value) => option.value === value.value}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Желаемые должности"
            name={'desired-position'}
            placeholder={'Желаемые должности: Дизайнер, Програмист, Повар'}
            value={desiredPosition.value}
            onChange={(e) => handleChange(e.target.value, setDesiredPosition, true, '')}
            error={!desiredPosition.isValid}
            helperText={desiredPosition.message}
            rules={positionRules}
          />
        </Grid>
        <Grid item xs={12} className={classes.select}>
          <Autocomplete
            value={experience?.value ? experience : null}
            onChange={(e, option) => handleAutocomplete(e, option, setExperience, setExperienceStatus)}
            options={experienceOptions}
            label="Опыт работы"
            loading={experienceState.loading}
            loadingText={'Поиск...'}
            noOptionsText={'Вариант не найден'}
            error={!experienceStatus.isValid}
            helperText={experienceStatus.message}
          />
        </Grid>
        <Grid item xs={12}>
          <form autoComplete={'new-password'}>
            <TextField
              name={'desired salary'}
              label="Желаемая зарплата в месяц ₽"
              placeholder="Желаемая зарплата в месяц ₽"
              autoComplete="new-password"
              InputProps={{ inputComponent: NumberFormatCustom }}
              // InputLabelProps для того чтобы Label не накладывался на value
              InputLabelProps={{ shrink: true }}
              value={desiredSalary.value}
              onChange={(e, { isValid, message }) =>
                handleChange(e.target?.value || '', setDesiredSalary, isValid, message)
              }
              rules={[[Rules.LT, 1000000000]]}
              error={!desiredSalary.isValid}
              helperText={desiredSalary.message}
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          {workScheduleList.length !== 0 && (
            <Box marginBottom={1}>
              <ChipContainer>
                {workScheduleList.map((item) => (
                  <ChipItem name={item.label} onDelete={() => handleScheduleItemDelete(item)} key={item.value} />
                ))}
              </ChipContainer>
            </Box>
          )}
          <Autocomplete
            multiple
            disableCloseOnSelect
            column={1}
            label={'График работы'}
            value={workScheduleList}
            renderTags={() => null}
            options={workScheduleOptions}
            loading={workSchedule.loading}
            loadingText={'Поиск...'}
            error={workSchedule.error}
            noOptionsText={'Вариант не найден'}
            onChange={(e, value) => setWorkScheduleList(value)}
            isOptionEqualToValue={(option, value) => option.value === value.value}
          />
        </Grid>
        <Grid item xs={12}>
          {employmentTypeList.length !== 0 && (
            <Box marginBottom={1}>
              <ChipContainer>
                {employmentTypeList.map((item) => (
                  <ChipItem name={item.label} onDelete={() => handleEmploymentTypeItemDelete(item)} key={item.value} />
                ))}
              </ChipContainer>
            </Box>
          )}
          <Autocomplete
            multiple
            disableCloseOnSelect
            column={1}
            label={'Тип занятости'}
            value={employmentTypeList}
            renderTags={() => null}
            options={employmentTypeOptions}
            loading={employmentType.loading}
            loadingText={'Поиск...'}
            error={employmentType.error}
            noOptionsText={'Вариант не найден'}
            onChange={(e, value) => setEmploymentTypeList(value)}
            isOptionEqualToValue={(option, value) => option.value === value.value}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SecondaryButton
            fullWidth
            onClick={handlePositionSubmit}
            loading={positionState.loading}
            disabled={!isFormValid()}
          >
            Сохранить
          </SecondaryButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Position;
