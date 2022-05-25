import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import debounce from 'lodash.debounce';

import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Autocomplete from 'components/Autocomplete';
import { blueMain } from 'styles/colorPalette';

const usePopperStyles = makeStyles<any, any>(() => ({
  noOptions: {
    padding: 0,
  },
  innerNoOptions: {
    padding: '12px 24px',
    cursor: 'pointer',
    color: blueMain,
  },
  innerNoOptionsEnter: {
    padding: '12px 24px',
  },
  root: {
    '& .MuiAutocomplete-clearIndicator': {
      display: ({ isShowDeleteCross }) => (isShowDeleteCross ? 'inline-flex' : 'none'),
    },
  },
}));

const QualityInput = (props) => {
  const {
    loadingText = 'Поиск навыка...',
    helperText = '',
    selectedOption,
    onChange,
    onInputChange,
    disabled,
    ...otherProps
  } = props;

  const isShowDeleteCross = selectedOption.value ? true : false;
  const classes = usePopperStyles({ isShowDeleteCross });

  const [search, setSearch] = useState('');
  const [qualityOptions, setQualityOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(helperText);
  const [typeValue, setTypeValue] = useState('');

  const [{ loading: searchLoading }, searchProfession] = useAxios({ method: 'get' }, { manual: true });
  const [{ loading: addQualityLoading }, addQuality] = useAxios(
    {
      url: '/qualities',
      method: 'post',
    },
    { manual: true },
  );

  useEffect(() => {
    if (helperText) {
      setErrorMessage(helperText);
    }
  }, [helperText]);

  const handleAdd = () => {
    addQuality({ data: { quality: search } }).then(({ data }) => {
      if (data.data) {
        onChange({
          value: data.data.id,
          label: data.data.name,
        });
      }
    });
    setSearch('');
    setTypeValue('');
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.stopPropagation();
      event.preventDefault();
      handleAdd();
    }
  };

  const handleQualityChange = (event, newValue) => {
    setTypeValue('');
    if (newValue) {
      onChange({
        value: newValue.value,
        label: newValue.label,
      });
      setTypeValue('');
    }
    setSearch('');
    setTypeValue('');
    setQualityOptions([]);
  };

  const handleQualitySearch = (e, value, reason) => {
    setQualityOptions([]);
    if (reason === 'input' || reason === 'focus') {
      setTypeValue(value);
      if (value.length > 50) {
        setErrorMessage('Навык не может быть длиннее 50 символов');
        return;
      }

      if (onInputChange) {
        onInputChange();
      }

      setSearch(value);
      setErrorMessage('');
      searchProfession({
        url: `/qualities/search?query=${value}`,
      }).then(({ data }) => {
        if (data?.data) {
          const result = data.data.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          setQualityOptions(result);
        }
      });
    }
  };

  const renderNoOptionText = () => {
    if (!!errorMessage || !!helperText) return null;

    if (search === '') {
      return (
        <Box className={classes.innerNoOptionsEnter}>
          <Typography>Введите навык</Typography>
        </Box>
      );
    }
    return (
      <Box onMouseDown={handleAdd} className={classes.innerNoOptions}>
        <Typography>Добавить навык</Typography>
      </Box>
    );
  };

  const debouncedSearch = debounce(handleQualitySearch, 200);

  return (
    <Autocomplete
      column={1}
      label={'Например, Microsoft Excel'}
      classes={{ root: classes.root }}
      value={selectedOption}
      freeSolo={typeValue.length === 0 ? true : false}
      onChange={handleQualityChange}
      onKeyDown={handleKeyDown}
      onInputChange={debouncedSearch}
      onOpen={() => debouncedSearch(selectedOption?.value, selectedOption?.label, null)}
      options={qualityOptions}
      loading={addQualityLoading || searchLoading}
      loadingText={loadingText}
      error={!!errorMessage}
      disabled={disabled}
      helperText={errorMessage}
      noOptionsText={renderNoOptionText()}
      {...otherProps}
    />
  );
};

export default QualityInput;
