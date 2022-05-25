import useAxios from 'axios-hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';
import cx from 'classnames';

import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';

import Button from 'components/Button';
import Close from 'components/icons/Close';
import FileUploader from 'components/FileUploader';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const ResponseSentModal = ({ open, setOpen, vacancyId, onSubmit = null }) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 731 });

  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState({ value: '', isValid: false, message: '' });

  const [{ loading }, sendResponse] = useAxios(
    { url: `/responses/response/${vacancyId}`, method: 'post' },
    { manual: true },
  );

  const handleClose = () => {
    setOpen(false);
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
    let data = {};
    if (file) {
      data = {
        file_uuid: fileId.value,
      };
    }
    sendResponse({
      data,
    }).then(() => {
      setOpen(false);

      toast.info('Отклик успешно отправлен');

      if (process.env.NEXT_PUBLIC_BUILD_MODE === 'prod') {
        //@ts-ignore
        window.ym(80438017, 'reachGoal', 'otklik');
      }

      onSubmit && onSubmit();
    });
  };

  return (
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
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Typography className={classes.mainTitle}>При желании прикрепите материалы</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography className={classes.mainDescr}>
                    Меньше чем 5 Mb, доступные форматы: pdf, jpeg, png, doc, docx, xls, xlsx, zip, ptx
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FileUploader
                onChange={handleFileChange}
                section="employer_additional_materials"
                file={file}
                error={!fileId.isValid}
                helperText={fileId.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth onClick={handleSubmit} loading={loading}>
                Откликнуться
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseSentModal;
