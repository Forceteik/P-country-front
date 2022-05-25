import { Grid } from '@mui/material';

import TestChart from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/TestChart';
import PersonalTest from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/PersonalTest';
import CommandRole from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/CommandRole';
// import Professions from "containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/Professions";
import StandardTest from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/StdTest';
import { ProfileTitle } from 'components/Titles';
import CorpValuesResult from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/CorpValuesResult';
import CorpValuesLevels from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/CorpValuesLevels';
import { IQ_SUB_TEST_COUNT, SOCIAL_SUB_TEST_COUNT } from 'constants/common';
import { getUserViewRoles } from 'utils/common';
import CompetencyMatrix from 'containers/modules/applicant/profile/Content/TestAndCompetency/CompetencyMatrix';
import { useProfile } from 'context/ProfileContext';

import { generateIQData, generateSocialData } from '../../utils';

const Tests = ({ user = null }) => {
  const currentUserFromSession = useProfile().currentUser;
  const currentUser = user || currentUserFromSession;
  // const countAbilityFinished = currentUser.ability.filter((item) => item.status === "completed").length;
  const countIQFinished = currentUser.iq.filter((item) => item.status === 'completed').length;
  const socialCountFinished = currentUser.gilford.filter((item) => item.status === 'completed').length;

  // const abilityData = generateAbilityData(currentUser.ability);
  const IQData = generateIQData(currentUser.iq);
  const socialData = generateSocialData(currentUser.gilford);

  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isGuest = !viewRole.isOwner;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <CompetencyMatrix isOwner competencyGroup={currentUser.competencyGroup} />
      </Grid>
      <Grid item xs={12}>
        <ProfileTitle title="Результаты тестирования" />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <PersonalTest
              title={'Тестирование личности'}
              user={currentUser}
              fullReportHref={isGuest ? `/applicants/${currentUser.id}/reports/mbti` : '/applicant/mbti/report'}
              guest={isGuest}
            />
          </Grid>
          <Grid item xs={6} sm={7} lg={8}>
            <CommandRole
              user={currentUser}
              fullReportHref={
                isGuest ? `/applicants/${currentUser.id}/reports/mbti?type=1` : '/applicant/mbti/report?type=1'
              }
              guest={isGuest}
            />
          </Grid>
          {/*<Grid item xs={6} sm={5} lg={4}>*/}
          {/*  <Professions user={currentUser} guest={isGuest} />*/}
          {/*</Grid>*/}
          <Grid item xs={6} sm={7} lg={8}>
            <CorpValuesResult user={currentUser} guest={isGuest} />
          </Grid>
          <Grid item xs={6} sm={5} lg={4}>
            <CorpValuesLevels user={currentUser} guest={isGuest} />
          </Grid>
          {/*Убрано с платформы по этой задаче https://www.notion.so/preontech/4eae3b32fb3a409ab0c31716327e9389?v=cd4adfe56738418985faaba5927c3460&p=7186d4de5c3d44f78301f99b8c51d6f3*/}
          {/*<Grid item xs={12}>*/}
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
          {/*</Grid>*/}
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Tests;
