import { useState } from 'react';
import useAxios from 'axios-hooks';
import Link from 'next/link';

import { Box, Typography, Grid } from '@mui/material';

import { useSession } from 'context/UserContext';
import Button from 'components/Button';
import { PasswordTextField, PhoneInput } from 'components/TextField';
import useStyles from 'containers/auth/styles';
import DoubleSwitch from 'components/DoubleSwitch';
import { authSwitchOptions } from 'constants/common';
import { Rules } from 'utils/validators';
import LoginLayout from 'containers/auth/login/LoginLayout';

/**
 * Был добавлен атрибут isServerError
 * Решает этот кейс: https://www.notion.so/preontech/d28d752e72084a47bda74615206c8e98
 * Почему добавил новый атрибут, а не просто делаю isValid двум полям при любом onChange?
 * 1. П может ввести неправильный (неполный) номер, например +7(702)577, и после блюр выйдет ошибка - все ок.
 * 2. Теперь забиваю пароль, после onChange я делаю isValid двум полям
 * 3. После этого 2 поля станут валидными, хотя изначально +7(702)577 номер неверный.
 * 4. Аналогичная ситуация, когда начинаешь забивать пароль а потом телефон.
 *
 * Поэтому позволяем делать isValid 2м полям только тогда, когда ошибка пришла именно с сервера
 *
 * Альтернатива:
 * Можно было бы 2-м пункте перепроверить валидность номера, но ее валидность проверяется на уровне компонента
 * К тому же кейс с isServerError используется только при логине, так что вариант рабочий и не костыльный.
 * @constructor
 */
const ApplicantLogin = () => {
  const classes = useStyles();

  const [phone, setPhone] = useState({ value: '', isValid: false, message: '', isServerError: false });
  const [pass, setPass] = useState({ value: '', isValid: false, message: '', isServerError: false });

  const { refetch } = useSession();

  const [{ loading }, executeLogin] = useAxios({ url: 'auth/login', method: 'post' }, { manual: true });

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleChange =
    (setState) =>
    (e, { isValid }) => {
      if (pass.isServerError) {
        setPhone({ ...phone, ...{ isValid: true, isServerError: false } });
      }
      setState({ value: e.target.value, isValid, message: '', isServerError: false });
    };

  const handleBlur =
    (setState) =>
    (e, { isValid, message }) => {
      setState({ value: e.target.value, isValid, message, isServerError: false });
    };

  const handleChangePhone = (value, isValid) => {
    if (phone.isServerError) {
      setPass({ ...pass, ...{ isValid: true, isServerError: false } });
    }
    setPhone({ value, isValid, message: '', isServerError: false });
  };

  const handleBlurPhone = () => {
    let message = '';
    if (!phone.isValid) {
      message = phone.value === '' ? 'Введите номер телефона' : 'Некорректный номер телефона';
    }
    setPhone({ value: phone.value, isValid: phone.isValid, message, isServerError: false });
  };

  const handleSubmit = () => {
    if (phone.isValid && pass.isValid) {
      executeLogin({
        data: {
          phone: phone.value,
          password: pass.value,
        },
      })
        .then(({ data }) => {
          if (data?.token.token) {
            localStorage.setItem('talantyLoginToken', data.token.token);
            localStorage.setItem('talantyUserRole', 'employee');
            refetch({ redirectPath: '/applicant' });
          }
        })
        .catch((e) => {
          if (e.code === 'validation_failed') {
            setPhone({ ...phone, ...{ isValid: false, message: 'Некорректный номер телефона', isServerError: true } });
          } else if (e.code === 'wrong_login_or_password') {
            setPhone({
              ...phone,
              ...{ isValid: false, message: 'Неверный номер телефона или пароль', isServerError: true },
            });
            setPass({
              ...pass,
              ...{ isValid: false, message: 'Неверный номер телефона или пароль', isServerError: true },
            });
          }
        });
    } else {
      if (phone.value === '') {
        setPhone({ ...phone, isValid: false, message: 'Введите номер телефона' });
      }
      if (pass.value === '') {
        setPass({ ...pass, isValid: false, message: 'Введите пароль' });
      }
    }
  };

  return (
    <LoginLayout>
      <Box className={classes.leftContainer}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.title}>Вход</Typography>
              </Grid>
              <Grid item xs={12}>
                <DoubleSwitch items={authSwitchOptions} active={1} className={classes.switch} />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.subTitle}>Заполните все обязательные поля ниже</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box onBlur={handleBlurPhone}>
                  <PhoneInput
                    onKeyDown={handleKeyDown}
                    value={phone.value}
                    onChange={handleChangePhone}
                    error={!phone.isValid}
                    helperText={phone.message}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <PasswordTextField
                  label="Пароль"
                  fullWidth
                  onKeyDown={handleKeyDown}
                  value={pass.value}
                  error={!pass.isValid}
                  onChange={handleChange(setPass)}
                  onBlur={handleBlur(setPass)}
                  rules={[Rules.REQUIRED]}
                  helperText={pass.message}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button fullWidth onClick={handleSubmit} loading={loading}>
                  Войти
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.helperInfo}>
                  Еще нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.helperInfo}>
                  Забыли пароль? <Link href="/restore">Восстановить</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/*Временно убираем*/}
        {/*<Box className={classes.socialIconsContainer}>*/}
        {/*  <TwitterIcon className={classes.socialIcons} />*/}
        {/*  <FBIcon className={classes.socialIcons} />*/}
        {/*  <GoogleIcon className={classes.socialIcons} />*/}
        {/*  <VKIcon className={classes.socialIcons} />*/}
        {/*</Box>*/}
      </Box>
    </LoginLayout>
  );
};

export default ApplicantLogin;
