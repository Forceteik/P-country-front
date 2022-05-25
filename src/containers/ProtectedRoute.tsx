import { useEffect } from 'react';
import redirect from 'nextjs-redirect';
import get from 'lodash.get';

import { useSession } from 'context/UserContext';
import { OverlayLoader } from 'components/Loaders';
import NullPage from 'containers/404/NullPage';
import { APP_ROUTES, AUTH_ROUTES, RouteTypes } from 'constants/routes';

//check if you are on the client (browser) or server
// const isBrowser = () => typeof window !== 'undefined';

const Redirect = redirect('/auth');
const RedirectEmployer = redirect('/employer/auth');

const RedirectEmployerProfile = redirect('/employer/profile');
const RedirectApplicantProfile = redirect('/applicant');
const publicRoutes = APP_ROUTES.filter((item) => item.type == RouteTypes.PUBLIC).map((item) => item.path); //["/", "/team", "/auth"];

/**
 * todo: Слишком запутанная и тяжелая логика, нужно переделать на техдолге. Вот минимальные требования
 * 1. (готово) Если П пытается получить доступ например к профилю будучи незалогиненным - отправлять в /auth
 * 2. (готово) Если регаеться/восстанавливает пароль/логиниться - отправить в профиль (работодателя или соискателя)
 * 3. (готово) Если залогиненный П хотет зайти в /auth(/employer/auth, /restore, register, /employer/register) - возвращаем в профиль
 * 4. (готово, смотреть UserContext - handleLogout) Если П делает logout, отправляем в /employer/auth или /auth
 * 5. Если П пытается получить доступ например к профилю будучи незалогиненным - отправлять в /auth, после успешного
 *    логина переадресовать на тот роут, на который изначально он пытался попасть (в нашем случае профиль).
 *    В идеале, это же логика должна работать если он регистрируется или восстанавливает пароль.
 * 6. (готово) Если П - соискатель и хочет попасть на профиль работодателя - вывести ошибку 404.
 * 7. Другие кейсы которые могут возникнуть.
 *
 * Данная реализация может быть выролнена как здесь, так и в других местах (например в UserContext). Но желательно все
 * сделать в одном месте с коротким комментированием.
 * @param router
 * @param pageProps
 * @param Component
 * @constructor
 */
const ProtectedRoute = ({ router, pageProps, Component }) => {
  const { currentUser, refetch } = useSession();
  const type = get(currentUser, 'type', '');
  const path = get(router, 'pathname', '');

  const pathIsPrivate = publicRoutes.indexOf(path) === -1;
  const isEmployerProtectedRoutes = path.startsWith('/employer') && !path.startsWith('/employers');
  const isApplicantProtectedRoutes =
    (path.startsWith('/applicant') && !path.startsWith('/applicants')) || path.startsWith('/vacancies');

  // синхронизируем логин и логаут в табах браузера
  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'talantyLoginToken') {
        refetch();
      }
    });
  }, []);

  // Если П незалогинен, роут приватный, а роут к которому обращались принадлежит работодателю - редиректим на страницу авторизации работодателя
  if (!currentUser && pathIsPrivate && isEmployerProtectedRoutes) {
    return (
      <RedirectEmployer>
        <OverlayLoader />
      </RedirectEmployer>
    );
  }

  // Если П незалогинен, роут приватный, а роут к которому обращались принадлежит соискателю - редиректим на страницу авторизации соискателя
  if (!currentUser && pathIsPrivate && isApplicantProtectedRoutes) {
    return (
      <Redirect>
        <OverlayLoader />
      </Redirect>
    );
  }

  // Если П залогинен, является работадателем и пытается попасть на страницы авторизации - редиректим на страницу профиля работодателя
  if (currentUser && AUTH_ROUTES.includes(path) && type === 'employer') {
    return (
      <RedirectEmployerProfile>
        <OverlayLoader />
      </RedirectEmployerProfile>
    );
  }

  // Если П залогинен, является соискателем и пытается попасть на страницы авторизации - редиректим на страницу профиля соискателя
  if (currentUser && AUTH_ROUTES.includes(path) && type === 'employee') {
    return (
      <RedirectApplicantProfile>
        <OverlayLoader />
      </RedirectApplicantProfile>
    );
  }

  // Если П залогинен, является работодателем и пытается попасть на приватные страницы соискателя - редиректим на страницу профиля соискателя
  if (currentUser && type === 'employer' && isApplicantProtectedRoutes) {
    return <NullPage />;
  }

  // Если П залогинен, является соискателем и пытается попасть на приватные страницы соискателя - редиректим на страницу профиля работодателя
  if (currentUser && type === 'employee' && isEmployerProtectedRoutes) {
    return <NullPage />;
  }

  return <Component {...pageProps} />;
};

export default ProtectedRoute;
