import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, useMediaQuery } from '@mui/material';

import { getUserViewRoles } from 'utils/common';
import profileStyle from 'containers/modules/common/profile/style';
import AccordionDown from 'components/icons/AccordionDown';
import { ProfileTitle } from 'components/Titles';
import Education from 'containers/modules/applicant/profile/Content/Education/Education';
import Documents from 'containers/modules/common/Documents/Documents';
import ProfSkills from 'containers/modules/applicant/profile/Content/ProfSkills/ProfSkills';
import PersonalSkills from 'containers/modules/applicant/profile/Content/PersonalSkills';
import EducationSkeleton from 'components/skeletons/EducationSkeleton';
import { useProfile } from 'context/ProfileContext';

import Experience from '../../../applicant/profile/Content/Experience';

import ApplicantDescr from './ApplicantDescr';

const About = ({ title, user = null, loading = true }) => {
  const currentUserFromSession = useProfile().currentUser;
  const currentUser = user || currentUserFromSession;
  const data = currentUser.employee?.about_me;
  const additionalEmployeeData = {
    employeeQuestionLeader: currentUser.employee?.question_leader,
    employeeQuestionSuccess: currentUser.employee?.question_success,
    employeeQuestionWork: currentUser.employee?.question_work,
  };
  const personalSkills = currentUser.personal_skills;
  const profSkills = currentUser.qualities;

  const commonStyle = profileStyle();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isOwner = viewRole.isOwner;
  const isGuestOrAnotherEmployee = viewRole.isGuest || viewRole.isGuestApplicant;
  const isGuestEmployer = viewRole.isGuestEmployer;

  return (
    <Box className={commonStyle.box} component="section">
      {isSm ? (
        <Accordion>
          <AccordionSummary expandIcon={<AccordionDown />}>
            <ProfileTitle title={title} />
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={7}>
              <Grid item xs={12}>
                <Education user={user} />
              </Grid>
              <Grid item xs={12}>
                <ApplicantDescr
                  title={title}
                  isOwner={isOwner}
                  data={data}
                  additionalEmployeeData={additionalEmployeeData}
                  labelForm="Расскажите о себе"
                />
              </Grid>
              <Grid item xs={12}>
                <Experience user={user} />
              </Grid>
              {personalSkills?.length > 0 && (
                <Grid item xs={12}>
                  <PersonalSkills personalSkills={personalSkills} />
                </Grid>
              )}
              {((!isOwner && profSkills.length > 0) || isOwner) && (
                <Grid item xs={12}>
                  <ProfSkills title={'Профессиональные навыки'} user={user} />
                </Grid>
              )}
              {(!isGuestOrAnotherEmployee || isOwner || (isGuestEmployer && currentUser.documents?.length > 0)) && (
                <Grid item xs={12}>
                  <Documents user={user} />
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Grid container spacing={5}>
          <Grid item xs={12}>
            {loading ? <EducationSkeleton /> : <Education user={user} />}
          </Grid>
          <Grid item xs={12}>
            {!loading && (
              <ApplicantDescr
                title={title}
                isOwner={isOwner}
                data={data}
                additionalEmployeeData={additionalEmployeeData}
                labelForm="Расскажите о себе"
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Experience user={user} />
          </Grid>
          {personalSkills?.length > 0 && (
            <Grid item xs={12}>
              <PersonalSkills personalSkills={personalSkills} />
            </Grid>
          )}
          {((!isOwner && profSkills.length > 0) || (isOwner && !loading)) && (
            <Grid item xs={12}>
              <ProfSkills title={'Профессиональные навыки'} user={user} />
            </Grid>
          )}
          {(!isGuestOrAnotherEmployee || isOwner || (isGuestEmployer && currentUser.documents?.length > 0)) &&
            !loading && (
              <Grid item xs={12}>
                <Documents user={user} />
              </Grid>
            )}
        </Grid>
      )}
    </Box>
  );
};

export default About;
