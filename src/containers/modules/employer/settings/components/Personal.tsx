import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import useAxios from 'axios-hooks';

import { Grid, Typography, useMediaQuery } from '@mui/material';

import useSettingsStyle from 'containers/modules/common/settings/style';
import Avatar from 'containers/modules/common/profile/Avatar';
import TextField from 'components/TextField';
import Autocomplete from 'components/Autocomplete';
import { SecondaryButton } from 'components/Button';
import LocationInput from 'components/LocationInput';
import { Rules } from 'utils/validators';
import { useProfile } from 'context/ProfileContext';

const Personal = (props) => {
  const { value = 0, index = 0 } = props;
  const { currentUser, refetch } = useProfile();

  const [name, setName] = useState({ value: '', isValid: false, message: '' });
  const [about, setAbout] = useState({ value: '', isValid: false, message: '' });

  const [activity, setActivity] = useState({ label: '', value: '' });
  const [activityStatus, setActivityStatus] = useState({ isValid: false, message: '' });
  const [activityState] = useAxios('employer/activities');
  const [activityOptions, setActivityOptions] = useState([]);

  const [city, setCity] = useState({ label: '', value: {} });

  const [employerDictionary] = useAxios('employer/dictionary');
  const [companySize, setCompanySize] = useState({ label: '', value: '' });
  const [companySizeOptions, setCompanySizeOptions] = useState([]);
  const [companySizeStatus, setCompanySizeStatus] = useState({ isValid: false, message: '' });

  const [territory, setTerritory] = useState({ label: '', value: '' });
  const [territoryStatus, setTerritoryStatus] = useState({ isValid: false, message: '' });
  const [territoryOptions, setTerritoryOptions] = useState([]);

  const [{ loading: uLoading }, updateProfile] = useAxios({ url: 'employer/profile', method: 'put' }, { manual: true });

  const classes = useSettingsStyle();

  const toastId = useRef(null);

  useEffect(() => {
    if (currentUser) {
      const employer = currentUser.employer;
      setName({ value: employer.name, isValid: true, message: '' });
      setAbout({ value: employer.about_company, isValid: true, message: '' });
      if (employer.city) {
        setCity({
          label: employer.city.name,
          value: { name: employer.city.name, code: employer.city.code },
        });
      }
    }
  }, []);

  useEffect(() => {
    if (employerDictionary.data) {
      const companySizeOptions = employerDictionary.data.data.company_sizes.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setCompanySizeOptions(companySizeOptions);

      const territoryOptions = employerDictionary.data.data.territorial_companies.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setTerritoryOptions(territoryOptions);

      if (currentUser.employer.company_size) {
        setCompanySize(companySizeOptions.find((item) => item.value === currentUser.employer.company_size.id));
        setCompanySizeStatus({ isValid: true, message: '' });
      }
      if (currentUser.employer.territorial_company) {
        setTerritory(territoryOptions.find((item) => item.value === currentUser.employer.territorial_company.id));
        setTerritoryStatus({ isValid: true, message: '' });
      }
    }
  }, [employerDictionary.loading]);

  useEffect(() => {
    if (activityState.data) {
      const activityOptions = activityState.data.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setActivityOptions(activityOptions);
      const employer = currentUser.employer;
      if (employer.activity) {
        setActivity(activityOptions.find((item) => item.value === employer.activity.id));
        setActivityStatus({ isValid: true, message: '' });
      }
    }
  }, [activityState.loading]);

  const handleChange = (value, setState, isValid) => {
    setState({
      value,
      isValid,
    });
  };

  const handleCityChange = (option) => {
    setCity(option);
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

  const handleSubmit = () => {
    updateProfile({
      data: {
        name: name.value,
        about_company: about.value,
        city: city.value,
        activity_id: activity.value,
        company_size_id: companySize.value,
        territorial_company_id: territory.value,
      },
    }).then(() => {
      refetch();
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.info('Данные успешно сохранены', {
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    });
  };

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const isFormValid = () => name.isValid && about.isValid;

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (isFormValid()) {
        handleSubmit();
      }
    }
  };

  return (
    <>
      {value === index && (
        <Grid container spacing={isMobile ? 3 : 4}>
          <Grid item xs={12}>
            <Typography className={classes.sectionTitle} component="h2">
              Личные данные
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={isMobile ? 2 : 4}>
              <Grid item xs={12} sm={'auto'}>
                <Typography>Аватар (лого компании)</Typography>
              </Grid>
              <Grid item xs>
                <Avatar
                  employer
                  defaultImg="/images/avatar/placeholder-subheader-employer.png"
                  withButton
                  currentUser={currentUser}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onKeyDown={handleKeyDown}
              label="Название компании"
              value={name.value}
              rules={[Rules.REQUIRED]}
              onChange={(e, { isValid }) => handleChange(e.target.value, setName, isValid)}
            />
          </Grid>
          <Grid item xs={12} className={classes.autoComplete}>
            <LocationInput onChange={handleCityChange} selectedOption={city} />
          </Grid>
          <Grid item xs={12} className={classes.select}>
            <Autocomplete
              value={activity?.value ? activity : null}
              onChange={(e, option) => handleAutocomplete(e, option, setActivity, setActivityStatus)}
              options={activityOptions}
              label="Сфера деятельности"
              loading={activityState.loading}
              error={!activityStatus.isValid}
              helperText={activityStatus.message}
              onKeyDown={handleKeyDown}
              noOptionsText={'Вариант не найден'}
              loadingText={'Поиск...'}
            />
          </Grid>
          <Grid item xs={12} className={classes.select}>
            <Autocomplete
              column={1}
              value={companySize?.value ? companySize : null}
              onChange={(e, option) => handleAutocomplete(e, option, setCompanySize, setActivityStatus)}
              options={companySizeOptions}
              label="Размер компании"
              loading={employerDictionary.loading}
              error={!companySizeStatus.isValid}
              helperText={companySizeStatus.message}
              onKeyDown={handleKeyDown}
              noOptionsText={'Вариант не найден'}
              loadingText={'Поиск...'}
            />
          </Grid>
          <Grid item xs={12} className={classes.select}>
            <Autocomplete
              column={1}
              value={territory?.value ? territory : null}
              onChange={(e, option) => handleAutocomplete(e, option, setTerritory, setTerritoryStatus)}
              options={territoryOptions}
              label="Территориальная распределённость"
              loading={employerDictionary.loading}
              error={!territoryStatus.isValid}
              helperText={territoryStatus.message}
              onKeyDown={handleKeyDown}
              noOptionsText={'Вариант не найден'}
              loadingText={'Поиск...'}
            />
          </Grid>
          <Grid item xs={12} className={classes.textInput}>
            <TextField
              label="О компании"
              value={about.value}
              multiline
              rows={6}
              styleMultiline
              onChange={(e, { isValid }) => handleChange(e.target.value, setAbout, isValid)}
              rules={[[Rules.MAX_STRING, 1000]]}
              onKeyDown={handleKeyDown}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <SecondaryButton fullWidth onClick={handleSubmit} loading={uLoading} disabled={!isFormValid()}>
              Сохранить
            </SecondaryButton>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Personal;
