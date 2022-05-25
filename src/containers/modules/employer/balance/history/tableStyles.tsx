import { makeStyles } from '@mui/styles';

import { blueMain } from 'styles/colorPalette';

export const useBalanceTableStyles = makeStyles<any>((theme) => ({
  addHistory: {
    '& .MuiTableContainer-root': {
      border: '1px solid #E1E3E8',
      borderRadius: 20,
    },
    '& .MuiTableCell-root': {
      '&:last-child': {
        paddingRight: '50px !important',
      },
    },
  },
  dataFilter: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  headerCellText: {
    fontSize: theme.typography.pxToRem(12),
    textTransform: 'uppercase',
    color: '#979DAD',
    fontFamily: 'inter-med',
    marginRight: theme.spacing(1),
  },
  download: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  downloadText: {
    color: blueMain,
    fontSize: theme.typography.pxToRem(14),
    fontFamily: 'inter-med',
    marginRight: theme.spacing(1.5),
  },
}));
