import useAxios from 'axios-hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';
import cx from 'classnames';

import { Box, Dialog, DialogContent, Grid } from '@mui/material';

import { useSession } from 'context/UserContext';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Close from 'components/icons/Close';
import { Rules } from 'utils/validators';

import DocumentEdit from '../Documents/DocumentEdit';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

/**
 * TODO: Перенести этот компонент ближе к соискателю, тк эта модалка доспупна только для него
 * @param className
 * @param item
 * @param styles
 * @constructor
 */
const EditItem = ({ item }) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 532 });
  const [open, setOpen] = useState(false);
  const [name, setName] = useState({ value: item.name, isValid: true, message: '' });
  const { refetch } = useSession();
  const [{ loading: eloading }, editDocument] = useAxios(
    { url: `employee/profile/document/${item.id}`, method: 'put' },
    { manual: true },
  );

  const handleClickOpen = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleChange = (e, { isValid }) => {
    setName({ ...name, ...{ value: e.target.value, isValid } });
  };

  const handleSubmit = () => {
    editDocument({
      data: {
        name: name.value,
      },
    }).then(() => {
      setOpen(false);
      refetch();
      toast.info('Документ успешно обновлен');
    });
  };

  const isFormValid = () => name.isValid;

  return (
    <>
      <DocumentEdit handleClick={handleClickOpen} />
      <Dialog
        open={open}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          classes: paperClasses,
        }}
        classes={{
          scrollPaper: classes.scroll,
        }}
        onBackdropClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        BackdropProps={{
          onClick: () => {
            // console.log("ON BACKDROP", e);
          },
          style: {
            background: 'rgba(35, 38, 47, 0.8)',
            backdropFilter: 'blur(29px)',
          },
        }}
      >
        <DialogContent>
          <Box className={cx(classes.modalPaper, classes.pMeduim)}>
            <Box className={classes.closeIcon} onClick={handleClose}>
              <Close color={'#fff'} />
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box className={classes.imgDocument}>
                  <img src={item.media.original_url} alt="" />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={'Название документа'}
                  value={name.value}
                  rultes={[Rules.REQUIRED]}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button onClick={handleSubmit} loading={eloading} disabled={!isFormValid()} fullWidth>
                  Сохранить
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditItem;
