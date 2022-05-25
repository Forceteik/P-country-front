import { useState } from 'react';
import cx from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ShowTaskModal from 'containers/modules/common/modals/ShowTaskModal';
import AddTask from 'containers/modules/common/modals/AddTask';
// import { getUserViewRoles } from 'utils/common';
// import { useProfile } from 'context/ProfileContext';
import { useTaskStyles } from 'containers/modules/employer/profile/Tasks/style';
import { blueLight, blueMain } from 'styles/colorPalette';

import CourseItem from './CourseItem';

const mockCourses = [
  {
    id: 1,
    name: 'Название ДПО',
    description:
      'Текст-заполнитель — это текст, который имеет некоторые характеристики Еще текст для проверки екст-заполнитель — это текст, который имеет некото',
    link: 'www.gazprom.ru',
  },
  {
    id: 2,
    name: 'Название ДПО',
    description: '',
    link: 'www.gazprom.ru',
  },
  {
    id: 3,
    name: 'Название ДПО',
    description: 'Текст-заполнитель — это текст, который имеет некоторые характеристики реального ',
    link: '',
  },
  {
    id: 4,
    name: 'Название ДПО',
    description: 'Текст-заполнитель — это текст, который имеет некоторые характеристики реального ',
    link: 'www.gazprom.ru',
  },
  {
    id: 5,
    name: 'Название ДПО',
    description: '',
    link: 'www.gazprom.ru',
  },
  {
    id: 6,
    name: 'Название ДПО',
    ddescription: 'Текст-заполнитель — это текст, который имеет некоторые характеристики реального ',
    link: '',
  },
];

const useCoursesStyles = makeStyles<any>((theme) => ({
  slickDots: {
    'margin': 0,
    'padding': 0,
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'center',
    'position': 'absolute',
    'top': -60,
    'right': 35,
    '& li': {
      padding: theme.spacing(0.5),
    },
    '& li button': {
      cursor: 'pointer',
      border: 'none',
      backgroundColor: blueLight,
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      fontSize: 0,
      display: 'inline-block',
      padding: 0,
    },
    '& li button:before': {
      display: 'none',
    },
    '& li.slick-active button': {
      backgroundColor: blueMain,
      width: '16px',
      height: '8px',
      borderRadius: 8,
    },
  },
}));

const Сourses = () => {
  // const currentUserFromSession = useProfile().currentUser;
  // const currentUser = user || currentUserFromSession;

  // const { documents } = currentUser;
  const [openTaskShow, setOpenTaskShow] = useState(false);
  const [showItem, setShowItem] = useState(0);

  // const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  // const isGuest = !viewRole.isOwner;

  // const length = isGuest ? documents?.length - 1 : documents?.length;

  const length = mockCourses.length;
  const classes = useTaskStyles({ length });
  const coursesStyles = useCoursesStyles();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.titleText}>Дополнительные курсы</Typography>
      <Slider dotsClass={cx('slick-dots', coursesStyles.slickDots)} {...settings}>
        <AddTask sliderItem university />
        {mockCourses.map((item, key) => (
          <CourseItem
            item={item}
            key={key}
            setOpenTaskShow={setOpenTaskShow}
            hadleInitial={() => setShowItem(key)}
            // guest={isGuest}
          />
        ))}
      </Slider>
      {mockCourses.length > 0 && (
        <ShowTaskModal item={mockCourses[showItem]} openTaskShow={openTaskShow} setOpenTaskShow={setOpenTaskShow} />
      )}
    </Box>
  );
};

export default Сourses;
