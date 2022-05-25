import { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import Autocomplete from 'components/Autocomplete';
import TextField from 'components/TextField';
import { Rules } from 'utils/validators';
import FileUploader from 'components/FileUploader';

import useVacancyStyles from '../style';
import { useProfile } from '../../../../../context/ProfileContext';

const AddTask = ({ onTaskDataChange, taskData }) => {
  const common = useVacancyStyles();
  const {
    currentUser: { documents },
  } = useProfile();
  let taskOptions = [{ value: 0, label: 'Создать новый' }];
  taskOptions = [
    ...taskOptions,
    ...documents.map((item) => ({
      value: item.id,
      label: item.name,
    })),
  ];

  // const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const [task, setTask] = useState({ value: -1, label: '' });

  const [fileId, setFileId] = useState({ value: '', isValid: false, message: '' });
  const [file, setFile] = useState(null);
  const [name, setName] = useState({ value: '', isValid: false, message: '' });
  const [desc, setDesc] = useState({ value: '', isValid: false, message: '' });

  useEffect(() => {
    if (taskData.documentId && taskData.documentId.value !== -1) {
      setTask(taskOptions.find((item) => item.value === taskData.documentId.value));
    }
    setName(taskData.documentName);
    setDesc(taskData.documentDesc);
    setFileId(taskData.documentFileId);
  }, [taskData]);

  const handleFileChange = ({ fileId, file, opt }) => {
    if (opt === 'uploaded') {
      if (fileId) {
        setFileId({ value: fileId, isValid: true, message: '' });
        setFile(file);
        onTaskDataChange({ documentFileId: { value: fileId, isValid: true, message: '' } });
      } else {
        setFileId({ value: '', isValid: false, message: 'Поле обязательно для заполнения' });
        setFile(null);
        onTaskDataChange({ documentFileId: { value: '', isValid: false, message: 'Поле обязательно для заполнения' } });
      }
    } else if (opt === 'removed') {
      setFileId({ value: '', isValid: false, message: '' });
      setFile(null);
      onTaskDataChange({ documentFileId: { value: '', isValid: false, message: 'Поле обязательно для заполнения' } });
    }
  };

  const handleAutocomplete = (e, option) => {
    if (option) {
      onTaskDataChange({ documentId: option });
      setTask(option);
    } else {
      onTaskDataChange({ documentId: { value: -1, label: '' } });
      setTask({ value: -1, label: '' });
    }
  };

  const handleChange = (setState) => (e, result) => {
    setState(result);
    if (e.target.name === 'name') {
      onTaskDataChange({ documentName: result });
    }
    if (e.target.name === 'desc') {
      onTaskDataChange({ documentDesc: result });
    }
  };

  const handleBlur = (setState) => (e, result) => {
    setState(result);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h2" className={common.blockTitle}>
              Тестовое задание
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={common.descr}>
              Создайте новое задание или выберите из списка созданных ранее
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          column={1}
          value={task}
          onChange={(e, option) => handleAutocomplete(e, option)}
          options={taskOptions}
          label="Выберите материалы "
          loadingText={'Поиск материала...'}
          noOptionsText={'Материал не найден'}
        />
      </Grid>
      {task.value === 0 && (
        <>
          <Grid item xs={12}>
            <TextField
              name={'name'}
              label={'Название'}
              autoComplete="new-password"
              value={name.value}
              error={!name.isValid}
              helperText={name.message}
              onChange={handleChange(setName)}
              rules={[Rules.REQUIRED]}
              onBlur={handleBlur(setName)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={'desc'}
              label={'Описание'}
              autoComplete="new-password"
              value={desc.value}
              error={!desc.isValid}
              helperText={desc.message}
              onChange={handleChange(setDesc)}
              rules={[Rules.REQUIRED, [Rules.MAX_STRING, 500]]}
              onBlur={handleBlur(setDesc)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FileUploader
              onChange={handleFileChange}
              section="employer_additional_materials"
              file={file}
              error={!fileId.isValid}
              helperText={fileId.message}
              required
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default AddTask;
