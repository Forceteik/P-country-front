import { useCallback, useState } from 'react';
import useAxios from 'axios-hooks';
import Link from 'next/link';
import { toast } from 'react-toastify';
import get from 'lodash.get';

import { Typography, Grid } from '@mui/material';

import { Rules } from 'utils/validators';
import TextField from 'components/TextField';
import Button from 'components/Button';

import useStyles from '../../styles';

const StartEmployerRestore = ({ onGoTo, restorePlace = 'auth', urlSendCode, ...other }) => {
  const classes = useStyles();

  const [email, setEmail] = useState(other.email);

  const [{ loading: sLoading }, sendCode] = useAxios({ url: urlSendCode, method: 'post' }, { manual: true });

  const handleChangeEmail = (e, { isValid }) => {
    setEmail({ value: e.target.value, isValid, message: '' });
  };

  const handleBlurEmail = (e, { isValid, message }) => {
    setEmail({ value: e.target.value, isValid, message });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = useCallback(() => {
    if (email.value) {
      const requestData = {
        email: email.value,
      };

      sendCode({ data: requestData })
        .then(({ data }) => {
          onGoTo({
            step: 'checkCode',
            newRequestData: requestData,
            email,
            serverTime: data.data?.confirm?.next_send_time,
          });
        })
        .catch((e) => {
          if (e) {
            if (e.code === 'validation_failed') {
              const serverErrors = get(e, 'fields.email', []);
              if (serverErrors.length > 0) {
                setEmail({ value: email.value, isValid: false, message: serverErrors[0] });
              }
            } else if (e.code === 'user_not_found') {
              setEmail({ value: email.value, isValid: false, message: 'Пользователь не найден' });
            } else if (e.code === 'code_has_already_been_sent') {
              onGoTo({
                step: 'checkCode',
                newRequestData: requestData,
                email,
                serverTime: get(e, 'data.lifetime', 100),
              });
            } else {
              toast.error('Ошибка восстановления пароля. Попробуйте заполнить поле заново');
            }
          } else {
            toast.error('Ошибка восстановления пароля. Попробуйте заполнить поле заново');
          }
        });
    } else {
      if (email.value === '') {
        setEmail({ ...email, isValid: false, message: 'Поле обязательно для заполнения' });
      } else {
        toast.error('Ошибка восстановления пароля. Попробуйте заполнить поле заново');
      }
    }
  }, [email.value]);

  return (
    <Grid container spacing={5}>
      {restorePlace === 'auth' && (
        <Grid item xs={12}>
          <Typography className={classes.title}>Восстановить пароль</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          label="Почта"
          fullWidth
          value={email.value}
          error={!email.isValid}
          helperText={email.message}
          onChange={handleChangeEmail}
          onBlur={handleBlurEmail}
          onKeyDown={handleKeyDown}
          rules={[Rules.REQUIRED, Rules.IS_VALID_EMAIL]}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={restorePlace === 'auth' ? 12 : 6} md={restorePlace === 'auth' ? 12 : 4}>
            <Button fullWidth onClick={handleSubmit} loading={sLoading}>
              Дальше
            </Button>
          </Grid>
          {restorePlace === 'auth' && (
            <Grid item xs={12}>
              <Typography className={classes.helperInfo}>
                Вспомнил пароль? <Link href="/employer/auth">Войти</Link>
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StartEmployerRestore;
