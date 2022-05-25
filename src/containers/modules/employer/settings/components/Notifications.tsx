import { useState } from 'react';

import { Grid, Typography, FormControlLabel, Checkbox } from '@mui/material';

import useSettingsStyle from 'containers/modules/common/settings/style';
import { SecondaryButton } from 'components/Button';
import CheckBoxIcon from 'components/icons/CheckBoxIcon';
import CheckBoxIconCheck from 'components/icons/CheckBoxIconCheck';

const Notifications = (props) => {
  const { value = 0, index = 0 } = props;
  const [checkedA, setCheckedA] = useState(false);
  const [checkedB, setCheckedB] = useState(false);
  const [checkedC, setCheckedC] = useState(false);
  const [checkedD, setCheckedD] = useState(false);
  const classes = useSettingsStyle();

  return (
    <>
      {value === index && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.sectionTitle} component="h2">
              Уведомления
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.checkBox}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<CheckBoxIcon />}
                  checkedIcon={<CheckBoxIconCheck />}
                  name="checkedA"
                  checked={checkedA}
                  onChange={() => setCheckedA(!checkedA)}
                />
              }
              label="Уведомления об откликах"
            />

            <FormControlLabel
              control={
                <Checkbox
                  icon={<CheckBoxIcon />}
                  checkedIcon={<CheckBoxIconCheck />}
                  checked={checkedB}
                  onChange={() => setCheckedB(!checkedB)}
                  name="checkedA"
                />
              }
              label="Новости и рекламные предложения для работодателей"
            />

            <FormControlLabel
              control={
                <Checkbox
                  icon={<CheckBoxIcon />}
                  checkedIcon={<CheckBoxIconCheck />}
                  checked={checkedC}
                  onChange={() => setCheckedC(!checkedC)}
                  name="checkedA"
                />
              }
              label="Важные сервисные письма для работодателей"
            />

            <FormControlLabel
              control={
                <Checkbox
                  icon={<CheckBoxIcon />}
                  checkedIcon={<CheckBoxIconCheck />}
                  checked={checkedD}
                  onChange={() => setCheckedD(!checkedD)}
                  name="checkedA"
                />
              }
              label="Получать на электронный адрес уведомления о сообщениях от пользователей и администрации"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <SecondaryButton fullWidth>Сохранить</SecondaryButton>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Notifications;
