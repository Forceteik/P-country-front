import { createContext, useContext, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

import { useSession } from './UserContext';

const BalanceContext = createContext({
  employerPaymentBalance: 0,
  employerVacanciesCoupons: 0,
  refetch: null,
  loading: null,
});

export const useBalance = () => useContext(BalanceContext);

const BalanceProvider = ({ children }) => {
  const [data, setData] = useState({
    employerPaymentBalance: 0,
    employerVacanciesCoupons: 0,
  });

  const { role } = useSession();
  const isEmployer = role === 'employer';

  const [{ loading: employerPaymentBalanceLoading }, getEmployerPaymentBalance] = useAxios('/payment/balance', {
    manual: true,
  });

  const handleGetBalanceFromServer = () => {
    if (!isEmployer) return;

    getEmployerPaymentBalance()
      .then(({ data }) => {
        setData({
          employerPaymentBalance: data.data.value,
          employerVacanciesCoupons: data.data.coupons,
        });
      })
      .catch(() => {
        setData({
          employerPaymentBalance: 0,
          employerVacanciesCoupons: 0,
        });
      });
  };

  useEffect(() => {
    handleGetBalanceFromServer();
  }, []);

  return (
    <BalanceContext.Provider
      value={{
        employerPaymentBalance: data.employerPaymentBalance,
        employerVacanciesCoupons: data.employerVacanciesCoupons,
        loading: employerPaymentBalanceLoading,
        refetch: handleGetBalanceFromServer,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
