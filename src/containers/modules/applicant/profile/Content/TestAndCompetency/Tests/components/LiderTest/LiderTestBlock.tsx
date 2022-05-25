import { makeStyles } from '@mui/styles';
import { Box, Typography, Grid } from '@mui/material';

import { blueLight, blueMain, darkGray } from 'styles/colorPalette';

const useStyles = makeStyles(() => ({
  img: {
    'width': 52,
    'height': 52,
    'backgroundColor': blueLight,
    'borderRadius': 12,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    '& img': {
      width: 32,
      height: 32,
      objectFit: 'contain',
    },
  },
}));

const LiderTestBlock = ({ item, report, subTitle }) => {
  const classes = useStyles();
  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <Grid container columnSpacing={2}>
          <Grid item>
            <Box className={classes.img}>
              <img src={item.attachment.original_url} />
            </Box>
          </Grid>
          <Grid item xs>
            {/* todo: Помоему этот заголовок тоже должен приходить с сервера тк в дизайне есть 2 варианта*/}
            <Typography fontSize={14} mb={0.5}>
              {subTitle}
            </Typography>
            <Typography fontSize={18} fontFamily="inter-bold" color={blueMain}>
              {item.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography fontSize={14} lineHeight={'150%'} color={darkGray} pb={report ? 1 : 0}>
          {item.description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LiderTestBlock;
