import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import get from 'lodash.get';

import { Box, IconButton, InputAdornment, Tooltip, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DefaultAutocomplete from '@mui/material/Autocomplete';

import ChevronDown from 'components/icons/ChevronDown';
import Close from 'components/icons/Close';
import { blueLight, blueMain, darkGray, gray, ligthGray } from 'styles/colorPalette';
import { useTooltipStyles } from 'styles/helpers';

import TextField from './TextField';

const useStyles = makeStyles<any, any>((theme) => ({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: ({ small }) => (small ? 14 : 20),
      [theme.breakpoints.down('md')]: {
        borderRadius: '14px !important',
      },
    },
    '& input': {
      height: 54,
      paddingLeft: '15px !important',
      [theme.breakpoints.down('md')]: {
        paddingLeft: '24px !important',
      },
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      padding: ({ small }) => (small ? 0 : 9),
      [theme.breakpoints.down('md')]: {
        padding: ({ multiple }) => (multiple ? 9 : 0),
        paddingRight: '35px !important',
      },
    },
    '& .MuiInputLabel-outlined': {
      transform: ({ small }) => (small ? 'translate(23px, 16px) scale(1)' : 'translate(27px, 25px) scale(1)'),
      [theme.breakpoints.down('md')]: {
        transform: ({ small }) => (small ? 'translate(23px, 16px) scale(1)' : 'translate(27px, 16px) scale(1)'),
      },
    },
    '& .MuiAutocomplete-popupIndicator': {
      marginRight: 13,
      [theme.breakpoints.down('md')]: {
        marginRight: 0,
      },
    },
  },
  textField: {
    marginBottom: `24px !important`,
    [theme.breakpoints.down('md')]: {
      marginBottom: `20px !important`,
    },
  },
  option: {
    'paddingLeft': theme.spacing(1.5),
    'paddingTop': theme.spacing(0.8),
    'paddingBottom': theme.spacing(0.8),
    'fontSize': theme.typography.pxToRem(14),
    'transition': 'all 0.3s',
    'fontFamily': 'inter-med',
    'display': 'flex',
    'alignItems': 'center',
    'flexBasis': ({ column }) => (column == 1 ? '100%' : '49.5%'),
    '&[aria-selected="true"]': {
      backgroundColor: ligthGray,
    },
    '& p': {
      flexGrow: 1,
    },
    '&:hover': {
      backgroundColor: blueLight,
      color: blueMain,
    },
    [theme.breakpoints.down('md')]: {
      flexBasis: ({ column }) => (column ? '100%' : '100%'),
    },
  },
  paper: {
    borderRadius: 14,
    border: 'none',
    // boxShadow: '5px 10px 10px 2px rgba(0, 0, 0, 0.1)',
  },
  listBox: {
    'display': 'flex',
    'flexWrap': 'wrap',
    'marginTop': 10,
    'marginBottom': 10,
    '&::-webkit-scrollbar': {
      width: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: blueMain,
      borderRadius: 20,
    },
  },
  icon: {
    'borderRadius': '50%',
    'width': 24,
    'height': 24,
    'border': `1px solid ${gray}`,
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    'position': 'relative',
    'backgroundColor': blueMain,
    '&:before': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      width: 9,
      height: 9,
      backgroundColor: '#fff',
      content: '""',
    },
  },
  boxOption: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  descr: {
    color: darkGray,
    fontSize: theme.typography.pxToRem(12),
    paddingLeft: theme.spacing(1.5),
    paddingBottom: theme.spacing(0.8),
  },
  add: {
    color: blueMain,
    cursor: 'pointer',
  },
}));

/**
 * NOTE: props value should always have to keep object with {value: "", label: ""} key pair
 * Not null, not undefined, not extra attributes if you want to prevent warnings and future failures
 * If you need extra props like isValid, message, please store it in separate state.
 * See example in src/containers/modules/applicant/settings/Personal.tsx
 * @param props
 * @constructor
 */
const Autocomplete = (props) => {
  const {
    label,
    small = false,
    required = false,
    error,
    helperText,
    options,
    column = 2,
    rules,
    multiple = false,
    onChange,
    name,
    statusName,
    onKeyDown,
    ...other
  } = props;
  const classes = useStyles({ small, column, multiple });
  const tooltipClasses = useTooltipStyles();

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleMouseMove = () => {
    if (props.disabled) {
      setTooltipOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setTooltipOpen(false);
  };
  // if (props.loading) {
  //   return <CircularProgress size={26} />;
  // }
  const handleChange = (e, v) => {
    onChange(e, v, name, statusName, required);
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <DefaultAutocomplete
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variant={'outlined'}
      autoComplete
      multiple={multiple}
      classes={{ paper: classes.paper, listbox: classes.listBox, option: classes.option }}
      getOptionLabel={(option) => get(option, 'label', '') || ''}
      //@ts-ignore
      getOptionSelected={(option, value) => option.value === value.value}
      popupIcon={<ChevronDown />}
      options={options}
      getOptionDisabled={(option) => option['disabled'] === true}
      renderOption={(props, option) => (
        //@ts-ignore
        <Box className={classes.boxOption} {...props}>
          <Typography className={classes.option}>{option['label']}</Typography>
          {option['descr'] && <Typography className={classes.descr}>{option['descr']}</Typography>}
          {option['onOptionRemove'] && (
            <Box onClick={option['onOptionRemove']}>
              <Close color="#979DAD" fontSize={20} />
            </Box>
          )}
        </Box>
      )}
      renderInput={(params) => (
        <Tooltip
          title="Изменение недоступно"
          classes={tooltipClasses}
          placement="top"
          arrow
          open={tooltipOpen && props.disabled}
        >
          <form autoComplete={'new-password'}>
            <TextField
              onKeyDown={onKeyDown}
              required={required}
              {...params}
              label={label}
              className={classes.root}
              error={error}
              helperText={helperText || ''}
              rules={rules}
            />
          </form>
        </Tooltip>
      )}
      onChange={handleChange}
      {...other}
    />
  );
};

export const QualityAutocomplete = (props) => {
  const { label, small = false, required = false, error, helperText, onRemove, onNewOptionAdded, ...other } = props;
  const classes = useStyles({ small, column: 1 });
  const [search, setSearch] = useState('');
  const [qOptions, setQOptions] = useState([]);
  const [errorStatus, setErrorStatus] = useState(error);
  const [errorMessage, setErrorMessage] = useState(helperText);

  const [{ loading: searchLoading }, searchProfession] = useAxios({ method: 'get' }, { manual: true });
  const [, addQuality] = useAxios({ url: '/qualities', method: 'post' }, { manual: true });

  const handleAdd = () => {
    addQuality({ data: { quality: search } }).then(({ data }) => {
      if (data.data) {
        onNewOptionAdded({
          value: data.data.id,
          label: data.data.name,
        });
      }
    });
  };

  const handleQualitySearch = (e, value, reason) => {
    if (value.length <= 50) {
      setErrorStatus(error);
      setErrorMessage(helperText);
      if (reason === 'input' || reason === 'focus') {
        setSearch(value);
        searchProfession({
          url: `/qualities/search?query=${value}`,
        }).then(({ data }) => {
          if (data?.data) {
            const result = data.data.map((item) => ({
              value: item.id,
              label: item.name,
            }));
            setQOptions(result);
          }
        });
      }
    } else {
      setErrorMessage('Превышена максимально разрешенная длина в 50 символов');
      setErrorStatus(true);
    }
  };

  return (
    <DefaultAutocomplete
      variant={'outlined'}
      disablePortal={!!errorStatus}
      autoComplete
      getOptionLabel={(option) => get(option, 'label', '')}
      //@ts-ignore
      isOptionEqualToValue={(option, value) => option.value === value.value}
      forcePopupIcon={false}
      // popupIcon={<ChevronDown />}
      options={qOptions}
      onInputChange={handleQualitySearch}
      loading={searchLoading}
      classes={{ paper: classes.paper, listbox: classes.listBox, option: classes.option }}
      loadingText={'Поиск навыка...'}
      onFocus={(e) => handleQualitySearch(e, props.value.label, 'focus')}
      noOptionsText={
        search === '' ? (
          <Typography>Введите навык</Typography>
        ) : (
          <Typography>
            Навык не найден.{' '}
            <Typography component={'span'} onMouseDown={handleAdd}>
              Добавить &apos;{search}&apos;
            </Typography>
          </Typography>
        )
      }
      renderInput={(params) => (
        <TextField
          required={required}
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  tabIndex={-1}
                  // onMouseDown={handleMouseDownPassword}
                  onClick={onRemove}
                  size="large"
                >
                  <Close />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label={label}
          className={classes.root}
          error={errorStatus}
          helperText={errorMessage || ''}
        />
      )}
      {...other}
    />
  );
};

export default Autocomplete;
