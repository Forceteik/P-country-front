import Link from 'next/link';

import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles<any, any>(() => ({
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: ({ left }) => (left ? 'flex-start' : 'center'),
  },
}));

const HeaderLogo = ({ link = '/', left = false }) => {
  const classes = useStyles({ left });
  return (
    <Link href={link}>
      <a>
        <Box className={classes.logo}>
          <img src={'/images/logo/logo.svg'} alt="Логотип Потенциал страны" />
        </Box>
      </a>
    </Link>
  );
};

export default HeaderLogo;
