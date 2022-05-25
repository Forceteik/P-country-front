import { useCallback, useState } from 'react';
// import Link from "next/link";
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import NextLink from 'next/link';

import { Box, Typography, Grid, Link } from '@mui/material';

import { parseFormErrors } from 'utils/common';
import { Rules } from 'utils/validators';
import useStyles from 'containers/auth/styles';
import Button from 'components/Button';
import TextField, { PhoneInput } from 'components/TextField';

const SecondStepApplicant = ({ onGoTo, urlSendCode, request }) => {
  const classes = useStyles();
  const initPhone = get(request, 'phone', '');
  const initEmail = get(request, 'email', '');

  const [email, setEmail] = useState({ value: initEmail, isValid: true, message: '' });
  const [phone, setPhone] = useState({ value: initPhone, isValid: !!initPhone, message: '' });

  const [{ loading: sLoading }, sendCode] = useAxios({ url: urlSendCode, method: 'post' }, { manual: true });

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
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

  const handleSubmit = useCallback(() => {
    if (email.isValid && phone.isValid) {
      const requestData = {
        email: email.value,
        phone: phone.value,
      };

      let finalRequestData = { ...request, ...requestData };

      // Отправляем utm метки регистрации
      const registrationUtm = localStorage.getItem('talantyRegistrationUtm');

      if (registrationUtm) {
        finalRequestData = { ...finalRequestData, ...JSON.parse(registrationUtm).data };
      }

      sendCode({ data: finalRequestData })
        .then(({ data }) => {
          if (!isEmpty(data.token)) {
            onGoTo({ step: 'checkCode', newRequestData: finalRequestData, token: data.token });
          } else {
            toast.error('Ошибка регистрации. Попробуйте заполнить поля заново');
          }
        })
        .catch((e) => {
          if (e) {
            if (e.code === 'validation_failed') {
              const formErrors = parseFormErrors(e.fields);
              formErrors.forEach((item) => {
                if (item.attr === 'phone') {
                  if (item.message === 'Телефон уже занят.') {
                    setPhone({
                      ...phone,
                      isValid: false,
                      // @ts-ignore
                      message: () => (
                        <span>
                          Пользователь с таким номером уже зарегистрирован,{' '}
                          <NextLink href="/auth" passHref>
                            <Link color={'#ff0000'}>авторизуйтесь</Link>
                          </NextLink>
                        </span>
                      ),
                    });
                  } else {
                    setPhone({ ...phone, isValid: false, message: item.message });
                  }
                }
                if (item.attr === 'email') {
                  setEmail({ ...email, isValid: false, message: item.message });
                }
              });
            } else if (e.code === 'code_has_already_been_sent') {
              onGoTo({
                step: 'checkCode',
                newRequestData: finalRequestData,
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
      if (phone.value === '') {
        setPhone({ ...phone, isValid: false, message: 'Поле обязательно для заполнения' });
      }
    }
  }, [email.value, phone.value]);

  const handleBack = () => {
    onGoTo({ step: 'startProcess' });
  };
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography component={'span'} onClick={handleBack}>
              Назад
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title}>Регистрация</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.subTitle}>После регистрации обязательно пройдите первый тест :)</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box onBlur={handleBlurPhone}>
              <PhoneInput
                value={phone.value}
                onChange={handleChangePhone}
                error={!phone.isValid}
                helperText={phone.message}
                onKeyDown={handleKeyDown}
              />
            </Box>
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
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleSubmit} loading={sLoading}>
              Дальше
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.helperInfo}>
              Уже есть аккаунт?{' '}
              <Link href="/auth">
                <a>Войти</a>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SecondStepApplicant;
