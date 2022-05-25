import { Grid, useMediaQuery } from '@mui/material';

import Button from 'components/Button';
import Health from 'containers/modules/employer/vacancy/components/Health';

import CommonInfo from './CommonInfo';
import Details from './Details';
import Qualities from './Qualities';
import AddTask from './AddTask';
import Universities from './Universities';

const FirstStep = (props) => {
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const handleNextStep = () => {
    props.onNext(2);
  };

  return (
    <Grid container spacing={isMobile ? 4 : 7}>
      <Grid item xs={12}>
        <CommonInfo
          specializationOptions={props.dictionaryState.data.specializations}
          onInputChange={props.onInputChange}
          onAutocompleteChange={props.onAutocompleteChange}
          formData={props.formData}
          onEditorChange={props.onEditorChange}
          mode={props.mode}
          resetForm={props.resetForm}
          activated={props.activated}
        />
      </Grid>
      <Grid item xs={12}>
        <Details
          employmentTypeOptions={props.dictionaryState.data.employment_types}
          workScheduleOptions={props.dictionaryState.data.work_schedules}
          experienceOptions={props.dictionaryState.data.experiences}
          formData={props.formData}
          onInputChange={props.onInputChange}
          onAutocompleteChange={props.onAutocompleteChange}
          onCheckboxChange={props.onCheckboxChange}
          onLocationChange={props.onLocationChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Health formData={props.formData} handleDisabilityCheckboxChange={props.handleDisabilityCheckboxChange} />
      </Grid>
      <Grid item xs={12}>
        <Qualities onChange={props.onQualitiesChange} qualities={props.formData.qualities} />
      </Grid>
      <Grid item xs={12}>
        <Universities onChange={props.onUniversitiesChange} universities={props.formData.universities} />
      </Grid>
      <Grid item xs={12}>
        <AddTask onTaskDataChange={props.onTaskDataChange} taskData={props.formData.taskData} />
      </Grid>
      <Grid item xs={6}>
        <Button onClick={handleNextStep} fullWidth disabled={!props.isFormValid}>
          {props.mode === 'update' ? 'Редактировать' : 'Далее'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default FirstStep;
