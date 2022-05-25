import { useCallback, useState } from 'react';
import useAxios from 'axios-hooks';
import Link from 'next/link';
import { toast } from 'react-toastify';
import get from 'lodash.get';

import { Typography, Grid } from '@mui/material';

import Button from 'components/Button';
import { PhoneInput } from 'components/TextField';

import useStyles from '../../styles';

const StartApplicantRestore = ({ onGoTo, restorePlace = 'auth', urlSendCode, ...other }) => {
  const classes = useStyles();

  const [phone, setPhone] = useState(other.phone);

  const [{ loading: sLoading }, sendCode] = useAxios({ url: urlSendCode, method: 'post' }, { manual: true });

  const handleChangePhone = (value, isValid) => {
    setPhone({ ...phone, ...{ value, isValid, message: '' } });
  };

  const handleBlurPhone = () => {
    setPhone({
      value: phone.value,
      isValid: phone.isValid,
      message: phone.isValid ? '' : 'Некорректный номер телефона',
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = useCallback(() => {
    if (phone.isValid) {
      const requestData = {
        phone: phone.value,
      };

      sendCode({ data: requestData })
        .then(({ data }) => {
          onGoTo({
            step: 'checkCode',
            newRequestData: requestData,
            phone,
            serverTime: data.data?.confirm?.next_send_time,
          });
        })
        .catch((e) => {
          if (e) {
            if (e.code === 'validation_failed') {
              const serverErrors = get(e, 'fields.phone', []);
              if (serverErrors.length > 0) {
                setPhone({ value: phone.value, isValid: false, message: serverErrors[0] });
              }
            } else if (e.code === 'user_not_found') {
              setPhone({ value: phone.value, isValid: false, message: 'Пользователь не найден' });
            } else if (e.code === 'code_has_already_been_sent') {
              onGoTo({
                step: 'checkCode',
                newRequestData: requestData,
                phone,
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
      if (phone.value === '') {
        setPhone({ ...phone, isValid: false, message: 'Поле обязательно для заполнения' });
      } else {
        toast.error('Ошибка восстановления пароля. Попробуйте заполнить поле заново');
      }
    }
  }, [phone.value]);

  return (
    <Grid container spacing={5}>
      {restorePlace === 'auth' && (
        <Grid item xs={12}>
          <Typography className={classes.title}>Восстановить пароль</Typography>
        </Grid>
      )}
      {/* TODO: вешаем onBlur на контейнер, а желательно внутри PhoneInput*/}
      <Grid item xs={12} onBlur={handleBlurPhone}>
        <PhoneInput
          onKeyDown={handleKeyDown}
          value={phone.value}
          onChange={handleChangePhone}
          error={!phone.isValid}
          helperText={phone.message}
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
                Вспомнил пароль? <Link href="/auth">Войти</Link>
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StartApplicantRestore;
