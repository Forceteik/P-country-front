import cx from 'classnames';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';

import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, List, ListItem } from '@mui/material';

import { OverlayLoader } from 'components/Loaders';
import { generatePercentColor } from 'containers/modules/applicant/profile/Content/utils';
import PrevLink from 'components/PrevLink';
import { useSession } from 'context/UserContext';
import AccordionDown from 'components/icons/AccordionDown';
import Layout from 'containers/layout/main';
import LineProgress from 'components/LineProgress';
import { ligthGray } from 'styles/colorPalette';

import useStyles from './style';

const AbilityReport = () => {
  const classes = useStyles();
  const router: any = useRouter();

  const sessionUserId = useSession().userId;
  const userId = router.query.id || sessionUserId;

  const isGuest = !!router.query.id;

  const [{ data, loading }] = useAxios(`ability/tests/report/${userId}`);

  if (loading) {
    return <OverlayLoader />;
  }

  return (
    <Layout>
      <Grid container alignItems="center" justifyContent="space-between" className={classes.firstAbilityRow}>
        <Grid item xs={12} lg={6} className={classes.abilityRow}>
          <Grid container direction="column">
            <Grid item>
              <PrevLink link={isGuest ? `/applicants/${userId}` : '/applicant'} text={'Назад к профилю'} />
            </Grid>
            <Grid item>
              <Typography component="h1" className={classes.subTitleBold}>
                Полный отчет по тесту способностей
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={5} className={classes.abilityRow}>
          <Box className={classes.badge}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} lg={5}>
                <Typography
                  className={classes.badgeTitle}
                  color={generatePercentColor(Math.round(data.data?.ability_integral_indicator?.percent_points))}
                >
                  Интегральный показатель
                </Typography>
              </Grid>
              <Grid item xs={12} lg={7}>
                <LineProgress
                  progress={data.data?.ability_integral_indicator?.percent_points}
                  color={generatePercentColor(Math.round(data.data?.ability_integral_indicator?.percent_points))}
                  label={`${Math.round(data.data?.ability_integral_indicator?.percent_points)}%`}
                  bgColor={ligthGray}
                />
                {/*<Box className={classes.textBadgeWithIcon}>*/}
                {/*  <Star />*/}
                {/*  <Typography className={classes.textBadge}>Топ 3% среди всех студентов</Typography>*/}
                {/*</Box>*/}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {data.data.ability_completed.map((item, key) => {
          const progressColor = generatePercentColor(item.result.percent_points);
          return (
            <Grid item xs={12} className={classes.abilityRow} key={key}>
              <Accordion>
                <AccordionSummary className={classes.accordionSummmary}>
                  <Box className={classes.titleWithIcon}>
                    <img src={item.test.item.image.original_url} />
                    <Typography className={classes.titleIcon} component="h4">
                      {item.test.item.title}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <LineProgress
                      progress={item.result.percent_points}
                      color={progressColor}
                      label={`${item.result.percent_points}%`}
                    />
                  </Box>
                  <Typography className={classes.paragraph}>{item.result.description.text}</Typography>
                  <Box className={classes.accordionDown}>
                    <Typography className={classes.accordionDownTitle}>Рекомендации по развитию</Typography>
                    <Box className={classes.accordionDownIcon}>
                      <AccordionDown />
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <List className={cx(classes.list, classes.positiveList, classes.topMark)}>
                    {item.test.recommendations.map((item, key) => (
                      <ListItem key={key}>
                        <Typography>{item.text}</Typography>
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

export default AbilityReport;
