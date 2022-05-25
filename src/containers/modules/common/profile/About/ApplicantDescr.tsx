import { useEffect, useState } from 'react';

import { Box, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import EditButton from 'containers/modules/common/profile/EditButton';
import AboutForm from 'containers/modules/common/profile/AboutForm';
import AccordionDown from 'components/icons/AccordionDown';
import profileStyle from 'containers/modules/common/profile/style';
import { blueMain, darkGray, gray, midDarkGray, black } from 'styles/colorPalette';

const useStyles = makeStyles<any, any>((theme) => ({
  desc: {
    color: darkGray,
    whiteSpace: 'pre-line',
  },
  desc_null: {
    'color': midDarkGray,
    'whiteSpace': 'pre-line',
    '& p:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  showAll: {
    marginTop: theme.spacing(2),
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  showAllText: {
    marginRight: theme.spacing(1.5),
    fontFamily: 'inter-med',
  },
  icon: {
    transition: 'all 0.3s',
    transform: ({ fullView }) => (fullView ? 'rotate(180deg)' : 'rotate(0deg)'),
  },
  titleWithIcon: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  textBox: {
    textOverflow: 'elipsis',
    overflow: 'hidden',
    display: 'box',
    boxOrient: 'vertical',
  },
  redactingText: {
    color: blueMain,
    marginTop: theme.spacing(2),
    cursor: 'pointer',
  },
  employeeQuestionTitle: {
    fontWeight: 500,
    color: black,
    fontFamily: 'inter-bold',
    whiteSpace: 'pre-line',
  },
  employeeQuestionContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderTop: `1px solid ${gray}`,
  },
  employeeQuestionText: {
    color: darkGray,
    whiteSpace: 'pre-line',
    marginTop: theme.spacing(1),
  },
}));

const ABOUT_LINE_HEIGHT = '20px';
const additionalEmployeeDataInitial = {
  employeeQuestionLeader: '',
  employeeQuestionSuccess: '',
  employeeQuestionWork: '',
};

const ApplicantDescr = ({
  title,
  isOwner,
  employer = false,
  university = false,
  data,
  labelForm = 'Описание',
  additionalEmployeeData = additionalEmployeeDataInitial,
}) => {
  const [fullView, setFullView] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [aboutHeight, setAboutHeight]: any = useState(60);
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  //если строк больше 3, нужно отобразить кнопку Показать еще.
  const [lines, setLines] = useState(0);

  const commonStyle = profileStyle();
  const classes = useStyles({ fullView });

  useEffect(() => {
    calculateLines();
    if (editMode) {
      setAboutHeight('100%');
    } else {
      setAboutHeight(120);
    }
  }, [editMode, data]);

  const handleToggleEditForm = () => {
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setFullView(false);
    setEditMode(false);
  };

  const handleFullView = () => {
    if (fullView) {
      setAboutHeight(120);
    } else {
      setAboutHeight('100%');
    }
    setFullView(!fullView);
  };

  const calculateLines = () => {
    const el = document.getElementById('about-company');
    const elNull = document.getElementById('about-company-null');
    if (el) {
      const divHeight = el.offsetHeight;
      const lineHeight = 20;
      const lines = divHeight / lineHeight;
      setLines(lines);
    } else if (elNull) {
      const divHeight = elNull.offsetHeight;
      const lineHeight = 20;
      const lines = divHeight / lineHeight;
      setLines(lines);
    }
  };

  return (
    <Box>
      <Box className={classes.titleWithIcon}>
        <Typography className={commonStyle.blockTitleAbout} component="h2">
          {title}
        </Typography>
        {isOwner && !isSm && <EditButton handleClick={handleToggleEditForm} />}
      </Box>

      <Box className={fullView ? '' : editMode ? '' : classes.textBox} maxHeight={isSm ? 'none' : aboutHeight}>
        {/* Редактируем */}
        {editMode && <AboutForm handleCancel={handleCloseForm} label={labelForm} />}
        {/* Есть инфа о себе, не редактируем */}
        {!!data && !editMode && (
          <Typography className={classes.desc} id="about-company" lineHeight={ABOUT_LINE_HEIGHT}>
            {data}
          </Typography>
        )}
        {/* Нет инфы о себе, соискатель, просматривающий - владелец страницы */}
        {!data && !editMode && !employer && !university && isOwner && (
          <Box className={classes.desc_null}>
            <Typography>Заполните информацию о себе, чтобы увеличить шанс на получение работы.</Typography>
          </Box>
        )}
        {/* Нет инфы о себе, работодатель, просматривающий - владелец страницы */}
        {!data && !editMode && employer && isOwner && (
          <Box className={classes.desc_null} id="about-company-null" lineHeight={ABOUT_LINE_HEIGHT}>
            <Typography>
              Приветствуем Вас на платформе Потенциал страны 👋🏻 <br /> Чтобы найти самого подходящего сотрудника,
              предлагаем начать с заполнения поля «О компании».
            </Typography>
            <Typography>
              Опишите в нем миссию и основные преимущества, чтобы сформировать четкое представление о вашей компании для
              соискателя.
            </Typography>
            <Typography>
              Большинство соискателей, прежде чем откликнуться на вакансию или принять приглашение на собеседование,
              знакомятся с информацией, указанной на презентационной странице вашей компании, поэтому цепляющее описание
              компании повысит доверие к вашим вакансиям!
            </Typography>
            <Typography>
              Затем составьте и опубликуйте вакансию. Ориентируясь на полученную информацию, наши алгоритмы отправят ее
              кандидатам, которые максимально подходят для вас. Так вы найдете своего идеального сотрудника, а он найдет
              своего идеального работодателя.
            </Typography>
            <Typography>
              Обязательно укажите актуальные контакты, чтобы отвечать соискателям как можно быстрей: сайт, ссылку на
              Telegram и другие способы связи.
            </Typography>
          </Box>
        )}

        {!data && !editMode && university && isOwner && (
          <Box className={classes.desc_null} id="about-company-null" lineHeight={ABOUT_LINE_HEIGHT}>
            <Typography>Укажите информацию об образовательной организации</Typography>
          </Box>
        )}

        {/* Нет инфы о себе, работодатель, просматривающий - гость */}
        {!data && !editMode && employer && !isOwner && (
          <Box className={classes.desc_null}>
            <Typography>Работодатель еще не заполнил информацию о себе</Typography>
          </Box>
        )}
        {/* Нет инфы о себе, работодатель, просматривающий - гость */}
        {!data && !editMode && !employer && !isOwner && (
          <Box className={classes.desc_null}>
            <Typography>Кандидат еще не заполнил информацию о себе</Typography>
          </Box>
        )}
      </Box>

      {!editMode && !isSm && (
        <Box className={classes.showAll} onClick={handleFullView} marginBottom={3}>
          {lines > 6 && (
            <>
              {fullView ? (
                <Typography className={classes.showAllText}>Скрыть</Typography>
              ) : (
                <Typography className={classes.showAllText}> Читать все</Typography>
              )}
              <Box className={classes.icon}>
                <AccordionDown />
              </Box>
            </>
          )}
        </Box>
      )}

      {/*Блоки соискателя. Ответы на 3 контрольных вопроса о себе и своем опыте*/}
      {!editMode && !!data && !!additionalEmployeeData?.employeeQuestionLeader && (
        <Box className={classes.employeeQuestionContainer}>
          <Typography className={classes.employeeQuestionTitle} component="h2">
            Руководитель дал вам задание, но вы его не выполнили. С чем это может быть связано?
          </Typography>
          <Typography className={classes.employeeQuestionText} id="employeeQuestionLeader">
            {additionalEmployeeData.employeeQuestionLeader}
          </Typography>
        </Box>
      )}
      {!editMode && !!data && !!additionalEmployeeData?.employeeQuestionSuccess && (
        <Box className={classes.employeeQuestionContainer}>
          <Typography className={classes.employeeQuestionTitle} component="h2">
            Как вы поймёте, что добились успеха?
          </Typography>
          <Typography className={classes.employeeQuestionText} id="employeeQuestionSuccess">
            {additionalEmployeeData.employeeQuestionSuccess}
          </Typography>
        </Box>
      )}
      {!editMode && !!data && !!additionalEmployeeData?.employeeQuestionWork && (
        <Box className={classes.employeeQuestionContainer}>
          <Typography className={classes.employeeQuestionTitle} component="h2">
            Что для вас главное в работе?
          </Typography>
          <Typography className={classes.employeeQuestionText} id="employeeQuestionWork">
            {additionalEmployeeData.employeeQuestionWork}
          </Typography>
        </Box>
      )}

      {isSm && isOwner && !editMode && (
        <Typography className={classes.redactingText} onClick={handleToggleEditForm}>
          Редактировать
        </Typography>
      )}

      {/* Новыя фича с доп вопросами при описании О себе! Появится если раскоментить */}
      {/* {!editMode && !employer && <Questions data={fakeProfileData} />} */}
    </Box>
  );
};

export default ApplicantDescr;
