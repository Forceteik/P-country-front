import useAxios from 'axios-hooks';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import cx from 'classnames';

import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';

import TextField from 'components/TextField';
import Button from 'components/Button';
import Close from 'components/icons/Close';
import { Rules } from 'utils/validators';
import FileUploader from 'components/FileUploader';
import { parseFormErrors } from 'utils/common';
import { useProfile } from 'context/ProfileContext';

import AddItem from '../profile/AddItem';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const AddTask = ({ sliderItem = false, university = false }) => {
  const modalStyle = useItemStyles();
  const { refetch } = useProfile();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 730 });
  const [open, setOpen] = useState(false);

  const [fileId, setFileId] = useState({ value: '', isValid: false, message: '' });
  const [file, setFile] = useState(null);
  const [name, setName] = useState({ value: '', isValid: false, message: '' });
  const [desc, setDesc] = useState({ value: '', isValid: false, message: '' });
  const [link, setLink] = useState({ value: '', isValid: false, message: '' });

  const toastId = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (setState) => (e, result) => {
    setState(result);
  };

  const handleBlur = (setState) => (e, result) => {
    setState(result);
  };

  const handleFileChange = ({ fileId, file, opt }) => {
    if (opt === 'uploaded') {
      if (fileId) {
        setFileId({ value: fileId, isValid: true, message: '' });
        setFile(file);
      } else {
        setFileId({ value: '', isValid: false, message: 'Поле обязательно для заполнения' });
        setFile(null);
      }
    } else if (opt === 'removed') {
      setFileId({ value: '', isValid: false, message: '' });
      setFile(null);
    }
  };

  const handleSubmit = () => {
    if (name.isValid && desc.isValid && fileId.isValid) {
      sendDocument({
        data: {
          name: name.value,
          description: desc.value,
          file_uuid: fileId.value,
        },
      })
        .then(() => {
          refetch();
          setOpen(false);
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.info('Данные успешно сохранены', {
              autoClose: 3000,
              closeOnClick: true,
            });
          }
        })
        .catch((e) => {
          if (e.code === 'validation_failed') {
            const formErrors = parseFormErrors(e.fields);
            formErrors.forEach((item) => {
              if (item.attr === 'name') {
                setName({ ...name, isValid: false, message: item.message });
              }
              if (item.attr === 'description') {
                setDesc({ ...desc, isValid: false, message: item.message });
              }
            });
          }
        });
    } else {
      if (name.value === '') {
        setName({ ...name, isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (desc.value === '') {
        setDesc({ ...desc, isValid: false, message: 'Поле обязательно для заполнения' });
      }
      if (fileId.value === '') {
        setFileId({ ...fileId, isValid: false, message: 'Поле обязательно для заполнения' });
      }
    }
  };

  const [{ loading }, sendDocument] = useAxios({ url: '/employer/profile/document', method: 'post' }, { manual: true });

  return (
    <>
      <AddItem
        handleClickOpen={handleClickOpen}
        sliderItem={sliderItem}
        text={university ? 'Добавить дополнительные курсы' : 'Добавить'}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          classes: paperClasses,
        }}
        classes={{
          scrollPaper: modalStyle.scroll,
        }}
        BackdropProps={{
          style: {
            background: 'rgba(35, 38, 47, 0.8)',
            backdropFilter: 'blur(29px)',
          },
        }}
      >
        <DialogContent>
          <Box className={cx(modalStyle.modalPaper, modalStyle.pBig)}>
            <Box className={modalStyle.closeIcon} onClick={handleClose}>
              <Close color={'#fff'} />
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography className={modalStyle.mainTitle}>Создание</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label={'Название'}
                      value={name.value}
                      error={!name.isValid}
                      helperText={name.message}
                      onChange={handleChange(setName)}
                      rules={[Rules.REQUIRED]}
                      onBlur={handleBlur(setName)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={'Описание'}
                      value={desc.value}
                      error={!desc.isValid}
                      helperText={desc.message}
                      onChange={handleChange(setDesc)}
                      rules={university ? [[Rules.MAX_STRING, 500]] : [Rules.REQUIRED, [Rules.MAX_STRING, 500]]}
                      onBlur={handleBlur(setDesc)}
                    />
                  </Grid>
                  {university && (
                    <Grid item xs={12}>
                      <TextField
                        label={'Ссылка'}
                        value={link.value}
                        error={!link.isValid}
                        helperText={link.message}
                        onChange={handleChange(setLink)}
                        rules={[[Rules.MAX_STRING, 500]]}
                        onBlur={handleBlur(setLink)}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} className={modalStyle.fileInput}>
                    <FileUploader
                      onChange={handleFileChange}
                      section="employer_additional_materials"
                      file={file}
                      error={!fileId.isValid}
                      helperText={fileId.message}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth onClick={handleSubmit} loading={loading}>
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

export default AddTask;
