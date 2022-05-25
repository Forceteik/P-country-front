import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useAxios from 'axios-hooks';
import get from 'lodash.get';

import { Checkbox, Grid, Typography } from '@mui/material';

import { PasswordTextField } from 'components/TextField';
import Button from 'components/Button';
import useStyles from 'containers/auth/styles';
import { Rules } from 'utils/validators';
import CheckBoxIcon from 'components/icons/CheckBoxIcon';
import CheckBoxIconCheck from 'components/icons/CheckBoxIconCheck';

const ConfirmPassStep = ({
  operationType,
  token = null,
  withHeader = false,
  onSubmit,
  submitBtnText = 'Продолжить',
  confirmUrl,
  restorePlace = 'auth',
}) => {
  const classes = useStyles();
  const [password, setPassword] = useState({ value: '', isValid: false, message: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', isValid: false, message: '' });
  const [agreement, setAgreement] = useState(false);

  const [{ loading }, reset] = useAxios(
    { url: confirmUrl, method: 'post', headers: { Authorization: `${token?.token_type} ${token?.token}` } },
    { manual: true },
  );

  const isRegisterOperation = operationType === 'register';

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

  const handleClickSubmit = useCallback(() => {
    if (password.isValid && confirmPassword.isValid && password.value === confirmPassword.value) {
      reset({
        data: {
          password: password.value,
          password_confirmation: confirmPassword.value,
        },
      })
        .then(({ data }) => {
          onSubmit();
          //https://www.notion.so/preontech/e00ff3a9f91c40f89d16b88caaac130d
          if (process.env.NEXT_PUBLIC_BUILD_MODE === 'prod') {
            //@ts-ignore
            window.fbq('track', 'CompleteRegistration');
            //@ts-ignore
            window.ym(80438017, 'reachGoal', `reg_${data.data.type}`);
          }

          // удаляем utm метку регистрации
          localStorage.removeItem('talantyRegistrationUtm');
        })
        .catch((e) => {
          if (e.code === 'validation_failed') {
            const serverErrors = get(e, 'fields.password', []);
            if (serverErrors.length > 0) {
              setPassword({ value: password.value, isValid: false, message: serverErrors[0] });
            }
          } else {
            toast.error(`Ошибка ${operationType === 'register' ? 'регистрации' : 'восстановления'}`);
          }
        });
    } else {
      if (password.value === '') {
        setPassword({ ...password, isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (confirmPassword.value === '') {
        setConfirmPassword({ ...confirmPassword, isValid: false, message: 'Поле обязательно для заполнения' });
      }
    }
  }, [confirmUrl, password.value, confirmPassword.value]);

  return (
    <Grid container spacing={5}>
      {withHeader && (
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className={classes.title}>Введите пароль</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.subTitle}>
                Пароль должен состоять из шести или более букв латинского алфавита (A-z), содержать заглавные и строчные
                буквы, цифры
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PasswordTextField
              label="Новый пароль"
              fullWidth
              value={password.value}
              error={!password.isValid}
              helperText={password.message}
              onChange={handleChange(setPassword)}
              onBlur={handleBlur(setPassword)}
              rules={[Rules.REQUIRED, Rules.IS_STRONG_PASSWORD]}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordTextField
              label="Повторите пароль"
              fullWidth
              value={confirmPassword.value}
              onChange={handleChange(setConfirmPassword)}
              onBlur={handleBlur(setConfirmPassword)}
              rules={[Rules.REQUIRED, [Rules.COMPARE_PASS, password.value]]}
              error={!confirmPassword.isValid}
              helperText={confirmPassword.message}
            />
          </Grid>
          {isRegisterOperation && (
            <Grid item xs={12}>
              <Grid container columnSpacing={0.5}>
                <Grid item>
                  <Checkbox
                    disableRipple
                    icon={<CheckBoxIcon size={24} />}
                    checkedIcon={<CheckBoxIconCheck size={24} />}
                    checked={agreement}
                    onChange={() => setAgreement(!agreement)}
                    name="agreement"
                  />
                </Grid>
                <Grid item xs>
                  <Typography className={classes.argeementText} component="div">
                    Я даю согласие на обработку персональных данных, а также принимаю условия{' '}
                    <a href={'/oferta'} target="_blank" rel="noreferrer">
                      публичной оферты
                    </a>
                    ,{' '}
                    <a href={'/agreement'} target="_blank" rel="noreferrer">
                      пользовательского соглашения
                    </a>{' '}
                    и{' '}
                    <a href={'/privacy'} target="_blank" rel="noreferrer">
                      политики в области обработки персональных данных
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={restorePlace === 'profile' ? 6 : 12}>
            <Button
              fullWidth
              onClick={handleClickSubmit}
              loading={loading}
              disabled={isRegisterOperation ? !agreement : false}
            >
              {submitBtnText}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ConfirmPassStep;
