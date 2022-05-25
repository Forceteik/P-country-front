import Slider from 'react-slick';
import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { Box, Typography, useMediaQuery } from '@mui/material';

import TestChart from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/TestChart';
import PersonalTest from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/PersonalTest';
import CommandRole from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/CommandRole';
import StandardTest from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/StdTest';
import slickDotsStyle from 'containers/modules/common/styles/slickDotsStyle';
import CorpValuesResult from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/CorpValuesResult';
import CorpValuesLevels from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/CorpValuesLevels';

import LiderTest from '../components/LiderTest';

import { IQ_SUB_TEST_COUNT, SOCIAL_SUB_TEST_COUNT } from 'constants/common';
import { getUserViewRoles } from 'utils/common';

import 'slick-carousel/slick/slick.css';
import { useProfile } from 'context/ProfileContext';

import { generateIQData, generateSocialData } from '../../../utils';

import { useSliderStyles } from './sliderStyles';

/**
 * Примечаение:
 * По каким то непонятным причинам, если первый слайдер будет PersonalTest (а именно PersonalSlider), то ломается показ второго слайдера
 * Но если переместить PersonalTest например на 2,3 или n-ный слайдер. то все работает норм.
 * Поэтому было принято решение создать "нулевой" слайдер, который никогда не отобразиться, но будет рендериться
 * @param user
 * @constructor
 */
const TestSlider = ({ user = null }) => {
  const classes = useSliderStyles({ length: 10 });
  const dotsStyle = slickDotsStyle();
  const currentUserFromSession = useProfile().currentUser;
  const currentUser = user || currentUserFromSession;
  const [index, setIndex] = useState(1);
  const sliderRef = useRef(null);
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isGuest = !viewRole.isOwner;

  const countIQFinished = currentUser.iq.filter((item) => item.status === 'completed').length;
  const socialCountFinished = currentUser.gilford.filter((item) => item.status === 'completed').length;

  const IQData = generateIQData(currentUser.iq);
  const socialData = generateSocialData(currentUser.gilford);

  // Если по каким то причинам мы оказалсиь на пустом нулевом слайдере, всегда переходм к следующему
  useEffect(() => {
    if (index === 0) {
      setTimeout(() => {
        sliderRef.current.slickNext();
      }, 100);
    }
  }, [index]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    initialSlide: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    beforeChange: (old, newIndex) => {
      setIndex(newIndex);
    },
    responsive: [
      {
        breakpoint: 960,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box className={classes.root} component="section">
      <Typography className={classes.title}>Результаты тестирования</Typography>
      <Slider
        className={classes.slick}
        ref={sliderRef}
        dotsClass={isMd ? cx('slick-dots', dotsStyle.slickDots) : cx('slick-dots', classes.slickDots)}
        {...settings}
      >
        <Box px={2} />
        <Box px={2}>
          <PersonalTest
            title={'Тестирование личности'}
            user={currentUser}
            guest={isGuest}
            fullReportHref={isGuest ? `/applicants/${currentUser.id}/reports/mbti` : '/applicant/mbti/report'}
          />
        </Box>
        <Box px={2}>
          <CommandRole
            user={currentUser}
            guest={isGuest}
            fullReportHref={
              isGuest ? `/applicants/${currentUser.id}/reports/mbti?type=1` : '/applicant/mbti/report?type=1'
            }
          />
        </Box>
        <Box px={2}>
          <LiderTest
            user={currentUser}
            role={viewRole}
            guest={isGuest}
            fullReportHref={
              isGuest ? `/applicants/${currentUser.id}/reports/leadership` : '/applicant/leadership/report'
            }
          />
        </Box>
        <Box px={2}>
          <TestChart
            title={'Тестирование интеллекта'}
            items={IQData}
            user={currentUser}
            countFinished={countIQFinished}
            countTotal={IQ_SUB_TEST_COUNT}
            startTestHref={'/applicant/tests/3'}
            fullReportHref={isGuest ? `/applicants/${currentUser.id}/reports/iq` : '/applicant/iq/report'}
            guest={isGuest}
            type={'iq'}
          />
        </Box>
        <Box px={2}>
          <CorpValuesResult user={currentUser} guest={isGuest} />
        </Box>
        {/* <Box px={2}>
         <Professions user={currentUser} guest={isGuest} />
        </Box> */}
        <Box px={2}>
          <CorpValuesLevels user={currentUser} guest={isGuest} />
        </Box>
        {/*Убрано с платформы по этой задаче https://www.notion.so/preontech/4eae3b32fb3a409ab0c31716327e9389?v=cd4adfe56738418985faaba5927c3460&p=7186d4de5c3d44f78301f99b8c51d6f3*/}
        {/*<Box px={2}*/}
        {/*  <TestChart*/}
        {/*    title={"Тест оценки способностей"}*/}
        {/*    items={abilityData}*/}
        {/*    user={currentUser}*/}
        {/*    countFinished={countAbilityFinished}*/}
        {/*    countTotal={ABILITY_SUB_TEST_COUNT}*/}
        {/*    startTestHref={"/applicant/tests/2"}*/}
        {/*    fullReportHref={isGuest ? `/applicants/${currentUser.id}/reports/ability` : "/applicant/ability/report"}*/}
        {/*    guest={isGuest}*/}
        {/*    type={"ability"}*/}
        {/*  />*/}
        {/*</Box>*/}
        <Box px={2}>
          <StandardTest
            title={'Виды мотивации'}
            done={currentUser.motivation?.status === 'completed'}
            items={currentUser.motivation?.result_scales.map((item) => ({
              value: item.point_percent || 0,
              label: item.scale.name,
            }))}
            guest={isGuest}
            fullReportHref={
              isGuest ? `/applicants/${currentUser.id}/reports/motivation` : '/applicant/motivation/report'
            }
            startTestHref={'/applicant/tests/4'}
          />
        </Box>
        <Box px={2}>
          <StandardTest
            title={'Тест самодетерминации'}
            done={currentUser.determination?.status === 'completed'}
            items={currentUser.determination?.result.map((item) => ({
              value: item.points || 0,
              label: item.scale.name,
            }))}
            guest={isGuest}
            fullReportHref={
              isGuest ? `/applicants/${currentUser.id}/reports/determination` : '/applicant/determination/report'
            }
            startTestHref={'/applicant/tests/5'}
          />
        </Box>
        <Box px={2}>
          <StandardTest
            title={'Тест эмоционального интеллекта'}
            done={currentUser.hall?.status === 'completed'}
            items={currentUser.hall?.result.map((item) => ({
              value: item.results || 0,
              label: item.scale.name,
            }))}
            guest={isGuest}
            fullReportHref={isGuest ? `/applicants/${currentUser.id}/reports/hall` : '/applicant/hall/report'}
            startTestHref={'/applicant/tests/6'}
          />
        </Box>
        <Box px={2}>
          <TestChart
            title={'Тест социального интеллекта'}
            items={socialData}
            user={currentUser}
            countFinished={socialCountFinished}
            countTotal={SOCIAL_SUB_TEST_COUNT}
            startTestHref={'/applicant/tests/7'}
            fullReportHref={isGuest ? `/applicants/${currentUser.id}/reports/social` : '/applicant/social/report'}
            guest={isGuest}
            type={'gilford'}
          />
        </Box>
      </Slider>
    </Box>
  );
};

export default TestSlider;
