import { Typography, Grid } from '@mui/material';

import Button from 'components/Button';
import { black, darkGray } from 'styles/colorPalette';

import { useItemStyles } from '../../styles';

const CheckSuccessStep = ({ userEmail, onModalClose }) => {
  const classes = useItemStyles();
  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.smallTitle}>Счет создан и отправлен вам на почту</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color={darkGray} fontSize={18} textAlign="center">
          Проверьте вашу почту{' '}
          <Typography component={'span'} fontSize={18} color={black}>
            {userEmail}
          </Typography>{' '}
          и оплатите счет
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth small onClick={onModalClose}>
          Понятно
        </Button>
      </Grid>
    </Grid>
  );
};

export default CheckSuccessStep;
