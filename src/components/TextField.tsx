import { useEffect, useRef, useState } from 'react';
import PhoneInput2 from 'react-phone-input-2';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import emailMask from 'text-mask-addons/dist/emailMask';
import cx from 'classnames';
import NumberFormat from 'react-number-format';
import 'react-phone-input-2/lib/style.css';
import startsWith from 'lodash.startswith';

import DefaultTextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import EyeOff from 'components/icons/EyeOff';
import { validateRules } from 'utils/validators';
import countries from 'constants/countres';
import { black, blueMain, gray, midDarkGray } from 'styles/colorPalette';

import Eye from './icons/Eye';

const useStyles = makeStyles<any, any>((theme) => ({
  root: {
    '&::focus': {
      outlineWidth: 0,
    },
    'backgroundColor': 'white',
    '& .MuiOutlinedInput-multiline': {
      padding: '13px 1px 14px 0px',
      [theme.breakpoints.down('md')]: {
        padding: '13px 1px 14px 0px',
      },
    },
    '& .MuiInputBase-root .Mui-disabled': {
      backgroundColor: '#ffffff',
      borderRadius: 20,
      color: black,
    },
    '& .MuiOutlinedInput-root fieldset': {
      borderRightWidth: ({ splitLeft }) => (splitLeft ? 0 : 1),
    },
    '& .MuiOutlinedInput-root.Mui-disabled fieldset': {
      border: `1px solid ${gray}`,
    },
    '& .MuiFormLabel-root.Mui-disabled.Mui-error': {
      color: gray,
    },
    '& .MuiOutlinedInput-root.Mui-disabled.Mui-error fieldset': {
      border: `1px solid ${gray}`,
    },
    '& .MuiFormLabel-root.Mui-disabled': {
      color: midDarkGray,
      backgroundColor: 'transparent !important',
    },
    '& .Mui-error .MuiInputBase-input.Mui-disabled': {
      '&::placeholder': {
        color: '#EF466F',
        opacity: 1,
      },
    },
    '& .MuiIconButton-root': {
      color: midDarkGray,
    },
    '& .MuiInputBase-root.Mui-disabled': {
      cursor: 'auto',
      color: black,
    },
    '& .react-tel-input :disabled': {
      cursor: 'auto',
    },
    '& .react-tel-input .form-control.invalid-number': {
      background: 'transparent',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      backgroundColor: '#fff',
      paddingLeft: 3,
      transform: 'translate(13px, -6px) scale(0.75)',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel': {
      backgroundColor: ({ placeholder }) => (placeholder ? 'transparent' : '#fff'),
    },
    '& .MuiInputLabel-outlined': {
      transform: ({ small }) => (small ? 'translate(23px, 15px) scale(1)' : 'translate(27px, 25px) scale(1)'),
      [theme.breakpoints.down('md')]: {
        transform: ({ small }) => (small ? 'translate(23px, 16px) scale(1)' : 'translate(23px, 16px) scale(1)'),
        fontSize: theme.typography.pxToRem(14),
      },
    },
    '& .Mui-disabled.MuiFormHelperText-root': {
      display: 'none',
    },
    '& .MuiFormLabel-root.Mui-disabled .MuiFormLabel-asterisk.Mui-error': {
      color: gray,
    },
    '& textarea': {
      'paddingRight': theme.spacing(1.5),
      'paddingTop': theme.spacing(1),
      'paddingLeft': 10,
      '&::-webkit-scrollbar': {
        width: 10,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: blueMain,
        borderRadius: 20,
      },
    },
  },
}));

const usePhoneStyles = makeStyles<any>((theme) => ({
  phoneContainer: {
    'display': 'flex !important',
    'padding': '0px !important',
    '& .react-tel-input': {
      padding: 0,
    },
    '& .form-control': {
      background: 'transparent',
      height: 72,
      [theme.breakpoints.down('md')]: {
        height: 52,
        borderRadius: 14,
      },
    },
  },
  phoneInput: {
    'outline': 'none !important',
    'border': 'none !important',
    'fontSize': '1rem !important',
    'fontFamily': 'inter-med !important',
    'padding': `6px 40px 6px 60px !important`,
    'width': '100% !important',
    '&:-webkit-autofill': {
      boxShadow: 'inset 0 0 0 1000px #fff inset !important',
    },
  },
  flagButton: {
    'border': 'none !important',
    'background': 'transparent  !important',
    'borderRadius': '0 !important',
    'paddingLeft': `${theme.spacing(3)} !important`,
    '& .flag': {
      zoom: 1.3,
      top: '47% !important',
    },
    '& .selected-flag': {
      padding: 0,
    },
  },
}));

const useOutlinedStyles = makeStyles<any, any>((theme) => ({
  notchedOutline: {
    borderRadius: ({ small, splitLeft, splitRight }) =>
      splitLeft ? '20px 0px 0px 20px' : splitRight ? '0px 20px 20px 0px' : small ? 14 : 20,
    backgroundColor: 'transparent',
    [theme.breakpoints.down('md')]: {
      borderRadius: ({ small, splitLeft, splitRight }) =>
        splitLeft ? '14px 0px 0px 14px' : splitRight ? '0px 14px 14px 0px' : small ? 14 : 14,
    },
  },
  adornedEnd: {
    backgroundColor: 'transparent',
    paddingRight: '20px',
  },
  input: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset', // prevent autofill effect by chrome
    },
    'backgroundColor': '#ffffff',
    'height': ({ small, styleMultiline }) => (styleMultiline ? 'unset' : small ? 52 : 72),
    'paddingTop': 11,
    'paddingLeft': theme.spacing(3),
    'boxSizing': 'border-box',
    [theme.breakpoints.down('md')]: {
      height: ({ styleMultiline }) => (styleMultiline ? 'unset' : '52px !important'),
      paddingLeft: ({ small }) => (small ? '24px' : '24px'),
    },
  },
}));

export const useTooltipStyles = makeStyles<any>((theme) => ({
  tooltip: {
    backgroundColor: 'rgba(239, 70, 111, 0.95)',
    borderRadius: 20,
    padding: theme.spacing(2),
    color: 'white',
    fontSize: '1rem',
  },
  arrow: {
    color: 'rgba(239, 70, 111, 0.95)',
    left: '15px !important',
  },
}));

export const useTooltipLightStyles = makeStyles<any>((theme) => ({
  tooltip: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    color: '4f5158',
    fontSize: theme.typography.pxToRem(12),
    fontFamily: 'inter',
    fontWeight: 400,
    marginTop: theme.spacing(1),
  },
}));

export const useTooltipBasicStyles = makeStyles<any>((theme) => ({
  tooltip: {
    backgroundColor: '#4F5159',
    borderRadius: 20,
    padding: '16px 20px',
    color: 'white',
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '150%',
    maxWidth: 300,
    textAlign: 'center',
  },
  arrow: {
    color: '#4F5159',
  },
}));

export const useTooltipCustomStyles = makeStyles<any, any>((theme) => ({
  tooltip: {
    backgroundColor: '#4F5159',
    borderRadius: 20,
    padding: ({ padding }) => padding,
    color: 'white',
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '150%',
    maxWidth: ({ width }) => width,
    textAlign: 'center',
  },
  arrow: {
    color: '#4F5159',
  },
}));

export const useTooltipOneLineStyles = makeStyles<any>((theme) => ({
  tooltip: {
    backgroundColor: '#4F5159',
    borderRadius: 20,
    padding: theme.spacing(2),
    color: 'white',
    fontSize: theme.typography.pxToRem(12),
    lineHeight: '150%',
    // maxWidth: 200,
    textAlign: 'center',
  },
  arrow: {
    color: '#4F5159',
  },
}));

const TextField = (props) => {
  const {
    InputProps,
    small = false,
    onChange,
    onBlur,
    onFocus,
    enableValidate = true,
    styleMultiline = false,
    rules = [],
    splitRight = false,
    splitLeft = false,
    ...other
  } = props;

  const classes = useStyles({ small, splitLeft, splitRight });
  const outlinedClasses = useOutlinedStyles({ small, splitRight, splitLeft, styleMultiline });
  const [helperText, setHelperText] = useState(props.helperText);
  const [error, setError] = useState(props.error || false);

  //Если ошибка будет приходить с парента
  useEffect(() => {
    if (enableValidate) {
      if (props.error === true && props.helperText !== '') {
        setError(props.error);
        //TODO: Из-за того что props.helperText не проверяется на существование в setHelperText попадает undefined и helperText ломается
        setHelperText(props.helperText);
      } else {
        setError(false);
        setHelperText('');
      }
    } else {
      setError(false);
      setHelperText('');
    }
  }, [props.error, props.helperText, enableValidate]);

  const handleChange = (e) => {
    const result = validateRules(e.target.value, rules);
    onChange && onChange(e, result);
  };

  const handleBlur = (e) => {
    if (enableValidate) {
      const result = validateRules(e.target?.value || '', rules);
      setHelperText(result.message);
      setError(!result.isValid);
      onBlur && onBlur(e, result);
    } else {
      onBlur && onBlur(e);
    }
  };

  const handleFocus = (e) => {
    // setError(false);
    // setHelperText("");
    //@ts-ignore
    onFocus && onFocus(e);
  };

  return (
    // <Tooltip title={helperText || ""} arrow open={error} placement={"top-start"} classes={tooltipClasses}>
    <DefaultTextField
      fullWidth
      variant={'outlined'}
      classes={classes}
      InputProps={{ classes: outlinedClasses, ...InputProps }}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      {...other}
      error={error}
      helperText={helperText || ''}
    />
    // </Tooltip>
  );
};

export const PasswordTextField = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      autoComplete="current-password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              tabIndex={-1}
              aria-label="toggle password visibility"
              // onMouseDown={handleMouseDownPassword}
              onClick={handleClickShowPassword}
              size="large"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

const PhoneInputPure = (props) => {
  const { onChange, value, ...other } = props;
  const classes = usePhoneStyles();

  const handleChange = (phone, data, e, formattedValue) => {
    const isValid = countries.some((country: any) => {
      return (
        (startsWith(phone, country.dialCode) || startsWith(country.dialCode, phone)) &&
        country.format.length === formattedValue.length
      );
    });
    onChange(phone, isValid);
  };

  return (
    <PhoneInput2
      country={'ru'}
      specialLabel={''}
      onChange={handleChange}
      // ref={(ref) => {
      //   inputRef(ref ? ref.inputElement : null); // do not delete, otherwise ref error will be appeared in console
      // }}
      disableDropdown
      inputClass={cx('MuiInputBase-input MuiOutlinedInput-input form-control', classes.phoneInput)}
      containerClass={classes.phoneContainer}
      buttonClass={classes.flagButton}
      areaCodes={{
        kz: ['700', '701', '702', '705', '707', '708', '747', '771', '775', '776', '777', '778'],
      }}
      masks={{ kz: '(...) ...-..-..' }}
      value={value}
      {...other}
    />
  );
};

export const PhoneInput = (props) => {
  const { small = false, ...other } = props;
  const classes = useStyles({ small });
  const outlinedClasses = useOutlinedStyles({ small });
  const inputRef = useRef();
  const [helperText, setHelperText] = useState(props.helperText);
  const [error, setError] = useState(props.error || false);

  //Если ошибка будет приходить с сервера
  useEffect(() => {
    if (props.error === true && props.helperText !== '') {
      setError(props.error);
      setHelperText(props.helperText);
    } else {
      setError(false);
      setHelperText('');
    }
  }, [props.value, props.error, props.helperText]);

  return (
    // <Tooltip title={helperText || ""} arrow open={error} placement={"top-start"} classes={tooltipClasses}>
    <DefaultTextField
      fullWidth
      placeholder={'+7 (911) 123-45-67 '}
      label={'Телефон'}
      variant={'outlined'}
      classes={classes}
      InputLabelProps={{
        shrink: true,
      }}
      inputRef={inputRef}
      InputProps={{
        inputComponent: PhoneInputPure,
        classes: outlinedClasses,
        endAdornment: props.end ? props.end : null,
      }}
      {...other}
      error={error}
      helperText={helperText || ''}
    />
    // </Tooltip>
  );
};

// Переименовать тк используется только в рублях
export const NumberFormatCustom = (props) => {
  const { inputRef, onChange, onBlur, ...other } = props;
  const [target, setTarget] = useState(null);

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        setTarget({
          value: values.value,
          formattedValue: values.formattedValue,
        });
        onChange({
          target: {
            value: values.value,
            name: other.name || '',
            formattedValue: values.formattedValue,
          },
        });
      }}
      onBlur={() => onBlur({ target })}
      allowNegative={false}
      thousandSeparator={' '}
      suffix=" ₽"
      decimalScale={0}
    />
  );
};

export const NumberFormatUniversal = (props) => {
  const { inputRef, onChange, onBlur, ...other } = props;
  const [target, setTarget] = useState({
    value: '',
    formattedValue: '',
  });

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        setTarget({
          value: values.value,
          formattedValue: values.formattedValue,
        });
        onChange({
          target: {
            value: values.value,
            formattedValue: values.formattedValue,
          },
        });
      }}
      onBlur={() => onBlur({ target })}
      allowNegative={false}
      // thousandSeparator={" "}
      // suffix=" .руб"
      decimalScale={0}
    />
  );
};

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy', {
  minYear: 1920,
  // временно убрал тк у одного юзера ДР была 2100 год. и сайт ломается
  maxYear: new Date().getFullYear(),
});

const autoCorrectedDatePipeShort = createAutoCorrectedDatePipe('mm/yyyy', {
  minYear: 1920,
  // временно убрал тк у одного юзера ДР была 2100 год. и сайт ломается
  maxYear: new Date().getFullYear(),
});

const autoCorrectedYearPipe = createAutoCorrectedDatePipe('yyyy', {
  minYear: 1920,
  maxYear: 2100,
});

export const DateInputPure = (props) => {
  const { onChange, ...other } = props;
  return (
    <MaskedInput
      // ref={(ref) => {
      //   inputRef(ref ? ref.inputElement : null); // do not delete, otherwise ref error will be appeared in console
      // }}
      mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
      pipe={autoCorrectedDatePipe}
      guide={true}
      onChange={onChange}
      keepCharPositions={true}
      {...other}
    />
  );
};

export const DateInputPureShort = (props) => {
  const { onChange, ...other } = props;
  return (
    <MaskedInput
      mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
      pipe={autoCorrectedDatePipeShort}
      guide={true}
      onChange={onChange}
      // keepCharPositions={true}
      {...other}
    />
  );
};

export const YearInputPure = (props) => {
  const { onChange, ...other } = props;
  return (
    <MaskedInput
      // ref={(ref) => {
      //   inputRef(ref ? ref.inputElement : null); // do not delete, otherwise ref error will be appeared in console
      // }}
      mask={[/\d/, /\d/, /\d/, /\d/]}
      pipe={autoCorrectedYearPipe}
      guide={true}
      onChange={onChange}
      keepCharPositions={true}
      {...other}
    />
  );
};

export const EmailInput = (props) => {
  const { ...other } = props;

  return (
    <MaskedInput
      {...other}
      // ref={(ref) => {
      //   inputRef(ref ? ref.inputElement : null);
      // }}
      mask={emailMask}
      showMask={false}
      guide={false}
    />
  );
};

export const INNInput = (props) => {
  const { inputRef, value, ...other } = props;

  return (
    <MaskedInput
      {...other}
      value={value}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      showMask={false}
      guide={false}
    />
  );
};

export default TextField;
