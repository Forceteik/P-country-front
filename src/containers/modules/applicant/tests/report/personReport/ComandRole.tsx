import useAxios from 'axios-hooks';

import { Box, Grid, Typography, Accordion, AccordionDetails, AccordionSummary, useMediaQuery } from '@mui/material';

import AccordionDown from 'components/icons/AccordionDown';
import { OverlayLoader } from 'components/Loaders';
import { generateRadarData } from 'containers/modules/applicant/profile/Content/utils';
import { useSession } from 'context/UserContext';

import useStyles from '../style';

import FirstPersonBlock from './FirstPersonBlock';

const CommandRole = ({ userId, guest }) => {
  const classes = useStyles();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const [{ data, loading }] = useAxios(`mbti/tests/report/${userId}`);
  const [{ data: userData, loading: uLoading }] = useAxios(`/profile/${userId}`);

  const sessionUser = useSession().currentUser;
  const currentUser = userData?.data || sessionUser;

  if (loading || uLoading) {
    return <OverlayLoader />;
  }

  const typeRole = data.data.result.config_role;
  const additionalRoles = data.data.result.additional_roles;
  const radarData = generateRadarData(data.data.result.result_roles);

  return (
    <Grid container spacing={isSm ? 2 : 4}>
      <Grid item xs={12}>
        <FirstPersonBlock
          currentUser={currentUser}
          typeReport={typeRole}
          guest={guest}
          type="command"
          radarData={radarData}
        />
      </Grid>
      <Grid item xs={12}>
        {typeRole.report.sections.map((item, key) => (
          <Box key={key} className={classes.row}>
            <Accordion>
              <AccordionSummary expandIcon={<AccordionDown />}>
                <Typography component="h3">{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails className="reportDetails">
                <Box dangerouslySetInnerHTML={{ __html: item.html }} />
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
        {additionalRoles.map((item, key) => (
          <Box key={key} className={classes.row}>
            <Accordion>
              <AccordionSummary expandIcon={<AccordionDown />}>
                <Typography component="h3">{key + 1}. Дополнительная роль</Typography>
              </AccordionSummary>
              <AccordionDetails className="reportDetails">
                <Typography className="reportTitleTitle" component="h2">
                  {item.data.report.header}
                </Typography>
                <Box dangerouslySetInnerHTML={{ __html: item.data.report.description }} mb={4} />
                <Box dangerouslySetInnerHTML={{ __html: item.data.report.sections[0].html }} />
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default CommandRole;
