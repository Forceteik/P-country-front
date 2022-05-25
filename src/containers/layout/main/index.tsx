import { Box, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Header from 'containers/layout/main/components/Header';
import Footer from 'containers/layout/main/components/Footer';

const useStyles = makeStyles<any>(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flexGrow: 1,
  },
}));

/**
 * Если лейаут получает пользователя, значит он получить публичного пользователя
 * @param children
 * @param currentPage
 * @param user
 * @constructor
 */
export const Layout = ({ children, currentPage = null, user = null }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.mainContent}>
        <Container maxWidth={'lg'}>
          <Header currentPage={currentPage} user={user} />
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
