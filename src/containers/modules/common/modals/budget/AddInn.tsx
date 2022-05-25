import { useState } from 'react';
import get from 'lodash.get';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';

import { Typography, Box, Grid, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import TextField, { useTooltipOneLineStyles } from 'components/TextField';
import Button, { TetriatyButton } from 'components/Button';
import { blueMain } from 'styles/colorPalette';
import { useCustomAxios } from 'pages/_app';
import config from 'config';
import Autocomplete from 'components/Autocomplete';
import Info from 'components/icons/Info';

const useStyles = makeStyles<any, any>((theme) => ({
  autocomplete: {
    '& .MuiAutocomplete-clearIndicator': {
      display: ({ isShowDeleteCross }) => (isShowDeleteCross ? 'inline-flex' : 'none'),
    },
  },
  addInn: {
    'cursor': 'pointer',
    '& p': {
      color: blueMain,
      textAlign: 'left',
    },
  },
  title: {
    textAlign: 'left',
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
  },
}));

const AddInn = ({ handleAddInn, onSubmit, openAddInnBlock, setOpenAddInnBlock }) => {
  const tooltipClasses = useTooltipOneLineStyles();

  const [selectedOption, setSelectedOption] = useState({
    label: '',
    value: null,
  });

  const [innTypeValue, setInnTypeValue] = useState({
    value: '',
    isValid: true,
    message: '',
  });
  const isShowDeleteCross = !!selectedOption?.value;

  const classes = useStyles({ isShowDeleteCross });

  const optionsInit = [];
  const [options, setOptions] = useState(optionsInit);

  const [, findINN] = useCustomAxios(
    {
      url: config.DADATA_INN_URI,
      method: 'post',
    },
    { manual: true },
  );

  const [{ loading: sentInnLoading, error: sentInnError }, sentINN] = useAxios(
    { url: '/companies', method: 'post' },
    { manual: true },
  );

  const handleINNInputChange = (e, value, reason) => {
    setInnTypeValue((prev) => {
      return {
        ...prev,
        value: value,
      };
    });
    const searchingValue = get(e, 'target.value', '');

    if (!value) {
      setOptions(optionsInit);
    }

    if (reason === 'input' && searchingValue.length >= 10) {
      findINN({
        data: {
          query: searchingValue,
          count: 10,
        },
      })
        .then(({ data }) => {
          if (data) {
            setOptions(
              data.suggestions?.map((item) => {
                return {
                  label: item.data.inn + ' - ' + item.value,
                  value: {
                    inn: item.data.inn,
                    name: item.value,
                    kpp: item.data.kpp || '',
                  },
                };
              }),
            );
          }
        })
        .catch(() => {
          setInnTypeValue((prev) => {
            return {
              ...prev,
              isValid: false,
              message: 'Ошибка при поиске организации. Пожалуйста, попробуйте еще раз или обратитесь в поддержку',
            };
          });
        });
    }
  };

  const handleIINSelect = (e, option) => {
    setSelectedOption(option);
  };

  // Превентит нажатие на кнопку enter, чтобы не перезагружалась страница, как html-форма
  const handleINNFieldSubmit = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    sentINN({
      data: {
        registration_number: selectedOption.value.inn,
        additional_registration_number: selectedOption.value.kpp,
      },
    })
      .then(() => {
        onSubmit({
          inn: selectedOption.value.inn,
          kpp: selectedOption.value.kpp,
        });
        setOpenAddInnBlock(false);
      })
      .catch(() => {
        toast.error('Ошибка при добавлении организации. Пожалуйста, попробуйте еще раз или обратитесь в поддержку');
      });
  };

  return (
    <Box>
      {openAddInnBlock ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.title}>Добавление организации</Typography>
          </Grid>
          <Grid item xs={6} className={classes.autocomplete}>
            <Autocomplete
              small
              value={selectedOption}
              onChange={handleIINSelect}
              onInputChange={handleINNInputChange}
              onSubmit={handleINNFieldSubmit}
              freeSolo={innTypeValue.value.length < 10}
              autoHighlight
              options={options}
              column={1}
              error={innTypeValue.isValid}
              helperText={innTypeValue.message}
              label="Введите ИНН организации"
              noOptionsText={
                'Организация не была найдена. Пожалуйста, проверьте введённый ИНН или обратитесь в поддержку'
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField label="КПП" fullWidth value={selectedOption?.value?.kpp || ''} small disabled />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TetriatyButton fullWidth small onClick={() => setOpenAddInnBlock(false)}>
                  Отменить
                </TetriatyButton>
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  small
                  onClick={handleSubmit}
                  disabled={!selectedOption?.value?.inn || sentInnLoading || sentInnError}
                >
                  Добавить организацию
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Box onClick={handleAddInn} className={classes.addInn}>
          <Typography display="flex" alignItems="center">
            Добавить организацию
            <Box ml={1}>
              <Tooltip
                title="Вы можете добавить другую организаций для выставления счета"
                placement={'top'}
                classes={tooltipClasses}
              >
                <Box>
                  <Info />
                </Box>
              </Tooltip>
            </Box>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AddInn;
