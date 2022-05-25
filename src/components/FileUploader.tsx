import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Grid, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';

import TextField from 'components/TextField';
import { Rules } from 'utils/validators';
import { SplitRightButton } from 'components/Button';
import { axiosClient } from 'pages/_app';
import { parseFormErrors } from 'utils/common';

const useStyles = makeStyles<any>(() => ({
  root: {
    '&:focus': {
      'outline-width': 0,
      'outline-color': 'transparent',
      'outline': 'none',
      '-webkit-appearance': 'none',
      '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
    },
  },
}));

const FileUploader = (props) => {
  const {
    section = 'document',
    error,
    helperText,
    fakeRemove = false,
    accept = 'image/*, .pdf, .doc, .docx, .xls, .xlsx',
    maxSize = 5 * 1000 * 1000,
    required = false,
  } = props;
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState('');
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    if (props.file) {
      setFile(props.file);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxSize,
    onDrop: (files, fileRejections) => {
      // console.log("fileRejections.", fileRejections);
      if (fileRejections.length > 0) {
        if (fileRejections[0]?.errors[0]?.code === 'file-too-large') {
          toast.error(`Размер файла не должен превышать ${Math.round(maxSize / 1000 / 1000)}MB`);
        } else if (fileRejections[0]?.errors[0]?.code === 'file-invalid-type') {
          toast.error(`Неверный формат файла, допустимые форматы: ${accept}`);
        } else {
          toast.error(`Ошибка при загрузке файла, попробуйте позже`);
        }
      } else {
        const formData = new FormData();
        setFile(files[0]);
        formData.append('file', files[0]);
        formData.append('section', section);
        setLoading(true);
        axiosClient
          .post('upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(({ data }) => {
            setLoading(false);
            setFile(data.data?.file);
            setFileId(data.data?.uuid);
            // opt нужно на всякий случай, если паренту нужно отслеживать например состояние in-progress или rejected
            props.onChange({ fileId: data.data?.uuid, file: data.data?.file, opt: 'uploaded' });
          })
          .catch((e) => {
            setLoading(false);
            if (e) {
              if (e.code === 'validation_failed') {
                const formErrors = parseFormErrors(e.fields);
                formErrors.forEach((item) => {
                  if (item.attr === 'file') {
                    toast.error(item.message);
                  }
                });
              }
            }
          });
      }
    },
  });

  const deleteFile = useCallback(
    async (e) => {
      if (file) {
        e.stopPropagation();
        // Чтобы имитировать удаление, но при этом не отправлять команду на сервер
        if (fakeRemove) {
          setLoading(false);
          setFile(null);
          props.onChange({ opt: 'removed' });
        } else {
          setLoading(true);
          await axiosClient.delete(`/upload/${fileId}`).then(() => {
            setLoading(false);
            setFile(null);
            props.onChange({ opt: 'removed' });
          });
        }
      }
    },
    [file, fileId],
  );

  return (
    <Box {...getRootProps()} className={classes.root}>
      <input {...getInputProps()} />
      <Grid container>
        <Grid item xs={7}>
          <TextField
            inputProps={{
              style: { textOverflow: 'ellipsis' },
            }}
            required={required}
            error={error}
            helperText={helperText}
            disabled
            splitLeft
            outlineWidth={0}
            InputLabelProps={{ shrink: true }}
            label="Приложить файл"
            placeholder={accept}
            value={file?.file_name || file?.name || ''}
            rules={[Rules.REQUIRED]}
          />
        </Grid>
        <Grid item xs={5}>
          <SplitRightButton fullWidth loading={loading} deleteStile={!!file} onClick={deleteFile}>
            {file ? `Удалить ${isMobile ? '' : 'файл'}` : `Добавить ${isMobile ? '' : 'файл'}`}
          </SplitRightButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FileUploader;
