import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, useMediaQuery } from '@mui/material';

import profileStyle from 'containers/modules/common/profile/style';
import AccordionDown from 'components/icons/AccordionDown';
import { ProfileTitle } from 'components/Titles';
import CompetencyInfo from 'components/CompetencyInfo';
import { useProfile } from 'context/ProfileContext';
import { getUserViewRoles } from 'utils/common';

import Leverages from '../RecommendationsForEmployer/Leverages';
import Interactions from '../RecommendationsForEmployer/Interactions';
import RiskFactors from '../RecommendationsForEmployer/RiskFactors';
import CrisisPoints from '../RecommendationsForEmployer/CrisisPoints';

import CompetencyMatrix from './CompetencyMatrix';
import TestSlider from './Tests/TestSlider';

const TestAndCompetency = ({ user, isOwner, competencyGroup }) => {
  const commonStyle = profileStyle();

  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  const currentUserFromSession = useProfile().currentUser;

  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isEmployer = viewRole.isEmployer;

  const RecommendationsForEmployerRender = (
    <>
      {isEmployer && (
        <>
          {!!user?.leverages && !!user?.leverages.length && (
            <Grid item xs={12}>
              <Leverages leveragesData={user?.leverages} />
            </Grid>
          )}
          {!!user?.interactions && !!user?.interactions.length && (
            <Grid item xs={12}>
              <Interactions interactionsData={user?.interactions} />
            </Grid>
          )}
          {!!user?.risk_factors && !!user?.risk_factors.length && (
            <Grid item xs={12}>
              <RiskFactors riskFactorsData={user?.risk_factors} />
            </Grid>
          )}
          {!!user?.crisis_points && !!user?.crisis_points.length && (
            <Grid item xs={12}>
              <CrisisPoints crisisPointsData={user?.crisis_points} />
            </Grid>
          )}
        </>
      )}
    </>
  );

  return (
    <div id="testPdfComponent">
      <Box className={commonStyle.box} component="section">
        {isSm ? (
          <Accordion>
            <AccordionSummary expandIcon={<AccordionDown />}>
              <ProfileTitle title="Психологический профиль" />
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <CompetencyInfo compatibility={user.compatibility} expectation={user.employee.salary} />
                </Grid>
                <Grid item xs={12}>
                  <CompetencyMatrix user={user} isOwner={isOwner} competencyGroup={competencyGroup} />
                </Grid>
                {RecommendationsForEmployerRender}
                <Grid item xs={12}>
                  <TestSlider user={user} />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <CompetencyMatrix user={user} isOwner={isOwner} competencyGroup={competencyGroup} />
            </Grid>
            {RecommendationsForEmployerRender}
            <Grid item xs={12}>
              <TestSlider user={user} />
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default TestAndCompetency;
