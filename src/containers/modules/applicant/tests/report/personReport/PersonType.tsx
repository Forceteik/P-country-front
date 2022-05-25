import useAxios from 'axios-hooks';

import { Grid, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import AccordionDown from 'components/icons/AccordionDown';
import { OverlayLoader } from 'components/Loaders';
import { useSession } from 'context/UserContext';

import useStyles from '../style';

import FirstPersonBlock from './FirstPersonBlock';

const PersonType = ({ userId, guest }) => {
  const classes = useStyles();

  const [{ data, loading }] = useAxios(`mbti/tests/report/${userId}`);
  const [{ data: userData, loading: uLoading }] = useAxios(`/profile/${userId}`);

  const sessionUser = useSession().currentUser;
  const currentUser = userData?.data || sessionUser;

  if (loading || uLoading) {
    return <OverlayLoader />;
  }

  const typeReport = data.data.result.config_type;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <FirstPersonBlock currentUser={currentUser} typeReport={typeReport} guest={guest} />
      </Grid>
      <Grid item xs={12}>
        {typeReport.report.sections.map((item, key) => (
          <Grid item xs={12} className={classes.row} key={key}>
            <Accordion>
              <AccordionSummary expandIcon={<AccordionDown />}>
                <Typography component="h3" className={classes.accordionTitle}>
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="reportDetails">
                <div dangerouslySetInnerHTML={{ __html: item.html }} />
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default PersonType;
