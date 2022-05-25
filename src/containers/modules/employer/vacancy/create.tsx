import { useState } from 'react';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Box, Grid, Hidden, Typography } from '@mui/material';

import Layout from 'containers/layout/main';
import PrevLink from 'components/PrevLink';
import { OverlayLoader } from 'components/Loaders';
import {
  calculateProgress,
  checkIsFirstStepValid,
  checkIsSecondStepValid,
  checkIsThirdStepValid,
  prepareInitialData,
  prepareSubmitData,
} from 'containers/modules/employer/vacancy/helpers';

import CreateDraftModal from '../../common/modals/CreateDraftModal';
import ProfileProvider from '../../../../context/ProfileContext';

import useVacancyStyles from './style';
import Progress from './components/Progress';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';

const CreateVacancy = () => {
  const classes = useVacancyStyles();
  const [openDraftModal, setOpenDraftModal] = useState(false);

  const router = useRouter();

  const initialFormData = prepareInitialData();

  const [step, setStep] = useState(1);

  const [dictionaryState] = useAxios('/vacancies/dictionary', { useCache: false });

  const [draftState, createVacancyDraft] = useAxios({ url: '/vacancies/draft', method: 'post' }, { manual: true });
  const [hiddenState, createHiddenVacancy] = useAxios({ url: '/vacancies', method: 'post' }, { manual: true });
  const [balance] = useAxios('/payment/balance');

  const [formData, setFormData] = useState(initialFormData);

  if (dictionaryState.loading) {
    return <OverlayLoader />;
  }

  const handlePsychotype = (value) => {
    const result = { ...formData, ...{ psychotype: value } };
    // const answers = dictionaryState.data.data.find((item) => item.id === value);
    setFormData(result);
  };

  const handleChange = (e, { isValid, message }) => {
    if (e.target) {
      const result = { ...formData, ...{ [e.target.name]: { value: e.target.value, isValid, message } } };
      setFormData(result);
    }
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
    let result = { ...formData, ...{ [e.target.name]: { value: e.target.checked, isValid: true } } };
    if (e.target.checked) {
      result = {
        ...result,
        ...{
          salaryFrom: { value: '', isValid: false, message: '' },
          salaryTo: { value: '', isValid: true, message: '' },
        },
      };
    }
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

  const handleUniversities = (universities) => {
    const result = { ...formData, ...{ universities } };
    setFormData(result);
  };

  const handleCorpTestResults = (corpValuesData, activeQuestionIndex) => {
    const result = { ...formData, ...{ corpValuesData, corpActiveQuestionIndex: activeQuestionIndex } };
    setFormData(result);
  };

  const handleSubmit = (e, isDraft = false) => {
    const data = prepareSubmitData(formData);
    if (isDraft) {
      createVacancyDraft({ data }).then(() => {
        setOpenDraftModal(!openDraftModal);
      });
    } else {
      createHiddenVacancy({ data }).then((response) => {
        if (balance.data.data.coupons !== 0) {
          router.push(`/employer/publish?vacancy_id=${response.data.data.id}`);
        } else {
          router.push(`/employer/publish/created?vacancy_id=${response.data.data.id}`);
        }
      });
    }
  };

  const clearAllForm = () => {
    const initialFormData = prepareInitialData();
    setFormData(initialFormData);
  };

  const handleCreateNewVacancy = () => {
    setOpenDraftModal(false);
    setStep(1);
    clearAllForm();
    router.push('/employer/vacancies/create');
  };

  const handleNext = (nextStep, newFormData) => {
    const result = { ...formData, ...newFormData };
    setFormData(result);
    setStep(nextStep);
  };

  const handleBack = (backStep) => {
    setStep(backStep);
  };

  const handleDisabilityCheckboxChange = (e) => {
    setFormData({
      ...formData,
      disability: e.target.checked,
    });
  };

  const progress = calculateProgress(formData, 'create', step);
  const isFirstStepValid = checkIsFirstStepValid(formData);
  const isSecondStepValid = checkIsSecondStepValid(formData);
  const isThirdStepValid = checkIsThirdStepValid(formData);

  return (
    <ProfileProvider>
      <Layout>
        <Head>
          <title>Создание вакансии</title>
          <meta property="og:title" content="Создание вакансии" key="title" />
        </Head>
        <Box className={classes.mainBox}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <PrevLink link={'/employer/profile'} text={'Назад к профилю'} />
              <Typography component="h1" className={classes.mainTitle}>
                Создание вакансии
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
                  handleDisabilityCheckboxChange={handleDisabilityCheckboxChange}
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
                  loadingSubmit={hiddenState.loading}
                  isFormValid={isThirdStepValid}
                  onBack={handleBack}
                />
              )}
            </Grid>
            <Hidden mdDown>
              <Grid item xs={4}>
                <Progress
                  title="Создание вакансии"
                  progress={progress}
                  step={step}
                  stepsValid={{
                    first: isFirstStepValid,
                    second: isSecondStepValid,
                    third: isThirdStepValid,
                  }}
                  draftLoading={draftState.loading}
                  draftDisabled={!formData.name.isValid}
                  draftTooltipTitle={
                    !formData.name.isValid ? 'Для сохранения в черновиках необходимо указать название вакансии' : ''
                  }
                  onDraftClick={(e) => handleSubmit(e, true)}
                  onNext={handleNext}
                />
              </Grid>
            </Hidden>
          </Grid>
          <CreateDraftModal open={openDraftModal} handleCreateNewVacancy={handleCreateNewVacancy} />
        </Box>
      </Layout>
    </ProfileProvider>
  );
};

export default CreateVacancy;
