export const IMG_EXTENSIONS = ['jpg', 'jpeg', 'png'];

export const authSwitchOptions = [
  { label: 'Работодатель', link: '/employer/auth' },
  { label: 'Соискатель', link: '/auth' },
];

export const CREATE_VACANCY_TEMPLATE = `<p><strong>Описание вакансии</strong></p><p>Опишите подробно вакансию<span style="color: rgb(230, 0, 0);">*</span></p><p><br></p><p><br></p><p><strong>Мы предлагаем</strong></p><p>Опишите ваше предложение для будущего соискателя<span style="color: rgb(230, 0, 0);">*</span></p><p><br></p><p><br></p><p><strong>Требования к кандидату</strong></p><p>Опишите, какие задачи ждут кандидата на данной позиции<span style="color: rgb(230, 0, 0);">*</span></p>`;

export const sortOptions = [
  // { value: "tests_asc", label: "Соответствию" }, // убрана ввиду изменения ТЗ
  { value: 'salary_desc', label: 'Убыванию зарплат' },
  { value: 'salary_asc', label: 'Возрастанию зарплат' },
  { value: 'date_asc', label: 'Сначала старые' },
  { value: 'date_desc', label: 'Сначала новые' },
];

export const sortOptionsCandidates = [
  // { value: "tests_asc", label: "Соответствию" }, // убрана ввиду изменения ТЗ
  { value: 'experience_asc', label: 'Убыванию опыта' },
  { value: 'experience_desc', label: 'Возрастанию опыта' },
  { value: 'date_asc', label: 'Сначала старые' },
  { value: 'date_desc', label: 'Сначала новые' },
];

export const sortOptionsCandidatesVacancy = [
  //При просмотре кандадатов к конкретной вакансии должы появляться еще сортировка по убыванию Совместимости (она должна быть по умолчанию, и сортировка по возрастанию совсемтимости). Пока скрою пока не готов бэк
  // { value: "compat_asc", label: "Совместимости" },
  // { value: "compat_desc", label: "Возрастанию совместимости" },
  { value: 'experience_asc', label: 'Убыванию опыта' },
  { value: 'experience_desc', label: 'Возрастанию опыта' },
  { value: 'date_asc', label: 'Сначала старые' },
  { value: 'date_desc', label: 'Сначала новые' },
];

export const periodOptions = [
  { value: 'all', label: 'Все время' },
  { value: 'month', label: 'Месяц' },
  { value: 'week', label: 'Неделю' },
  { value: 'three_days', label: '3 дня' },
];

export const responsesOptions = [
  { value: 'new', label: 'Новые' },
  { value: 'invites', label: 'Приглашения' },
  { value: 'rejection', label: 'Отказы' },
  { value: 'in_progress', label: 'В процессе' },
  { value: 'all', label: 'Все' },
];

export const employerResponsesOptions = [
  { value: 'response_new-desc', label: 'Новым откликам' },
  { value: 'date-desc', label: 'Дате' },
  { value: 'name-asc', label: 'Названию' },
  { value: 'views-desc', label: 'Просмотрам' },
];

export const vacancyResponseOptions = [
  { value: 'all', label: 'Все' },
  { value: 'today', label: 'Сегодня' },
  { value: 'week', label: 'За неделю' },
  { value: 'month', label: 'За месяц' },
];

export const GENDER_OPTIONS = [
  {
    value: 1,
    label: 'Мужской',
  },
  {
    value: 2,
    label: 'Женский',
  },
];

export const HEALTH_OPTIONS = [
  { value: 1, label: 'Нет проблем со здоровьем' },
  { value: 2, label: 'Инвалидность 1 группы' },
  { value: 3, label: 'Инвалидность 2 группы' },
  { value: 4, label: 'Инвалидность 3 группы' },
  { value: 5, label: 'Инвалидность 4 группы' },
];

export const EDUCATION_OPTIONS = [
  { value: 1, label: 'Бакалавр' },
  { value: 2, label: 'Магистр' },
  { value: 3, label: 'Нет высшего образования' },
];

export const contactOptions = [
  {
    value: 'phone',
    label: 'Телефон',
    imagePath: '/images/icons/phone.png',
    placeholder: '',
  },
  {
    value: 'site',
    label: 'Мой сайт',
    imagePath: '/images/icons/website.png',
    placeholder: 'https://example.com',
    fixed: 'http://',
  },
  // Убираем из-за блокировки meta
  // {
  //   value: 'instagram',
  //   label: 'Instagram',
  //   imagePath: '/images/icons/instagram.svg',
  //   placeholder: 'https://instagram.com/profile-name',
  // },
  {
    value: 'gitlab',
    label: 'GitLab',
    imagePath: '/images/icons/gitlab.png',
    placeholder: 'https://gitlab.com/profile-name',
  },
  // {
  //   value: 'facebook',
  //   label: 'Facebook',
  //   imagePath: '/images/icons/facebook.svg',
  //   placeholder: 'https://www.facebook.com/profile-name',
  // },
  //Оля - линкедин попросили убрать из контактов, пока скрываю
  // {
  //   value: 'linkedin',
  //   label: 'LinkedIn',
  //   imagePath: '/images/icons/linkedin.png',
  //   placeholder: 'https://www.linkedin.com/in/profile-name',
  // },
  {
    value: 'telegram',
    label: 'Telegram',
    imagePath: '/images/icons/telegram.png',
    placeholder: '@user',
  },
  {
    value: 'whatsapp',
    label: 'WhatsApp',
    imagePath: '/images/icons/whatsapp.png',
    placeholder: '@user',
  },
  {
    value: 'email',
    label: 'Email',
    imagePath: '/images/icons/email.png',
    placeholder: 'name@example.com',
  },
  {
    value: 'vk',
    label: 'Вконтакте',
    imagePath: '/images/icons/vk.png',
    placeholder: 'https://vk.com/profile-name',
  },
];

export const personalTypeDictionary = {
  enfj: 2,
  enfp: 7,
  esfj: 12,
  esfp: 9,
  estj: 11,
  estp: 4,
  infj: 1,
  infp: 4,
  intj: 1,
  intp: 3,
  isfj: 13,
  isfp: 9,
  istj: 13,
  istp: 5,
  entj: 3,
  entp: 3,
};
export const ABILITY_SUB_TEST_COUNT = 4;
export const IQ_SUB_TEST_COUNT = 6;
export const SOCIAL_SUB_TEST_COUNT = 4;

export const educationOptions = [
  {
    value: 'school',
    label: 'Среднее',
    imagePath: '/images/icons/school.png',
  },
  {
    value: 'college',
    label: 'Среднее специальное',
    imagePath: '/images/icons/college.png',
  },
  {
    value: 'bachelor',
    label: 'Бакалавриат',
    imagePath: '/images/icons/education.png',
  },
  {
    value: 'master',
    label: 'Магистратура',
    imagePath: '/images/icons/education.png',
  },
  {
    value: 'specialist',
    label: 'Специалитет',
    imagePath: '/images/icons/education.png',
  },
  {
    value: 'postgraduate',
    label: 'Аспирантура',
    imagePath: '/images/icons/education.png',
  },
  {
    value: 'internship',
    label: 'Ординатура',
    imagePath: '/images/icons/education.png',
  },
  {
    value: 'skills_enhancement',
    label: 'Повышение квалификации',
    imagePath: '/images/icons/education-training.png',
  },
  {
    value: 'professional_retraining',
    label: 'Профессиональная переподготовка',
    imagePath: '/images/icons/education-training.png',
  },
];

export const EDUCATION_RELEASE_TIME = 1642723200;
export const DRAFT_RELEASE_TIME = 1642723200;

export const mockNullCandidats = [
  {
    user: {
      id: 179,
      media: { preview_url: '/images/avatar/nullCandidate.png' },
      name: 'Максим',
      compatibility: { value: 92 },
      surname: 'Петров',
      type: 'employee',
    },
  },
  {
    user: {
      id: 179,
      media: { preview_url: '/images/avatar/nullCandidate.png' },
      name: 'Иван',
      surname: 'Иванов',
      type: 'employee',
      compatibility: { value: 81 },
    },
  },
  {
    user: {
      id: 179,
      media: { preview_url: '/images/avatar/nullCandidate.png' },
      name: 'Олег',
      compatibility: { value: 60 },
      surname: 'Сидоров',
      type: 'employee',
    },
  },
];
