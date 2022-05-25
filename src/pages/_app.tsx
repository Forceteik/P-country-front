import { useEffect, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Axios from 'axios';
import { configure, makeUseAxios } from 'axios-hooks';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { install } from 'resize-observer';

import { CssBaseline, Theme, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';

import theme from 'styles/theme';
import { NewRelicSnippet } from 'components/NewRelicSnippet';
import UserProvider from 'context/UserContext';
import config from 'config';
import ProtectedRoute from 'containers/ProtectedRoute';
import { YandexMetricsSnippet } from 'components/YandexMetricsSnippet';
import initI18n from 'i18n';
import 'containers/modules/applicant/tests/report/personReport/styles.scss';
import 'containers/modules/employer/vacancy/styles.scss';
import 'containers/modules/applicant/tests/View/styles.scss';
import { FacebookPixelSnippet } from 'components/FacebookPixelSnippet';
import { black } from 'styles/colorPalette';
import { LinearLoader } from 'components/Loaders';
import BalanceProvider from 'context/BalanceContext';

import { isTimePassed } from '../utils/common';

declare module '@mui/styles/defaultTheme' {
  //@ts-ignore
  type DefaultTheme = Theme;
}

if (typeof window !== 'undefined') {
  install();
}

export const axiosClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
});

// request interceptor to add token to request headers
// todo: ReferenceError: window is not defined - что то явно я делаю тут неправильно
// Но код работает
axiosClient.interceptors.request.use(async (config) => {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('talantyLoginToken');
  }
  if (token) {
    config.headers = {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    };
    config.onUploadProgress = () => {
      // var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    };
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error.response?.data?.error);
  },
);

export const useCustomAxios = makeUseAxios({
  axios: Axios.create({
    baseURL: config.DATATA_URI,
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Token ' + config.DADATA_API_KEY,
      'X-Secret': config.DADATA_SECRET_KEY,
    },
  }),
});

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       // return;
//     }
//     return error;
//   }
// );

configure({ axios: axiosClient });

// Note: why i created /containers/ folder
// https://github.com/vercel/next.js/issues/3728

// to prevent x scroll on mobile
// Move it to styles directory soon
const styles = {
  '@global': {
    body: {
      color: black,
      height: '100%',
    },
    html: {
      height: '100%',
    },
  },
};

initI18n();

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRouteChangeStart = () => {
    setProgress(0);
    setLoading(true);
  };
  const handleRouteChangeComplete = () => {
    setProgress(100);
    setLoading(false);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    //  unsubscribe
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeStart', handleRouteChangeComplete);
    };
  }, []);

  // utm метки для регистрации
  useEffect(() => {
    const utmDataFromLocalStorage = localStorage.getItem('talantyRegistrationUtm');

    // Удаление utm метки из localstorage по истечению срока
    if (utmDataFromLocalStorage) {
      if (
        isTimePassed(JSON.parse(utmDataFromLocalStorage).createTime, {
          days: JSON.parse(utmDataFromLocalStorage).expirationDays,
        })
      ) {
        localStorage.removeItem('talantyRegistrationUtm');
      }
    }

    // ищем utm метки в адресной строке и засовываем в localstorage
    if (
      Object.prototype.hasOwnProperty.call(router.query, 'utm_source') &&
      Object.prototype.hasOwnProperty.call(router.query, 'utm_medium') &&
      Object.prototype.hasOwnProperty.call(router.query, 'utm_campaign')
    ) {
      const utmData = {
        createTime: new Date().toUTCString(),
        expirationDays: 14,
        data: {
          utm_source: router.query.utm_source,
          utm_medium: router.query.utm_medium,
          utm_campaign: router.query.utm_campaign,
        },
      };

      localStorage.setItem('talantyRegistrationUtm', JSON.stringify(utmData));
      router.replace(router.pathname);
    }
  }, [router]);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (!isLoading) {
          return 100;
        }

        return (oldProgress + 10) % 100;
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Потенциал страны</title>
        <link rel="stylesheet" href="/fonts/inter/fonts.css" />
        <link rel="icon" href="/favicone.svg" />
        <title>Потенциал страны | Трудоустройство на основе рекомендаций</title>
        <meta
          name="description"
          content="Потенциал страны - интеллектуальная платформа, которая оцифрует ваши таланты и поможет найти работу мечты."
        />

        <meta property="og:url" content="https://p-strana.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Потенциал страны | Трудоустройство на основе рекомендаций" key="title" />
        <meta
          property="og:description"
          content="Потенциал страны - интеллектуальная платформа, которая оцифрует ваши таланты и поможет найти работу мечты."
        />
        <meta property="og:image" content="https://p-strana.ru/images/snippet_pStrany.jpg" />
        <meta property="og:image:url" content="https://p-strana.ru/images/snippet_pStrany.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://p-strana.ru" />
        <meta property="twitter:url" content="https://p-strana.ru/" />
        <meta name="twitter:title" content="Потенциал страны | Трудоустройство на основе рекомендаций" key="title" />
        <meta
          name="twitter:description"
          content="Потенциал страны - интеллектуальная платформа, которая оцифрует ваши таланты и поможет найти работу мечты."
        />
        <meta name="twitter:image" content="https://p-strana.ru/images/snippet_pStrany.jpg" />

        {/*<Script src='build/pdfmake.min.js'/>*/}
        {/*<Script src='build/vfs_fonts.js'/>*/}

        {process.env.NEXT_PUBLIC_BUILD_MODE === 'prod' && <NewRelicSnippet />}
        {process.env.NEXT_PUBLIC_BUILD_MODE === 'prod' && <FacebookPixelSnippet />}
        {process.env.NEXT_PUBLIC_BUILD_MODE === 'prod' && <YandexMetricsSnippet />}
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <BalanceProvider>
              {isLoading && <LinearLoader progress={progress} />}
              <ProtectedRoute router={router} pageProps={pageProps} Component={Component} />
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                transition={Slide}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </BalanceProvider>
          </UserProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Fragment>
  );
};

export default withStyles(styles)(MyApp);
