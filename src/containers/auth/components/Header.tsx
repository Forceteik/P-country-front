import { Box } from '@mui/material';

import useStyles from 'containers/auth/styles';
import HeaderLogo from 'components/HeaderLogo';

const Header = () => {
  const classes = useStyles();
  return (
    <Box className={classes.headerContainer}>
      <Box width="fit-content">
        <HeaderLogo />
      </Box>
    </Box>
  );
};

export default Header;
