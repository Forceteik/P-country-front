import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

import { Box, CircularProgress, Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Edit from 'components/icons/Edit';
import { axiosClient } from 'pages/_app';
import { parseFormErrors } from 'utils/common';
import { blueMain, ligthGray, midDarkGray } from 'styles/colorPalette';
import { useProfile } from 'context/ProfileContext';

const useStyles = makeStyles<any, any>((theme) => ({
  imgBox: {
    'maxHeight': ({ maxHeight }) => maxHeight,
    'width': ({ widthHeightDesc }) => widthHeightDesc,
    'height': ({ widthHeightDesc }) => widthHeightDesc,
    'cursor': 'pointer',
    'borderRadius': ({ radius }) => radius,
    'overflow': 'hidden',
    'position': 'relative',
    'textAlign': 'left',
    [theme.breakpoints.down('sm')]: {
      width: ({ widthMobile }) => widthMobile,
      height: ({ heightMobile }) => heightMobile,
    },
    '&:hover': {
      '& $avatarHover': {
        opacity: 1,
      },
    },
    '& img': {
      maxWidth: ({ maxImgWidth }) => maxImgWidth,
      maxHeight: ({ maxHeight }) => maxHeight,
      width: ({ widthHeightDesc }) => widthHeightDesc,
      height: ({ widthHeightDesc }) => widthHeightDesc,
      objectFit: ({ employer }) => (employer ? 'contain' : 'cover'),
      [theme.breakpoints.down('sm')]: {
        maxWidth: 250,
        width: ({ widthMobile }) => widthMobile,
        height: ({ heightMobile }) => heightMobile,
      },
    },
  },
  avatarHover: {
    cursor: 'pointer',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    opacity: ({ isLoading }) => (isLoading ? 1 : 0),
    height: '100%',
    borderRadius: ({ radius }) => radius,
    backgroundColor: ({ isLoading }) => (isLoading ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.5)'),
    transition: 'opacity 0.5s',
  },
  textBtn: {
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      '& p': {
        fontSize: theme.typography.pxToRem(14),
      },
    },
  },
  textBtnBlue: {
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    color: blueMain,
    [theme.breakpoints.down('sm')]: {
      '& p': {
        fontSize: theme.typography.pxToRem(14),
      },
    },
  },
}));

const Avatar = ({
  employer = false,
  defaultImg = '',
  withButton = false,
  currentUser,
  guest = false,
  profile = false,
  radius = 20,
}) => {
  const { refetch, profileLoading } = useProfile();
  const [loading, setLoading] = useState(false);

  //Размеры для аватара профилей и настроек соискателя и работодателя
  const widthHeightDesc = employer ? 'unset' : profile ? 160 : 72;
  const widthMobile = employer ? 'unset' : profile ? 84 : 56;
  const heightMobile = employer ? '100%' : profile ? 84 : 56;
  const maxHeight = employer ? 100 : '100%';
  const maxImgWidth = employer ? 300 : 'unset';

  const mediaImg = currentUser?.media?.preview_url || currentUser?.media?.original_url;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      if (!loading) {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('section', 'avatar');
        setLoading(true);
        axiosClient
          .post('upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(({ data }) => {
            axiosClient
              .post('profile/avatar', {
                file_uuid: data.data?.uuid,
              })
              .then(() => {
                setLoading(false);
                refetch();
              });
          })
          .catch((err) => {
            if (err.code === 'validation_failed') {
              const formErrors = parseFormErrors(err.fields);
              formErrors.forEach((item) => {
                if (item.attr === 'file') {
                  setLoading(false);
                  if (item.message.includes('greater')) {
                    toast.error('Ошибка загрузки изображения. Файл не может быть больше 5 МБ.');
                    return;
                  }
                  if (item.message.includes('dimensions')) {
                    toast.error(
                      'Ошибка загрузки изображения. Изображение не может быть меньше 100х40px или больше 2500х1600px.',
                    );
                    return;
                  }
                  if (item.message.includes('must be an image')) {
                    toast.error('Ошибка загрузки изображения. Поддерживаемые файлы JPEG и PNG.');
                    return;
                  }
                  toast.error('Неизвестная ошибка. Попробуйте повторить позже.');
                } else {
                  setLoading(false);
                  toast.error('Неизвестная ошибка. Попробуйте повторить позже.');
                }
              });
            }
          });
      }
    },
    noClick: loading,
    noDrag: loading,
    disabled: loading,
    noDragEventsBubbling: loading,
    noKeyboard: loading,
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
  });

  const deleteAvatar = useCallback(async () => {
    if (mediaImg) {
      setLoading(true);
      await axiosClient
        .delete('profile/avatar')
        .then(() => {
          setLoading(false);
          refetch();
        })
        .catch(() => {
          setLoading(false);
          toast.error('Ошибка удаления изображения. Попробуйте позже.');
        });
    }
  }, [mediaImg]);

  const classes = useStyles({
    isLoading: loading,
    employer,
    widthHeightDesc,
    widthMobile,
    heightMobile,
    maxHeight,
    maxImgWidth,
    radius,
  });
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <Grid container alignItems="center" spacing={isMobile ? 2 : 4}>
      <Grid item>
        <Box className={classes.imgBox}>
          <label htmlFor="avatar">
            <img src={mediaImg || defaultImg} alt="Аватар" />
            {!guest && (
              <Box className={classes.avatarHover}>
                {loading || profileLoading ? (
                  <CircularProgress color="primary" />
                ) : (
                  <Edit color={ligthGray} fontSize={employer ? 40 : profile ? 40 : 24} />
                )}
              </Box>
            )}
          </label>
        </Box>
        {!guest && <input {...getInputProps()} id="avatar" />}
      </Grid>
      {withButton && (
        <Grid item xs>
          <Grid container alignItems="center" columnSpacing={isMobile ? 2 : 4} rowSpacing={2}>
            <Grid item>
              <Box className={classes.textBtnBlue} {...getRootProps()}>
                <Typography>Изменить</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box className={classes.textBtn} color={mediaImg ? blueMain : midDarkGray} onClick={deleteAvatar}>
                <Typography>Удалить</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Avatar;
