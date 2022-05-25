import Link from 'next/link';

import { Box, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import SettingsIcon from 'components/icons/Settings';
import { gray, midDarkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  settingsContainer: {
    'cursor': 'pointer',
    'padding': '13px 27px',
    'border': `1px solid ${gray}`,
    'borderRadius': 14,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'transition': 'all 0.3s',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 20px',
    },
    '& svg': {
      transition: 'all 0.3s',
    },
    '&:hover': {
      'border': `1px solid ${midDarkGray}`,
      '& svg': {
        transform: 'rotate(90deg)',
      },
    },
    'float': 'right',
  },
}));

const SettingsBtn = ({ link }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <Link href={link}>
      <a>
        <Box className={classes.settingsContainer}>
          <SettingsIcon fontSize={isMobile ? 20 : 24} />
        </Box>
      </a>
    </Link>
  );
};

export default SettingsBtn;
