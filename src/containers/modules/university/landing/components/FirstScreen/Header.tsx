import { Box, Hidden } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { SecondaryButton } from 'components/Button';
import HeaderLogo from 'components/HeaderLogo';

import BurgerMenu from '../BurgerMenu';
import Container from '../Container';

const useStyles = makeStyles(() => ({
  headerInner: {
    padding: '24px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Container>
      <Box className={classes.headerInner} component="header">
        <HeaderLogo link={'/university/landing'} />
        <Hidden smDown>
          <SecondaryButton small type="medium">
            Личный кабинет
          </SecondaryButton>
        </Hidden>
        <Hidden smUp>
          <BurgerMenu />
        </Hidden>
      </Box>
    </Container>
  );
};

export default Header;
