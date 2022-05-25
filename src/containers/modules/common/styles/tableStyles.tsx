import { makeStyles } from '@mui/styles';

import { blueLight } from 'styles/colorPalette';

export const useTableStyles = makeStyles<any>((theme) => ({
  table: {
    '& .MuiTableCell-root': {
      borderBottom: 'none',
      fontSize: theme.typography.pxToRem(12),
      padding: '16px 24px 16px 16px',
    },
    '& .MuiTableCell-head': {
      textTransform: 'uppercase',
      padding: '12px 16px 12px 16px',
      color: '#979DAD',
      fontFamily: 'inter-med',
    },
    '& .MuiTableRow-root': {
      '&:first-child': {
        width: '100%',
      },
      '&:not(:last-child)': {
        'width': 'fit-content',
        '& p': {
          whiteSpace: 'nowrap',
        },
      },
    },
    '& .MuiTableBody-root': {
      '& .MuiTableRow-root': {
        '&:nth-of-type(even)': {
          backgroundColor: blueLight,
        },
      },
    },
  },
}));
