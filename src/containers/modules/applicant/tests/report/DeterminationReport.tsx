import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';

import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, List, ListItem } from '@mui/material';

import { useSession } from 'context/UserContext';
import LineProgress from 'components/LineProgress';
import AccordionDown from 'components/icons/AccordionDown';
import { OverlayLoader } from 'components/Loaders';
import { generatePercentColor } from 'containers/modules/applicant/profile/Content/utils';
import Layout from 'containers/layout/main';
import PrevLink from 'components/PrevLink';

import useStyles from './style';

const DeterminationReport = () => {
  const classes = useStyles();
  const router: any = useRouter();

  const sessionUserId = useSession().userId;
  const userId = router.query.id || sessionUserId;

  const isGuest = !!router.query.id;

  const [{ data, loading }] = useAxios(`/determination/tests/report/${userId}`);
  if (loading) {
    return <OverlayLoader />;
  }

  return (
    <Layout>
      <Grid container alignItems="center" justifyContent="space-between" className={classes.firstAbilityRow}>
        <Grid item xs={12} className={classes.abilityRow}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <PrevLink link={isGuest ? `/applicants/${userId}` : '/applicant'} text={'Назад к профилю'} />
            </Grid>
            <Grid item xs={12}>
              <Typography component="h1" className={classes.subTitleBold}>
                Полный отчет по тесту самодетерминации
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {data.data.scales.map((item, key) => {
          const color = generatePercentColor(item.result?.points || 0);
          let listClassName = 'reportPositiveList';

          if (item.result?.points <= 30) {
            listClassName = 'reportNegativeList';
          }
          if (item.result?.points > 30 && item.result?.points <= 80) {
            listClassName = 'reportOrangeList';
          }

          return (
            <Grid item xs={12} className={classes.abilityRow} key={key}>
              <Accordion className="determination">
                <AccordionSummary className={classes.accordionSummmary}>
                  <Box className={classes.titleWithIcon}>
                    {item.smile}
                    <Typography className={classes.titleIcon} component="h4">
                      {item.name}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <LineProgress progress={item.result?.points} color={color} label={`${item.result?.points}%`} />
                  </Box>
                  <List className={`reportList ${listClassName}`}>
                    {item.result.descriptions.map((item, key) => (
                      <ListItem key={key}>
                        <Typography>{item.text}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Box className={classes.accordionDown}>
                    <Typography className={classes.accordionDownTitle}>Полное описание</Typography>
                    <Box className={classes.accordionDownIcon}>
                      <AccordionDown />
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className="reportDetails">
                  <List className="reportList reportNeutralList">
                    {item.sub_scales.map((item, key) => (
                      <ListItem key={key}>
                        <Typography>{item.result.description.text}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default DeterminationReport;
