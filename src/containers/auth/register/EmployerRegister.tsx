import { useState } from 'react';

import { useSession } from 'context/UserContext';
import RegisterLayout from 'containers/auth/register/RegisterLayout';
import ConfirmPassStep from 'containers/auth/common/ConfirmPassStep';
import CheckCodeStep from 'containers/auth/common/CheckCodeStep';

import StartEmployerRegister from './components/StartEmployerRegister';

/**
 * Todo не очень нравится как мы передаем данные форм.
 * Переменна request - это круто. но она не учитывает, что иногда нужно передавать не только строку, но и весь объект
 * Хороший пример - данные ИНН, его значние - это объект из value и label
 * Поэтому возможно нужно создать стейт типа formData и хранить там данные как угодно
 * или создавать переменнуб request на основе formData
 * @constructor
 */
const EmployerRegister = () => {
  const { refetch } = useSession();
  const [step, setStep] = useState('startProcess');
  const [request, setRequest] = useState({});
  const [token, setToken] = useState(null);
  const [serverTime, setServerTime] = useState(100);

  const handleGoTo = ({ step, newRequestData = {}, token = null, serverTime }) => {
    setRequest({ ...request, ...newRequestData });
    setToken(token);
    setServerTime(serverTime);
    setStep(step);
  };

  const handleSubmit = () => {
    if (token?.token) {
      localStorage.setItem('talantyLoginToken', token.token);
      localStorage.setItem('talantyUserRole', 'employer');
    }
    refetch({ redirectPath: '/employer/profile' });
  };

  return (
    <RegisterLayout activeRole={0}>
      {step === 'startProcess' && (
        <StartEmployerRegister onGoTo={handleGoTo} urlSendCode="auth/employer/register/send-code" request={request} />
      )}
      {step === 'checkCode' && (
        <CheckCodeStep
          title="Введите код из письма"
          onGoTo={handleGoTo}
          request={request}
          token={token}
          serverTime={serverTime}
          setToken={setToken}
          urlSendCode="auth/employer/register/send-code"
          urlCheckCode="auth/register/check"
        />
      )}
      {step === 'confirmPass' && (
        <ConfirmPassStep
          operationType="register"
          token={token}
          withHeader
          confirmUrl="auth/register"
          onSubmit={handleSubmit}
          submitBtnText="Зарегистрироваться"
        />
      )}
    </RegisterLayout>
  );
};

export default EmployerRegister;
