export enum RouteTypes {
  PUBLIC = 0,
  PRIVATE = 1,
}
export const APP_ROUTES = [
  {
    path: '/',
    title: 'Главная',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/auth',
    title: 'Авторизация',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/register',
    title: 'Регистрация',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/restore',
    title: 'Восстановление',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/team',
    title: 'Команда',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/blog',
    title: 'Блог',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/blog/item',
    title: 'Статья',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/privacy',
    title: 'Политика в области обработки персональных данных',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/agreement',
    title: 'Общие положения',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/oferta',
    title: 'Оферта об оказании услуг',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/employer/auth',
    title: 'Авторизация работодателя',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/applicant/register',
    title: 'Регистрация соискателя',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/employer/register',
    title: 'Регистрация работодателя',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/employer/restore',
    title: 'Восстановление',
    type: RouteTypes.PUBLIC,
  },
  // Временно закоментил пока не доделаем бэк часть публичного просмотра профилей
  {
    path: '/applicants/[id]',
    title: 'Профиль соискателя',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/applicants/[id]/reports/mbti',
    title: 'Полный отчет',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/applicants/[id]/reports/ability',
    title: 'Полный отчет',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/applicants/[id]/reports/motivation',
    title: 'Полный отчет',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/applicants/[id]/reports/iq',
    title: 'Полный отчет',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/applicants/[id]/reports/determination',
    title: 'Полный отчет',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/applicants/[id]/reports/hall',
    title: 'Полный отчет',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/applicants/[id]/reports/social',
    title: 'Полный отчет',
    type: RouteTypes.PUBLIC,
  },
  {
    path: '/employers/[id]',
    title: 'Профиль работодателя',
    type: RouteTypes.PUBLIC,
  },
  // {
  //   path: "/vacancies",
  //   title: "Поиск вакансий",
  //   type: RouteTypes.PUBLIC,
  // },
  {
    path: '/vacancies/[id]',
    title: 'Просмотр вакансий',
    type: RouteTypes.PUBLIC,
  },
];

export const AUTH_ROUTES = [
  '/auth',
  '/employer/auth',
  '/register',
  '/employer/register',
  '/applicant/register',
  '/restore',
  '/employer/restore',
];
export const EMPLOYEE_AUTH_ROUTES = ['/auth', '/register', '/restore'];
export const EMPLOYER_AUTH_ROUTES = ['/employer/auth', '/employer/register', '/employer/restore'];
