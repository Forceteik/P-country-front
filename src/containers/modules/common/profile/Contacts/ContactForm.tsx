import { useEffect, useState } from 'react';
import validator from 'validator';
import { toast } from 'react-toastify';
import useAxios from 'axios-hooks';
import get from 'lodash.get';

import { Box, FormControlLabel, Checkbox, Grid } from '@mui/material';

import Select from 'components/Select';
import Button, { SecondaryButton } from 'components/Button';
import TextField, { PhoneInput } from 'components/TextField';
import { useProfile } from 'context/ProfileContext';

import profileStyle from '../style';

const ContactForm = (props) => {
  const { item = null, mode = 'add', contactOptions } = props;
  const [type, setType] = useState('');
  const [typeName, setTypeName] = useState('');
  const [priority, setPriority] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [text, setText] = useState('');
  const [phone, setPhone] = useState({ value: '', isValid: false, message: '' });
  const [whatsapp, setWhatsapp] = useState({ value: '', isValid: false, message: '' });
  const { refetch } = useProfile();
  const commonStyle = profileStyle();

  useEffect(() => {
    if (item) {
      setText(item.value);
      setType(item.type);
      setPriority(item.priority);
      setTypeName(contactOptions.find((i) => i.value === item.type).label);
      if (item.type === 'phone') {
        setPhone({ value: item.value, isValid: true, message: '' });
      }
      if (item.type === 'whatsapp') {
        setWhatsapp({ value: item.value, isValid: true, message: '' });
      }
    }
  }, [item]);

  const [{ loading }, editContact] = useAxios(
    {
      method: 'put',
      url: 'profile/contact',
    },
    { manual: true },
  );

  const handleChange = (value) => {
    setType(value);
    const choseType = contactOptions.find((item) => item.value === value).label;
    setTypeName(choseType);
    if (value === 'instagram' || value === 'telegram') {
      setText('@');
    } else {
      setText('');
    }
  };

  const handleWhatsapp = (value, isValid) => {
    setWhatsapp({ ...whatsapp, ...{ value, isValid } });
  };

  const handlePhone = (value, isValid) => {
    setPhone({ ...phone, ...{ value, isValid } });
  };

  const handleCancel = () => {
    setType('');
    setTypeName('');
    props.closeFnc();
  };

  const handleSave = () => {
    setErrorText('');
    editContact({
      data: {
        type,
        value: type === 'phone' ? phone.value : type === 'whatsapp' ? whatsapp.value : text,
        priority,
        contact: true,
      },
    })
      .then(() => {
        if (mode === 'edit') {
          toast.info('Контакт успешно изменен');
        } else {
          toast.info('Контакт успешно добавлен');
        }
        refetch();
        props.closeFnc();
      })
      .catch((e) => {
        // Если вывалилась 500 ошибка с бэка
        if (!e) {
          toast.error('Неизвестная ошибка, пожалуйста, попробуйте позже');
          return;
        }

        if (e.code === 'validation_failed') {
          setErrorText('Неверный формат поля');
        }
      });
  };

  const handleCheckbox = (e) => {
    setPriority(e.target.checked);
  };

  const handleContactChange = (e) => {
    let string = e.target.value;
    switch (type) {
      case 'telegram': {
        const stringWithoutFixed = string.replace('@', '');
        setText(`@${stringWithoutFixed}`);
        break;
      }
      case 'instagram': {
        let stringWithoutFixed = string.replace('@', '');
        if (/^https:\/\/www.instagram.com\/[a-zA-Z1-9_.]+\/?$/.test(stringWithoutFixed)) {
          stringWithoutFixed = stringWithoutFixed.replace('https://www.instagram.com/', '').replace('/', '');
        }
        setText(`@${stringWithoutFixed}`);
        break;
      }
      case 'gitlab':
      case 'facebook':
      case 'linkedin': {
        if (string.startsWith('http://')) {
          string = string.replace('http://', 'https://');
        }
        if (string.startsWith('www.')) {
          string = string.replace('www.', 'https://');
        }
        setText(string);
        break;
      }
      case 'site': {
        const urlPattern = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
        let string = e.target.value;

        if (urlPattern.test(string)) {
          //string is http url
          if (string.includes('http://')) {
            string = string.replace('https://', '').replace('http://', '');
            //add https to string
            string = `http://${string}`;
          } else {
            //string is https or just url
            string = string.replace('https://', '').replace('http://', '');
            //add https to string
            string = `https://${string}`;
          }
        }
        setText(string);
        break;
      }
      case 'vk': {
        if (string.startsWith('vk.com')) {
          string = `https://${string}`;
        }
        if (string.startsWith('http://')) {
          string = string.replace('http://', 'https://');
        }
        if (string.startsWith('www.')) {
          string = string.replace('www.', 'https://');
        }
        setText(string);
        break;
      }
      default:
        setText(string);
    }
  };

  const isValid = () => {
    if (type === '') {
      return false;
    }

    switch (type) {
      case 'instagram':
        return /^@[a-zA-Z1-9_.]+$/.test(text);
      case 'gitlab':
        return /((http(s)?:\/\/)?|[\w.]+)gitlab\.com\/([a-zA-Z0-9_\.][a-zA-Z0-9_\-\.]*[a-zA-Z0-9_\-]|[a-zA-Z0-9_]+)\/?/gm.test(
          text,
        );
      case 'telegram':
        return /^@[a-zA-Z1-9_.]+$/.test(text);
      case 'facebook':
        return /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})/gi.test(
          text,
        );
      case 'site':
        return validator.isURL(text);
      case 'linkedin': {
        return /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gm.test(text);
      }
      case 'vk': {
        return /^(http:\/\/|https:\/\/)?(www.)?(vk\.com|vkontakte\.ru)\/(id\d|[a-zA-Z0-9_.])+$/gm;
      }
      case 'email': {
        return validator.isEmail(text);
      }
      case 'phone': {
        return phone.isValid;
      }
      case 'whatsapp': {
        return whatsapp.isValid;
      }
    }
  };

  const contactOption = contactOptions.find((item) => item.value === type);
  const placeholder = get(contactOption, 'placeholder', '');

  return (
    <>
      <Box className={commonStyle.selectRoot}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              label={'Тип контакта'}
              options={contactOptions}
              onChange={handleChange}
              defaultValue={type}
              value={type}
            />
            {typeName ? (
              <Box className={commonStyle.inputRoot}>
                {type === 'phone' ? (
                  <PhoneInput
                    value={phone.value}
                    onChange={handlePhone}
                    error={phone.isValid || !!errorText}
                    helperText={phone.message || errorText}
                  />
                ) : type === 'whatsapp' ? (
                  <PhoneInput
                    value={whatsapp.value}
                    onChange={handleWhatsapp}
                    error={whatsapp.isValid || !!errorText}
                    helperText={whatsapp.message || errorText}
                  />
                ) : (
                  <TextField
                    label={typeName}
                    value={text}
                    onChange={handleContactChange}
                    error={!!errorText}
                    helperText={errorText}
                    placeholder={placeholder}
                  />
                )}

                <Box className={commonStyle.checkboxRoot}>
                  <FormControlLabel
                    control={<Checkbox checked={priority} onChange={handleCheckbox} color="primary" />}
                    label="Приоритетный способ связи"
                  />
                </Box>
              </Box>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={6}>
            <SecondaryButton fullWidth onClick={handleCancel} small>
              Отменить
            </SecondaryButton>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth onClick={handleSave} loading={loading} disabled={!isValid()} small>
              {mode === 'edit' ? 'Изменить' : 'Добавить'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContactForm;
