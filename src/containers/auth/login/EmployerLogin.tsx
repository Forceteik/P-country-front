import { useState } from 'react';
import useAxios from 'axios-hooks';
import Link from 'next/link';

import { Box, Typography, Grid } from '@mui/material';

import { useSession } from 'context/UserContext';
import Button from 'components/Button';
import TextField, { PasswordTextField } from 'components/TextField';
import useStyles from 'containers/auth/styles';
import DoubleSwitch from 'components/DoubleSwitch';
import { authSwitchOptions } from 'constants/common';
import { Rules } from 'utils/validators';
import LoginLayout from 'containers/auth/login/LoginLayout';

/**
 * Был добавлен атрибут isServerError
 * Решает этот кейс: https://www.notion.so/preontech/d28d752e72084a47bda74615206c8e98
 * Подробное описание в ApplicantLogin
 * @constructor
 */
const EmployerLogin = () => {
  const classes = useStyles();

  const [email, setEmail] = useState({ value: '', isValid: false, message: '', isServerError: false });
  const [pass, setPass] = useState({ value: '', isValid: false, message: '', isServerError: false });
  const { refetch } = useSession();

  const [{ loading }, executeLogin] = useAxios({ url: 'auth/login', method: 'post' }, { manual: true });

  const handleChange =
    (setState) =>
    (e, { isValid }) => {
      if (e.target.name === 'email' && email.isServerError) {
        setPass({ ...pass, ...{ isValid: true, isServerError: false } });
      }
      if (e.target.name === 'pass' && pass.isServerError) {
        setEmail({ ...email, ...{ isValid: true, isServerError: false } });
      }
      setState({ value: e.target.value, isValid, message: '', isServerError: false });
    };

  const handleBlur =
    (setState) =>
    (e, { isValid, message }) => {
      setState({ value: e.target.value, isValid, message, isServerError: false });
    };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (email.isValid && pass.isValid) {
      executeLogin({
        data: {
          email: email.value,
          password: pass.value,
        },
      })
        .then(({ data }) => {
          if (data?.token.token) {
            localStorage.setItem('talantyLoginToken', data.token.token);
            localStorage.setItem('talantyUserRole', 'employer');
            refetch({ redirectPath: '/employer/profile' });
          }
        })
        .catch((e) => {
          if (e.code === 'validation_failed') {
            setEmail({ value: email.value, isValid: false, message: 'Некорректный Email', isServerError: true });
          } else if (e.code === 'wrong_login_or_password') {
            setEmail({ value: email.value, isValid: false, message: 'Неверный Email или пароль', isServerError: true });
            setPass({ value: pass.value, isValid: false, message: 'Неверный Email или пароль', isServerError: true });
          }
        });
    } else {
      if (email.value === '') {
        setEmail({ ...email, isValid: false, message: 'Введите Email' });
      }
      if (pass.value === '') {
        setPass({ ...pass, isValid: false, message: 'Введите пароль' });
      }
    }
  };

  return (
    <LoginLayout activeRole={0}>
      <Box className={classes.leftContainer}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.title}>Вход</Typography>
              </Grid>
              <Grid item xs={12}>
                <DoubleSwitch items={authSwitchOptions} active={0} className={classes.switch} />
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
                  name={'email'}
                  label="Email"
                  fullWidth
                  onKeyDown={handleKeyDown}
                  value={email.value}
                  error={!email.isValid}
                  helperText={email.message}
                  onChange={handleChange(setEmail)}
                  onBlur={handleBlur(setEmail)}
                  rules={[Rules.REQUIRED, Rules.IS_VALID_EMAIL]}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordTextField
                  name={'pass'}
                  label="Пароль"
                  fullWidth
                  onKeyDown={handleKeyDown}
                  value={pass.value}
                  error={!pass.isValid}
                  helperText={pass.message}
                  onChange={handleChange(setPass)}
                  onBlur={handleBlur(setPass)}
                  rules={[Rules.REQUIRED]}
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
                  Забыли пароль? <Link href="/employer/restore">Восстановить</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LoginLayout>
  );
};

export default EmployerLogin;
