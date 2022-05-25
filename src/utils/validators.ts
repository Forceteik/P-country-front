import validator from 'validator';
import moment from 'moment';
import isEmpty from 'lodash.isempty';

import { checkPswStrength } from 'utils/common';

export enum Rules {
  REQUIRED = 0,
  STRING = 1,
  INT = 2,
  FLOAT = 4,
  GT = 5,
  GTE = 6,
  LT = 7,
  LTE = 8,
  MAX_STRING = 9,
  MIN_STRING = 10,
  EQUAL_STRING = 11,
  EQUAL = 12,
  IS_VALID_DATE = 13,
  IS_VALID_EMAIL = 14,
  IS_VALID_PASSWORD = 15,
  LETTERS_ONLY = 16,
  COMPARE_PASS = 17,
  IS_STRONG_PASSWORD = 18,
  DATE_GT = 19,
  LETTERS_DASH_SPACE_ONLY = 20,
}

/**
 *
 * @param value
 * @param rules
 */
export const validateRules = (value, rules) => {
  let result = {
    value,
    isValid: true,
    message: '',
  };
  for (const rule of rules) {
    switch (true) {
      case typeof rule === 'number':
        switch (rule) {
          case Rules.REQUIRED: {
            if (!value || value === '' || value === null || value === undefined || isEmpty(value)) {
              result = {
                value: value,
                isValid: false,
                message: 'Поле обязательно для заполнения',
              };
            }
            break;
          }
          case Rules.IS_STRONG_PASSWORD: {
            const check = checkPswStrength(value);
            if (!check.result) {
              result = {
                value: value,
                isValid: false,
                message: check.message,
              };
            }
            break;
          }
          case Rules.LETTERS_ONLY: {
            if (/\d/.test(value)) {
              result = {
                value: value,
                isValid: false,
                message: 'Поле не должно содержать цифры',
              };
            }
            break;
          }
          case Rules.LETTERS_DASH_SPACE_ONLY: {
            if (!/^[A-Za-zА-Яа-я-\s]+$/.test(value)) {
              result = {
                value: value,
                isValid: false,
                message: 'Можно использовать только буквы, тире и пробел',
              };
            }
            if (!value.trim().length && value.length >= 1) {
              result = {
                value: value,
                isValid: false,
                message: 'Поле должно содержать что-то кроме пробелов',
              };
            }
            if (value.startsWith('-') || value.endsWith('-')) {
              result = {
                value: value,
                isValid: false,
                message: 'Поле не может начинаться или кончаться тире',
              };
            }
            break;
          }
          case Rules.IS_VALID_DATE: {
            const date = moment(value, 'DD.MM.YYYY', true);
            if (!(date.isValid() || value === '')) {
              result = {
                value: value,
                isValid: false,
                message: 'Неверный формат даты',
              };
            }
            break;
          }
          case Rules.IS_VALID_EMAIL: {
            if (!validator.isEmail(value) && value !== '') {
              result = {
                value: value,
                isValid: false,
                message: 'Неверный формат почты',
              };
            }
            break;
          }
          case Rules.INT: {
            if (!validator.isNumeric(value)) {
              result = {
                value: value,
                isValid: false,
                message: 'Поле должно содержать только числа',
              };
            }
            break;
          }
        }
        break;
      case Array.isArray(rule): {
        switch (rule[0]) {
          case Rules.EQUAL_STRING: {
            if (value.length !== rule[1]) {
              result = {
                value: value,
                isValid: false,
                message: `Длина поля должно быть равно ${rule[1]} символов`,
              };
            }
            break;
          }
          case Rules.MAX_STRING: {
            if (!validator.isLength(value, { max: rule[1] })) {
              result = {
                value: value,
                isValid: false,
                message: `Поле должно быть меньше или равно ${rule[1]} символов`,
              };
            }
            break;
          }
          case Rules.COMPARE_PASS: {
            if (value !== rule[1]) {
              result = {
                value: value,
                isValid: false,
                message: `Пароли не совпадают`,
              };
            }
            break;
          }
          case Rules.GT: {
            if (parseInt(value) <= parseInt(rule[1])) {
              result = {
                value: value,
                isValid: false,
                message: `Значение должно быть больше ${rule[1]}`,
              };
            }
            break;
          }
          case Rules.LT: {
            if (parseInt(value) > parseInt(rule[1])) {
              result = {
                value: value,
                isValid: false,
                message: `Значение должно быть меньше ${rule[1]}`,
              };
            }
            break;
          }
          case Rules.LTE: {
            if (parseInt(value) >= parseInt(rule[1])) {
              result = {
                value: value,
                isValid: false,
                message: `Значение должно быть меньше или равно ${rule[1]}`,
              };
            }
            break;
          }
          case Rules.GTE: {
            if (parseInt(value) < parseInt(rule[1])) {
              result = {
                value: value,
                isValid: false,
                message: `Значение должно быть больше или равно ${rule[1]}`,
              };
            }

            break;
          }
          case Rules.DATE_GT: {
            if (parseInt(value.slice(3, 7)) < parseInt(rule[1].slice(3, 7))) {
              result = {
                value: value,
                isValid: false,
                message: `Дата должна быть больше даты начала работы`,
              };
            } else if (parseInt(value.slice(3, 7)) == parseInt(rule[1].slice(3, 7))) {
              if (parseInt(value.slice(0, 2)) < parseInt(rule[1].slice(0, 2))) {
                result = {
                  value: value,
                  isValid: false,
                  message: `Дата должна быть больше даты начала работы`,
                };
              }
            }
            break;
          }
        }
      }
    }
  }

  return result;
};
