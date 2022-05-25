import { useState, useRef } from 'react';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';

import { Box, Grid } from '@mui/material';

import TextField from 'components/TextField';
import Button, { SecondaryButton } from 'components/Button';
import { Rules } from 'utils/validators';
import { useProfile } from 'context/ProfileContext';

const AboutForm = ({ handleCancel, label = 'Расскажите о себе' }) => {
  const { currentUser, refetch } = useProfile();
  const isEmployee = currentUser.type === 'employee';

  const toastId = useRef(null);

  const [about, setAbout] = useState({
    value: isEmployee ? currentUser.employee.about_me : currentUser.employer.about_company,
    isValid: true,
    message: '',
  });
  const [employeeQuestionLeader, setEmployeeQuestionLeader] = useState({
    value: isEmployee ? currentUser.employee?.question_leader : '',
    isValid: true,
    message: '',
  });
  const [employeeQuestionSuccess, setEmployeeQuestionSuccess] = useState({
    value: isEmployee ? currentUser.employee?.question_success : '',
    isValid: true,
    message: '',
  });
  const [employeeQuestionWork, setEmployeeQuestionWork] = useState({
    value: isEmployee ? currentUser.employee?.question_work : '',
    isValid: true,
    message: '',
  });

  const [{ loading }, editAbout] = useAxios(
    {
      method: 'put',
      url: isEmployee ? 'employee/profile/about' : 'employer/profile/about',
    },
    { manual: true },
  );

  const handleSubmit = () => {
    let data;
    if (isEmployee) {
      data = {
        about_me: about.value,
        question_leader: employeeQuestionLeader.value,
        question_success: employeeQuestionSuccess.value,
        question_work: employeeQuestionWork.value,
      };
    } else {
      data = { about_company: about.value };
    }

    editAbout({ data })
      .then(() => {
        refetch();
        handleCancel();
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.info('Данные успешно сохранены', {
            autoClose: 3000,
            closeOnClick: true,
          });
        }
      })
      .catch(() => {
        toast.error('Что-то пошло не так, пожалуйста, попробуйте позже');
      });
  };

  const handleChange = (validatorResult, setState) => {
    setState({ ...validatorResult });
  };

  const isSubmitValid = () => {
    if (isEmployee) {
      return (
        about.isValid &&
        employeeQuestionLeader.isValid &&
        employeeQuestionWork.isValid &&
        employeeQuestionSuccess.isValid
      );
    }
    return about.isValid;
  };

  return (
    <Grid container spacing={3} justifyContent="flex-end">
      <Grid item xs={12}>
        <TextField
          value={about.value}
          onChange={(e, validatorResult) => handleChange(validatorResult, setAbout)}
          multiline
          styleMultiline
          rows={10}
          label={label}
          rules={[Rules.REQUIRED, [Rules.MAX_STRING, isEmployee ? 2000 : 1000]]}
          error={!about.isValid}
          helperText={about.message}
        />
        {isEmployee && (
          <>
            <Box marginBottom={3} marginTop={3}>
              <TextField
                value={employeeQuestionLeader.value}
                onChange={(e, validatorResult) => handleChange(validatorResult, setEmployeeQuestionLeader)}
                label="Руководитель дал вам задание, но вы его не выполнили. С чем это может быть связано?"
                rules={[Rules.REQUIRED, [Rules.MAX_STRING, 500]]}
                error={!employeeQuestionLeader.isValid}
                helperText={employeeQuestionLeader.message}
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                value={employeeQuestionSuccess.value}
                onChange={(e, validatorResult) => handleChange(validatorResult, setEmployeeQuestionSuccess)}
                label="Как вы поймёте, что добились успеха?"
                rules={[Rules.REQUIRED, [Rules.MAX_STRING, 500]]}
                error={!employeeQuestionSuccess.isValid}
                helperText={employeeQuestionSuccess.message}
              />
            </Box>
            <TextField
              value={employeeQuestionWork.value}
              onChange={(e, validatorResult) => handleChange(validatorResult, setEmployeeQuestionWork)}
              label="Что для вас главное в работе?"
              rules={[Rules.REQUIRED, [Rules.MAX_STRING, 500]]}
              error={!employeeQuestionWork.isValid}
              helperText={employeeQuestionWork.message}
            />
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={5} md={isEmployee ? 5 : 4} lg={isEmployee ? 5 : 3}>
        <SecondaryButton onClick={handleCancel} fullWidth small>
          Закрыть без сохранения
        </SecondaryButton>
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <Button onClick={handleSubmit} disabled={!isSubmitValid()} fullWidth small loading={loading}>
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

export default AboutForm;
