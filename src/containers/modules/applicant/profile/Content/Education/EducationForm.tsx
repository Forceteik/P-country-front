import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';

import { Grid } from '@mui/material';

import Select from 'components/Select';
import Button, { TetriatyButton } from 'components/Button';
import TextField, { YearInputPure } from 'components/TextField';
import { LocationInputV2 as LocationInput } from 'components/LocationInput';
import UniversityInput from 'components/UniversityInput';
import { educationOptions } from 'constants/common';
import { Rules } from 'utils/validators';
import { useProfile } from 'context/ProfileContext';

type SchoolDataType = {
  city: {
    id: number;
    name: string;
    code?: string; // приходит с бэка по запросу профиля
    value?: string; // приходит с бэка по запросу профиля
  };
  name: string;
  expirationYear: string;
};

type CollegeDataType = {
  city: {
    id: number;
    name: string;
    code?: string; // приходит с бэка по запросу профиля
    value?: string; // приходит с бэка по запросу профиля
  };
  name: string;
  faculty?: string;
  speciality: string;
  expirationYear: string;
};

type UniversityDataType = {
  education: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
    code?: string; // приходит с бэка по запросу профиля
    value?: string; // приходит с бэка по запросу профиля
  };
  faculty: string;
  speciality: string;
  expirationYear: string;
};

type TrainingDataType = {
  city: {
    id: number;
    name: string;
    code?: string; // приходит с бэка по запросу профиля
    value?: string; // приходит с бэка по запросу профиля
  };
  name: string;
  speciality: string;
  expirationYear: string;
};

type InvalidFieldsType = Array<string>;

const schoolInitialData = {
  city: {
    id: 0,
    name: '',
  },
  name: '',
  expirationYear: '',
};

const collegeInitialData = {
  city: {
    id: 0,
    name: '',
  },
  name: '',
  faculty: '',
  speciality: '',
  expirationYear: '',
};

const universityInitialData = {
  education: {
    id: 0,
    name: '',
  },
  city: {
    id: 0,
    name: '',
  },
  faculty: '',
  speciality: '',
  expirationYear: '',
};

const trainingInitialData = {
  city: {
    id: 0,
    name: '',
  },
  name: '',
  speciality: '',
  expirationYear: '',
};

const isYearTest = (text) => {
  return !isNaN(text) && parseInt(text) > 1920 && parseInt(text) < 2100;
};

/*
school - Среднее
college - Среднее специальное
bachelor - Бакалавриат
internship - Ординатура
postgraduate - Аспирантура
specialist - Специалитет
master - Магистратура
professional_retraining - Профессиональная переподготовка
skills_enhancement - Повышение квалификации
*/

const EducationForm = (props) => {
  const { item = null, mode = 'add' } = props;
  const [type, setType] = useState<string>('');
  const [invalidFields, setInvalidFields] = useState<InvalidFieldsType>([]);

  const [schoolData, setSchoolData] = useState<SchoolDataType>(schoolInitialData);
  const [collegeData, setCollegeData] = useState<CollegeDataType>(collegeInitialData);
  const [universityData, setUniversityData] = useState<UniversityDataType>(universityInitialData);
  const [trainingData, setTrainingData] = useState<TrainingDataType>(trainingInitialData);

  const { refetch, refetchLoading } = useProfile();

  const [{ loading }, addEducation] = useAxios(
    {
      method: mode === 'edit' ? 'put' : 'post',
      url: mode === 'edit' ? `employee/profile/education/${item.id}` : 'employee/profile/education',
    },
    { manual: true },
  );

  useEffect(() => {
    if (item) {
      setType(item.type);

      if (item.type === 'school') {
        setSchoolData({
          name: item.name,
          city: item?.city || schoolInitialData.city,
          expirationYear: item?.year_of_ending || schoolInitialData.expirationYear,
        });
      }

      if (item.type === 'college') {
        setCollegeData({
          name: item.name,
          city: item?.city || collegeInitialData.city,
          faculty: item.faculty,
          speciality: item?.specialization || collegeInitialData.speciality,
          expirationYear: item?.year_of_ending || collegeInitialData.expirationYear,
        });
      }

      if (item.type === 'skills_enhancement' || item.type === 'professional_retraining') {
        setTrainingData({
          name: item.name,
          city: item.city,
          speciality: item.specialization,
          expirationYear: item.year_of_ending,
        });
      }

      if (
        item.type === 'bachelor' ||
        item.type === 'master' ||
        item.type === 'specialist' ||
        item.type === 'postgraduate' ||
        item.type === 'internship'
      ) {
        setUniversityData({
          education: item.education,
          city: item.city,
          faculty: item.faculty,
          speciality: item.specialization,
          expirationYear: item.year_of_ending,
        });
      }
    }
  }, [item]);

  const handleChange = (value) => {
    setType(value);
    setInvalidFields([]);
  };

  const handleDataChange = (field, value, isValid) => {
    if (!isValid && !invalidFields.includes(field)) {
      setInvalidFields((prevState) => [...prevState, field]);
    }

    if (isValid && invalidFields.includes(field)) {
      const invalidSet = new Set(invalidFields);
      invalidSet.delete(field);
      setInvalidFields(Array.from(invalidSet));
    }

    switch (type) {
      case 'school':
        setSchoolData((prev) => {
          return {
            ...prev,
            [field]: value,
          };
        });
        break;

      case 'college':
        setCollegeData((prev) => {
          return {
            ...prev,
            [field]: value,
          };
        });
        break;

      case 'skills_enhancement':
      case 'professional_retraining':
        setTrainingData((prev) => {
          return {
            ...prev,
            [field]: value,
          };
        });
        break;

      case 'bachelor':
      case 'master':
      case 'specialist':
      case 'postgraduate':
      case 'internship':
        setUniversityData((prev) => {
          return {
            ...prev,
            [field]: value,
          };
        });
        break;
    }
  };

  const handleCancel = () => {
    setType('');
    setSchoolData(schoolInitialData);
    setCollegeData(collegeInitialData);
    setUniversityData(universityInitialData);
    setTrainingData(trainingInitialData);

    props.closeFnc();
  };

  const handleSave = () => {
    let data;

    if (schoolData) {
      data = {
        type,
        city_id: schoolData.city.id,
        name: schoolData.name,
        year_of_ending: parseInt(schoolData.expirationYear),
      };
    }

    if (type === 'college') {
      data = {
        type,
        city_id: collegeData.city.id,
        name: collegeData.name,
        specialization: collegeData.speciality,
        year_of_ending: parseInt(collegeData.expirationYear),
      };

      if (collegeData.faculty) {
        data['faculty'] = collegeData.faculty;
      }
    }

    if (
      type === 'bachelor' ||
      type === 'master' ||
      type === 'specialist' ||
      type === 'postgraduate' ||
      type === 'internship'
    ) {
      data = {
        type,
        education_id: universityData.education.id,
        faculty: universityData.faculty,
        specialization: universityData.speciality,
        year_of_ending: parseInt(universityData.expirationYear),
        city_id: universityData.city.id,
      };
    }

    if (type === 'skills_enhancement' || type === 'professional_retraining') {
      data = {
        type,
        name: trainingData.name,
        specialization: trainingData.speciality,
        year_of_ending: parseInt(trainingData.expirationYear),
        city_id: trainingData.city.id,
      };
    }

    setInvalidFields([]);

    addEducation({
      data,
    })
      .then(() => {
        refetch({
          onRefetched: () => {
            if (mode === 'edit') {
              toast.info('Образование успешно изменено');
            }
            if (mode === 'add') {
              toast.info('Образование успешно добавлено');
            }
            props.closeFnc();
          },
        });
      })
      .catch(() => {
        toast.info('Не удалось добавить образование');
      });
  };

  const isValid = () => {
    if (type === '') {
      return false;
    }

    switch (type) {
      case 'school': {
        return (
          !invalidFields.length &&
          !!schoolData.name &&
          !isNaN(schoolData.city.id) &&
          !!schoolData.city.name &&
          isYearTest(schoolData.expirationYear)
        );
      }

      case 'college': {
        return (
          !invalidFields.length &&
          !!collegeData.name &&
          !isNaN(collegeData.city.id) &&
          !!collegeData.city.name &&
          !!collegeData.speciality &&
          isYearTest(collegeData.expirationYear)
        );
      }

      case 'bachelor':
      case 'master':
      case 'specialist':
      case 'postgraduate':
      case 'internship':
        return (
          !invalidFields.length &&
          !isNaN(universityData.education.id) &&
          !isNaN(universityData.city.id) &&
          !!universityData.city.name &&
          !!universityData.speciality &&
          !!universityData.faculty &&
          isYearTest(universityData.expirationYear)
        );

      case 'skills_enhancement':
      case 'professional_retraining':
        return (
          !invalidFields.length &&
          !!trainingData.name &&
          !isNaN(trainingData.city.id) &&
          !!trainingData.city.name &&
          !!trainingData.speciality &&
          isYearTest(trainingData.expirationYear)
        );
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Select
              label={'Тип образования'}
              options={educationOptions}
              onChange={handleChange}
              defaultValue={type}
              value={type}
              disabled={mode === 'edit'}
            />
          </Grid>
          {type === 'school' && (
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <LocationInput
                    onChange={(cityId, name) =>
                      handleDataChange(
                        'city',
                        {
                          id: cityId,
                          name,
                        },
                        !!name,
                      )
                    }
                    selectedOption={{ value: schoolData.city.id, label: schoolData.city.name }}
                    helperText={invalidFields.includes('city') ? 'Поле обязательно для заполнения' : ''}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Название"
                    value={schoolData.name}
                    onChange={(e, validatorResult) => handleDataChange('name', e.target.value, validatorResult.isValid)}
                    rules={[Rules.REQUIRED, [Rules.MAX_STRING, 200]]}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Год окончания"
                    value={schoolData.expirationYear}
                    onChange={(e, validatorResult) =>
                      handleDataChange('expirationYear', e.target.value, validatorResult.isValid)
                    }
                    InputProps={{ inputComponent: YearInputPure }}
                    rules={[Rules.REQUIRED]}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {type === 'college' && (
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <LocationInput
                    onChange={(cityId, name) =>
                      handleDataChange(
                        'city',
                        {
                          id: cityId,
                          name,
                        },
                        !!name,
                      )
                    }
                    selectedOption={{ value: collegeData.city.id, label: collegeData.city.name }}
                    helperText={invalidFields.includes('city') ? 'Поле обязательно для заполнения' : ''}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Название"
                    value={collegeData.name}
                    onChange={(e, validatorResult) => handleDataChange('name', e.target.value, validatorResult.isValid)}
                    rules={[Rules.REQUIRED, [Rules.MAX_STRING, 200]]}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Факультет"
                    value={collegeData.faculty}
                    onChange={(e, validatorResult) =>
                      handleDataChange('faculty', e.target.value, validatorResult.isValid)
                    }
                    rules={[[Rules.MAX_STRING, 100]]}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Образовательная программа"
                    value={collegeData.speciality}
                    onChange={(e, validatorResult) =>
                      handleDataChange('speciality', e.target.value, validatorResult.isValid)
                    }
                    rules={[Rules.REQUIRED, [Rules.MAX_STRING, 150]]}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Год окончания"
                    value={collegeData.expirationYear}
                    onChange={(e, validatorResult) =>
                      handleDataChange('expirationYear', e.target.value, validatorResult.isValid)
                    }
                    InputProps={{ inputComponent: YearInputPure }}
                    rules={[Rules.REQUIRED]}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {(type === 'bachelor' ||
            type === 'master' ||
            type === 'specialist' ||
            type === 'postgraduate' ||
            type === 'internship') && (
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <LocationInput
                    onChange={(cityId, name) =>
                      handleDataChange(
                        'city',
                        {
                          id: cityId,
                          name,
                        },
                        !!name,
                      )
                    }
                    selectedOption={{ value: universityData.city.id, label: universityData.city.name }}
                    helperText={invalidFields.includes('city') ? 'Поле обязательно для заполнения' : ''}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <UniversityInput
                    onChange={(item) => handleDataChange('education', item, !!item.name)}
                    selectedOption={{ value: universityData.education.id, label: universityData.education.name }}
                    helperText={invalidFields.includes('education') ? 'Поле обязательно для заполнения' : ''}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Факультет"
                    value={universityData.faculty}
                    onChange={(e, validatorResult) =>
                      handleDataChange('faculty', e.target.value, validatorResult.isValid)
                    }
                    rules={[Rules.REQUIRED, [Rules.MAX_STRING, 100]]}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Образовательная программа"
                    value={universityData.speciality}
                    onChange={(e, validatorResult) =>
                      handleDataChange('speciality', e.target.value, validatorResult.isValid)
                    }
                    rules={[Rules.REQUIRED, [Rules.MAX_STRING, 150]]}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Год окончания"
                    value={universityData.expirationYear}
                    onChange={(e, validatorResult) =>
                      handleDataChange('expirationYear', e.target.value, validatorResult.isValid)
                    }
                    InputProps={{ inputComponent: YearInputPure }}
                    rules={[Rules.REQUIRED]}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {(type === 'professional_retraining' || type === 'skills_enhancement') && (
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <LocationInput
                    onChange={(cityId, name) =>
                      handleDataChange(
                        'city',
                        {
                          id: cityId,
                          name,
                        },
                        !!name,
                      )
                    }
                    selectedOption={{ value: trainingData.city.id, label: trainingData.city.name }}
                    helperText={invalidFields.includes('city') ? 'Поле обязательно для заполнения' : ''}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Название"
                    value={trainingData.name}
                    onChange={(e, validatorResult) => handleDataChange('name', e.target.value, validatorResult.isValid)}
                    rules={[Rules.REQUIRED, [Rules.MAX_STRING, 200]]}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Образовательная программа"
                    value={trainingData.speciality}
                    onChange={(e, validatorResult) =>
                      handleDataChange('speciality', e.target.value, validatorResult.isValid)
                    }
                    rules={[Rules.REQUIRED, [Rules.MAX_STRING, 150]]}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Год окончания"
                    value={trainingData.expirationYear}
                    onChange={(e, validatorResult) =>
                      handleDataChange('expirationYear', e.target.value, validatorResult.isValid)
                    }
                    InputProps={{ inputComponent: YearInputPure }}
                    rules={[Rules.REQUIRED]}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={6} lg={4}>
            <TetriatyButton fullWidth onClick={handleCancel}>
              Отменить
            </TetriatyButton>
          </Grid>
          <Grid item xs={6} lg={4}>
            <Button fullWidth onClick={handleSave} loading={loading || refetchLoading} disabled={!isValid()}>
              {mode === 'edit' ? 'Изменить' : 'Добавить'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EducationForm;
