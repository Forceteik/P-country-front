import React, { useState } from 'react';

import { Grid, Typography, useMediaQuery } from '@mui/material';

import TextField from 'components/TextField';
import { Rules } from 'utils/validators';
import Autocomplete from 'components/Autocomplete';
import TextEditor from 'components/TextEditor';
import ZeroingWarningModal from 'containers/modules/common/modals/ZeroingWarningModal';

import useVacancyStyles from '../style';

const CommonInfo = (props) => {
  const {
    specializationOptions,
    formData,
    onInputChange,
    onAutocompleteChange,
    onEditorChange,
    mode,
    resetForm,
    activated,
  } = props;

  const classes = useVacancyStyles();

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const specOptions = specializationOptions?.map((item) => ({ value: item.id, label: item.name })) || [];

  const { name, specialization, specializationStatus, desc } = formData;

  const [nameOrSpecializationChanged, setNameOrSpecializationChanged] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);

  const handleInputChange = (e, option) => {
    if (mode === 'update' && activated && !nameOrSpecializationChanged) {
      setNameOrSpecializationChanged(true);
      setOpenWarningModal(true);
    }
    onInputChange(e, option);
    setNameOrSpecializationChanged(true);
  };

  const handleSelectChange = (e, option, name, statusName, required) => {
    if (mode === 'update' && activated && !nameOrSpecializationChanged) {
      setNameOrSpecializationChanged(true);
      setOpenWarningModal(true);
    }
    onAutocompleteChange(e, option, name, statusName, required);
    setNameOrSpecializationChanged(true);
  };

  const reset = () => {
    setOpenWarningModal(false);
    resetForm();
  };

  return (
    <Grid container spacing={isMobile ? 2 : 3}>
      <Grid item xs={12}>
        <Typography component="h2" className={classes.blockTitle}>
          Общая информация
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form autoComplete={'off'}>
          <TextField
            required
            label="Название вакансии"
            name={'name'}
            value={name.value}
            onChange={handleInputChange}
            // onChange={(e, { isValid }) => handleChange(e.target.value, setName, isValid, isValid ? 10 : 0)}
            rules={[Rules.REQUIRED]}
          />
        </form>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          value={specialization}
          name={'specialization'}
          statusName={'specializationStatus'}
          onChange={handleSelectChange}
          // onChange={(e, option) => handleAutocomplete(e, option, setSpecialization, setSpecializationStatus)}
          required
          options={specOptions}
          error={!specializationStatus.isValid}
          helperText={specializationStatus.message}
          label="Проф. область вакансии"
          loadingText={'Поиск области...'}
          noOptionsText={'Область не найдена'}
        />
      </Grid>
      <Grid item xs={12}>
        <TextEditor
          value={desc.value}
          isValid={desc.isValid}
          helperText={desc.message}
          name={'desc'}
          onChange={onEditorChange}
          maxLength={5000}
          // onChange={({ value, isValid, message }) => handleChange(value, setDesc, isValid, message)}
        />
      </Grid>
      <ZeroingWarningModal open={openWarningModal} handleClose={() => setOpenWarningModal(false)} reset={reset} />
    </Grid>
  );
};

export default CommonInfo;
