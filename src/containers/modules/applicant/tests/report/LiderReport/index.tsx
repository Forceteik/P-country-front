import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

import { Box, Grid, Typography } from '@mui/material';

import PrevLink from 'components/PrevLink';
import { useSession } from 'context/UserContext';
import Layout from 'containers/layout/main';
import { getUserViewRoles } from 'utils/common';

import LiderTest from '../../../profile/Content/TestAndCompetency/Tests/components/LiderTest';
import useStyles from '../style';

import EmployeeAccordions from './EmployeeAccordions';
import EmployerAccordions from './EmployerAccordions';
import ProfileProvider, { useProfile } from '../../../../../../context/ProfileContext';
import { OverlayLoader } from '../../../../../../components/Loaders';

const LiderReport = () => {
  const classes = useStyles();

  //Здесь важно знать не просто гость/не гость, но и конкретно какая роль у гостя - тк для гостя соискателя будет показываться те же данные что и для владельца-соискателя, а для гостя-работодалетя - другие данные. Поэтому вся эта заморочка с viewRole ниже

  const [user, setUser] = useState(null);

  const sessionUserId = useSession().userId;
  const router: any = useRouter();
  const userId = router.query.id || sessionUserId;

  const { currentUser } = useSession();

  const viewRole = getUserViewRoles({ user, currentUser: currentUser });
  const isGuest = !viewRole.isOwner;
  const isEmployer = viewRole.isEmployer || viewRole.isGuestEmployer;

  const [{ loading: userLoading }, getUser] = useAxios({ method: 'GET' }, { manual: true });

  const [{ data, loading }] = useAxios(`/leadership/tests/report/${userId}`);

  useEffect(() => {
    const { id, vacancy_id } = router.query;
    let url = `/profile/${id}`;
    if (vacancy_id) {
      url += `?vacancy_id=${vacancy_id}`;
    }

    if (id) {
      getUser({ url }).then(({ data }) => {
        setUser(data.data);
      });
    }
  }, [router.query.id]);

  if (loading || userLoading) {
    return <OverlayLoader />;
  }

  return (
    <Layout>
      <Box className={classes.mainBox}>
        <Grid container rowSpacing={5.25}>
          <Grid item xs={12}>
            <Grid container rowSpacing={2}>
              <Grid item>
                <PrevLink link={isGuest ? `/applicants/${userId}` : '/applicant'} text={'Назад к профилю'} />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.subTitleBold}>Полный отчет по тесту лидерства</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container rowSpacing={4}>
              <Grid item xs={12}>
                <ProfileProvider>
                  <WrapperWithProfile user={user} />
                </ProfileProvider>
              </Grid>
              <Grid item xs={12}>
                {isEmployer ? <EmployerAccordions data={data.data} /> : <EmployeeAccordions data={data.data} />}
                <Box>
                  <Typography fontSize={18} fontFamily="inter-bold" mb={3}>
                    Компетенции
                  </Typography>
                  <Box className={classes.competencyBox}>
                    {data.data.test.competencies.map((item, key) => (
                      <Box className={classes.competencyItem} key={key}>
                        <Typography>{item.competency.name}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

const WrapperWithProfile = ({ user }) => {
  const currentUserFromSession = useProfile().currentUser;
  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });

  const currentUser = user || currentUserFromSession;
  return <LiderTest report={true} role={viewRole} user={currentUser} />;
};

export default LiderReport;
