import { useCallback, useState } from 'react';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';

import { Grid, Typography, Box } from '@mui/material';

import useSettingsStyle from 'containers/modules/common/settings/style';
import { PasswordTextField } from 'components/TextField';
import { SecondaryButton } from 'components/Button';
import ApplicantRestore from 'containers/auth/restore/ApplicantRestore';
import EmployerRestore from 'containers/auth/restore/EmployerRestore';
import { Rules } from 'utils/validators';

const PassRestore = ({ type = 'applicant' }) => {
  const classes = useSettingsStyle();
  const [currentPass, setCurrentPass] = useState({ value: '', isValid: false, message: '' });
  const [password, setPassword] = useState({ value: '', isValid: false, message: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', isValid: false, message: '' });

  const [step, setStep] = useState('edit');

  const [{ loading }, changePassword] = useAxios({ url: 'auth/change-password', method: 'put' }, { manual: true });

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
    if (currentPass.isValid && password.isValid && confirmPassword.isValid) {
      changePassword({
        data: {
          current_password: currentPass.value,
          new_password: password.value,
          new_password_confirmation: confirmPassword.value,
        },
      })
        .then(() => {
          toast.info('Пароль успешно изменен');
          setCurrentPass({ value: '', isValid: false, message: '' });
          setPassword({ value: '', isValid: false, message: '' });
          setConfirmPassword({ value: '', isValid: false, message: '' });
        })
        .catch((e) => {
          if (e.code === 'invalid_password') {
            setCurrentPass({ ...currentPass, isValid: false, message: 'Неверный текущий пароль' });
          } else if (e.code === 'validation_failed') {
            setCurrentPass({ ...currentPass, isValid: false, message: 'Неверный текущий пароль' });
          }
        });
    } else {
      if (currentPass.value === '') {
        setCurrentPass({ ...currentPass, isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (password.value === '') {
        setPassword({ ...password, isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (confirmPassword.value === '') {
        setConfirmPassword({ ...confirmPassword, isValid: false, message: 'Поле обязательно для заполнения' });
      }
    }
  }, [currentPass.value, password.value, confirmPassword.value]);

  const handleRestored = () => {
    setStep('edit');
    toast.info('Пароль успешно изменен');
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography className={classes.sectionTitle} component="h2">
          Безопасность
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography fontFamily={'inter-med'}>Пароль</Typography>
      </Grid>
      {step === 'edit' && (
        <Grid item xs={12}>
          <Box onKeyDown={handleKeyDown}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PasswordTextField
                  label="Текущий пароль"
                  fullWidth
                  value={currentPass.value}
                  error={!currentPass.isValid}
                  helperText={currentPass.message}
                  onChange={handleChange(setCurrentPass)}
                  onBlur={handleBlur(setCurrentPass)}
                  onKeyDown={handleKeyDown}
                  rules={[Rules.REQUIRED]}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordTextField
                  label="Новый пароль"
                  fullWidth
                  value={password.value}
                  error={!password.isValid}
                  helperText={password.message}
                  onChange={handleChange(setPassword)}
                  onBlur={handleBlur(setPassword)}
                  onKeyDown={handleKeyDown}
                  rules={[Rules.REQUIRED, Rules.IS_STRONG_PASSWORD]}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordTextField
                  label="Повторите пароль"
                  fullWidth
                  onKeyDown={handleKeyDown}
                  value={confirmPassword.value}
                  onChange={handleChange(setConfirmPassword)}
                  onBlur={handleBlur(setConfirmPassword)}
                  rules={[Rules.REQUIRED, [Rules.COMPARE_PASS, password.value]]}
                  error={!confirmPassword.isValid}
                  helperText={confirmPassword.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <SecondaryButton fullWidth onClick={handleSubmit} loading={loading}>
                      Сохранить
                    </SecondaryButton>
                  </Grid>
                  <Grid item>
                    <Typography component="p">
                      Забыли пароль?{' '}
                      <Typography component="span" className={classes.textBtnBlue} onClick={() => setStep('restore')}>
                        Восстановить
                      </Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      )}

      {step === 'restore' && type === 'applicant' && (
        <Grid item xs={12}>
          <ApplicantRestore onRestored={handleRestored} restorePlace={'profile'} />
        </Grid>
      )}

      {step === 'restore' && type === 'employer' && (
        <Grid item xs={12}>
          <EmployerRestore onRestored={handleRestored} restorePlace={'profile'} />
        </Grid>
      )}
    </Grid>
  );
};

export default PassRestore;
