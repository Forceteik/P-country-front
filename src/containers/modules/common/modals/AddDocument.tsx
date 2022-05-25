import { useDropzone } from 'react-dropzone';
import useAxios from 'axios-hooks';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import cx from 'classnames';

import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';

import { useSession } from 'context/UserContext';
import { axiosClient } from 'pages/_app';
import DownloadDoc from 'components/icons/DownloadDoc';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Close from 'components/icons/Close';
import { midDarkGray, blueMain } from 'styles/colorPalette';
import { IMG_EXTENSIONS } from 'constants/common';
import { Rules } from 'utils/validators';

import AddItem from '../profile/AddItem';

import { useItemStyles, usePaperStylesFlexibleWidth, useDropzoneStyle } from './styles';

const baseStyle = {
  background: 'transparent',
  height: 300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px dashed ${midDarkGray}`,
  borderRadius: 20,
  cursor: 'pointer',
  color: 'white',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  border: `1px dashed ${blueMain}`,
  backgroundColor: 'blueMain',
};

const acceptStyle = {
  borderColor: '#2196f3',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

/**
 * TODO: Перенести этот компонент ближе к соискателю, тк эта модалка доспупна только для него
 * @param className
 * @constructor
 */
const AddDocument = ({ sliderItem = false }) => {
  const modalStyle = useItemStyles();
  const dropStyle = useDropzoneStyle();
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState('');
  const [name, setName] = useState({ value: '', isValid: false, message: '' });
  const { refetch } = useSession();
  const [{ loading: aloading }, addDocument] = useAxios(
    { url: 'employee/profile/document', method: 'post' },
    { manual: true },
  );

  const paperClasses = usePaperStylesFlexibleWidth({ width: file ? 532 : 648 });

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop: (files) => {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('section', 'document');
      // setLoading(true);
      axiosClient
        .post('upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(({ data }) => {
          setFile(data.data?.file);
          setFileId(data.data?.uuid);
        });
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e, { isValid }) => {
    setName({ ...name, ...{ value: e.target.value, isValid } });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    addDocument({
      data: {
        name: name.value,
        file_uuid: fileId,
      },
    }).then(() => {
      setOpen(false);
      setFile(null);
      setName({ value: '', isValid: false, message: '' });
      refetch();
      toast.info('Документ успешно добавлен');
    });
  };
  let img;
  if (file) {
    if (IMG_EXTENSIONS.includes(file?.extension)) {
      img = file.original_url;
    } else {
      img = '/images/profile/document-sample.jpg';
    }
  }

  const isFormValid = () => name.isValid;

  return (
    <>
      <AddItem
        text="Добавить портфолио, презентации проектов"
        handleClickOpen={handleClickOpen}
        sliderItem={sliderItem}
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
          {file ? (
            <Box className={cx(modalStyle.modalPaper, modalStyle.pMeduim)}>
              <Box className={modalStyle.closeIcon} onClick={handleClose}>
                <Close color={'#fff'} />
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box className={modalStyle.imgDocument}>
                    <img src={img} alt="" />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={'Название документа'}
                    value={name.value}
                    onChange={handleChange}
                    rules={[Rules.REQUIRED]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleSubmit} loading={aloading} disabled={!isFormValid()} fullWidth>
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box>
              <Box className={modalStyle.closeIcon} onClick={handleClose}>
                <Close color={'#fff'} />
              </Box>
              <Box {...getRootProps({ style })}>
                <Box className={dropStyle.inner}>
                  <input {...getInputProps()} />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <DownloadDoc />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={dropStyle.title}>
                        Перетащите файл сюда, или <span>выберите</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={dropStyle.descr}>
                        Изображение должно быть меньше 5 Mb, разрешение больше 800x1,000 px в формате .jpeg/.jpg, .gif
                        or .png
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddDocument;
