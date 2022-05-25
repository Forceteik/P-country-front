import { useState } from 'react';

import { Grid, Typography, InputAdornment, IconButton } from '@mui/material';

import useSettingsStyle from 'containers/modules/common/settings/style';
import { PhoneInput } from 'components/TextField';
import { SecondaryButton } from 'components/Button';
import CodeInput from 'components/CodeInput';
import Edit from 'components/icons/Edit';
import { midDarkGray } from 'styles/colorPalette';

const PhoneRestore = ({ phone, setPhone }) => {
  const classes = useSettingsStyle();
  const [step, setStep] = useState(0);
  const [сode, setCode] = useState('');

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleCheckCode();
    }
  };

  const handleCheckCode = () => {
    if (сode.length === 4) {
      setStep(0);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography className={classes.subTitle} component="h3">
          Контактный номер владельца аккаунта
        </Typography>
      </Grid>
      {step === 0 && (
        <Grid item xs={12} className={classes.phone}>
          <PhoneInput
            disabled
            value={phone}
            onChange={(e) => handleChange(e, setPhone)}
            end={
              <InputAdornment position="end">
                <IconButton
                  tabIndex={-1}
                  aria-label="изменить телефон"
                  // onMouseDown={handleMouseDownPassword}
                  onClick={() => setStep(1)}
                  size="large"
                >
                  <Edit color={midDarkGray} />
                </IconButton>
              </InputAdornment>
            }
            // error={!!errorText}
            // helperText={errorText}
          />
        </Grid>
      )}
      {step === 1 && (
        <>
          <Grid item xs={12}>
            <Typography component="p">
              Код подтверждения отправлен на указанный вами номер{' '}
              <Typography component="span" className={classes.textInfo}>
                {phone}
              </Typography>
              <Typography component="span" className={classes.textBtnBlue}>
                {' '}
                Изменить номер
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CodeInput
              value={сode}
              onChange={(e) => handleChange(e, setCode)}
              onKeyDown={handleKeyDown}
              // error={!!errorText}
              // helperText={errorText}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SecondaryButton fullWidth onClick={() => setStep(0)}>
              Подтвердить
            </SecondaryButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PhoneRestore;
