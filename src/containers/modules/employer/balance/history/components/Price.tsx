import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

import { greenMain, orangeMain, pinkMain } from 'styles/colorPalette';
import { MadFormatter } from 'utils/formatters';

const useStyles = makeStyles<any>((theme) => ({
  ok: {
    color: greenMain,
    fontSize: theme.typography.pxToRem(12),
    whiteSpace: 'nowrap',
  },
  progress: {
    color: '#FFCD1B',
    fontSize: theme.typography.pxToRem(12),
    whiteSpace: 'nowrap',
  },
  return: {
    color: orangeMain,
    fontSize: theme.typography.pxToRem(12),
    whiteSpace: 'nowrap',
  },
  error: {
    color: pinkMain,
    fontSize: theme.typography.pxToRem(12),
    whiteSpace: 'nowrap',
  },
}));

const Price = ({ number, status = null, type }) => {
  const classes = useStyles();

  if (type === 'deposit') {
    if (!status) {
      return <Typography className={classes.error}>+{MadFormatter.toCurrency(number, '₽')}</Typography>;
    }
    if (status === 'success') {
      return <Typography className={classes.ok}>+{MadFormatter.toCurrency(number, '₽')}</Typography>;
    }
    if (status === 'processing') {
      return (
        <Typography className={classes.progress}>+{MadFormatter.toCurrency(number, '₽')} ожидание оплаты</Typography>
      );
    }
    if (status === 'failed') {
      return <Typography className={classes.error}>+{MadFormatter.toCurrency(number, '₽')} ошибка</Typography>;
    }
  }

  if (type === 'refund') {
    if (!status) {
      return <Typography className={classes.error}>{MadFormatter.toCurrency(number, '₽')}</Typography>;
    }
    if (status === 'success') {
      return (
        <Typography className={classes.return}>
          {MadFormatter.toCurrency(number, '₽')} возврат денежных средств
        </Typography>
      );
    }
    if (status === 'processing') {
      return (
        <Typography className={classes.progress}>
          {MadFormatter.toCurrency(number, '₽')} ожидает возврата денежных средств
        </Typography>
      );
    }
    if (status === 'failed') {
      return (
        <Typography className={classes.error}>
          {MadFormatter.toCurrency(number, '₽')} ошибка возврата денежных средств
        </Typography>
      );
    }
  }

  if (type === 'purchase') {
    if (!status) {
      return <Typography className={classes.error}>-{MadFormatter.toCurrency(number, '₽')}</Typography>;
    }
    if (status === 'success') {
      return <Typography className={classes.error}>-{MadFormatter.toCurrency(number, '₽')}</Typography>;
    }
    if (status === 'processing') {
      return (
        <Typography className={classes.progress}>
          -{MadFormatter.toCurrency(number, '₽')} ожидание списания денежных средств
        </Typography>
      );
    }
    if (status === 'failed') {
      return (
        <Typography className={classes.error}>
          -{MadFormatter.toCurrency(number, '₽')} ошибка списания денежных средств
        </Typography>
      );
    }
  }

  return <Typography className={classes.error}>{MadFormatter.toCurrency(number, '₽')}</Typography>;
};

export default Price;
