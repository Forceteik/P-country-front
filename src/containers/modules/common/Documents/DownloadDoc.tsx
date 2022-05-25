import { Box, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

import DownloadIcon from 'components/icons/DownloadDoc';

const useStyles = makeStyles(() => ({
  box: {
    '& .MuiIconButton-root': {
      'padding': '6.2px',
      'backgroundColor': 'rgba(0, 0, 0, 0.6)',
      'borderRadius': '12px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
  },
}));

const DownloadDoc = ({ url }) => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <a href={url} target="_blank" rel="noreferrer">
        <IconButton size="large">
          <DownloadIcon fontSize="24" />
        </IconButton>
      </a>
    </Box>
  );
};

export default DownloadDoc;
