import { useEffect, useState, useRef } from 'react';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';

import { Box, Checkbox, FormControlLabel, Grid, Typography, useMediaQuery } from '@mui/material';

import useSettingsStyle from 'containers/modules/common/settings/style';
import { SecondaryButton } from 'components/Button';
import { useProfile } from 'context/ProfileContext';
import CheckBoxIcon from 'components/icons/CheckBoxIcon';
import CheckBoxIconCheck from 'components/icons/CheckBoxIconCheck';

const Additional = () => {
  // const { children, value = 0, index = 0, ...other } = props;
  const { currentUser, refetch } = useProfile();

  const [disability, setDisability] = useState(false);

  const [{ loading }, updateHealth] = useAxios({ url: 'employee/profile/disability', method: 'put' }, { manual: true });

  useEffect(() => {
    if (currentUser?.employee) {
      setDisability(currentUser.employee.disability);
    }
  }, []);

  const toastId = useRef(null);

  const classes = useSettingsStyle();

  const handleHealth = (e) => {
    setDisability(e.target.checked);
  };

  const handleSubmit = () => {
    const data = {
      disability,
    };

    updateHealth({
      data,
    }).then(() => {
      refetch();
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.info('Данные успешно сохранены', {
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    });
  };

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <Box>
      <Grid container spacing={isMobile ? 3 : 4}>
        <Grid item xs={12}>
          <Typography>Дополнительная информация о здоровье</Typography>
        </Grid>
        <Grid item xs={12} className={classes.disabilityCheckBox}>
          <FormControlLabel
            control={
              <Checkbox
                disableRipple
                icon={<CheckBoxIcon />}
                checkedIcon={<CheckBoxIconCheck />}
                checked={disability}
                onChange={handleHealth}
                name="salaryAfterInterview"
              />
            }
            label="Инвалидность"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <SecondaryButton fullWidth onClick={handleSubmit} loading={loading}>
            Сохранить
          </SecondaryButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Additional;
