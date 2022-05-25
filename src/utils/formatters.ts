import moment from 'moment';
import currency from 'currency.js';

export const MadFormatter = {
  toDate: (unix, format = 'D MMMM YYYY') => moment.unix(unix).format(format), // дата типа 25 декабря 2010
  toDateShort: (unix, format = 'DD.MM.YYYY') => moment.unix(unix).format(format), // дата типа 25 декабря 2010
  toFormalRusDate: (date) => moment(date).locale('ru').format('DD MM YYYY').split(' ').join('.'), // дата типа 25.12.2010
  toDateTime: (unix, format = 'D MMMM YYYY H:mm') => moment(unix * 1000).format(format), // дата-время типа 25 декабря 2010 10:00
  toTime: (unix, format = 'H:mm') => moment(unix * 1000).format(format), // время типа 10:00
  toCurrency: (value, unit = 'руб.', precision = 0) =>
    currency(value, { symbol: '', separator: ' ', precision }).format() + ' ' + unit, // форматирование числа из 100000 на тип 100 000 руб
};

// 2 фунуцкии для правильного отображения окончаний слов в зависимости от числа

export const calсEndingOfWordsWithNum = (number, arr) => {
  if (number % 100 >= 5 && number % 100 <= 20) {
    //5 дней
    return `${number} ${arr[0]}`;
  } else if (number % 10 == 1) {
    //1 день
    return `${number} ${arr[1]}`;
  } else if (number % 10 >= 2 && number % 10 <= 4) {
    //2 дня
    return `${number} ${arr[2]}`;
  }
  //6 дней
  return `${number} ${arr[0]}`;
};

export const calсEndingOfWords = (number, arr) => {
  if (number % 100 >= 5 && number % 100 <= 20) {
    //5 дней
    return `${arr[0]}`;
  } else if (number % 10 == 1) {
    //1 день
    return `${arr[1]}`;
  } else if (number % 10 >= 2 && number % 10 <= 4) {
    //2 дня
    return `${arr[2]}`;
  }
  //6 дней
  return `${arr[0]}`;
};

const monthDictionary = {
  '01': 'Январь',
  '02': 'Февраль',
  '03': 'Март',
  '04': 'Апрель',
  '05': 'Май',
  '06': 'Июнь',
  '07': 'Июль',
  '08': 'Август',
  '09': 'Сентябрь',
  '10': 'Октябрь',
  '11': 'Ноябрь',
  '12': 'Декабрь',
};

const declination = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

export const calcExperienceDuration = (start, end) => {
  const currentDate = new Date();
  const startYear = start.slice(0, 4);
  const startMonth = monthDictionary[start.slice(8, 10)];
  const endYear = end ? end.slice(0, 4) : currentDate.getFullYear();
  const endMonth = end ? monthDictionary[end.slice(8, 10)] : monthDictionary[String(currentDate.getMonth() + 1)];

  const monthDiff = () => {
    let months;
    months = (Number(endYear) - Number(startYear)) * 12;
    months -= Number(start.slice(8, 10));
    months += end ? Number(end.slice(8, 10)) : currentDate.getMonth();

    const year = Math.round(months / 12);

    const finishYear = year > 0 ? `${year} ${declination(year, ['год', 'года', 'лет'])}` : '';
    const finishMonth =
      months - year * 12 > 0
        ? `${months - year * 12} ${declination(months - year * 12, ['месяц', 'месяца', 'месяцев'])}`
        : '';

    return `${finishYear}${finishYear && finishMonth && ' и '}${finishMonth}`;
  };

  if (end) {
    return `${startMonth} ${startYear} - ${endMonth} ${endYear} (${monthDiff()})`;
  }
  return `${startMonth} ${startYear} - По настоящее время (${monthDiff()})`;
};

//Функия для правильного скколнения слова Отклик в зависмочти от числа
export const responsesText = (num) => {
  const numLastTwoNumber = num.toString().substr(-2);
  const numLastnumber = num.toString().substr(-1);

  if (numLastTwoNumber > 10 && numLastTwoNumber < 15) {
    return 'откликов';
  } else if (numLastnumber == 0 || numLastnumber > 4) {
    return 'откликов';
  } else if (numLastnumber == 1) {
    return 'отклик';
  }
  return 'отклика';
};

export const draftText = (num) => {
  const numLastTwoNumber = num.toString().substr(-2);
  const numLastnumber = num.toString().substr(-1);

  if (numLastTwoNumber > 10 && numLastTwoNumber < 15) {
    return 'вакансий';
  } else if (numLastnumber == 0 || numLastnumber > 4) {
    return 'вакансий';
  } else if (numLastnumber == 1) {
    return 'вакансия';
  }
  return 'вакансии';
};
