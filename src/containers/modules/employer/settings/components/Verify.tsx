import cx from 'classnames';

import { Box, Grid, Typography, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';

import useSettingsStyle from 'containers/modules/common/settings/style';
import { SecondaryButton } from 'components/Button';
import Time from 'components/icons/Time';
import { darkGray } from 'styles/colorPalette';

const Verify = (props) => {
  const { value = 0, index = 0 } = props;

  const successVerify = 'check';
  // const [successVerify, setSuccessVerify] = useState('check'); //success/error/check/none
  const classes = useSettingsStyle();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  return (
    <>
      {value === index && (
        <Grid container spacing={isMobile ? 3 : 4}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" alignItems="center" spacing={isMobile ? 1 : 0}>
              <Grid item xs={12} sm={'auto'}>
                <Typography className={classes.sectionTitle} component="h2">
                  Верификация
                </Typography>
              </Grid>
              <Grid item>
                {successVerify === 'check' && (
                  <Box className={cx(classes.check, classes.status)}>
                    <Time color={darkGray} fontSize={isMobile ? 15 : 20} />
                    <Typography>Ваши документы на проверке</Typography>
                  </Box>
                )}
                {/* {successVerify === "success" && (
                <Box className={cx(classes.success, classes.status)}>
                  <ShiledFilled />
                  <Typography>Вы успешно прошли верификацию</Typography>
                </Box>
              )}
              {successVerify === "error" && (
                <Box className={cx(classes.error, classes.status)}>
                  <ShieldError />
                  <Typography>Ошибка верификации</Typography>
                </Box>
              )} */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.textBox}>
              <Typography>Для верификации компании добавьте фото или скан одного из следующих документов:</Typography>
              <List disablePadding>
                <ListItem>
                  <ListItemText primary="– свидетельство о государственной регистрации(ЮЛ/ИП)," />
                </ListItem>

                <ListItem>
                  <ListItemText primary="– свидетельство о постановке на налоговый учет(ЮЛ/ИП)," />
                </ListItem>

                <ListItem>
                  <ListItemText primary="– лист записи ЕГРИЛ/ЕГРИП." />
                </ListItem>
              </List>
              <Typography>
                Проверьте, что изображение хорошего качества и без посторонних предметов — это поможет нам быстрее
                подтвердить регистрацию компании, а вам приступить к работе.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            {/*<Documents employer />*/}
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <SecondaryButton fullWidth>Сохранить</SecondaryButton>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Verify;
