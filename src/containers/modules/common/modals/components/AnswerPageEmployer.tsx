import { Typography, Grid } from '@mui/material';

import TextField from 'components/TextField';
import Button from 'components/Button';
import { darkGray } from 'styles/colorPalette';
import { Rules } from 'utils/validators';

import { useItemStyles } from '../styles';

import AnswersRadioGroup from './AnswersRadioGroup';

const modalData = [
  { id: 1, text: 'Нашел сотрудника на платформе "Потенциал страны"', img: '/images/icons/gladeSmile.png' },
  { id: 2, text: 'Нашел сотрудника на другом ресурсе', img: '/images/icons/computer.png' },
  { id: 3, text: 'Вакансия не актуальна', img: '/images/icons/sadSmile2.png' },
  { id: 4, text: 'Другое', img: '/images/icons/pencil.png' },
];

const AnswerPageEmployer = ({
  selectAnswer,
  setSelectAnswer,
  differText,
  setDifferText,
  handleSendAnswer,
  loading,
}) => {
  const classes = useItemStyles();

  const handleSelect = (value) => {
    setSelectAnswer(value);
  };

  const handleChange = (validatorResult, setState) => {
    setState({ ...validatorResult });
  };

  const isBtnDisabled = () => {
    if (selectAnswer === 4) {
      if (differText.isValid && differText.value) {
        return false;
      }
      return true;
    } else if (selectAnswer === 0) {
      return true;
    }
    return false;
  };

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <Typography className={classes.smallTitle}>У вас получилось найти сотрудника?</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color={darkGray}>Выберите из списка</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container rowSpacing={4}>
          <Grid item xs={12}>
            <AnswersRadioGroup
              items={modalData}
              handleSelect={handleSelect}
              selectItem={selectAnswer}
              maxWidth={'237px'}
            />
          </Grid>
          {selectAnswer === 4 && (
            <Grid item xs={12}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Typography fontFamily={'inter-med'}>Опишите где и как вы нашли сотрудника?</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={differText.value}
                    onChange={(e, validatorResult) => handleChange(validatorResult, setDifferText)}
                    multiline
                    styleMultiline
                    rows={6}
                    placeholder="Введите текст"
                    rules={[[Rules.MAX_STRING, 500]]}
                    error={!differText.isValid}
                    helperText={differText.message}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth disabled={isBtnDisabled()} onClick={handleSendAnswer} loading={loading}>
          Отправить
        </Button>
      </Grid>
    </Grid>
  );
};

export default AnswerPageEmployer;
