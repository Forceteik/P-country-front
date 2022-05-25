import cx from 'classnames';

import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { greenMain, greenWhite, pinkMain, pinkWhite } from 'styles/colorPalette';
import { calсEndingOfWordsWithNum, calсEndingOfWords } from 'utils/formatters';

const useStyles = makeStyles<any, any>((theme) => ({
  statusBox: {
    'borderRadius': 8,
    'padding': '8px 12px',
    'width': ({ fullWidth }) => (fullWidth ? '100%' : 'fit-content'),
    '& p': {
      fontFamily: 'inter-med',
      textTransform: 'uppercase',
      fontSize: theme.typography.pxToRem(12),
      textAlign: ({ fullWidth }) => (fullWidth ? 'center' : 'auto'),
    },
  },
  inactive: {
    'backgroundColor': pinkWhite,
    '& p': {
      color: pinkMain,
    },
  },
  active: {
    'backgroundColor': ({ endNumber }) => (endNumber < 4 ? pinkWhite : greenWhite),
    '& p': {
      color: ({ endNumber }) => (endNumber < 4 ? pinkMain : greenMain),
    },
  },
}));

const StatusBox = ({
  status,
  endDate = 0,
  text = ['До окончания активации осталось', 'До окончания активации осталcя', 'До окончания активации осталocь'],
  fullWidth = false,
}) => {
  const endNumber = Number(endDate);
  const classes = useStyles({ fullWidth, endNumber });

  if (status === 'hidden') {
    return (
      <Box className={cx(classes.inactive, classes.statusBox)}>
        <Typography>Вакансия не опубликована</Typography>
      </Box>
    );
  } else if (status === 'published') {
    return (
      <Box className={cx(classes.active, classes.statusBox)}>
        <Typography>
          {calсEndingOfWords(endNumber, text)} {calсEndingOfWordsWithNum(endNumber, ['дней', 'день', 'дня'])}
        </Typography>
      </Box>
    );
  }
  return null;
};

export default StatusBox;
