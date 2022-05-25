import React from 'react';

import { Checkbox, FormControlLabel, Grid, Typography, useMediaQuery } from '@mui/material';

import useVacancyStyles from 'containers/modules/employer/vacancy/style';
import CheckBoxIcon from 'components/icons/CheckBoxIcon';
import CheckBoxIconCheck from 'components/icons/CheckBoxIconCheck';

const Health = (props) => {
  const { formData, handleDisabilityCheckboxChange } = props;
  const classes = useVacancyStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={isMobile ? 2 : 3}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h2" className={classes.blockTitle}>
              Здоровье
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.descr}>
              Будут предложены кандидаты <b>только</b> с включенным статусом инвалидности.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12} className={classes.disabilityCheckBox}>
          <FormControlLabel
            control={
              <Checkbox
                disableRipple
                icon={<CheckBoxIcon />}
                checkedIcon={<CheckBoxIconCheck />}
                checked={formData.disability}
                onChange={handleDisabilityCheckboxChange}
                name="salaryAfterInterview"
              />
            }
            label="Ищем сотрудника с инвалидностью"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Health;
