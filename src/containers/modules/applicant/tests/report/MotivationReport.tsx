import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';

import { Box, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, useMediaQuery } from '@mui/material';

import LineProgress from 'components/LineProgress';
import PrevLink from 'components/PrevLink';
import Layout from 'containers/layout/main';
import AccordionDown from 'components/icons/AccordionDown';
import { useSession } from 'context/UserContext';
import { OverlayLoader } from 'components/Loaders';
import { generatePercentColor } from 'containers/modules/applicant/profile/Content/utils';

import useStyles from './style';

const MotivationReport = () => {
  const classes = useStyles();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const router: any = useRouter();

  const sessionUserId = useSession().userId;
  const userId = router.query.id || sessionUserId;

  const isGuest = !!router.query.id;

  const [{ data, loading }] = useAxios(`motivation/tests/report/${userId}`);

  if (loading) {
    return <OverlayLoader />;
  }

  const factors = data.data.result_scales;
  const hard = data.data.hard;
  const medium = data.data.medium;
  const light = data.data.light;

  return (
    <Layout>
      <Grid container alignItems="center" justifyContent="space-between" className={classes.mainGrid}>
        <Grid item xs={12} lg={6} className={classes.abilityRow}>
          <Grid container>
            <Grid item xs={12}>
              <PrevLink link={isGuest ? `/applicants/${userId}` : '/applicant'} text={'Назад к профилю'} />
            </Grid>
            <Grid item xs={12}>
              <Typography component="h1" className={classes.subTitleBold}>
                Полный отчет по тесту мотивации
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.abilityRow}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Box className={classes.motivationInfoBox}>
                <Typography component="p" className={classes.motivationInfoText}>
                  <Typography component="span">Факторы мотивации</Typography>{' '}
                </Typography>
                <Box marginTop={3}>
                  <Grid container spacing={3}>
                    {factors.map((item, key) => (
                      <Grid item xs={12} key={key}>
                        <Grid container spacing={isSm ? 1 : 2} alignItems="center">
                          <Grid item xs={12} sm={4} lg={3}>
                            <Typography key={key} className={classes.progressText}>
                              {item.scale.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={8} lg={9}>
                            <LineProgress
                              progress={item.point_percent}
                              label={Math.round(item.point_percent) + '%'}
                              color={generatePercentColor(item.point_percent)}
                              key={key}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {hard.length > 0 && (
          <Grid item xs={12} className={classes.row}>
            <Accordion>
              <AccordionSummary expandIcon={<AccordionDown />}>
                <Typography component="h3">Доминирующие мотивы рабочей деятельности</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {hard.map((item, key) => (
                  <Box className={classes.textWithTitle} key={key}>
                    <Box className={classes.titleWithIcon}>
                      {item.scale.smiley}
                      <Typography className={classes.titleIcon} component="h4">
                        {item.scale.name}
                      </Typography>
                    </Box>
                    <Typography className={classes.text}>{item.description.text}</Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}

        {medium.length > 0 && (
          <Grid item xs={12} className={classes.row}>
            <Accordion>
              <AccordionSummary expandIcon={<AccordionDown />}>
                <Typography component="h3">Средне выраженные мотивы рабочей деятельности</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {medium.map((item, key) => (
                  <Box className={classes.textWithTitle} key={key}>
                    <Box className={classes.titleWithIcon}>
                      {item.scale.smiley}
                      <Typography className={classes.titleIcon} component="h4">
                        {item.scale.name}
                      </Typography>
                    </Box>
                    <Typography className={classes.text}>{item.description.text}</Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}

        {light.length > 0 && (
          <Grid item xs={12} className={classes.row}>
            <Accordion>
              <AccordionSummary expandIcon={<AccordionDown />}>
                <Typography component="h3">Невыраженные мотивы рабочей деятельности</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {light.map((item, key) => (
                  <Box className={classes.textWithTitle} key={key}>
                    <Box className={classes.titleWithIcon}>
                      {item.scale.smiley}
                      <Typography className={classes.titleIcon} component="h4">
                        {item.scale.name}
                      </Typography>
                    </Box>
                    <Typography className={classes.text}>{item.description.text}</Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};

export default MotivationReport;
