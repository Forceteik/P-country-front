import { Grid, Typography, Box } from '@mui/material';

import { useSession } from 'context/UserContext';
import Button from 'components/Button';
import Layout from 'containers/layout/main';

const Recomend = () => {
  const { currentUser } = useSession();
  return (
    <Layout>
      <Grid container justifyContent="center" alignItems="center" mt={12} mb={5}>
        <Grid item xs={12} md={4} textAlign={'center'}>
          <img src="/images/icons/gitlab.png" />
          <Typography component="div">
            Страница находится в разработке. <br />
            Совсем скоро будет готово - мы вас оповестим:&#x29;
          </Typography>
          <Box mt={5}>
            <Button nextLink linkProps={currentUser ? { href: '/applicant' } : { href: '/' }}>
              {currentUser ? 'Вернуться в профиль' : 'Вернуться на главную'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Recomend;
