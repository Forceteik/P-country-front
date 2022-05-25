import { useState } from 'react';

import { useSession } from 'context/UserContext';
import CheckCodeStep from 'containers/auth/common/CheckCodeStep';
import ConfirmPassStep from 'containers/auth/common/ConfirmPassStep';
import RestoreLayout from 'containers/auth/restore/RestoreLayout';

import StartEmployerRestore from './components/StartEmployerRestore';

const EmployerRestore = ({ restorePlace = 'auth', onRestored = null }) => {
  const { refetch } = useSession();
  const [step, setStep] = useState('startProcess');
  const [request, setRequest] = useState({});
  const [token, setToken] = useState(null);

  const [email, setEmail] = useState({ value: '', isValid: false, message: '' });
  const [serverTime, setServerTime] = useState(100);

  const handleGoTo = ({ step, newRequestData = {}, token = null, email, serverTime }) => {
    if (email) {
      setEmail(email);
    }
    if (serverTime) {
      setServerTime(serverTime);
    }
    setRequest({ ...request, ...newRequestData });
    setToken(token);
    setStep(step);
  };

  const handleSubmit = () => {
    if (restorePlace === 'auth') {
      if (token?.token) {
        localStorage.setItem('talantyLoginToken', token.token);
        localStorage.setItem('talantyUserRole', 'employer');
      }
      refetch({ redirectPath: '/employer/profile' });
    } else {
      onRestored();
    }
  };

  return (
    <RestoreLayout bypass={restorePlace === 'profile'}>
      {step === 'startProcess' && (
        <StartEmployerRestore
          onGoTo={handleGoTo}
          restorePlace={restorePlace}
          urlSendCode="auth/employer/password/send-code"
          email={email}
        />
      )}
      {step === 'checkCode' && (
        <CheckCodeStep
          title={restorePlace !== 'profile' ? 'Введите код из письма' : ''}
          operationType="restore"
          onGoTo={handleGoTo}
          request={request}
          token={token}
          setToken={setToken}
          urlSendCode="auth/employer/password/send-code"
          urlCheckCode="auth/employer/password/check"
          restorePlace={restorePlace}
          serverTime={serverTime}
        />
      )}
      {step === 'confirmPass' && (
        <ConfirmPassStep
          operationType="restore"
          token={token}
          withHeader={restorePlace !== 'profile'}
          confirmUrl="auth/employer/password/reset"
          onSubmit={handleSubmit}
          submitBtnText="Восстановить"
          restorePlace={restorePlace}
        />
      )}
    </RestoreLayout>
  );
};

export default EmployerRestore;
