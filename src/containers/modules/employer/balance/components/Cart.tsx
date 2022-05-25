import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueLight, darkGray } from 'styles/colorPalette';
import Button from 'components/Button';
import PriceCheckInvert from 'components/icons/PriceCheckInvert';
import { MadFormatter } from 'utils/formatters';
import PurchaseModal from 'containers/modules/common/modals/budget/PurchaseModal';

const useStyles = makeStyles(() => ({
  cart: {
    border: '1px solid #E1E3E8',
    borderRadius: 20,
    backgroundColor: blueLight,
  },
  cartItemTop: {
    padding: '30px 32px 24px 32px',
    borderBottom: '1px solid #E1E3E8',
  },
  cartItemBottom: {
    padding: '24px 32px 32px 32px',
  },
}));

const Cart = ({ handleOpenModal, setModalPay, selectedTariff, currentBalance }) => {
  const classes = useStyles();
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const handlePayButtonClick = () => {
    if (currentBalance < selectedTariff.price) {
      handleOpenModal(setModalPay);
    } else {
      setPurchaseModalOpen(true);
    }
  };

  const handlePurchaseModalOpen = () => {
    setPurchaseModalOpen(false);
  };

  return (
    <>
      <Box className={classes.cart}>
        <Box className={classes.cartItemTop}>
          <Typography fontSize={22} fontFamily="inter-bold" mb={2.5}>
            Выбранные услуги
          </Typography>
          <Grid container columnSpacing={1}>
            <Grid item flexGrow={0}>
              <PriceCheckInvert />
            </Grid>
            <Grid item xs>
              <Typography fontFamily={'inter-med'} mb={0.4}>
                {selectedTariff.name}
              </Typography>
              <Typography fontSize={14}>
                <Typography component={'span'} color={darkGray} fontSize={14}>
                  Срок размещения -{' '}
                </Typography>
                30 календарных дней
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.cartItemBottom}>
          <Grid container rowSpacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography fontSize={18}>
                <Typography component={'span'} color={darkGray} fontSize={18}>
                  Итого:{' '}
                </Typography>
                {MadFormatter.toCurrency(selectedTariff.price, '₽')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <Button fullWidth small onClick={handlePayButtonClick}>
                Оплатить
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <PurchaseModal open={purchaseModalOpen} handleClose={handlePurchaseModalOpen} tariff={selectedTariff} />
    </>
  );
};

export default Cart;
