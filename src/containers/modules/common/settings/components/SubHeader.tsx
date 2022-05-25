import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react';
import get from 'lodash.get';

import { Box, Grid, Tooltip, Typography } from '@mui/material';

import { useTooltipBasicStyles } from 'components/TextField';
import { useSession } from 'context/UserContext';
import Switch from 'components/Switch';

import useSettingsStyle from '../style';

const SubHeader = () => {
  const classes = useSettingsStyle();
  const tooltipClasses = useTooltipBasicStyles();
  const { currentUser, refetch, role } = useSession();
  const [checked, setChecked] = useState(get(currentUser, 'employee.searchable', true));
  const [openTooltip, setOpenTooltip] = useState(false);

  const canTurnOn = () => currentUser.employee?.position !== null && currentUser.employee.health !== null;

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleTooltipOpen = () => {
    if (!canTurnOn()) {
      setOpenTooltip(true);
    }
  };

  const toastId = useRef(null);

  useEffect(() => {
    setChecked(currentUser.employee?.searchable);
  }, [currentUser.employee?.searchable]);

  const [, changeVisibility] = useAxios({ url: '/employee/searchable', method: 'put' }, { manual: true });

  const handleChange = () => {
    if (canTurnOn()) {
      changeVisibility({ data: { searchable: !checked } }).then(() => {
        setChecked(!checked);
        refetch();

        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.info('Данные успешно сохранены', {
            autoClose: 3000,
            closeOnClick: true,
          });
        }
      });
    }
  };

  return (
    <Box className={classes.subheader}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={'auto'}>
          <Typography component="h1" className={classes.title}>
            Настройки
          </Typography>
        </Grid>

        {role === 'employee' &&
          (checked ? (
            <Grid item xs={12} sm={'auto'}>
              <Switch label={'Профиль видно всем'} checked={checked} onChange={handleChange} />
            </Grid>
          ) : (
            <Tooltip
              title={`Чтобы ваш профиль могли просматривать работодатели, заполните блоки: "Дополнительная информация" и "Желаемая должность"`}
              arrow
              placement={'top'}
              classes={tooltipClasses}
              onOpen={handleTooltipOpen}
              onClose={handleTooltipClose}
              onClick={handleTooltipOpen}
              open={openTooltip}
            >
              <Grid item xs={12} sm={'auto'}>
                <Switch label={'Профиль видно всем'} checked={checked} onChange={handleChange} />
              </Grid>
            </Tooltip>
          ))}
      </Grid>
    </Box>
  );
};

export default SubHeader;
