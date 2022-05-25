import useAxios from 'axios-hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { IconButton, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { useSession } from 'context/UserContext';
import Trash from 'components/icons/Trash';

import RemoveModal from '../modals/RemoveModal';

export const useStyles = makeStyles<any>((theme) => ({
  boxIcon: {
    '& .MuiIconButton-root': {
      'borderRadius': '12px',
      'backgroundColor': 'rgba(0, 0, 0, 0.6)',
      'padding': theme.spacing(0.8),
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
  },
}));

const DocumentRemove = ({ itemId, url = null }) => {
  if (!url) {
    url = `employee/profile/document/${itemId}`;
  }
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { refetch } = useSession();
  const [{ loading: rloading }, removeDocument] = useAxios({ url, method: 'delete' }, { manual: true });

  const handleSubmit = (e) => {
    e.stopPropagation();
    removeDocument().then(() => {
      setOpen(false);
      refetch();
      toast.info('Документ успешно удален');
    });
  };
  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <Box className={classes.boxIcon}>
      <IconButton onClick={handleClickOpen} size="large">
        <Trash fontSize={28} />
      </IconButton>
      <RemoveModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        rloading={rloading}
        text={'Вы действительно хотите удалить документ?'}
      />
    </Box>
  );
};

export default DocumentRemove;
