import { useState } from 'react';
import useAxios from 'axios-hooks';

import { makeStyles } from '@mui/styles';

import Autocomplete from 'components/Autocomplete';

const useStyles = makeStyles<any, any>(() => ({
  root: {
    '& .MuiAutocomplete-clearIndicator': {
      display: ({ isShowDeleteCross }) => (isShowDeleteCross ? 'inline-flex' : 'none'),
    },
  },
}));

const UniversityInput = (props) => {
  const {
    loadingText = 'Поиск ВУЗа...',
    noOptionsText = 'ВУЗ не найден',
    helperText = '',
    selectedOption,
    onChange,
    selectedUniv = [],
    ...otherProps
  } = props;

  const [{ loading: universityLoading }, findUniversity] = useAxios({ method: 'GET' }, { manual: true });

  const [universityOptions, setUniversityOptions] = useState([]);

  const isShowDeleteCross = selectedOption.value ? true : false;
  const classes = useStyles({ isShowDeleteCross });
  const [typeValue, setTypeValue] = useState('');

  const handleUniversityChange = (event, newValue) => {
    if (newValue) {
      onChange({
        name: newValue.label,
        id: newValue.value,
      });
      setTypeValue('');
    } else {
      onChange({
        name: '',
        id: 0,
      });
      setTypeValue('');
    }
  };

  //Функция для того, чтобы не показывать в автокомплите университеты, которые пользователь уже добавил
  const filterSelectUniv = (arr2, arr1) => {
    const arr = [];
    let ok = true;

    arr2.map((item) => {
      arr1.map((itemA) => {
        if (item.id === itemA.value) {
          ok = false;
        }
      });
      if (ok) {
        arr.push(item);
      }
      ok = true;
    });
    return arr;
  };

  const handleUniversitySearch = (e, value, reason) => {
    setUniversityOptions([]);
    if (reason === 'input' && value.length >= 2) {
      setTypeValue(value);
      findUniversity({
        url: `/education/search?query=${value}`,
      }).then(({ data }) => {
        setUniversityOptions(
          filterSelectUniv(data.data, selectedUniv).map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          }),
        );
      });
    }
  };
  return (
    <Autocomplete
      column={1}
      label={'ВУЗ'}
      classes={{ root: classes.root }}
      freeSolo={typeValue.length === 0 ? true : false}
      value={selectedOption}
      onChange={handleUniversityChange}
      onInputChange={handleUniversitySearch}
      onOpen={() => handleUniversitySearch(selectedOption?.id, selectedOption?.name, null)}
      options={universityOptions}
      loading={universityLoading}
      loadingText={loadingText}
      noOptionsText={noOptionsText}
      error={!!helperText}
      helperText={helperText}
      {...otherProps}
    />
  );
};

export default UniversityInput;
