import Link from 'next/link';

import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueLight, blueMain } from 'styles/colorPalette';
import { TetriatyButton } from 'components/Button';
import { MadFormatter } from 'utils/formatters';

const useStyles = makeStyles<any>((theme) => ({
  balance: {
    border: '1px solid #E1E3E8',
    borderRadius: 20,
    padding: '18px 32px 30px 32px',
    [theme.breakpoints.down('lg')]: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 16px',
    },
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(22),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  balanceNum: {
    'marginLeft': theme.spacing(2),
    'backgroundColor': blueLight,
    'flexGrow': 1,
    'textAlign': 'center',
    'borderRadius': 8,
    'padding': '12px',
    '& p': {
      color: blueMain,
      fontFamily: 'inter-bold',
      lineHeight: '150%',
    },
  },
  showHistory: {
    color: blueMain,
    fontSize: theme.typography.pxToRem(12),
    fontFamily: 'inter-med',
    textAlign: 'center',
  },
  btn: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1.5),
    },
  },
}));

const BalanceBlock = ({ currentBalance, handleOpenModal, setModalAddMoney }) => {
  const classes = useStyles();
  return (
    <Box className={classes.balance}>
      <Grid container justifyContent={'center'}>
        <Grid item xs={12}>
          <Box display={'flex'} alignItems="center">
            <Typography className={classes.title}>Баланс счета:</Typography>
            <Box className={classes.balanceNum}>
              <Typography>
                {`${MadFormatter.toCurrency(currentBalance, '')} `}
                <Typography component={'span'} fontSize={12}>
                  ₽
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.btn}>
          <TetriatyButton fullWidth small onClick={() => handleOpenModal(setModalAddMoney)}>
            Пополнить
          </TetriatyButton>
        </Grid>
        <Grid item xs={12}>
          <Link href={'/employer/balance/history'}>
            <a>
              <Typography className={classes.showHistory}>Смотреть историю пополнений и списаний</Typography>
            </a>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BalanceBlock;
