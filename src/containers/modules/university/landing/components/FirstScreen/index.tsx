import { makeStyles } from '@mui/styles';
import { Box, Grid } from '@mui/material';

import FirstScreenMain from './FirstScreenMain';
import FirstScreenSlider from './FirstScreenSlider';
import Header from './Header';

const useStyles = makeStyles<any>((theme) => ({
  firstScreenRoot: {
    'backgroundColor': '#F1F6FF',
    'paddingBottom': theme.spacing(15),
    'position': 'relative',
    'zIndex': 10,
    '&:after': {
      content: '""',
      position: 'absolute',
      width: 'max(40px, calc((100% - 350px) / 2))',
      height: '679px',
      top: 0,
      right: 0,
      background: '#E0EEFE',
      borderRadius: '0px 0px 0px 40px',
      zIndex: -1,
      [theme.breakpoints.down('md')]: {
        width: 'max(40px, calc((100% - 50px) / 2))',
      },
      [theme.breakpoints.down('sm')]: {
        height: '364px',
        borderRadius: '40px 0px 0px 00px',
        width: '100%',
        top: 140,
        right: 'unset',
        left: 15,
      },
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(13),
    },
  },
  mainGrid: {
    paddingTop: theme.spacing(4),
  },
}));

const FirstScreen = () => {
  const classes = useStyles();

  return (
    <Box className={classes.firstScreenRoot}>
      <Header />
      <Grid container rowSpacing={1} className={classes.mainGrid} component="section">
        <Grid item xs={12}>
          <FirstScreenMain />
        </Grid>
        <Grid item xs={12}>
          <FirstScreenSlider />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FirstScreen;
