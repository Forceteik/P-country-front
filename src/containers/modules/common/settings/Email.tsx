import { useState, useRef } from 'react';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import get from 'lodash.get';

import { Grid, Typography, useMediaQuery } from '@mui/material';

import TextField, { PasswordTextField } from 'components/TextField';
import { SecondaryButton } from 'components/Button';
import { useSession } from 'context/UserContext';
import { parseFormErrors } from 'utils/common';
import { Rules } from 'utils/validators';
import CheckCodeStep from 'containers/auth/common/CheckCodeStep';

const Email = () => {
  const { currentUser, refetch } = useSession();
  const [step, setStep] = useState('startProcess');
  const [email, setEmail] = useState({ value: currentUser.email || '', isValid: true, message: '' });
  const [currentPass, setCurrentPass] = useState({ value: '', isValid: false, message: '' });

  const [serverTime, setServerTime] = useState(100);

  const toastId = useRef(null);

  const handleGoTo = ({ step, serverTime }) => {
    if (serverTime) {
      setServerTime(serverTime);
    }
    if (step === 'finishProcess') {
      setCurrentPass({ value: '', isValid: false, message: '' });
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.info('Данные успешно сохранены', {
          autoClose: 3000,
          closeOnClick: true,
        });
      }
      refetch();
    }
    setStep(step);
  };

  const [{ loading }, sendCode] = useAxios({ url: 'auth/change-email/send-code', method: 'put' }, { manual: true });

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

  const handleSendCode = () => {
    if (email.isValid && currentPass.isValid) {
      sendCode({
        data: {
          new_email: email.value,
          password: currentPass.value,
        },
      })
        .then(() => {
          setStep('checkCode');
        })
        .catch((e) => {
          if (e.code === 'validation_failed') {
            const formErrors = parseFormErrors(e.fields);
            formErrors.forEach((item) => {
              if (item.attr === 'new_email') {
                setEmail({ ...email, ...{ isValid: false, message: item.message } });
              }
              if (item.attr === 'password') {
                setCurrentPass({ ...currentPass, ...{ isValid: false, message: item.message } });
              }
            });
          }
          if (e.code === 'invalid_password') {
            setCurrentPass({ ...currentPass, ...{ isValid: false, message: 'Неверный текущий пароль' } });
          }
          if (e.code === 'code_has_already_been_sent') {
            setServerTime(get(e, 'data.lifetime', 100));
            setStep('checkCode');
          }
          if (e.code === 'email_matches_current_one') {
            setEmail({ ...email, ...{ isValid: false, message: 'Данный email уже зарегистрирован на вас' } });
          }
        });
    } else {
      if (email.value === '') {
        setEmail({ ...email, isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (currentPass.value === '') {
        setCurrentPass({ ...currentPass, isValid: false, message: 'Поле обязательно для заполнения' });
      }
    }
  };

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container spacing={isMobile ? 3 : 4}>
        <Grid item xs={12}>
          <Typography fontFamily={'inter-med'}>Почта</Typography>
        </Grid>
        {(step === 'startProcess' || step === 'finishProcess') && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Почта"
                fullWidth
                value={email.value}
                onChange={handleChange(setEmail)}
                onBlur={handleBlur(setEmail)}
                error={!email.isValid}
                helperText={email.message}
                rules={[Rules.REQUIRED, Rules.IS_VALID_EMAIL]}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordTextField
                label="Текущий пароль"
                fullWidth
                value={currentPass.value}
                onChange={handleChange(setCurrentPass)}
                onBlur={handleBlur(setCurrentPass)}
                autoComplete="new-password"
                error={!currentPass.isValid}
                helperText={currentPass.message}
                rules={[Rules.REQUIRED]}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SecondaryButton fullWidth onClick={handleSendCode} loading={loading}>
                Подтвердить
              </SecondaryButton>
            </Grid>
          </>
        )}
        {step === 'checkCode' && (
          <Grid item xs={12}>
            {/*@ts-ignore*/}
            <CheckCodeStep
              operationType="restore"
              role="employer"
              request={{ new_email: email.value, password: currentPass.value }}
              onGoTo={handleGoTo}
              urlSendCode="auth/change-email/send-code"
              urlSendCodeMethod="put"
              urlCheckCode="auth/change-email/check-code"
              urlCheckCodeMethod="put"
              restorePlace="profile"
              serverTime={serverTime}
              prevStep="startProcess"
              nextStep="finishProcess"
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Email;
