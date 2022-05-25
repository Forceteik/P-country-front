import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import cx from 'classnames';

import { Box, Grid, Typography, Accordion } from '@mui/material';

import { OverlayLoader } from 'components/Loaders';
import { generatePercentColor } from 'containers/modules/applicant/profile/Content/utils';
import PrevLink from 'components/PrevLink';
// import Star from "components/icons/Star";
import { useSession } from 'context/UserContext';
import Layout from 'containers/layout/main';
import LineProgress from 'components/LineProgress';
import { greenMain, ligthGray, pinkMain } from 'styles/colorPalette';

import useStyles from './style';

const SocialReport = () => {
  const classes = useStyles();
  const router: any = useRouter();

  const sessionUserId = useSession().userId;
  const userId = router.query.id || sessionUserId;

  const isGuest = !!router.query.id;

  const [{ data, loading }] = useAxios(`/gilford/tests/report/${userId}`);

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
                Полный отчет по тесту социального интеллекта
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
                  color={generatePercentColor(Math.round(data.data?.integral_indicator?.percent_points))}
                >
                  Интегральный показатель
                </Typography>
              </Grid>
              <Grid item xs={12} lg={7}>
                <LineProgress
                  progress={data.data?.integral_indicator?.percent_points}
                  color={generatePercentColor(Math.round(data.data?.integral_indicator?.percent_points))}
                  label={`${Math.round(data.data?.integral_indicator?.percent_points)}%`}
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
        <Grid item xs={12}>
          <Typography className={classes.socialDescr}>{data.data?.integral_indicator?.description?.text}</Typography>
        </Grid>
        {data.data.gilford_completed.map((item, key) => {
          const progressColor = generatePercentColor(item.result.points_percent);
          let color;
          //@ts-ignore
          if (progressColor === greenMain) {
            color = classes.positiveTitle;
          } else if (progressColor === pinkMain) {
            color = classes.negativeTitle;
          } else {
            color = classes.neutralTitle;
          }
          return (
            <Grid item xs={12} className={classes.abilityRow} key={key}>
              {/*todo: тут по хорошему надо обычный div оформить. */}
              <Accordion>
                <Box className={classes.accordionSummmary}>
                  <Box className={classes.titleWithIcon}>
                    <img src={item.test.item.image.original_url} />
                    <Typography className={classes.titleIcon} component="h4">
                      {item.test.name}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <LineProgress
                      progress={item.result.points_percent}
                      color={progressColor}
                      label={`${item.result.points_percent}%`}
                    />
                  </Box>
                  <Typography className={cx(color, classes.descrWithMark)}>{item.result.description?.text}</Typography>
                </Box>
              </Accordion>
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default SocialReport;
