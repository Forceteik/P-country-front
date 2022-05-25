import { useState } from 'react';

import { useSession } from 'context/UserContext';
import CheckCodeStep from 'containers/auth/common/CheckCodeStep';
import ConfirmPassStep from 'containers/auth/common/ConfirmPassStep';
import RestoreLayout from 'containers/auth/restore/RestoreLayout';

import StartApplicantRestore from './components/StartApplicantRestore';

/**
 * Как работает таймер?
 * Отправили на на номер A, сервер выдает 100 секунд на возможность переотправки
 * Нажали назад, оставили номер A, сервер выдает уже 68 секунд.
 * Нажали назад, ввели номер B, сервер выдвет новые 100 секунд для нового номера
 * @param restorePlace
 * @param onRestored
 * @constructor
 */
const ApplicantRestore = ({ restorePlace = 'auth', onRestored = null }) => {
  const { refetch } = useSession();
  const [step, setStep] = useState('startProcess');
  const [request, setRequest] = useState({});
  const [token, setToken] = useState(null);

  const [phone, setPhone] = useState({ value: '', isValid: false, message: '' });
  const [serverTime, setServerTime] = useState(100);

  const handleGoTo = ({ step, newRequestData = {}, token = null, phone, serverTime }) => {
    if (phone) {
      setPhone(phone);
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
        localStorage.setItem('talantyUserRole', 'employee');
      }
      refetch({ redirectPath: '/applicant' });
    } else {
      onRestored();
    }
  };

  return (
    <RestoreLayout bypass={restorePlace === 'profile'} activeRole={1}>
      {step === 'startProcess' && (
        <StartApplicantRestore
          onGoTo={handleGoTo}
          restorePlace={restorePlace}
          urlSendCode="auth/password/send-code"
          phone={phone}
        />
      )}
      {step === 'checkCode' && (
        <CheckCodeStep
          title={restorePlace !== 'profile' ? 'Введите код из смс' : ''}
          operationType="restore"
          role="applicant"
          onGoTo={handleGoTo}
          request={request}
          token={token}
          setToken={setToken}
          urlSendCode="auth/password/send-code"
          urlCheckCode="auth/password/check"
          restorePlace={restorePlace}
          serverTime={serverTime}
        />
      )}
      {step === 'confirmPass' && (
        <ConfirmPassStep
          operationType="restore"
          token={token}
          withHeader={restorePlace !== 'profile'}
          confirmUrl="auth/password/reset"
          onSubmit={handleSubmit}
          submitBtnText="Восстановить"
          restorePlace={restorePlace}
        />
      )}
    </RestoreLayout>
  );
};

export default ApplicantRestore;
