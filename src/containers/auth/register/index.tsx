import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Typography, Grid } from '@mui/material';

import Button from 'components/Button';
import useStyles from 'containers/auth/styles';
import RadioGroup from 'components/RadioGroup';
import RegisterLayout from 'containers/auth/register/RegisterLayout';

const roles = [
  {
    label: 'Я соискатель',
    value: 0,
  },
  {
    label: 'Я работодатель',
    value: 1,
  },
];

const Register = () => {
  const classes = useStyles();
  const router = useRouter();

  const [activeRole, setActiveRole] = useState(0);

  const handleSelect = (e, value) => {
    setActiveRole(parseInt(value));
  };

  const handleNext = () => {
    if (activeRole === 1) {
      router.push('employer/register');
    } else {
      router.push('applicant/register');
    }
  };

  return (
    <RegisterLayout>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className={classes.title}>Регистрация</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.subTitle}>Выберите подходящий вариант из списка ниже</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <RadioGroup
            items={roles}
            selectedValue={activeRole}
            className={classes.checkbox}
            itemClassName={classes.itemCheckbox}
            itemClassNameChecked={classes.itemCheckboxChecked}
            onChange={handleSelect}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button fullWidth onClick={handleNext}>
                Далее
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.helperInfo}>
                Уже есть аккаунт? <Link href="/auth">Войти</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </RegisterLayout>
  );
};

export default Register;
