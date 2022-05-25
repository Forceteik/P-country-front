import i18n from 'i18next';
import 'moment/locale/ru';
import { initReactI18next } from 'react-i18next';

// if (!localStorage.getItem("i18nextLng")) {
//   localStorage.setItem("i18nextLng", "ru");
// }
// moment.locale(localStorage.getItem("i18nextLng"));

const initI18n = () =>
  i18n.use(initReactI18next).init({
    // lng: localStorage.getItem("i18nextLng"), // чтобы работал компонет <Trans>
    fallbackLng: 'ru', // use en if detected lng is not available
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    load: 'languageOnly', //предотвращает такую тему как "en-US". будет только "en", "kk" и тд
    ns: ['common', 'termsOfUse', 'privacyPolicy', 'returnPolicy'],
    defaultNS: 'common',
    react: {
      wait: true,
    },
    keySeparator: '-->', // we do not use keys in form messages.welcome
    nsSeparator: '==>',
  });

export default initI18n;
