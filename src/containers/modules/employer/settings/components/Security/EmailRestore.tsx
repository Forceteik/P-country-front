import { useState } from 'react';
import get from 'lodash.get';

import { Grid, Typography, IconButton, InputAdornment } from '@mui/material';

import TextField, { PasswordTextField, EmailInput } from 'components/TextField';
import { SecondaryButton } from 'components/Button';
import CodeInput from 'components/CodeInput';
import Edit from 'components/icons/Edit';
import { midDarkGray } from 'styles/colorPalette';
import useSettingsStyle from 'containers/modules/common/settings/style';
import { useSession } from 'context/UserContext';

const EmailRestore = () => {
  const classes = useSettingsStyle();
  const { currentUser } = useSession();

  const initialEmail = get(currentUser, 'email', '');
  const [login, setLogin] = useState(initialEmail);
  const [loginRestore, setLoginRestore] = useState('');
  const [pass, setPass] = useState('');
  const [step, setStep] = useState(0);
  const [сode, setCode] = useState('');

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e, numberOfStep) => {
    if (e.keyCode === 13) {
      setStep(numberOfStep);
    }
  };
  const handleCheckCode = () => {
    if (сode.length === 4) {
      setStep(0);
    }
  };

  const handleKeyDownCode = (e) => {
    if (e.keyCode === 13) {
      handleCheckCode();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography className={classes.subTitle} component="h3">
          Логин
        </Typography>
      </Grid>
      {step === 0 && (
        <Grid item xs={12}>
          <TextField
            disabled
            label="Логин/почта"
            fullWidth
            value={login}
            InputProps={{
              inputComponent: EmailInput,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    tabIndex={-1}
                    aria-label="изменить почту"
                    // onMouseDown={handleMouseDownPassword}
                    onClick={() => setStep(1)}
                    size="large"
                  >
                    <Edit color={midDarkGray} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // error={!!errorText}
            // helperText={errorText}
            onChange={(e) => handleChange(e, setLogin)}
          />
        </Grid>
      )}
      {step === 1 && (
        <>
          <Grid item xs={12}>
            <TextField
              label="Введите новый Логин/почту"
              fullWidth
              value={loginRestore}
              onKeyDown={(e) => handleKeyDown(e, 2)}
              InputProps={{
                inputComponent: EmailInput,
              }}
              // error={!!errorText}
              // helperText={errorText}
              onChange={(e) => handleChange(e, setLoginRestore)}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordTextField
              label="Текущий пароль"
              fullWidth
              value={pass}
              onChange={(e) => handleChange(e, setPass)}
              autoComplete="new-password"
              onKeyDown={(e) => handleKeyDown(e, 2)}
              // error={!!errorText}
              // helperText={errorText}
            />
          </Grid>
          <Grid item xs={4}>
            <SecondaryButton fullWidth onClick={() => setStep(2)}>
              Далее
            </SecondaryButton>
          </Grid>
        </>
      )}
      {step === 2 && (
        <>
          <Grid item>
            <Typography component="p">
              Код подтверждения отправлен на указанную вами почту <Typography component="span">{login}</Typography>
              <Typography component="span" className={classes.textBtnBlue}>
                {' '}
                Изменить почту
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CodeInput
              value={сode}
              onChange={(e) => handleChange(e, setCode)}
              onKeyDown={handleKeyDownCode}
              // error={!!errorText}
              // helperText={errorText}
            />
          </Grid>
          <Grid item xs={4}>
            <SecondaryButton fullWidth onClick={() => setStep(0)}>
              Подтвердить
            </SecondaryButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default EmailRestore;
