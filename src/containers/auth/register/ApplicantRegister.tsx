import { useState } from 'react';

import { useSession } from 'context/UserContext';
import RegisterLayout from 'containers/auth/register/RegisterLayout';
import ConfirmPassStep from 'containers/auth/common/ConfirmPassStep';
import CheckCodeStep from 'containers/auth/common/CheckCodeStep';
import SecondStepApplicant from 'containers/auth/register/components/SecondStepApplicant';

import StartApplicantRegister from './components/StartApplicantRegister';
import EducationApplicantRegister from './components/EducationApplicantRegister';

const ApplicantRegister = () => {
  const { refetch } = useSession();
  const [step, setStep] = useState('startProcess');

  //Если сделать step "education" то можно посмотреть новую страницу про образование
  // const [step, setStep] = useState("education");
  const [request, setRequest] = useState({});
  const [token, setToken] = useState(null);
  const [serverTime, setServerTime] = useState(100);

  const handleGoTo = ({ step, newRequestData = {}, token = null, serverTime }) => {
    setRequest({ ...request, ...newRequestData });
    if (token) {
      setToken(token);
    }
    if (serverTime) {
      setServerTime(serverTime);
    }
    setStep(step);
  };

  const handleSubmit = () => {
    if (token?.token) {
      localStorage.setItem('talantyLoginToken', token.token);
      localStorage.setItem('talantyUserRole', 'employer');
    }
    refetch({ redirectPath: '/applicant' });
  };

  return (
    <RegisterLayout activeRole={1}>
      {step === 'startProcess' && <StartApplicantRegister onGoTo={handleGoTo} request={request} />}
      {step === 'secondStep' && (
        <SecondStepApplicant onGoTo={handleGoTo} urlSendCode="auth/register/send-code" request={request} />
      )}
      {step === 'checkCode' && (
        <CheckCodeStep
          title="Введите код из смс"
          onGoTo={handleGoTo}
          prevStep={'secondStep'}
          role="applicant"
          request={request}
          token={token}
          serverTime={serverTime}
          setToken={setToken}
          urlSendCode="auth/register/send-code"
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
      {step === 'education' && <EducationApplicantRegister />}
    </RegisterLayout>
  );
};

export default ApplicantRegister;
