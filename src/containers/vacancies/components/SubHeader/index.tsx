import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';
import { useRouter } from 'next/router';
import isEmpty from 'lodash.isempty';

import { Typography, Box } from '@mui/material';

import AccordionDone from 'components/icons/AccordionDone';
import { useProfile } from 'context/ProfileContext';

import { useSubHeaderStyles } from './style';

import { withClearPagination } from 'utils/common';

import 'slick-carousel/slick/slick.css';

const items: any = [
  {
    id: 0,
    name: 'Волонтёрство',
    number: 2420,
    img: '/images/vacancies/item-1.png',
    color: '#9566F8',
    query: {
      'experience[]': ['1', '2'],
      'employment_types[]': ['2', '4', '5'],
      'predefined_filter_id': 0,
    },
  },
  {
    id: 1,
    name: 'Удаленная работа',
    number: 20,
    img: '/images/vacancies/item-2.png',
    color: '#25C88D',
    query: {
      'work_schedules[]': ['2'],
      'predefined_filter_id': 1,
    },
  },
  {
    id: 2,
    name: 'Стажировка',
    number: 2420,
    img: '/images/vacancies/item-3.png',
    color: '#66BAF8',
    query: {
      'employment_types[]': ['5'],
      'predefined_filter_id': 2,
    },
  },
  //Оля - попросили убрать, но пока не хочу удалять
  // {
  //   id: 4,
  //   name: 'Высокая зарплата',
  //   number: 53,
  //   img: '/images/vacancies/item-4.png',
  //   color: '#606EEB',
  //   query: {
  //     salary: 150000,
  //     predefined_filter_id: 4,
  //   },
  // },
];

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2.5,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1.7,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1.25,
        dots: false,
        arrows: false,
      },
    },
  ],
};

const SubHeader = () => {
  const router: any = useRouter();
  //При клике на слайд в слайдере появляется галочка что эта категория выбрана и небольшое затемнение. При повторном клике на тот же слайд выбор пропадает. Не увидела в ТЗ можно ли выбрать несколько категорий одноременно
  const [chooseSlide, setChooseSlide] = useState(-1);
  const profile = useProfile();

  const handleChoose = (i, query) => {
    let finalQuery = { ...withClearPagination(router.query) };

    // Если активный слайд отличается от того, что было выбрано, то переписываем его
    // Если активный слайд = выбранный слайд, то удаляем его
    if (i !== chooseSlide) {
      setChooseSlide(i);

      // Удаляем фильтр активного слайда
      const activeItem = items.find((item) => item.id === chooseSlide);
      if (activeItem) {
        Object.keys(activeItem.query).forEach((item) => {
          delete finalQuery[item];
        });
      }

      // Если в расширенном поиске выбраны опции, то их нужно удалить START
      if (finalQuery.activity_id) {
        delete finalQuery.activity_id;
      }

      if (finalQuery.salary) {
        delete finalQuery.salary;
      }

      if (finalQuery['work_schedules[]']) {
        delete finalQuery['work_schedules[]'];
      }

      if (finalQuery['experience[]']) {
        delete finalQuery['experience[]'];
      }

      if (finalQuery['employment_types[]']) {
        delete finalQuery['employment_types[]'];
      }
      // Если в расширенном поиске выбраны опции, то их нужно удалить END

      finalQuery = { ...finalQuery, ...query };

      router.push({ query: finalQuery });
    } else {
      setChooseSlide(-1);

      Object.keys(query).forEach((item) => {
        delete finalQuery[item];
      });

      if (isEmpty(finalQuery)) {
        router.replace(router.pathname);
      } else {
        router.push({ query: finalQuery });
      }
    }
  };

  useEffect(() => {
    if (router.query?.predefined_filter_id) {
      setChooseSlide(parseInt(router.query.predefined_filter_id));
    } else {
      setChooseSlide(-1);
    }
  }, [router.query]);

  const finalItems = [...items];

  const length = finalItems.length;
  const classes = useSubHeaderStyles({ length });

  if (profile.currentUser.employee.city) {
    const city = profile.currentUser.employee.city;
    finalItems.push({
      id: 3,
      name: 'В моем городе',
      number: 2420,
      img: '/images/vacancies/item-5.png',
      color: '#FE9472',
      query: {
        city_id: city.id,
        city_name: city.name,
        city_code: city.code,
        predefined_filter_id: 3,
      },
    });
  }

  return (
    <>
      <Typography component="h1" className={classes.mainTitle}>
        Вакансии
      </Typography>
      <Box className={classes.slider}>
        <Slider dotsClass={cx('slick-dots', classes.slickDots)} {...settings}>
          {finalItems.map((item, i) => (
            <Box key={i} onClick={() => handleChoose(i, item.query)}>
              <Box
                className={
                  chooseSlide === item.id ? cx(classes.sliderItemInner, classes.sliderChoosen) : classes.sliderItemInner
                }
                bgcolor={item.color}
              >
                <img src={item.img} width="64" height="64" alt="preinstalled-filter-icon" />
                <Box className={classes.itemText}>
                  <Box display="flex" alignItems="flex-start">
                    <Typography className={classes.itemInfo}>{item.name}</Typography>
                    <Box className={classes.check}>
                      <AccordionDone color={'#fff'} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default SubHeader;
