import { Grid, Typography, Box } from '@mui/material';

import { blueMain, midDarkGray } from 'styles/colorPalette';
import Paper from 'components/icons/Paper';
import { MadFormatter } from 'utils/formatters';

import { useBalanceTableStyles } from '../../tableStyles';
import { useMobileStyles } from '../../mobileStyle';
import Price from '../Price';

const MobileItems = ({ items }) => {
  const mobileClasses = useMobileStyles();
  const classes = useBalanceTableStyles();

  return (
    <Grid container rowSpacing={2.5}>
      {items.map((item, id) => (
        <Grid item xs={12} key={id}>
          <Box className={mobileClasses.item}>
            <Grid container rowSpacing={1.5}>
              <Grid item xs={12}>
                <Grid container justifyContent={'space-between'} alignItems="center">
                  <Grid item xs>
                    <Typography color={midDarkGray} fontSize={12}>
                      Способ пополнения
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={mobileClasses.rightInfo}>
                      {(item.deposit_method === 'acquiring' ? 'Банковской картой' : 'По счёту') || 'Неизвестно'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent={'space-between'} alignItems="center">
                  <Grid item xs>
                    <Typography color={midDarkGray} fontSize={12}>
                      Дата
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={mobileClasses.rightInfo}>
                      {MadFormatter.toFormalRusDate(new Date(item.created_at))}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent={'space-between'} alignItems="center">
                  <Grid item xs>
                    <Typography color={midDarkGray} fontSize={12}>
                      Сумма
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Price number={item.value} status={item.status} type={item.type} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent={'space-between'} alignItems="center">
                  <Grid item xs>
                    <Typography color={midDarkGray} fontSize={12}>
                      Файл
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Box className={classes.download}>
                      <Typography className={classes.downloadText}>Скачать</Typography>
                      <Paper color={blueMain} width="13.62" height="14.93" />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default MobileItems;
