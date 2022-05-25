import { Box, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Edit from 'components/icons/Edit';

const useStyles = makeStyles<any>((theme) => ({
  box: {
    '& .MuiIconButton-root': {
      'marginRight': theme.spacing(0.5),
      'borderRadius': '12px',
      'backgroundColor': 'rgba(0, 0, 0, 0.6)',
      'padding': theme.spacing(0.8),
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
  },
}));

const DocumentEdit = ({ handleClick }) => {
  const styles = useStyles();
  return (
    <Box className={styles.box}>
      <IconButton onClick={handleClick} size="large">
        <Edit color={'#fff'} fontSize={28} />
      </IconButton>
    </Box>
  );
};

export default DocumentEdit;
