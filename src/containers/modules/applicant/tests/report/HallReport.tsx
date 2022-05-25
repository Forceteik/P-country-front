import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';

import { Box, Grid, Typography, List, ListItem } from '@mui/material';

import { useSession } from 'context/UserContext';
import LineProgress from 'components/LineProgress';
import { OverlayLoader } from 'components/Loaders';
import { generatePercentColor } from 'containers/modules/applicant/profile/Content/utils';
import Layout from 'containers/layout/main';
import PrevLink from 'components/PrevLink';

import useStyles from './style';

/**
 * Скопировано с determination report и переделано
 * @constructor
 */
const HallReport = () => {
  const classes = useStyles();
  const router: any = useRouter();

  const sessionUserId = useSession().userId;
  const userId = router.query.id || sessionUserId;

  const isGuest = !!router.query.id;

  const [{ data, loading }] = useAxios(`/hall/tests/report/${userId}`);
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
                Полный отчет по тесту эмоционального интеллекта
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {data.data.result.map((item, key) => {
          const color = generatePercentColor(item.results || 0);
          // let listClassName = "reportPositiveList";

          // if (item.results <= 30) {
          //   listClassName = "reportNegativeList";
          // }
          // if (item.results > 30 && item.results <= 80) {
          //   listClassName = "reportOrangeList";
          // }

          return (
            <Grid item xs={12} className={classes.hallRow} key={key}>
              <Box className={classes.titleWithIcon}>
                <img src={item.scale.media.original_url} alt="" className={classes.imgIcon} />
                <Typography className={classes.hallTitle} component="h4">
                  {item.scale.name}
                </Typography>
              </Box>
              <Box mb={2}>
                <LineProgress progress={item.results} color={color} label={`${item.results}%`} />
              </Box>

              <Box className="determination">
                <List className={`reportList reportPositiveList`}>
                  <ListItem key={key}>
                    <Typography component="p">
                      <Typography component="span" className={classes.strong}>
                        {item.scale.name}{' '}
                      </Typography>
                      {item.scale.description}
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default HallReport;
