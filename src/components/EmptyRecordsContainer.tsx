import { Grid, Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { darkGray, gray } from 'styles/colorPalette';

import Button from './Button';

const useStyles = makeStyles<any, any>((theme) => ({
  box: {
    borderRadius: 20,
    border: `1px solid ${gray}`,
    padding: theme.spacing(5.3),
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '24px 16px',
    },
    width: '100%',
  },
  title: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-med',
    lineHeight: '110%',
    [theme.breakpoints.down('xl')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  descr: {
    color: darkGray,
    width: ({ small }) => (small ? '30%' : '54%'),
    margin: '0px auto',
    [theme.breakpoints.down('xl')]: {
      width: ({ small }) => (small ? '50%' : '70%'),
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      fontSize: theme.typography.pxToRem(14),
    },
  },
}));

const EmptyRecordsContainer = ({
  title = 'Не найдено',
  descr = 'Поиск или фильтр не дал результатов. Попробуйте изменить параметры поиска.',
  showButton = false,
  textButton = '',
  linkButton = '#',
  small = false,
}) => {
  const classes = useStyles({ small });
  return (
    <Box className={classes.box} component="section">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography className={classes.title}>{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.descr}>{descr}</Typography>
        </Grid>
        {showButton && (
          <Grid item xs={12} sm={small ? 4 : 6} md={small ? 3 : 5} lg={small ? 2 : 4}>
            <Button nextLink fullWidth linkProps={{ href: linkButton }} small>
              {textButton}
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default EmptyRecordsContainer;
