import { Typography, Grid } from '@mui/material';

import Button from 'components/Button';
import DoubleSwitch from 'components/DoubleSwitch';
import TextField, { NumberFormatCustom } from 'components/TextField';
import { Rules } from 'utils/validators';
import DangerBlock from 'containers/modules/employer/balance/components/Danger';

import { useItemStyles } from '../../styles';

const StartStep = ({ addMoneyOptions, addOptions, handleSwitchOption, addMoney, onMoneyChange, handleNext }) => {
  const classes = useItemStyles();
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <DoubleSwitch items={addMoneyOptions} active={addOptions} click={handleSwitchOption} />
          </Grid>

          {/* addOptions === 1 означает что пользователь выбрал вариант По счету и в таком случае надо показать информационный блок */}
          {addOptions === 1 && (
            <Grid item xs={12}>
              <DangerBlock
                text={
                  'В целях сокращения нагрузки на бухгалтерию рекомендуем проводить оплаты корпоративной картой, привязанной к расчетному счету. Вместо закрывающих документов вам автоматически придет кассовый чек.'
                }
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Typography className={classes.mainDescr} textAlign="left">
              Введите сумму, на которую хотите пополнить баланс
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              small
              name="addMoney"
              label="Вы пополняете"
              placeholder="₽"
              fullWidth
              value={addMoney.value}
              rules={[[Rules.GT, 0], [Rules.LT, 999999999999], Rules.REQUIRED]}
              onChange={onMoneyChange}
              // onBlur={onSalaryBlur}
              InputProps={{ inputComponent: NumberFormatCustom }}
              InputLabelProps={{ shrink: true }}
              // disabled={salaryAfterInterview.value}
              // error={!salaryFrom.isValid}
              // helperText={salaryFrom.message}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Button fullWidth small onClick={handleNext} disabled={!addMoney.isValid}>
          Далее
        </Button>
      </Grid>
    </Grid>
  );
};

export default StartStep;
