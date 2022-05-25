import { useState } from 'react';

import { Grid } from '@mui/material';

import TextField from 'components/TextField';
import { SecondaryButton } from 'components/Button';

const UrRequisites = () => {
  const [inn, setInn] = useState('');
  const [kpp, setKpp] = useState('');
  const [rs, setRs] = useState('');
  const [ks, setKs] = useState('');
  const [bank, setBank] = useState('');
  const [bik, setBik] = useState('');
  const [adress, setAdress] = useState('');

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Grid item xs={12}>
        <TextField
          label="ИНН"
          fullWidth
          value={inn}
          // error={!!errorText}
          // helperText={errorText}
          onChange={(e) => handleChange(e, setInn)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="КПП"
          fullWidth
          value={kpp}
          // error={!!errorText}
          // helperText={errorText}
          onChange={(e) => handleChange(e, setKpp)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Р/С"
          fullWidth
          value={rs}
          // error={!!errorText}
          // helperText={errorText}
          onChange={(e) => handleChange(e, setRs)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="К/С"
          fullWidth
          value={ks}
          // error={!!errorText}
          // helperText={errorText}
          onChange={(e) => handleChange(e, setKs)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Банк"
          fullWidth
          value={bank}
          // error={!!errorText}
          // helperText={errorText}
          onChange={(e) => handleChange(e, setBank)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="БИК"
          fullWidth
          value={bik}
          // error={!!errorText}
          // helperText={errorText}
          onChange={(e) => handleChange(e, setBik)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Юр адрес"
          fullWidth
          value={adress}
          // error={!!errorText}
          // helperText={errorText}
          onChange={(e) => handleChange(e, setAdress)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SecondaryButton fullWidth>Сохранить</SecondaryButton>
      </Grid>
    </>
  );
};

export default UrRequisites;
