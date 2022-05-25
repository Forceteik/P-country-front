import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';

import { FormControl, FormHelperText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueMain } from 'styles/colorPalette';
import { CREATE_VACANCY_TEMPLATE } from 'constants/common';

//https://github.com/zenoamaro/react-quill/issues/122
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

const useStyles = makeStyles<any>((theme) => ({
  quillContainer: {
    'borderRadius': 20,
    //@ts-ignore
    'border': ({ isValid, helperText }) => (!isValid && helperText !== '' ? '1px solid red' : '1px solid #eaecef'),
    '& .ql-editor': {
      'padding': '24px',
      '&::-webkit-scrollbar': {
        width: 10,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: blueMain,
        borderRadius: 20,
      },
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
      },
    },
    '& .ql-toolbar.ql-snow .ql-formats': {
      marginRight: 0,
    },
    '& .ql-toolbar.ql-snow': {
      borderRadius: '20px 20px 0px 0px',
      border: '1px solid #eaecef',
      padding: theme.spacing(1.8),
      [theme.breakpoints.down('md')]: {
        padding: '13px 10px',
      },
    },
    '& .ql-container.ql-snow': {
      border: '1px solid #eaecef',
      borderRadius: '0px 0px 20px 20px',
      overflow: 'hidden',
      [theme.breakpoints.down('md')]: {
        '& span': {
          fontSize: theme.typography.pxToRem(12),
          lineHeight: '115%',
        },
        '& p': {
          fontSize: theme.typography.pxToRem(16),
          lineHeight: '115%',
          marginBottom: theme.spacing(0.5),
        },
      },
    },
    '& .ql-container': {
      height: 369,
    },
    '& .ql-container .ql-editor': {
      fontFamily: 'Inter',
      fontSize: '1rem',
    },
  },
}));

const TextEditor = ({ value, onChange, maxLength = 3000, isValid, helperText, name = '', ...other }) => {
  const classes = useStyles({ isValid, helperText });
  const ref = useRef(null);
  const handleChange = (value, delta, source) => {
    let result = {
      value,
      isValid: true,
      message: '',
      name,
    };

    if (ref?.current?.editor.getLength() - 1 > maxLength) {
      result = {
        ...result,
        ...{
          isValid: false,
          message: `Количество вводимых символов не должно превышать ${maxLength} символов`,
        },
      };
    }
    if (ref?.current?.editor.getLength() - 1 === 0) {
      result = {
        ...result,
        ...{
          isValid: false,
          message: `Поле обязательно для заполнения`,
        },
      };
    }
    if (value === CREATE_VACANCY_TEMPLATE) {
      result = {
        ...result,
        ...{
          isValid: false,
          message: `Пожалуйста, заполните описание вакансии.`,
        },
      };
    }

    /**
     * Вызывать только когда что то вводит пользователь
     * тк например при редактировании вакансии, при первом запуске и вставка значание с базы вывзвается
     * функия onChange, что не есть хорошои ломает форму
     */
    if (source === 'user') {
      if (onChange) {
        onChange(result);
      }
    }
  };

  return (
    <FormControl fullWidth error={!isValid && helperText !== ''}>
      <ReactQuill
        ref={ref}
        className={classes.quillContainer}
        theme={'snow'}
        modules={{
          clipboard: { matchVisual: false },
          toolbar: [['bold', 'italic'], [{ list: 'ordered' }, { list: 'bullet' }], [{ color: [] }]],
        }}
        formats={['bold', 'italic', 'list', 'bullet', 'color']}
        onChange={handleChange}
        value={value}
        {...other}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default TextEditor;
