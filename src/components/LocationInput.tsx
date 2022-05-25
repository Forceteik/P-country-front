import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { makeStyles } from '@mui/styles';

import { useCustomAxios, useVKAxios } from 'axios-client';
import Autocomplete from 'components/Autocomplete';

const useStyles = makeStyles<any, any>(() => ({
  root: {
    '& .MuiAutocomplete-clearIndicator': {
      display: ({ isShowDeleteCross }) => (isShowDeleteCross ? 'inline-flex' : 'none'),
    },
  },
}));

const LocationInput = (props) => {
  const {
    loadingText = 'Поиск города...',
    noOptionsText = 'Город не найден',
    helperText = '',
    selectedOption,
    onChange,
    ...otherProps
  } = props;

  const [locationOptions, setLocationOptions] = useState([]);
  const [{ loading: cityLoading }, findCity] = useCustomAxios({ method: 'post' }, { manual: true });

  const isShowDeleteCross = selectedOption.value ? true : false;
  const classes = useStyles({ isShowDeleteCross });

  const [typeValue, setTypeValue] = useState('');

  const handleCityChange = (event, newValue) => {
    if (newValue) {
      findCity({
        data: {
          query: newValue.value.name,
          count: 10,
          locations: [{ country: 'Россия' }],
          from_bound: { value: 'city' },
          to_bound: { value: 'city' },
        },
      }).then(({ data }) => {
        const item = data.suggestions[0];
        newValue.value.code = `${item.data.geo_lat};${item.data.geo_lon}`;
        onChange(newValue);
        setLocationOptions([]);
        setTypeValue('');
      });
    }
  };

  const handleCitySearch = (e, value, reason) => {
    if (reason === 'input') {
      setTypeValue(value);
      findCity({
        data: {
          query: value,
          count: 10,
          locations: [{ country: 'Россия' }],
          from_bound: { value: 'city' },
          to_bound: { value: 'city' },
        },
      }).then(({ data }) => {
        const suggestionOptions = data.suggestions.map((item) => {
          let name = '';
          if (item.data.country) {
            name += item.data.country;
          }
          if (item.data.region) {
            name += `, ${item.data.region}`;
          }
          if (item.data.city) {
            name += `, ${item.data.city}`;
          }
          return {
            label: item.value,
            value: { name, code: `${item.data.geo_lat};${item.data.geo_lon}` },
          };
        });
        setLocationOptions(suggestionOptions);
      });
    }
  };
  return (
    <Autocomplete
      column={1}
      classes={{ root: classes.root }}
      freeSolo={typeValue.length === 0 ? true : false}
      label={'Город'}
      value={selectedOption}
      onChange={handleCityChange}
      // onBlur={handleBlurValidation(location?.label, setLocationErrorText, validators.location)}
      onInputChange={handleCitySearch}
      onOpen={() => handleCitySearch(null, selectedOption?.label, null)}
      options={locationOptions}
      loading={cityLoading}
      loadingText={loadingText}
      noOptionsText={noOptionsText}
      error={!!helperText}
      helperText={helperText}
      {...otherProps}
    />
  );
};

const LocationInputV2 = (props) => {
  const {
    loadingText = 'Поиск города...',
    noOptionsText = 'Город не найден',
    helperText = '',
    selectedOption,
    onChange,
    ...otherProps
  } = props;

  const [typeValue, setTypeValue] = useState('');

  const [locationOptions, setLocationOptions] = useState([]);

  const isShowDeleteCross = selectedOption.value ? true : false;
  const classes = useStyles({ isShowDeleteCross });

  const [{ loading: cityLoading }, findCity] = useCustomAxios({ method: 'post' }, { manual: true });
  const [, searchCity] = useAxios({ method: 'get' }, { manual: true });

  const handleCityChange = (event, newValue) => {
    if (newValue) {
      findCity({
        data: {
          query: newValue.value.name,
          count: 10,
          locations: [{ country: 'Россия' }],
          from_bound: { value: 'city' },
          to_bound: { value: 'city' },
        },
      }).then(({ data }) => {
        const item = data.suggestions[0];
        newValue.value.code = `${item.data.geo_lat};${item.data.geo_lon}`;
        searchCity({
          url: `/cities/search?name=${newValue.value.name}&code=${newValue.value.code}`,
        }).then(({ data }) => {
          onChange(data.data.id, item.value, newValue.value.code);
          setLocationOptions([]);
          setTypeValue('');
        });
      });
    } else {
      onChange(newValue);
      setLocationOptions([]);
      setTypeValue('');
    }
  };

  const handleCitySearch = (e, value, reason) => {
    if (reason === 'input') {
      setTypeValue(value);
      findCity({
        data: {
          query: value,
          count: 10,
          locations: [{ country: 'Россия' }],
          from_bound: { value: 'city' },
          to_bound: { value: 'city' },
        },
      }).then(({ data }) => {
        const suggestionOptions = data.suggestions.map((item) => {
          let name = '';
          if (item.data.country) {
            name += item.data.country;
          }
          if (item.data.region) {
            name += `, ${item.data.region}`;
          }
          if (item.data.city) {
            name += `, ${item.data.city}`;
          }

          return {
            label: item.value,
            value: { name, code: `${item.data.geo_lat};${item.data.geo_lon}` },
          };
        });
        setLocationOptions(suggestionOptions);
      });
    }
  };
  return (
    <Autocomplete
      column={1}
      freeSolo={typeValue.length === 0 ? true : false}
      classes={{ root: classes.root }}
      label={'Город'}
      value={selectedOption}
      onChange={handleCityChange}
      onInputChange={handleCitySearch}
      onOpen={() => handleCitySearch(null, selectedOption?.label, null)}
      options={locationOptions}
      loading={cityLoading}
      loadingText={loadingText}
      noOptionsText={noOptionsText}
      error={!!helperText}
      helperText={helperText}
      {...otherProps}
    />
  );
};

const jsonpUrl =
  'https://api.vk.com/method/database.getCities?country_id=1&access_token=b75a77449669d6d42cf86cecc03d0d37944b6390d098c4fe245115815e7b15fec123837e9b240e59d933c&v=5.131&lang=ru';

const jsonpUrl2 =
  'https://api.vk.com/method/database.getCitiesById?access_token=b75a77449669d6d42cf86cecc03d0d37944b6390d098c4fe245115815e7b15fec123837e9b240e59d933c&v=5.131&lang=ru&city_ids=1';

const VkLocationInput = (props) => {
  const {
    loadingText = 'Поиск города...',
    noOptionsText = 'Город не найден',
    helperText = '',
    selectedOption,
    onChange,
    initialCityId = 0,
    ...otherProps
  } = props;

  const [locationOptions, setLocationOptions] = useState([]);
  // const [cityIdState, setCityIdState] = useState({value: {}, label ""})

  const [{ loading: cityLoading }] = useVKAxios(
    {
      method: 'get',
      url: '/database.getCities',
    },
    { manual: true },
  );
  // const [{ loading: searchLoading }, searchCity] = useAxios({ method: "get" }, { manual: true });

  useEffect(() => {
    if (initialCityId !== 0) {
      axios({
        url: jsonpUrl2 + `&city_ids=${initialCityId}`,
        adapter: jsonpAdapter,
      }).then(({ data }) => {
        onChange({ value: data.response[0].id, label: data.response[0].title }, 'system');
        setLocationOptions([{ value: data.response[0].id, label: data.response[0].title }]);
      });
    }
  }, [initialCityId]);

  const handleCityChange = (event, newValue) => {
    // console.log("newValue", newValue);
    onChange(newValue, 'user');
  };

  const handleInputChange = (e, value, reason) => {
    if (reason === 'input' && value.length >= 3) {
      //@ts-config
      axios({
        url: jsonpUrl + `&q=${value}`,
        adapter: jsonpAdapter,
      }).then(({ data }) => {
        const suggestionOptions = data.response.items.map((item) => ({ label: item.title, value: item.id }));
        setLocationOptions(suggestionOptions);
      });
    }
  };

  return (
    <Autocomplete
      column={1}
      label={'Город'}
      value={selectedOption}
      onChange={handleCityChange}
      onInputChange={handleInputChange}
      // onOpen={() => handleCitySearch(null, selectedOption?.label, null)}
      options={locationOptions}
      loading={cityLoading}
      loadingText={loadingText}
      noOptionsText={noOptionsText}
      error={!!helperText}
      helperText={helperText}
      {...otherProps}
    />
  );
};

export { LocationInputV2, VkLocationInput };

export default LocationInput;
