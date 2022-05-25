import { useEffect, useState, useRef } from 'react';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';

import { Grid } from '@mui/material';

import TextField, { NumberFormatUniversal } from 'components/TextField';
import { SecondaryButton } from 'components/Button';
import { Rules } from 'utils/validators';
import { useProfile } from 'context/ProfileContext';

// address: "AST"
// bank: "Jusan4ik"
// bic: "123123123"
// correspondent_account: "12312312312312313123"
// current_account: "12312312312312312312"
const IndividualRequisites = () => {
  const employer = useProfile().currentUser.employer;
  const requisites = useProfile().currentUser.requisites;
  const [inn] = useState({ value: employer.registration_number, isValid: true, message: '' });
  const [kpp] = useState({ value: employer.additional_registration_number, isValid: true, message: '' });
  const [currentAccount, setCurrentAccount] = useState({ value: '', isValid: false, message: '' });
  const [correspondentAccount, setCorrespondentAccount] = useState({ value: '', isValid: false, message: '' });
  const [bank, setBank] = useState({ value: '', isValid: false, message: '' });
  const [bic, setBic] = useState({ value: '', isValid: false, message: '' });
  const [address, setAddress] = useState({ value: '', isValid: false, message: '' });

  const [requestState, updateBankDetails] = useAxios({ url: '/employer/requisites', method: 'put' }, { manual: true });

  const toastId = useRef(null);

  useEffect(() => {
    if (requisites) {
      setAddress({ value: requisites.address, isValid: true, message: '' });
      setBank({ value: requisites.bank, isValid: true, message: '' });
      setBic({ value: requisites.bic, isValid: true, message: '' });
      setCorrespondentAccount({ value: requisites.correspondent_account, isValid: true, message: '' });
      setCurrentAccount({ value: requisites.current_account, isValid: true, message: '' });
    }
  }, []);

  const handleChange = (e, setState, isValid) => {
    setState({ value: e.target.value, isValid });
  };

  const handleSubmit = () => {
    updateBankDetails({
      data: {
        current_account: currentAccount.value,
        correspondent_account: correspondentAccount.value,
        bank: bank.value,
        bic: bic.value,
        address: address.value,
      },
    }).then(() => {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.info('Данные успешно сохранены', {
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    });
  };

  const isFormValid = () =>
    currentAccount.isValid && correspondentAccount.isValid && bank.isValid && bic.isValid && address.isValid;
  return (
    <>
      <Grid item xs={12}>
        <TextField label="ИНН" fullWidth value={inn.value} disabled />
      </Grid>
      {inn.value.length === 10 && (
        <Grid item xs={12}>
          <TextField label="КПП" fullWidth value={kpp.value} disabled />
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          label="Р/С"
          fullWidth
          value={currentAccount.value}
          error={!currentAccount.isValid}
          helperText={currentAccount.message}
          rules={[Rules.REQUIRED, [Rules.EQUAL_STRING, 20]]}
          InputProps={{ inputComponent: NumberFormatUniversal }}
          inputProps={{ format: '####################' }}
          onChange={(e, { isValid }) => handleChange(e, setCurrentAccount, isValid)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="К/С"
          fullWidth
          value={correspondentAccount.value}
          error={!correspondentAccount.isValid}
          helperText={correspondentAccount.message}
          rules={[Rules.REQUIRED, [Rules.EQUAL_STRING, 20]]}
          InputProps={{ inputComponent: NumberFormatUniversal }}
          inputProps={{ format: '####################' }}
          onChange={(e, { isValid }) => handleChange(e, setCorrespondentAccount, isValid)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Банк"
          fullWidth
          value={bank.value}
          error={!bank.isValid}
          helperText={bank.message}
          rules={[Rules.REQUIRED]}
          onChange={(e, { isValid }) => handleChange(e, setBank, isValid)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="БИК"
          fullWidth
          value={bic.value}
          error={!bic.isValid}
          helperText={bic.message}
          rules={[Rules.REQUIRED, [Rules.EQUAL_STRING, 9]]}
          InputProps={{ inputComponent: NumberFormatUniversal }}
          inputProps={{ format: '#########' }}
          // helperText={errorText}
          onChange={(e, { isValid }) => handleChange(e, setBic, isValid)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Юр адрес"
          fullWidth
          value={address.value}
          error={!address.isValid}
          helperText={address.message}
          rules={[Rules.REQUIRED]}
          onChange={(e, { isValid }) => handleChange(e, setAddress, isValid)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SecondaryButton fullWidth loading={requestState.loading} disabled={!isFormValid()} onClick={handleSubmit}>
          Сохранить
        </SecondaryButton>
      </Grid>
    </>
  );
};

export default IndividualRequisites;
