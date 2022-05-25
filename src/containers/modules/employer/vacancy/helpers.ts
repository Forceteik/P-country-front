import isEmpty from 'lodash.isempty';

import { CREATE_VACANCY_TEMPLATE } from 'constants/common';

/**
 * Учитывая, что вакансия может быть отправлена в черновик, в случае пустых полей нужно запретить отправку некоторых полей
 * @param formData
 * @param mode - create, draft или update
 */
export const prepareSubmitData = (formData) => {
  let data = {
    name: formData.name.value,
    salary_after_interview: formData.salaryAfterInterview.value,
    team_role_test: formData.answers.map((item) => ({
      question_id: item.questionId,
      answer_id: item.answerId,
      grades: item.grades,
    })),
    corp_values_test: formData.corpValuesData.map((item) => ({
      question_id: item.id,
      answers: item.answers.map((answer) => answer.id),
    })),
    disability: formData.disability,
  };

  if (formData.specialization) {
    data = { ...data, ...{ specialization_id: formData.specialization.value } };
  }

  if (formData.desc) {
    data = { ...data, ...{ description: formData.desc.value } };
  }
  if (formData.salaryFrom !== 0) {
    data = { ...data, ...{ salary_from: parseInt(formData.salaryFrom.value) } };
  }
  if (formData.salaryTo !== 0) {
    data = { ...data, ...{ salary_to: parseInt(formData.salaryTo.value) } };
  }
  if (formData.experience) {
    data = { ...data, ...{ experiency_id: formData.experience.value } };
  }
  if (!isEmpty(formData.city.value)) {
    data = { ...data, ...{ city: formData.city.value } };
  }
  if (formData.psychotype !== 0) {
    data = { ...data, ...{ psychotype_id: formData.psychotype } };
  }
  if (formData.employmentType.length > 0) {
    data = { ...data, ...{ employment_types: formData.employmentType.map((item) => item.value) } };
  }
  if (formData.workSchedule.length > 0) {
    data = { ...data, ...{ work_schedules: formData.workSchedule.map((item) => item.value) } };
  }
  if (formData.qualities.filter((item) => item.value !== '').length > 0) {
    data = {
      ...data,
      ...{
        qualities: formData.qualities.filter((item) => item.value !== '' && item.value !== 0).map((item) => item.value),
      },
    };
  }
  if (formData.universities.filter((item) => item.value !== '').length > 0) {
    data = {
      ...data,
      ...{ education: formData.universities.filter((item) => item.value !== '').map((item) => item.value) },
    };
  }

  if (formData.taskData) {
    //создается новый документ
    if (formData.taskData.documentId.value === 0) {
      data = {
        ...data,
        ...{
          document: {
            name: formData.taskData.documentName.value,
            description: formData.taskData.documentDesc.value,
            file_uuid: formData.taskData.documentFileId.value,
          },
        },
      };
    }
    //был указан ранее созданный документ
    if (formData.taskData.documentId.value !== 0 && formData.taskData.documentId.value !== -1) {
      data = {
        ...data,
        ...{ document_id: formData.taskData.documentId.value },
      };
    }
  }

  return data;
};

/**
 * Подготовка объекта для работы с формамы
 * @param vacancyData
 * @param mode
 */
export const prepareInitialData = (vacancyData = null, mode = 'create') => {
  const v = vacancyData;

  //по умолчанию все пусто
  const result = {
    name: { value: '', isValid: false },
    specialization: null,
    specializationStatus: { isValid: false, message: '' },
    desc: { value: CREATE_VACANCY_TEMPLATE, isValid: false, message: '' },
    salaryFrom: { value: '', isValid: false, message: '' },
    salaryTo: { value: '', isValid: true, message: '' },
    salaryAfterInterview: { value: false, isValid: true },
    city: { label: '', value: {} },
    employmentType: [],
    workSchedule: [],
    experience: null,
    employmentTypeStatus: { isValid: false, message: '' },
    workScheduleStatus: { isValid: false, message: '' },
    experienceStatus: { isValid: false, message: '' },
    qualities: [{ value: '', label: '' }],
    universities: [{ value: '', label: '' }],
    psychotype: 0,
    disability: false,
    answers: [],
    taskData: {
      documentId: { value: -1, label: '' },
      documentName: { value: '', isValid: false, message: '' },
      documentDesc: { value: '', isValid: false, message: '' },
      documentFileId: { value: '', isValid: false, message: '' },
    },
    corpValuesData: [],
    corpActiveQuestionIndex: 0,
  };

  //если данные не отправлены, то возвращаем дефолтное значение
  if (!v) {
    return result;
  }

  /**
   * Если пришли с редактирования вакансии, то готовим объект на основе данных с сервера
   * Согласно ТЗ, редактировать второй и третий этап не разрешено, поэтому эти данные на сервер мы не отправляем
   */
  if (v.name) {
    result.name = { value: v.name, isValid: true };
  }
  if (v.specialization) {
    result.specialization = { value: v.specialization.id, label: v.specialization.name };
    result.specializationStatus = { isValid: true, message: '' };
  }

  if (v.description) {
    result.desc = { value: v.description, isValid: true, message: '' };
  }

  if (v.salary_from) {
    result.salaryFrom = { value: v.salary_from, isValid: true, message: '' };
  }
  if (v.salary_to) {
    result.salaryTo = { value: v.salary_to, isValid: true, message: '' };
  }
  if (v.salary_after_interview) {
    result.salaryAfterInterview = { value: v.salary_after_interview, isValid: true };
  }
  if (v.city) {
    result.city = { value: v.city, label: v.city.name };
  }

  if (v.employment_types.length > 0) {
    result.employmentType = v.employment_types.map((item) => ({
      value: item.employment_type.id,
      label: item.employment_type.name,
    }));
    result.employmentTypeStatus = { isValid: true, message: '' };
  }

  if (v.work_schedules.length > 0) {
    result.workSchedule = v.work_schedules.map((item) => ({
      value: item.work_schedule.id,
      label: item.work_schedule.name,
    }));
    result.workScheduleStatus = { isValid: true, message: '' };
  }

  if (v.experiency) {
    result.experience = { value: v.experiency.id, label: v.experiency.name };
    result.experienceStatus = { isValid: true, message: '' };
  }

  if (v.qualities.length > 0) {
    result.qualities = v.qualities.map((item) => ({ value: item.name.id, label: item.name.name }));
  }
  if (v.education.length > 0) {
    result.universities = v.education.map((item) => ({ value: item.education.id, label: item.education.name }));
  }
  if (v.psychotype) {
    result.psychotype = v.psychotype.id;
  }
  if (v.psychotype_answers) {
    result.answers = v.psychotype_answers.map((item) => ({ questionId: item.question_id, answerId: item.answer_id }));
  }

  /**
   * 27.01.2021 было принято решение все вакансии отправить в черновик, даже опубликованные, у которых уже был этот
   * атрибут. И данное решение поломало логику черновика, поэтому добавилис условие mode === "update"
   */
  if (v.team_role_test && mode === 'update') {
    result.answers = v.team_role_test.map((item) => ({
      questionId: item.question_id,
      answerId: item.answer_id,
      grades: item.grades.map((item) => item.grade_id),
    }));
  }

  /**
   * 27.01.2021 было принято решение все вакансии отправить в черновик, даже опубликованные, у которых уже был этот
   * атрибут. И данное решение поломало логику черновика, поэтому добавилис условие mode === "update"
   */
  if (v.corp_values_test && mode === 'update') {
    result.corpValuesData = groupValuesTestFromServer(v.corp_values_test);
  }

  if (v.document) {
    result.taskData = {
      documentId: { value: v.document.id, label: v.document.name },
      documentName: { value: v.document.name, isValid: true, message: '' },
      documentDesc: { value: v.document.description, isValid: true, message: '' },
      documentFileId: { value: v.document.media?.uuid, isValid: true, message: '' },
    };

    // Если П обновляет вакансию, и захочет создать новый, то поля должны быть пустыми тк нам необходимо только
    // Ид и название документа созданного ранее в профиле или в самой вакансии
    if (mode === 'update') {
      result.taskData = {
        documentId: { value: v.document.id, label: v.document.name },
        documentName: { value: '', isValid: false, message: '' },
        documentDesc: { value: '', isValid: false, message: '' },
        documentFileId: { value: '', isValid: false, message: '' },
      };
    }
  }

  if (v.disability) {
    result.disability = v.disability;
  }

  return result;
};

export const isTaskSectionValid = (taskData) => {
  // Если П не отправляет доп задание, все ок
  if (taskData.documentId.value === -1 || taskData.documentId.value !== 0) {
    return true;
  }

  //П решил создать новое задание
  if (taskData.documentName.isValid && taskData.documentDesc.isValid && taskData.documentFileId.isValid) {
    return true;
  }

  return false;
};

/**
 * Рассчет прогресса создания вакансии
 * При редактировании вакансии автоматом добавляем 65% тк 2й и 3й этап не доступен для редактирования
 * @param formData
 * @param mode
 */
export const calculateProgress = (formData, mode = 'create', step) => {
  let result = mode === 'update' ? 65 : 0;
  if (formData.name.isValid) {
    result += 3;
  }
  if (formData.specializationStatus.isValid) {
    result += 2;
  }
  if (formData.desc.isValid) {
    result += 5;
  }
  if (formData.salaryFrom.isValid || formData.salaryAfterInterview.value === true) {
    result += 5;
  }

  if (formData.employmentTypeStatus.isValid) {
    result += 5;
  }

  if (formData.workScheduleStatus.isValid) {
    result += 5;
  }

  if (formData.experienceStatus.isValid) {
    result += 5;
  }

  if (formData.qualities.filter((item) => item.value !== '').length >= 1) {
    result += 5;
  }

  if (formData.answers.length > 0 && mode !== 'update') {
    result += formData.answers.length * 5;

    if (formData.answers[0].grades.length > 0) {
      result += 5;
    }
    // result += 25;
  }

  // подсчет делаем только когда находимся на 3м этапе
  if (step === 3) {
    result += formData.corpActiveQuestionIndex * 8 + 8;
  }

  return result;
};

export const checkIsFirstStepValid = (formData) => {
  return (
    formData.name.isValid &&
    formData.specializationStatus.isValid &&
    formData.desc.isValid &&
    (formData.salaryFrom.isValid || formData.salaryAfterInterview.value === true) &&
    formData.employmentTypeStatus.isValid &&
    formData.workScheduleStatus.isValid &&
    formData.experienceStatus.isValid &&
    formData.qualities.filter((item) => item.value !== '').length >= 1 &&
    isTaskSectionValid(formData.taskData)
  );
};
export const checkIsSecondStepValid = (formData, mode = 'create') => {
  if (mode === 'update') {
    return true;
  }
  return formData.answers.length === 4;
};

export const checkIsThirdStepValid = (formData, mode = 'create') => {
  if (mode === 'update') {
    return true;
  }
  if (formData.corpActiveQuestionIndex === 4) {
    return true;
  }
  return false;
};

/**
 * Конвертируем данные корп. ценностей с сервера
 * Код рабочий, но я понял, что стал очень слаб в алгоритмизации
 * Пора снова принимать участие в олимпиадах :)
 * @param corp_values_test
 */
export const groupValuesTestFromServer = (corp_values_test) => {
  const grouped = corp_values_test.reduce((groups, item) => {
    const answers = corp_values_test
      .filter((test) => test.question_id === item.question_id)
      .map((item) => ({ id: item.answer_id }));

    groups[item.question_id] = {
      id: item.question_id,
      answers,
    };
    return groups;
  }, {});

  const result = [];
  for (const item in grouped) {
    result.push(grouped[item]);
  }

  return result;
};
