import { useEffect, useState } from 'react';

import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';

import Close from 'components/icons/Close';
import { useSession } from 'context/UserContext';
import { useBalance } from 'context/BalanceContext';

import { useItemStyles, usePaperStylesFlexibleWidth } from '../../styles';

import StartStep from './StartStep';
import CheckStep from './CheckStep';
import CheckSuccessStep from './CheckSuccessStep';

declare global {
  interface Window {
    cp: any; // CloudPayments
  }
}

const randomInvoice = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const addMoneyOptions = [
  { label: 'Банковской картой', link: 'cart' },
  { label: 'По счету', link: 'check' },
];

const AddMoneyModal = ({ open, handleClose }) => {
  const classes = useItemStyles();

  const [page, setPage] = useState('index'); //index - начальный экран модалки, bank - экран если пользователь выбрал вариант Банковской картой, check - если выбрал По счету, success - при успешном создании счета, bankSuccess - если успешно прошла оплата банковской картой
  const paperClasses = usePaperStylesFlexibleWidth({
    width: page === 'index' || page === 'success' || page === 'bank' ? 564 : 899,
  });

  const { refetch } = useBalance();
  const { currentUser, userId: sessionUserId } = useSession();

  const [addOptions, setAddOptions] = useState(0);
  const [addMoney, setAddMoney] = useState({ value: '', isValid: false });

  const [openAddInnBlock, setOpenAddInnBlock] = useState(false);

  const handleSwitchOption = (value, i) => {
    setAddOptions(i);
  };

  const onMoneyChange = (e, validateValue) => {
    setAddMoney({ value: validateValue.value, isValid: validateValue.isValid });
  };

  const handleNext = () => {
    if (addOptions === 0) {
      setPage('bank');
    } else {
      setPage('check');
    }
  };

  const onClickClose = () => {
    handleClose();
    setPage('index');
    setAddOptions(0);
  };

  const handleAddInn = () => {
    setOpenAddInnBlock(true);
  };

  const loadCloudPayments = () => {
    const widget = new window.cp.CloudPayments();

    const receipt = {
      Items: [
        {
          label: `Пополнение баланса на сумму ${+addMoney.value} руб.`, //наименование товара
          price: +addMoney.value, //цена
          quantity: 1.0, //количество
          amount: +addMoney.value, //сумма
          vat: 0, //ставка НДС
          method: 1, // тег-1214 признак способа расчета - признак способа расчета
          object: 10, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
          measurementUnit: 'руб', //единица измерения
        },
      ],
      email: currentUser.email, //e-mail покупателя, если нужно отправить письмо с чеком
      isBso: false, //чек является бланком строгой отчётности
      AgentSign: null, //признак агента, тег ОФД 1057
      amounts: {
        electronic: +addMoney.value, // Сумма оплаты электронными деньгами
        advancePayment: 0.0, // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
        credit: 0.0, // Сумма постоплатой(в кредит) (2 знака после запятой)
        provision: 0.0, // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
      },
    };

    widget.pay(
      'charge', // или 'charge'
      {
        publicId: process.env.NEXT_PUBLIC_CLOUD_PAYMENTS_ID,
        currency: 'RUB',
        email: currentUser.email,
        invoiceId: randomInvoice(111111, 999999),
        data: {
          user_id: sessionUserId,
          CloudPayments: {
            CustomerReceipt: receipt,
          },
        },
        description: 'Пополнение баланса', //назначение
        amount: +addMoney.value, //сумма
        skin: 'mini', //дизайн виджета (необязательно)
      },
      {
        onSuccess: function () {
          refetch();
        },
        onFail: function () {
          refetch();
        },
      },
    );
  };

  const resetModal = () => {
    handleClose();
    setTimeout(() => {
      setPage('index');
      setAddMoney({ value: '', isValid: false });
    }, 300);
  };

  useEffect(() => {
    if (page === 'bank') {
      handleClose();
      loadCloudPayments();
    }
  }, [page]);

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        classes: paperClasses,
      }}
      classes={{
        scrollPaper: classes.scroll,
      }}
      BackdropProps={{
        style: {
          background: 'rgba(35, 38, 47, 0.8)',
          backdropFilter: 'blur(29px)',
        },
      }}
      onClose={resetModal}
    >
      <DialogContent>
        <Box className={classes.modalPaper} padding="54px 38px 54px 32px" textAlign="center">
          <Box className={classes.closeIcon} onClick={resetModal}>
            <Close color={'#fff'} />
          </Box>
          <Grid container rowSpacing={3}>
            {page !== 'success' && (
              <Grid item xs={12}>
                <Typography className={classes.smallTitle} textAlign="left">
                  Пополнить баланс на сумму
                </Typography>
              </Grid>
            )}
            {(page === 'index' || page === 'bank') && (
              <Grid item xs={12}>
                <StartStep
                  addMoneyOptions={addMoneyOptions}
                  addOptions={addOptions}
                  handleSwitchOption={handleSwitchOption}
                  addMoney={addMoney}
                  onMoneyChange={onMoneyChange}
                  handleNext={handleNext}
                />
              </Grid>
            )}
            {page === 'check' && (
              <Grid item xs={12}>
                <CheckStep
                  addMoney={addMoney}
                  onMoneyChange={onMoneyChange}
                  openAddInnBlock={openAddInnBlock}
                  handleAddInn={handleAddInn}
                  setOpenAddInnBlock={setOpenAddInnBlock}
                  setPage={setPage}
                  userEmail={currentUser.email}
                />
              </Grid>
            )}
            {page === 'success' && (
              <Grid item xs={12}>
                <CheckSuccessStep userEmail={currentUser.email} onModalClose={onClickClose} />
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoneyModal;
