import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Box, Grid, Hidden, Typography } from '@mui/material';

import {
  calculateProgress,
  checkIsFirstStepValid,
  checkIsSecondStepValid,
  checkIsThirdStepValid,
  prepareInitialData,
  prepareSubmitData,
} from 'containers/modules/employer/vacancy/helpers';
import { OverlayLoader } from 'components/Loaders';
import PrevLink from 'components/PrevLink';
import Layout from 'containers/layout/main';
import FirstStep from 'containers/modules/employer/vacancy/components/FirstStep';
import SecondStep from 'containers/modules/employer/vacancy/components/SecondStep';
import ThirdStep from 'containers/modules/employer/vacancy/components/ThirdStep';
import EditVacancyModal from 'containers/modules/common/modals/EditVacancyModal';

import ProfileProvider from '../../../../context/ProfileContext';

import Progress from './components/Progress';
import useVacancyStyles from './style';

const initialFormData = prepareInitialData();

/**
 * Небольшое примечание:
 * Здесь мы можем оказаться по 2м причинам:
 * 1. При редактировании черновика - все этапы доступны, данные второго и третьего этапа забиваются заново
 * 2. При редактировании опубликованной вакансии - доступен только первый этап.
 */
const UpdateVacancy = () => {
  const router: any = useRouter();
  const vacancyId = router.query.id;
  const isDraft = router.query.is_draft ? parseInt(router.query.is_draft) : 0;

  const [formData, setFormData] = useState(initialFormData);
  const [savedForm, setSavedForm] = useState<any>();
  const mode = isDraft ? 'draft' : 'update';

  const [{ data, loading }] = useAxios(`/vacancies/${vacancyId}`, { useCache: false });

  const classes = useVacancyStyles();
  const [openModal, setOpenModal] = useState(false);

  const [step, setStep] = useState(1);

  const [dictionaryState] = useAxios('/vacancies/dictionary');

  const [vacancyState, updateVacancy] = useAxios({ url: `/vacancies/${vacancyId}`, method: 'put' }, { manual: true });
  const [hideVacancyState, hideVacancy] = useAxios(
    { url: `/vacancies/${vacancyId}/hide`, method: 'put' },
    { manual: true },
  );
  const [balance] = useAxios('/payment/balance');

  useEffect(() => {
    if (data) {
      const formData = prepareInitialData(data.data, mode);
      setFormData(formData);
      setSavedForm(formData);
    }
  }, [loading]);

  useEffect(() => {
    if (formData.salaryAfterInterview.value) {
      const result = {
        ...formData,
        ...{
          salaryFrom: { value: '', isValid: false, message: '' },
          salaryTo: { value: '', isValid: true, message: '' },
        },
      };
      setFormData(result);
    }
  }, [formData.salaryAfterInterview]);

  /* --- vacancy common functions start  --- */
  if (dictionaryState.loading) {
    return <OverlayLoader />;
  }

  const handlePsychotype = (value) => {
    const result = { ...formData, ...{ psychotype: value } };
    // const answers = dictionaryState.data.data.find((item) => item.id === value);
    setFormData(result);
  };

  const handleChange = (e, { isValid }) => {
    const result = { ...formData, ...{ [e.target.name]: { value: e.target.value, isValid } } };
    setFormData(result);
  };

  const handleAutocomplete = (e, option, name, statusName, required) => {
    let result;
    if (option) {
      result = { ...formData, ...{ [name]: option } };
      if (option.length === 0 && required) {
        result = { ...result, ...{ [statusName]: { isValid: false, message: 'Поле обязательно для заполнения' } } };
      } else {
        result = { ...result, ...{ [statusName]: { isValid: true, message: '' } } };
      }
    } else {
      result = {
        ...formData,
        ...{ [name]: null, [statusName]: { isValid: false, message: 'Поле обязательно для заполнения' } },
      };
    }
    setFormData(result);
  };

  const handleEditorChange = ({ value, isValid, message, name }) => {
    const result = { ...formData, ...{ [name]: { value, isValid, message } } };
    setFormData(result);
  };

  const handleCheckboxChange = (e) => {
    const result = { ...formData, ...{ [e.target.name]: { value: e.target.checked, isValid: true } } };
    setFormData(result);
  };

  const handleLocationChange = (option) => {
    const result = { ...formData, ...{ city: option } };
    setFormData(result);
  };

  const handleTaskData = (newData) => {
    const result = { ...formData, ...{ taskData: { ...formData.taskData, ...newData } } };
    setFormData(result);
  };

  const handleQualities = (qualities) => {
    const result = { ...formData, ...{ qualities } };
    setFormData(result);
  };

  const handleCorpTestResults = (corpValuesData, activeQuestionIndex) => {
    const result = { ...formData, ...{ corpValuesData, corpActiveQuestionIndex: activeQuestionIndex } };
    setFormData(result);
  };

  const handleNext = (nextStep, newFormData) => {
    const result = { ...formData, ...newFormData };
    if (mode === 'update') {
      const data = prepareSubmitData(formData);
      updateVacancy({
        data,
      }).then(() => {
        setOpenModal(!openModal);
      });
    } else {
      setFormData(result);
      setStep(nextStep);
    }
  };

  const handleBack = (backStep) => {
    setStep(backStep);
  };

  const redirect = (id) => {
    if (balance.data.data.coupons !== 0) {
      router.push(`/employer/publish?vacancy_id=${id}`);
    } else {
      router.push(`/employer/publish/created?vacancy_id=${id}`);
    }
  };

  const handleSubmit = () => {
    const data = prepareSubmitData(formData);
    if (isDraft) {
      updateVacancy({
        data,
      }).then(() => {
        hideVacancy().then(() => {
          redirect(vacancyId);
        });
      });
    } else {
      updateVacancy({
        data,
      }).then((response) => {
        redirect(response.data.data.id);
      });
    }
  };

  const handleUniversities = (universities) => {
    const result = { ...formData, ...{ universities } };
    setFormData(result);
  };

  const handleDisabilityCheckboxChange = (e) => {
    setFormData({
      ...formData,
      disability: e.target.checked,
    });
  };

  const resetForm = () => {
    setFormData(savedForm);
  };

  const progress = calculateProgress(formData, mode, step);
  const isFirstStepValid = checkIsFirstStepValid(formData);
  const isSecondStepValid = checkIsSecondStepValid(formData, mode);
  const isThirdStepValid = checkIsThirdStepValid(formData, mode);
  /* --- vacancy common functions end  --- */

  return (
    <ProfileProvider>
      <Layout>
        <Head>
          <title>Редактирование вакансии</title>
          <meta property="og:title" content="Редактирование вакансии" key="title" />
        </Head>
        <Box className={classes.mainBox}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <PrevLink link={'/employer/profile'} text={'Назад к профилю'} />
              <Typography component="h1" className={classes.mainTitle}>
                Редактирование вакансии
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              {step === 1 && (
                <FirstStep
                  dictionaryState={dictionaryState.data}
                  formData={formData}
                  onNext={handleNext}
                  onInputChange={handleChange}
                  onEditorChange={handleEditorChange}
                  onCheckboxChange={handleCheckboxChange}
                  onAutocompleteChange={handleAutocomplete}
                  onLocationChange={handleLocationChange}
                  onTaskDataChange={handleTaskData}
                  onQualitiesChange={handleQualities}
                  onUniversitiesChange={handleUniversities}
                  isFormValid={isFirstStepValid}
                  mode={mode}
                  handleDisabilityCheckboxChange={handleDisabilityCheckboxChange}
                  resetForm={resetForm}
                  activated={!!data?.data.activated_at}
                />
              )}
              {step === 2 && (
                <SecondStep
                  dictionaryState={dictionaryState.data}
                  handlePsychotype={handlePsychotype}
                  psychotype={formData.psychotype}
                  answers={formData.answers}
                  // handleAnswer={handleAnswer}
                  onNext={handleNext}
                  onBack={handleBack}
                  isFormValid={isSecondStepValid}
                />
              )}
              {step === 3 && (
                <ThirdStep
                  setStep={setStep}
                  dictionaryState={dictionaryState.data}
                  corpValuesData={formData.corpValuesData}
                  corpActiveQuestionIndex={formData.corpActiveQuestionIndex}
                  //вызывается, когда отвечены все вопросы, и нажимается опубликовать
                  onSubmit={handleSubmit}
                  //вызывается каждый раз, когда нажимается далее и подверждается ответы
                  onNext={handleCorpTestResults}
                  loadingSubmit={isDraft ? hideVacancyState.loading : vacancyState.loading}
                  isFormValid={isThirdStepValid}
                  onBack={handleBack}
                />
              )}
            </Grid>
            <Hidden mdDown>
              <Grid item xs={4}>
                <Progress
                  title="Редактирование"
                  progress={progress}
                  step={step}
                  stepsValid={{
                    first: isFirstStepValid,
                    second: isSecondStepValid,
                    third: isThirdStepValid,
                  }}
                  mode={mode}
                  hideDraft={mode === 'update' || mode === 'draft'}
                  onNext={handleBack}
                />
              </Grid>
            </Hidden>
          </Grid>
          <EditVacancyModal open={openModal} handleClose={() => null} newId={vacancyState.data?.data?.id} />
        </Box>
      </Layout>
    </ProfileProvider>
  );
};

export default UpdateVacancy;
