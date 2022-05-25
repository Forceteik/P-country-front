import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useAxios from 'axios-hooks';

import { Grid, Typography } from '@mui/material';

import { DangerButton } from 'components/Button';
import CodeInput from 'components/CodeInput';
import { blueMain } from 'styles/colorPalette';
import SmsTimer from 'components/SmsTimer';
import authStyles from 'containers/auth/styles';
import useSettingsStyle from 'containers/modules/common/settings/style';
import { useSession } from 'context/UserContext';

const DangerZone = () => {
  const { currentUser, refetch } = useSession();
  const classes = useSettingsStyle();
  const authClasses = authStyles();

  const [step, setStep] = useState(1);

  const [sendCodeState, sendCode] = useAxios('/user/remove/send-code', { manual: true });
  const [checkCodeState, checkCode] = useAxios({ url: 'user/remove/check', method: 'post' }, { manual: true });

  //step 2
  const [code, setCode] = useState({ value: '', isValid: true, message: '' });
  const [timer, setTimer] = useState(100);
  const [enableResend, setEnableResend] = useState(false);

  const handleSendCode = () => {
    sendCode()
      .then(() => {
        setStep(2);
      })
      .catch((e) => {
        if (e.code === 'code_has_already_been_sent') {
          setCode({
            ...code,
            ...{ isValid: false, message: 'Код подверждения уже отправлен. Пожалуйста, попробуйте позже' },
          });
        }
      });
  };

  const handleCode = (value) => {
    setCode({ value, isValid: true, message: '' });
  };

  const handleResend = () => {
    setCode({ ...code, ...{ isValid: true } });
    sendCode()
      .then(() => {
        setTimer(100);
        setEnableResend(false);
        toast.info('Код подверждения успешно отправлен');
      })
      .catch((e) => {
        if (e.code === 'code_has_already_been_sent') {
          setCode({
            ...code,
            ...{ isValid: false, message: 'Код подверждения уже отправлен. Пожалуйста, попробуйте позже' },
          });
        }
      });
  };

  const handleCheckCode = () => {
    setCode({ ...code, ...{ isValid: true } });
    checkCode({ data: { code: code.value } })
      .then(() => {
        localStorage.removeItem('talantyLoginToken');
        refetch();
      })
      .catch(() => {
        setCode({ ...code, ...{ isValid: false, message: 'Неверный код подверждения' } });
      });
  };

  const handleTimerComplete = useCallback(() => {
    setEnableResend(true);
    setTimer(0);
  }, [enableResend]);

  return (
    <Grid container spacing={3}>
      {step === 1 && (
        <>
          <Grid item xs={12}>
            <Typography fontFamily={'inter-med'}>Удаление аккаунта</Typography>
          </Grid>
          {!code.isValid && (
            <Grid item xs={12}>
              <Typography className={classes.errorMessage}>{code.message}</Typography>
            </Grid>
          )}
          <Grid item xs={12} sm={6} md={4}>
            <DangerButton fullWidth onClick={handleSendCode} loading={sendCodeState.loading}>
              Удалить аккаунт
            </DangerButton>
          </Grid>
        </>
      )}
      {step === 2 && (
        <>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography fontFamily={'inter-med'}>Логин</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.stepTwoHelperInfo}>
                  Код подтверждения отправлен на указанный вами номер
                  <Typography component="span" className={classes.stepTwoPhone}>
                    {' '}
                    {currentUser.phone}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CodeInput value={code.value} onChange={handleCode} error={!code.isValid} helperText={code.message} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <DangerButton fullWidth onClick={handleCheckCode} loading={checkCodeState.loading}>
                  Удалить аккаунт
                </DangerButton>
              </Grid>
            </Grid>

            <Typography className={authClasses.helperInfo} textAlign={'left'} mt={2}>
              Не пришел код?{' '}
              <Typography
                component="span"
                onClick={enableResend ? handleResend : null}
                color={enableResend ? blueMain : '#b3b3b3'}
                className={enableResend ? authClasses.pointer : authClasses.notAllowed}
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
        </>
      )}
    </Grid>
  );
};

export default DangerZone;
