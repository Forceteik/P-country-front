import cx from 'classnames';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';

import { Box, Grid, Typography } from '@mui/material';

import { greenMain, ligthGray, pinkMain } from 'styles/colorPalette';
import PrevLink from 'components/PrevLink';
import { OverlayLoader } from 'components/Loaders';
import { generatePercentColor } from 'containers/modules/applicant/profile/Content/utils';
import { useSession } from 'context/UserContext';
import LineProgress from 'components/LineProgress';
import Layout from 'containers/layout/main';

import useStyles from './style';

const IQReport = () => {
  const classes = useStyles();
  const router: any = useRouter();

  const sessionUserId = useSession().userId;
  const userId = router.query.id || sessionUserId;

  const isGuest = !!router.query.id;

  const [{ data, loading }] = useAxios(`iq/tests/report/${userId}`);
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
                Полный отчет по тестированию интеллекта
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
                  color={generatePercentColor(Math.round(data.data?.iq_integral_indicator?.percent_points || 0))}
                >
                  Интегральный показатель
                </Typography>
              </Grid>
              <Grid item xs={12} lg={7}>
                <LineProgress
                  progress={data.data?.iq_integral_indicator?.percent_points || 0}
                  color={generatePercentColor(Math.round(data.data?.iq_integral_indicator?.percent_points || 0))}
                  label={`${Math.round(data.data?.iq_integral_indicator?.percent_points || 0)}%`}
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
        {data.data.iq_completed.map((item, key) => {
          const progressColor = generatePercentColor(item.result.percent_points);
          let className;
          //@ts-ignore
          if (progressColor === greenMain) {
            className = classes.positiveTitle;
          } else if (progressColor === pinkMain) {
            className = classes.negativeTitle;
          } else {
            className = classes.neutralTitle;
          }
          return (
            <Grid item xs={12} className={classes.abilityRow} key={key}>
              <Box className={classes.boxSummary}>
                <Box className={classes.titleWithIcon}>
                  <img src={item.test.item.image?.original_url} />
                  <Typography className={classes.titleIcon} component="h4">
                    {item.test.item.title}
                  </Typography>
                </Box>
                <Typography className={classes.text}>{item.test.short_description}</Typography>
                <Box mb={2} mt={1}>
                  <LineProgress
                    progress={item.result.percent_points}
                    color={progressColor}
                    label={`${item.result.percent_points}%`}
                  />
                </Box>
                <Box className={classes.textWithTitle}>
                  <Typography className={cx(className, classes.littleTitleWithMark)}>Выводы</Typography>
                  <Typography className={classes.text}>{item.result.description.text}</Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default IQReport;
