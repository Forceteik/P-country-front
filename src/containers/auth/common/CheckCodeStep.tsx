import { useCallback, useState } from 'react';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import isEmpty from 'lodash.isempty';

import { Grid, Typography } from '@mui/material';

import Button from 'components/Button';
import CodeInput from 'components/CodeInput';
import SmsTimer from 'components/SmsTimer';
import { blueMain } from 'styles/colorPalette';
import useStyles from 'containers/auth/styles';

const CheckCode = ({
  title = '',
  onGoTo,
  request,
  token,
  setToken,
  urlSendCode,
  urlSendCodeMethod = 'POST',
  urlCheckCode,
  urlCheckCodeMethod = 'post',
  operationType = 'register',
  role = 'employer',
  restorePlace = 'auth',
  serverTime = 100,
  nextStep = 'confirmPass',
  prevStep = 'startProcess',
}) => {
  const classes = useStyles();
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(serverTime);
  const [enableResend, setEnableResend] = useState(false);
  const [errorText, setErrorText] = useState('');

  const isFormValid = code.length === 4 && !errorText;

  //@ts-ignore
  const [, sendCode] = useAxios({ url: urlSendCode, method: urlSendCodeMethod }, { manual: true });

  const config: any = { url: urlCheckCode, method: urlCheckCodeMethod };
  if (token) {
    config['headers'] = { Authorization: `${token?.token_type} ${token?.token}` };
  }
  const [, checkCode] = useAxios({ ...config }, { manual: true });

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (isFormValid) {
        handleSubmit();
      }
    }
  };

  const handleChange = (value) => {
    setErrorText('');
    setCode(value);
  };

  const handleResend = () => {
    if (!isEmpty(request)) {
      setErrorText('');
      sendCode({
        data: {
          ...request,
          registration_number: request.phone,
        },
      })
        .then(({ data }) => {
          setTimer(100);
          setEnableResend(false);
          if (!isEmpty(data.token)) {
            setToken(data.token);
          }
          toast.info('Код подтверждения успешно отправлен');
        })
        .catch((e) => {
          if (e.code === 'code_has_already_been_sent') {
            setErrorText('Код подверждения уже отправлен. Пожалуйста, попробуйте позже');
          }
        });
    }
  };

  const handleBackToStart = () => {
    onGoTo({ step: prevStep, token: null });
  };

  const handleSubmit = () => {
    if (isFormValid) {
      const requestData = {
        code,
        email: request.email,
      };

      if (operationType === 'restore') {
        if (role === 'employer') {
          requestData['email'] = request?.email || request?.new_email;
        } else {
          requestData['phone'] = request?.phone;
        }
      }

      checkCode({ data: requestData })
        .then(({ data }) => {
          onGoTo({ step: nextStep, token: data?.token || token });
        })
        .catch((e) => {
          // console.log(e);
          if (e.code === 'code_invalid') {
            setErrorText('Неверный код подтверждения');
          }
        });
    }
  };

  const handleTimerComplete = useCallback(() => {
    setEnableResend(true);
    setTimer(0);
  }, [enableResend]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {title && (
            <Grid item xs={12}>
              <Typography className={classes.title}>{title}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography className={classes.subTitle} component="p">
              {role === 'employer'
                ? 'Код подтверждения отправлен на указанную вами почту'
                : 'Код подтверждения отправлен на указанный вами телефон'}
              <Typography component="span" className={classes.phone}>
                {' '}
                {role === 'employer'
                  ? request?.email || request?.new_email
                  : `+${request?.phone || request?.new_phone}`}
              </Typography>
              <Typography component="span" className={classes.restoreLink} onClick={handleBackToStart}>
                {' '}
                {role === 'employer' ? 'Изменить почту' : 'Изменить телефон'}
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CodeInput
          value={code}
          onChange={handleChange}
          error={!!errorText}
          helperText={errorText}
          onKeyDown={handleKeyDown}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={restorePlace === 'profile' ? 6 : 12}>
            <Button fullWidth onClick={handleSubmit} disabled={!isFormValid}>
              Подвердить
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography className={restorePlace === 'profile' ? classes.helperProfileInfo : classes.helperInfo}>
              Не пришел код?{' '}
              <Typography
                component="span"
                onClick={enableResend ? handleResend : null}
                color={enableResend ? blueMain : '#b3b3b3'}
                className={enableResend ? classes.pointer : classes.notAllowed}
              >
                Отправить повторно
              </Typography>
              {timer !== 0 && (
                <SmsTimer
                  handleComplete={handleTimerComplete}
                  handleTick={({ total }) => setTimer(total / 1000)}
                  value={timer}
                />
              )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckCode;
