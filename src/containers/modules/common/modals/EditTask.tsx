import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import useAxios from 'axios-hooks';
import cx from 'classnames';

import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';

import { Rules } from 'utils/validators';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Close from 'components/icons/Close';
import { useSession } from 'context/UserContext';
import FileUploader from 'components/FileUploader';
import { parseFormErrors } from 'utils/common';

import DocumentEdit from '../Documents/DocumentEdit';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const EditTask = ({ open, setOpen, item, university = false }) => {
  const classes = useItemStyles();
  const { refetch } = useSession();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 732 });

  const [fileId, setFileId] = useState({ value: item.media?.uuid || '', isValid: true, message: '' });
  const [file, setFile] = useState(item.media);
  const [name, setName] = useState({ value: item.name, isValid: true, message: '' });
  const [desc, setDesc] = useState({ value: item.description, isValid: true, message: '' });
  const [link, setLink] = useState({ value: item.link, isValid: false, message: '' });

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
      let finalData = {
        name: name.value,
        description: desc.value,
      };

      //Если файл не менялся фо фремя редактирования, не отправляем его на сервер
      if (!item.media) {
        finalData = { ...finalData, ...{ file_uuid: fileId.value } };
      }
      if (item.media?.uuid !== file?.uuid) {
        finalData = { ...finalData, ...{ file_uuid: fileId.value } };
      }
      updateDocument({
        data: finalData,
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

  const [{ loading }, updateDocument] = useAxios(
    { url: `/employer/profile/document/${item.id}`, method: 'put' },
    { manual: true },
  );

  return (
    <>
      <DocumentEdit handleClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          classes: paperClasses,
        }}
        classes={{
          scrollPaper: classes.scroll,
        }}
        BackdropProps={{
          style: {
            background: 'rgba(35, 38, 47, 0.8)',
            backdropFilter: 'blur(29px)',
          },
        }}
      >
        <DialogContent>
          <Box className={cx(classes.modalPaper, classes.pBig)}>
            <Box className={classes.closeIcon} onClick={handleClose}>
              <Close color={'#fff'} />
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography className={classes.mainTitle}>Редактирование</Typography>
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
                      rules={[Rules.REQUIRED, [Rules.MAX_STRING, 500]]}
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
                  <Grid item xs={12}>
                    <FileUploader
                      onChange={handleFileChange}
                      section="employer_additional_materials"
                      file={file}
                      error={!fileId.isValid}
                      helperText={fileId.message}
                      fakeRemove
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

export default EditTask;
