import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import validator from 'validator';
import { toast } from 'react-toastify';

import { Grid, Typography, FormControlLabel, Checkbox } from '@mui/material';

import { Rules } from 'utils/validators';
import TextField, { DateInputPureShort } from 'components/TextField';
import { LocationInputV2 as LocationInput } from 'components/LocationInput';
import Button, { TetriatyButton } from 'components/Button';
import CheckBoxIcon from 'components/icons/CheckBoxIcon';
import CheckBoxIconCheck from 'components/icons/CheckBoxIconCheck';
import { useProfile } from 'context/ProfileContext';
import { getCurrentDate } from 'utils/common';

const ExperienceForm = ({ item = null, closeFnc = null, mode = 'create' }) => {
  const [name, setName] = useState({ value: '', isValid: false });
  const [city, setCity] = useState({ data: { value: '', label: '' }, isValid: true });
  const [position, setPosition] = useState({ value: '', isValid: false });
  const [site, setSite] = useState({ value: '', isValid: true });
  const [duties, setDuties] = useState({ value: '', isValid: false });
  const [achievement, setAchievement] = useState({ value: '', isValid: false });
  const [dateStart, setDateStart] = useState({ value: '', isValid: false });
  const [dateEnd, setDateEnd] = useState({ value: '', isValid: false });

  const [formValid, setFormValid] = useState(false);

  const [checkboxDate, setCheckboxDate] = useState(false);
  const { refetch } = useProfile();

  const siteCompanyEdit = item && item.site ? { value: item.site, isValid: true } : { value: '', isValid: true };
  const dateStartEdit = item
    ? { value: `${item.start_date.slice(8, 10)}.${item.start_date.slice(0, 4)}`, isValid: true }
    : null;

  const dateEndEdit =
    item && item.end_date
      ? { value: `${item.end_date.slice(8, 10)}.${item.end_date.slice(0, 4)}`, isValid: true }
      : { value: '', isValid: true };

  const checkboxEdit = item && item.end_date ? false : true;

  const [{ loading }, addExperience] = useAxios(
    {
      method: mode === 'edit' ? 'put' : 'post',
      url: mode === 'edit' ? `employee/profile/experience/${item.id}` : 'employee/profile/experience',
    },
    { manual: true },
  );

  useEffect(() => {
    if (item) {
      setName({ value: item.name, isValid: true });
      setCity({ data: { value: item.city.id, label: item.city.value }, isValid: true });
      setPosition({ value: item.position, isValid: true });
      setSite(siteCompanyEdit);
      setDuties({ value: item.duties, isValid: true });
      setAchievement({ value: item.achievement, isValid: true });
      setDateStart(dateStartEdit);
      setDateEnd(dateEndEdit);
      setCheckboxDate(checkboxEdit);
    }
  }, [item]);

  useEffect(() => {
    isFormValid();
  }, [
    name.value,
    city.data.label,
    position.value,
    site.value,
    duties.value,
    achievement.value,
    dateStart.value,
    dateEnd.value,
  ]);

  const isFormValid = () => {
    if (
      name.isValid &&
      city.data.label &&
      position.isValid &&
      site.isValid &&
      duties.isValid &&
      achievement.isValid &&
      dateStart.isValid &&
      dateEnd.isValid
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleSave = () => {
    const data = {
      name: name.value,
      position: position.value,
      site: site.value,
      city_id: city.data.value,
      duties: duties.value,
      achievement: achievement.value,
      start_date: `01.${dateStart.value}`,
      end_date: checkboxDate ? '' : `01.${dateEnd.value}`,
    };
    addExperience({
      data,
    })
      .then(() => {
        refetch({
          onRefetched: () => {
            toast.info(mode === 'edit' ? 'Опыт успешно обновлен' : 'Опыт успешно добавлен');
            closeFnc();
            refetch();
          },
        });
      })
      .catch(() => {
        toast.info('Не удалось обновить опыт');
      });
  };

  const handleInputChange = (value, setValue, valid) => {
    setValue({ value: value, isValid: valid });
  };

  const handleCheckbox = (e) => {
    setDateEnd({ value: getCurrentDate(), isValid: true });
    setCheckboxDate(e.target.checked);
  };

  const handleSiteChange = (e) => {
    const urlPattern = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
    let string = e.target.value;
    if (urlPattern.test(string)) {
      //string is http url
      if (string.includes('http://')) {
        string = string.replace('https://', '').replace('http://', '');
        //add https to string
        string = `http://${string}`;
      } else {
        //string is https or just url
        string = string.replace('https://', '').replace('http://', '');
        //add https to string
        string = `https://${string}`;
      }
    }
    const valid = validator.isURL(string);
    setSite({ value: string, isValid: valid });
  };

  const handleCityChange = (cityId, name, isValid) => {
    setCity({ data: { value: cityId, label: name }, isValid: isValid });
  };

  const handleCancel = () => {
    closeFnc();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography fontFamily={'inter-med'} fontSize={20} ml={0.5}>
          {mode === 'create' ? 'Добавление опыта работы' : 'Редактирование опыта работы'}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Название компании"
          value={name.value}
          onChange={(e, validatorResult) => handleInputChange(e.target.value, setName, validatorResult.isValid)}
          rules={[Rules.REQUIRED, [Rules.MAX_STRING, 100]]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocationInput
          required
          onChange={(cityId, name) => handleCityChange(cityId, name, !!name)}
          selectedOption={{ value: city.data.value, label: city.data.label }}
          helperText={!city.isValid ? 'Поле обязательно для заполнения' : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Должность"
          value={position.value}
          onChange={(e, validatorResult) => handleInputChange(e.target.value, setPosition, validatorResult.isValid)}
          rules={[Rules.REQUIRED, [Rules.MAX_STRING, 100]]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Сайт компании"
          value={site.value}
          onChange={handleSiteChange}
          placeholder="https://example.com"
          error={!site.isValid}
          helperText={!site.isValid && 'Неверный формат почты'}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          required
          label="Дата начала работы"
          value={dateStart.value}
          onChange={(e, validatorResult) => handleInputChange(e.target.value, setDateStart, validatorResult.isValid)}
          placeholder={'MM.YYYY'}
          rules={[Rules.REQUIRED]}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: DateInputPureShort,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          disabled={checkboxDate}
          InputLabelProps={{
            shrink: true,
          }}
          label="Дата конца работы"
          value={dateEnd.value}
          onChange={(e, validatorResult) => handleInputChange(e.target.value, setDateEnd, validatorResult.isValid)}
          placeholder={'MM.YYYY'}
          rules={!checkboxDate && [Rules.REQUIRED, [Rules.DATE_GT, dateStart.value]]}
          InputProps={{
            inputComponent: DateInputPureShort,
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              disableRipple
              icon={<CheckBoxIcon size={24} />}
              checkedIcon={<CheckBoxIconCheck size={24} />}
              checked={checkboxDate}
              onChange={handleCheckbox}
              name="checkboxDate"
            />
          }
          label="По настоящее время"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="Обязанности на рабочем месте"
          value={duties.value}
          onChange={(e, validatorResult) => handleInputChange(e.target.value, setDuties, validatorResult.isValid)}
          rules={[Rules.REQUIRED, [Rules.MAX_STRING, 1000]]}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          label="Главное достижение"
          value={achievement.value}
          onChange={(e, validatorResult) => handleInputChange(e.target.value, setAchievement, validatorResult.isValid)}
          rules={[Rules.REQUIRED, [Rules.MAX_STRING, 1000]]}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={2}>
            <TetriatyButton fullWidth small onClick={handleCancel}>
              Отменить
            </TetriatyButton>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Button fullWidth small onClick={handleSave} loading={loading} disabled={!formValid}>
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExperienceForm;
