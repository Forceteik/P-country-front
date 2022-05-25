import queryString from 'query-string';
import { browserName, browserVersion } from 'react-device-detect';
import moment from 'moment';

import {
  blueLight,
  blueMain,
  greenMain,
  greenWhite,
  orangeMain,
  orangeWhite,
  pinkMain,
  pinkWhite,
} from 'styles/colorPalette';
import { MadFormatter } from 'utils/formatters';

export const generateRatingData = (rating) => {
  let data = {
    color: blueMain,
    backgroundColor: blueLight,
    title: 'Отлично',
    desc: 'Вы прошли все доступные тесты',
  };
  if (rating >= 0 && rating <= 39) {
    data = {
      color: pinkMain,
      backgroundColor: pinkWhite,
      title: 'У вас низкий рейтинг',
      desc: 'Чем больше рейтинг, тем выше ваш шанс получить работу',
    };
  }
  if (rating > 39 && rating <= 69) {
    data = {
      color: orangeMain,
      backgroundColor: orangeWhite,
      title: 'Вы на полпути',
      desc: 'Пройдите больше тестов для повышения вашего рейтинга',
    };
  }
  if (rating > 69 && rating <= 99) {
    data = {
      color: greenMain,
      backgroundColor: greenWhite,
      title: 'Так держать!',
      desc: 'Чем больше рейтинг, тем выше ваш шанс получить работу',
    };
  }

  return data;
};

export const generateProfileData = (rating) => {
  let data = {
    color: blueMain,
    backgroundColor: blueLight,
    title: 'Отлично!',
    desc: 'Профиль полностью заполнен',
  };
  if (rating >= 0 && rating <= 39) {
    data = {
      color: pinkMain,
      backgroundColor: pinkWhite,
      title: 'Профиль не заполнен',
      desc: 'Заполните свой профиль, чтобы получить доступ к полному функционалу платформы',
    };
  }
  if (rating > 39 && rating <= 69) {
    data = {
      color: orangeMain,
      backgroundColor: orangeWhite,
      title: 'Вы на полпути',
      desc: 'Заполните свой профиль, чтобы получить доступ к полному функционалу платформы',
    };
  }
  if (rating > 69 && rating <= 99) {
    data = {
      color: greenMain,
      backgroundColor: greenWhite,
      title: 'Так держать!',
      desc: 'Профиль почти заполнен',
    };
  }

  return data;
};

export const checkPswStrength = (value) => {
  let re;

  if (value !== '') {
    re = /^\w+$/;
    if (value.length < 6) {
      return {
        result: false,
        message: 'Пароль должен содержать как минимум 6 символов',
      };
    }

    re = /[0-9]/;
    if (!re.test(value)) {
      return {
        result: false,
        message: 'Пароль должен содержать как минимум одну цифру(0-9)',
      };
    }
    re = /[a-z]/;
    if (!re.test(value)) {
      return {
        result: false,
        message: 'Пароль должен содержать как минимум одну маленькую букву(a-z)',
      };
    }
    re = /[A-Z]/;
    if (!re.test(value)) {
      return {
        result: false,
        message: 'Пароль должен содержать как минимум одну большую букву(A-Z)',
      };
    }
  } else {
    return {
      result: false,
      message: 'Поле обязательно для заполнения',
    };
  }

  return {
    result: true,
    message: 'Strong password',
  };
};

export const parseFormErrors = (fields) => {
  const result = [];
  for (const key in fields) {
    result.push({
      attr: key,
      message: fields[key].join('\n '),
    });
  }
  return result;
};

export const showSalary = (salaryFrom, salaryTo, salary_after_interview = false) => {
  if (salary_after_interview) {
    return 'З/П не указана';
  }

  if (salaryFrom === 0 && salaryTo === 0) {
    return '';
  }

  if (salaryFrom === salaryTo) {
    return MadFormatter.toCurrency(salaryFrom);
  }

  if (salaryTo) {
    return MadFormatter.toCurrency(salaryFrom, '') + ' - ' + MadFormatter.toCurrency(salaryTo);
  }
  return MadFormatter.toCurrency(salaryFrom);
};

export const checkIsAllTestsPassed = (currentUser) => {
  if (currentUser?.type === 'employee') {
    return currentUser.employee.passed_all_tests;
  }
  return false;
};

export const generateFinalQuery = (router, itemId, name) => {
  let finalQuery: any = queryString.parse(router.asPath.replace(router.pathname, ''), {
    arrayFormat: 'bracket',
  });

  let arrayValues = finalQuery[name];

  if (arrayValues) {
    if (arrayValues.includes(itemId)) {
      arrayValues = arrayValues.filter((item) => item !== itemId);
    } else {
      arrayValues.push(itemId);
    }

    if (arrayValues.length > 0) {
      finalQuery = {
        ...withClearPagination(router.query),
        [`${name}[]`]: arrayValues,
      };
    } else {
      finalQuery = { ...withClearPagination(router.query) };
      delete finalQuery[`${name}[]`];
    }
  } else {
    finalQuery = {
      ...withClearPagination(router.query),
      [`${name}[]`]: [itemId],
    };
  }

  return finalQuery;
};

/**
 * Если был изменен фильтр, обнуляем пагинацию
 * @param query
 */
export const withClearPagination = (query) => {
  const finalQuery = { ...query };
  if (finalQuery.page) {
    delete finalQuery.page;
  }

  return finalQuery;
};

export const generateFullName = (user) => {
  return user.surname + ' ' + user.name;
};

export const generateCandidatesLink = (vacancy) => {
  const query = {
    vacancy_id: vacancy.id,
  };
  const stringified = queryString.stringify(query);

  return `/employer/applicants?${stringified}`;
};

export const getRoleLabel = (role) => {
  switch (role) {
    case 'employee':
      return 'Соискатель';
    case 'employer':
      return 'Работодатель';
    default:
      return 'Не определен';
  }
};

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (month.toString().length < 2) {
    return `0${month.toString()}.${year}`;
  }
};

/**
 * Проблема Re:plain такова:
 * Когда П только открыл сайт, реплей создает сессию как незаогиненный П и будет таковым до тех пот, пока сушествует
 * данные в локалсторедже. Поэтому когда происходит авторизация, нужно удалят данные локалсторелдж, Перезапускат
 * страницу, чтобы реплейн мог создать новую сессию с уже залогиненным П
 * @param user
 */
export const generateReplainSnippet = (user) => {
  if (user) {
    return `
    window.replainSettings = { id: '55ba37e4-744f-4958-a21e-eb8dbcd5261e', fields: {
        name: '${user?.name || user?.employer?.name} ${user?.surname || ''}',
        email: '${user?.email || 'Не указан'}',
        phone: '${user?.phone || 'Не указан'}',
        userId: '${user?.id}',
        role: '${getRoleLabel(user.type)}',
        browser: '${browserName} ${browserVersion}',
        token: '1234'
      } };
      (function(u){var s=document.createElement('script');s.type='text/javascript';s.async=true;s.src=u;
      var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
    })('https://widget.replain.cc/dist/client.js');
    `;
  }
  return `
    window.replainSettings = { id: '55ba37e4-744f-4958-a21e-eb8dbcd5261e', fields: {
        browser: '${browserName} ${browserVersion}',
        token: '1234'
      } };
      (function(u){var s=document.createElement('script');s.type='text/javascript';s.async=true;s.src=u;
      var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
    })('https://widget.replain.cc/dist/client.js');
    `;
};

export const getTestUserData = (items) => {
  const result = {
    status: '',
    statusCode: '',
    nextAttempt: '',
    className: '',
  };

  if (items.length === 1 && items[0]?.testable) {
    const user = items[0].testable.user;
    const status = getStatus(user?.status);
    result.status = status.label;
    result.statusCode = user?.status || null;
    result.nextAttempt = `${MadFormatter.toDateShort(user?.next_attempt)}`;
    result.className = status.className;
  }

  if (items.length > 1) {
    const countCompleted = items
      .filter((item) => item.is_released)
      .filter((item) => item.testable?.user?.status === 'completed').length;

    if (countCompleted === 0) {
      result.status = `Не пройден`;
      result.nextAttempt = '0';
      result.nextAttempt = 'notDone';
    } else if (countCompleted === items.filter((item) => item.is_released).length) {
      result.status = `Пройден`;
      result.nextAttempt = '0';
      result.className = 'done';
    } else {
      result.status = `Пройдено ${countCompleted} из ${items.filter((item) => item.is_released).length}`;
      result.nextAttempt = '0';
      result.className = 'notFullDone';
    }
  }

  return result;
};

const getStatus = (status) => {
  if (status === 'completed') {
    return {
      label: 'Пройден',
      className: 'done',
    };
  }

  if (status === 'inprocess') {
    return {
      label: 'В процессе',
      className: 'notFullDone',
    };
  }

  return {
    label: 'Не пройден',
    className: 'notDone',
  };
};

/**
 * Получает роли пользователя.
 * @param user - Владелец посещаемой страницы.
 * @param currentUser - Авторизованный пользователь.
 * @returns {roles} - Объект ролей авторизованного пользователя.
 */
export const getUserViewRoles = ({ user, currentUser }) => {
  const roles = {
    isGuest: false, // Является ли пользователь гостем
    isGuestApplicant: false, // Является ли гостем-соискателем
    isGuestEmployer: false, // Является ли гостем-работодателем
    isApplicant: false, // Является ли зарегистрированным соискателем
    isEmployer: false, // Является ли зарегистрированным работодателем
    isOwner: false, // Является ли владельцем текущей страницы
  };

  if (!currentUser) {
    roles.isGuest = true;
  }

  if (user?.type === currentUser?.type && user?.id !== currentUser?.id && currentUser?.type === 'employee') {
    roles.isGuestApplicant = true;
  }

  if (user?.type === currentUser?.type && user?.id !== currentUser?.id && currentUser?.type === 'employer') {
    roles.isGuestEmployer = true;
  }

  if (currentUser?.type === 'employer') {
    roles.isEmployer = true;
  }

  if (currentUser?.type === 'employee') {
    roles.isApplicant = true;
  }

  if (user?.id === currentUser?.id || !user) {
    roles.isOwner = true;
  }

  if (roles.isGuestApplicant || roles.isGuestEmployer) {
    roles.isGuest = true;
  }

  return roles;
};

export const getSortEducation = (arr) => {
  if (!arr) return arr;

  const school = arr.filter((item) => item.type === 'school');
  const college = arr.filter((item) => item.type === 'college');
  const bachelor = arr.filter((item) => item.type === 'bachelor');
  const master = arr.filter((item) => item.type === 'master');
  const specialist = arr.filter((item) => item.type === 'specialist');
  const postgraduate = arr.filter((item) => item.type === 'postgraduate');
  const internship = arr.filter((item) => item.type === 'internship');
  const professionalRetraining = arr.filter((item) => item.type === 'professional_retraining');
  const skillsEnhancement = arr.filter((item) => item.type === 'skills_enhancement');

  return [
    ...school,
    ...college,
    ...bachelor,
    ...master,
    ...specialist,
    ...postgraduate,
    ...internship,
    ...professionalRetraining,
    ...skillsEnhancement,
  ];
};

/**
 * Готовит GET параметры для сервера для фильтрации вакансий
 * @param routerQuery
 */
export const prepareQueryParamsForVacancies = (routerQuery) => {
  let result: any = { ...routerQuery };
  delete result.city_code;
  delete result.city_name;
  delete result.predefined_filter_id;
  result = queryString.stringify(result);

  return result;
};

export const getContactUrlByType = (value, type) => {
  switch (type) {
    case 'email':
      return `mailto:${value}`;
    case 'phone':
      return `tel:${value}`;
    case 'instagram':
      return `https://instagram.com/${value.replace('@', '')}`;
    case 'telegram':
      return `https://t.me/${value.replace('@', '')}`;
    case 'whatsapp':
      return `https://wa.me/${value}`;
    default:
      return value;
  }
};

//считает дни до конца активации вакансии
export const calcDayActivation = (vacancy) => {
  const to = moment(vacancy.activation_end_at).locale('RU').format('YYYY-MM-DD');
  const from = moment().format('YYYY-MM-DD');

  const dayActivation = Math.abs(
    moment(to, 'YYYY-MM-DD').startOf('day').diff(moment(from, 'YYYY-MM-DD').startOf('day'), 'days'),
  );
  return dayActivation;
};

/**
 * Считает, прошел ли промежуток времени начиная с targetTimestamp.
 * Возвращает true если временной промежуток уже прошел, false в противном случае.
 * Промежуток времени указывается через объект опций.
 * Если объект опций не задан - считает, прошел ли момент targetTimestamp по отношению к системному времени.
 * @param targetTimestamp - Время в формате таймштампа с бэкенда. С этим временем будет сравниваться время на данный момент.
 * @param seconds
 * @param minutes
 * @param hours
 * @param days
 */
export const isTimePassed = (targetTimestamp: string, { seconds = 0, minutes = 0, hours = 0, days = 0 }): boolean => {
  if (!targetTimestamp) return false;

  const currentDateTime = new Date().getTime();
  const targetDateTime = Date.parse(targetTimestamp);

  if (!targetDateTime) return false;

  if (!seconds && !minutes && !hours && !days) {
    return currentDateTime > targetDateTime;
  }

  const targetFutureTime = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds) * 1000;

  return currentDateTime > targetDateTime + targetFutureTime;
};
