import { Grid, Typography, FormControlLabel, Checkbox, useMediaQuery } from '@mui/material';

import TextField, { NumberFormatCustom } from 'components/TextField';
import Autocomplete from 'components/Autocomplete';
import CheckBoxIcon from 'components/icons/CheckBoxIcon';
import CheckBoxIconCheck from 'components/icons/CheckBoxIconCheck';
import LocationInput from 'components/LocationInput';
import { Rules } from 'utils/validators';

import useVacancyStyles from '../style';

const Details = (props) => {
  const { formData, onInputChange, onAutocompleteChange, onCheckboxChange, onLocationChange } = props;
  const {
    salaryFrom,
    salaryTo,
    salaryAfterInterview,
    employmentTypeStatus,
    employmentType,
    workSchedule,
    workScheduleStatus,
    experience,
    experienceStatus,
    city,
  } = formData;
  const classes = useVacancyStyles();

  const onSalaryChange = (e, { isValid, message }) => {
    if (salaryAfterInterview.value) {
      onInputChange(e, { isValid: false, message: '' });
    } else {
      onInputChange(e, { isValid, message });
    }
  };

  const onSalaryBlur = (e, { isValid, message }) => {
    if (salaryAfterInterview.value) {
      onInputChange(e, { isValid: false, message: '' });
    } else {
      onInputChange(e, { isValid, message });
    }
  };

  // const [enableValidate, setEnableValidate] = useState(!salaryAfterInterview.value)

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const employmentTypeOptions =
    props.employmentTypeOptions?.map((item) => ({ value: item.id, label: item.name })) || [];
  const workScheduleOptions = props.workScheduleOptions?.map((item) => ({ value: item.id, label: item.name })) || [];
  const experienceOptions = props.experienceOptions?.map((item) => ({ value: item.id, label: item.name })) || [];

  return (
    <Grid container spacing={isMobile ? 2 : 3}>
      <Grid item xs={12}>
        <Typography component="h2" className={classes.blockTitle}>
          Детализация
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={isMobile ? 2 : 0}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="salaryFrom"
              label="Зарплата от"
              placeholder="₽"
              fullWidth
              enableValidate={!salaryAfterInterview.value}
              splitLeft={!isMobile}
              value={salaryFrom.value}
              rules={[[Rules.GT, 0], [Rules.LT, 999999999], Rules.REQUIRED]}
              onChange={onSalaryChange}
              onBlur={onSalaryBlur}
              InputProps={{ inputComponent: NumberFormatCustom }}
              InputLabelProps={{ shrink: true }}
              disabled={salaryAfterInterview.value}
              error={!salaryFrom.isValid}
              helperText={salaryFrom.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Зарплата до"
              placeholder="₽"
              name="salaryTo"
              fullWidth
              shrink={true}
              value={salaryTo.value}
              splitRight={!isMobile}
              onChange={onInputChange}
              InputProps={{ inputComponent: NumberFormatCustom }}
              InputLabelProps={{ shrink: true }}
              rules={[
                [Rules.GTE, salaryFrom.value],
                [Rules.LT, 999999999],
              ]}
              disabled={salaryAfterInterview.value}
              error={!salaryTo.isValid}
              helperText={salaryTo.message}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.checkBox}>
        <FormControlLabel
          control={
            <Checkbox
              disableRipple
              icon={<CheckBoxIcon />}
              checkedIcon={<CheckBoxIconCheck />}
              checked={salaryAfterInterview.value}
              onChange={onCheckboxChange}
              name="salaryAfterInterview"
            />
          }
          label="Зарплата по результатам собеседования"
        />
      </Grid>
      <Grid item xs={12} className={classes.gridInput}>
        <Autocomplete
          required
          multiple
          name="employmentType"
          statusName="employmentTypeStatus"
          value={employmentType.length > 0 ? employmentType : []}
          onChange={onAutocompleteChange}
          options={employmentTypeOptions}
          label="Тип занятости"
          error={!employmentTypeStatus.isValid}
          helperText={employmentTypeStatus.message}
          loadingText={'Поиск типа занятости...'}
          noOptionsText={'Тип не найден'}
        />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.gridInput}>
        <Autocomplete
          column={1}
          required
          multiple
          name="workSchedule"
          statusName="workScheduleStatus"
          value={workSchedule.length > 0 ? workSchedule : []}
          onChange={onAutocompleteChange}
          options={workScheduleOptions}
          label="График работы"
          error={!workScheduleStatus.isValid}
          helperText={workScheduleStatus.message}
          loadingText={'Поиск графика работы...'}
          noOptionsText={'График не найден'}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          required
          name="experience"
          statusName="experienceStatus"
          value={experience?.value ? experience : null}
          onChange={onAutocompleteChange}
          options={experienceOptions}
          label="Опыт"
          error={!experienceStatus.isValid}
          helperText={experienceStatus.message}
          loadingText={'Поиск типа опыта работы...'}
          noOptionsText={'Тип опыта не найден'}
        />
      </Grid>
      <Grid item xs={12}>
        <LocationInput onChange={onLocationChange} selectedOption={city} />
      </Grid>
    </Grid>
  );
};

export default Details;
