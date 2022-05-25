import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Grid } from '@mui/material';

import DoubleSwitch from 'components/DoubleSwitch';
import PrevLink from 'components/PrevLink';
import { useSession } from 'context/UserContext';
import Layout from 'containers/layout/main';
import { OverlayLoader } from 'components/Loaders';

import useStyles from '../style';

import ComandRole from './ComandRole';
import PersonType from './PersonType';

/**
 * If router.query.id is not null, it means that report is viewed by guest (for example by employer)
 * @constructor
 */
const PersonalityReport = () => {
  const classes = useStyles();
  const router: any = useRouter();
  const sessionUserId = useSession().userId;
  const userId = router.query.id || sessionUserId;
  const isGuest = !!router.query.id;

  const [type, setType] = useState(parseInt(router.query?.type) || 0);

  useEffect(() => {
    if (router.query?.type) {
      setType(parseInt(router.query.type));
    }
  }, [router.query?.type]);

  if (!userId) {
    return <OverlayLoader />;
  }

  return (
    <Layout>
      <Box className={classes.mainBox}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
              <Grid item xs={12} sm={'auto'}>
                <PrevLink link={isGuest ? `/applicants/${userId}` : '/applicant'} text={'Назад к профилю'} />
              </Grid>
              <Grid item xs={12} sm={'auto'}>
                <DoubleSwitch
                  items={[
                    {
                      label: 'Тип личности',
                      link: isGuest ? `/applicants/${userId}/reports/mbti?type=0` : '/applicant/mbti/report?type=0',
                    },
                    {
                      label: 'Командная роль',
                      link: isGuest ? `/applicants/${userId}/reports/mbti?type=1` : '/applicant/mbti/report?type=1',
                    },
                  ]}
                  active={type}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {type === 0 ? (
              <PersonType userId={userId} guest={isGuest} />
            ) : (
              <ComandRole userId={userId} guest={isGuest} />
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default PersonalityReport;
