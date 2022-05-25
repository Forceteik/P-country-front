import Head from 'next/head';
import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { Box, Grid, Hidden, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Layout from 'containers/layout/main';
import { darkGray } from 'styles/colorPalette';
import AddMoneyModal from 'containers/modules/common/modals/budget/AddMoneyModal';
import PayModal from 'containers/modules/common/modals/budget/PayModal';
import commonStyle from 'containers/modules/common/styles/commonStyle';
import { useBalance } from 'context/BalanceContext';
import BalancePageSkeleton from 'components/skeletons/BalancePageSkeleton';

import VariantToBuy from './components/VariantToBuy';
import DangerBlock from './components/Danger';
import BalanceBlock from './components/BalanceBlock';
import Cart from './components/Cart';
import EmployerNumVanacies from './components/EmployerNumVanacies';

const useStyles = makeStyles<any>((theme) => ({
  descr: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      lineHieght: '120%',
    },
  },
}));

const Balance = () => {
  const commonStyles = commonStyle();
  const classes = useStyles();
  const router = useRouter();
  const [selectPrice, setSelectPrice] = useState(1);
  const [modalAddMoney, setModalAddMoney] = useState(false);
  const [modalPay, setModalPay] = useState(false);

  const { employerPaymentBalance, employerVacanciesCoupons } = useBalance();

  const [{ data: tariffsData, loading: tariffsLoading, error: tariffsError }] = useAxios('/payment/tariffs');

  const isPublicationPage = router.query.vacancy_id;

  const handleSelectVariantToBuy = (value) => {
    setSelectPrice(value);
  };

  const handleOpenModal = (setState) => {
    setState(true);
  };

  const handleClosePayAndOpenAdd = () => {
    setModalPay(false);
    setModalAddMoney(true);
  };

  if (tariffsLoading) {
    return <BalancePageSkeleton />;
  }

  return (
    <Layout currentPage="Баланс">
      <Head>
        <title>Баланс</title>
        <meta property="og:title" content="Баланс" key="title" />
      </Head>
      <Script src="https://widget.cloudpayments.ru/bundles/cloudpayments.js" />
      <Box component="section" className={commonStyles.inner}>
        <Grid container rowSpacing={{ xs: 2, md: 3 }}>
          {!isPublicationPage && (
            <Grid item xs={12}>
              <Typography component={'h1'} className={commonStyles.title}>
                Баланс
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={8}>
                <Grid container rowSpacing={isPublicationPage ? { xs: 4, lg: 2 } : { xs: 3, md: 4 }}>
                  <Grid item xs={12}>
                    {isPublicationPage ? (
                      <Grid container alignItems={'center'} spacing={2.4}>
                        <Grid item xs={12} lg={6.2}>
                          <Typography component={'h1'} className={commonStyles.publicationTitle}>
                            Публикация вакансии
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={5.8}>
                          <EmployerNumVanacies couponsAmount={employerVacanciesCoupons} />
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid item xs={6}>
                        <EmployerNumVanacies couponsAmount={employerVacanciesCoupons} />
                      </Grid>
                    )}
                  </Grid>

                  <Hidden lgUp>
                    <Grid item xs={12}>
                      <Grid container columnSpacing={3}>
                        <Grid item xs={12} md={6}>
                          <BalanceBlock
                            currentBalance={employerPaymentBalance}
                            handleOpenModal={handleOpenModal}
                            setModalAddMoney={setModalAddMoney}
                          />
                        </Grid>
                        <Hidden mdDown>
                          <Grid item xs={6}>
                            {!tariffsLoading && !tariffsError && (
                              <Cart
                                handleOpenModal={handleOpenModal}
                                setModalPay={setModalPay}
                                selectedTariff={tariffsData.data.filter((item) => item.id === selectPrice)[0]}
                                currentBalance={employerPaymentBalance}
                              />
                            )}
                          </Grid>
                        </Hidden>
                      </Grid>
                    </Grid>
                  </Hidden>
                  {!tariffsLoading && !tariffsError && (
                    <Grid item xs={12}>
                      <Grid container rowSpacing={{ xs: 2, md: 2 }}>
                        {!isPublicationPage && (
                          <Grid item xs={12}>
                            <Typography className={commonStyles.mediumTitle} mb={1} component={'h2'}>
                              Докупить вакансии
                            </Typography>
                            <Typography color={darkGray} fontSize={18} className={classes.descr}>
                              Выберите количество вакансий, которое вы хотите приобрести
                            </Typography>
                          </Grid>
                        )}
                        {isPublicationPage && (
                          <Grid item xs={12}>
                            <Typography color={darkGray} fontSize={18} className={classes.descr}>
                              Выберите тариф
                            </Typography>
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <VariantToBuy
                            handleSelect={handleSelectVariantToBuy}
                            selectPrice={selectPrice}
                            tariffs={tariffsData.data}
                            handleOpenModal={handleOpenModal}
                            setModalPay={setModalPay}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs={12} md={6} lg={12}>
                    <DangerBlock text={'Вакансию необходимо опубликовать в течении одного календарного года'} />
                  </Grid>
                </Grid>
              </Grid>
              <Hidden lgDown>
                <Grid item xs={4}>
                  <Grid container rowSpacing={4}>
                    <Grid item xs={12} mt={isPublicationPage ? 0 : 2}>
                      <BalanceBlock
                        currentBalance={employerPaymentBalance}
                        handleOpenModal={handleOpenModal}
                        setModalAddMoney={setModalAddMoney}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {!tariffsLoading && !tariffsError && (
                        <Cart
                          handleOpenModal={handleOpenModal}
                          setModalPay={setModalPay}
                          selectedTariff={tariffsData.data.filter((item) => item.id === selectPrice)[0]}
                          currentBalance={employerPaymentBalance}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
              <Hidden mdUp smDown>
                <Grid item xs={12}>
                  {!tariffsLoading && !tariffsError && (
                    <Cart
                      handleOpenModal={handleOpenModal}
                      setModalPay={setModalPay}
                      selectedTariff={tariffsData.data.filter((item) => item.id === selectPrice)[0]}
                      currentBalance={employerPaymentBalance}
                    />
                  )}
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <AddMoneyModal open={modalAddMoney} handleClose={() => setModalAddMoney(false)} />
      <PayModal
        open={modalPay}
        handleClose={() => setModalPay(false)}
        handleClosePayAndOpenAdd={handleClosePayAndOpenAdd}
      />
    </Layout>
  );
};

export default Balance;
