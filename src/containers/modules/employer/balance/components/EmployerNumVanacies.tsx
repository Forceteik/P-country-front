import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueMain } from 'styles/colorPalette';
import { draftText } from 'utils/formatters';

const useStyles = makeStyles<any>((theme) => ({
  vacancyNum: {
    'marginLeft': theme.spacing(2),
    'backgroundColor': blueMain,
    'borderRadius': 8,
    'padding': '7px 12px 9px 12px',
    '& p': {
      color: '#fff',
      fontFamily: 'inter-bold',
      fontSize: theme.typography.pxToRem(22),
      lineHeight: '110%',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(18),
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: 'fit-content',
      whiteSpace: 'nowrap',
    },
  },
}));

const EmployerNumVanacies = ({ couponsAmount }) => {
  const classes = useStyles();
  return (
    <Box display={'flex'} alignItems="center">
      <Typography fontFamily={'inter-med'}>К публикации доступно:</Typography>
      <Box className={classes.vacancyNum}>
        <Typography>
          {couponsAmount} {draftText(couponsAmount)}
        </Typography>
      </Box>
    </Box>
  );
};

export default EmployerNumVanacies;
