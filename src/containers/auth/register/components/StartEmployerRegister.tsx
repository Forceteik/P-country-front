import { useState, useCallback } from 'react';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import NextLink from 'next/link';

import { Typography, Grid, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

import TextField, { PhoneInput } from 'components/TextField';
import Button from 'components/Button';
import { useCustomAxios } from 'pages/_app';
import config from 'config';
import Autocomplete from 'components/Autocomplete';
import { Rules } from 'utils/validators';
import { parseFormErrors } from 'utils/common';
import useStyles from 'containers/auth/styles';

const useRegisterStyles = makeStyles<any, any>(() => ({
  autocomplete: {
    '& .MuiAutocomplete-clearIndicator': {
      display: ({ isShowDeleteCross }) => (isShowDeleteCross ? 'inline-flex' : 'none'),
    },
  },
}));

const StartEmployerRegister = ({ onGoTo, urlSendCode, request }) => {
  const initCompanyName = get(request, 'company_name', '');
  const initEmail = get(request, 'email', '');
  const initPhone = get(request, 'phone', '');
  // TODO: предзаполнять при возврате
  const initRegistrationNumber = get(request, 'registration_number', { value: {}, isValid: false, message: '' });

  const [companyName, setCompanyName] = useState({ value: initCompanyName, isValid: !!initCompanyName, message: '' });
  const [email, setEmail] = useState({ value: initEmail, isValid: !!initEmail, message: '' });
  const [phone, setPhone] = useState({ value: initPhone, isValid: !!initPhone, message: '' });
  const [registrationNumber, setRegistrationNumber] = useState(initRegistrationNumber);
  const optionsInit = [];
  const [options, setOptions] = useState([]);

  const [innTypeValue, setInnTypeValue] = useState('');
  const isShowDeleteCross = !!registrationNumber?.value.label;

  const classes = useStyles();
  const registerClasses = useRegisterStyles({ isShowDeleteCross });

  const [{ loading }, sendCode] = useAxios({ url: urlSendCode, method: 'post' }, { manual: true });

  const [{ loading: iLoading }, findINN] = useCustomAxios(
    {
      url: config.DADATA_INN_URI,
      method: 'post',
    },
    { manual: true },
  );

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (isFormValid) {
        handleSubmit();
      }
    }
  };

  const handleChange =
    (setState) =>
    (e, { isValid }) => {
      setState({ value: e.target.value, isValid, message: '' });
    };

  const handleBlur =
    (setState) =>
    (e, { isValid, message }) => {
      setState({ value: e.target.value, isValid, message });
    };

  const handleSubmit = useCallback(() => {
    const inn = get(registrationNumber, 'value.value.inn', '');
    const kpp = get(registrationNumber, 'value.value.kpp', '');

    //Не делаем проверку на наличие kpp тк у ИП нет кпп, просто отправляем поле пустым
    if (companyName.isValid && email.isValid && registrationNumber.isValid && inn && phone.isValid) {
      let requestData = {
        email: email.value,
        company_name: companyName.value,
        registration_number: inn,
        additional_registration_number: kpp,
        phone: phone.value,
      };

      // Отправляем utm метки регистрации
      const registrationUtm = localStorage.getItem('talantyRegistrationUtm');

      if (registrationUtm) {
        requestData = { ...requestData, ...JSON.parse(registrationUtm).data };
      }

      sendCode({ data: requestData })
        .then(({ data }) => {
          if (!isEmpty(data.token)) {
            const newRequestData = {
              email: email.value,
              company_name: companyName.value,
              registration_number: registrationNumber,
              phone: phone.value,
            };
            onGoTo({ step: 'checkCode', newRequestData, token: data.token });
          } else {
            toast.error('Ошибка регистрации. Попробуйте заполнить поля заново');
          }
        })
        .catch((e) => {
          if (e) {
            if (e.code === 'validation_failed') {
              const formErrors = parseFormErrors(e.fields);
              formErrors.forEach((item) => {
                if (item.attr === 'company_name') {
                  setCompanyName({ ...companyName, isValid: false, message: item.message });
                }
                if (item.attr === 'email') {
                  // супер костыльно, но это работает
                  if (item.message === 'Пользователь с такой почтой уже зарегистрирован, авторизуйтесь') {
                    setEmail({
                      ...email,
                      isValid: false,
                      // @ts-ignore
                      message: () => (
                        <span>
                          Пользователь с такой почтой уже зарегистрирован,{' '}
                          <NextLink href="/employer/auth" passHref>
                            <Link color={'#ff0000'}>авторизуйтесь</Link>
                          </NextLink>
                        </span>
                      ),
                    });
                  } else {
                    setEmail({ ...email, isValid: false, message: item.message });
                  }
                }
                if (item.attr === 'registration_number') {
                  setRegistrationNumber({ ...registrationNumber, isValid: false, message: item.message });
                }
              });
            } else if (e.code === 'code_has_already_been_sent') {
              const newRequestData = {
                email: email.value,
                company_name: companyName.value,
                registration_number: registrationNumber,
                phone: phone.value,
              };
              onGoTo({
                step: 'checkCode',
                newRequestData: newRequestData,
                serverTime: get(e, 'data.lifetime', 100),
              });
            } else if (e.code === 'user_already_verified') {
              toast.error('Для регистрации необходимо выйти из системы');
            } else {
              toast.error('Ошибка регистрации. Попробуйте заполнить поля заново');
            }
          } else {
            toast.error('Ошибка регистрации. Попробуйте заполнить поля заново');
          }
        });
    } else {
      if (companyName.value === '') {
        setCompanyName({ ...companyName, isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (email.value === '') {
        setEmail({ ...email, isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (registrationNumber.value === '') {
        setRegistrationNumber({ ...registrationNumber, isValid: false, message: 'Поле обязательно для заполнения' });
      }
    }
  }, [companyName.value, email.value, registrationNumber.value]);

  const handleIINSelect = (e, option) => {
    if (!isEmpty(option?.value)) {
      setRegistrationNumber({ value: option, isValid: true, message: '' });
    }
  };

  const handleChangePhone = (value, isValid) => {
    setPhone({ value, isValid, message: '' });
  };

  const handleBlurPhone = () => {
    let message = '';
    if (!phone.isValid) {
      message = phone.value === '' ? 'Введите номер телефона' : 'Некорректный номер телефона';
    }
    setPhone({ value: phone.value, isValid: phone.isValid, message });
  };

  const handleINNInputChange = (e, value, reason) => {
    setInnTypeValue(value);
    const searchingValue = get(e, 'target.value', '');

    if (!value) {
      setRegistrationNumber(initRegistrationNumber);
      setOptions(optionsInit);
    }

    if (reason === 'input' && searchingValue.length >= 10) {
      findINN({
        data: {
          query: searchingValue,
          count: 10,
        },
      }).then(({ data }) => {
        if (data) {
          setOptions(
            data.suggestions?.map((item) => {
              return {
                label: item.data.inn + ' - ' + item.value,
                value: {
                  inn: item.data.inn,
                  name: item.value,
                  kpp: item.data.kpp || '',
                  // code: `${item.data.geo_lat};${item.data.geo_lon}`
                },
              };
            }),
          );
        }
      });
    }
  };

  const isFormValid = companyName.isValid && email.isValid && registrationNumber.isValid;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.title} component="h1">
              Регистрация
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.subTitle}>Заполните все обязательные поля ниже</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Название компании"
              fullWidth
              value={companyName.value}
              error={!companyName.isValid}
              helperText={companyName.message}
              onChange={handleChange(setCompanyName)}
              onBlur={handleBlur(setCompanyName)}
              onKeyDown={handleKeyDown}
              rules={[Rules.REQUIRED]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Почта"
              fullWidth
              value={email.value}
              error={!email.isValid}
              helperText={email.message}
              onChange={handleChange(setEmail)}
              onBlur={handleBlur(setEmail)}
              onKeyDown={handleKeyDown}
              rules={[Rules.REQUIRED, Rules.IS_VALID_EMAIL]}
            />
          </Grid>
          <Grid item xs={12}>
            <PhoneInput
              value={phone.value}
              onChange={handleChangePhone}
              error={!phone.isValid}
              helperText={phone.message}
              onKeyDown={handleKeyDown}
              onBlur={handleBlurPhone}
            />
          </Grid>
          <Grid item xs={12} className={registerClasses.autocomplete}>
            <Autocomplete
              value={registrationNumber.value}
              onChange={handleIINSelect}
              freeSolo={innTypeValue.length < 10}
              onInputChange={handleINNInputChange}
              autoHighlight
              options={options}
              column={1}
              label="ИНН"
              error={!registrationNumber.isValid}
              helperText={registrationNumber.message}
              rules={[Rules.REQUIRED]}
              loading={iLoading}
              loadingText={'Поиск компании...'}
              noOptionsText={'Компания не найдена. Пожалуйста, проверьте правильность введенных данных'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleSubmit} loading={loading}>
              Дальше
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.helperInfo}>
              Уже есть аккаунт? <Link href="/employer/auth">Войти</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StartEmployerRegister;
