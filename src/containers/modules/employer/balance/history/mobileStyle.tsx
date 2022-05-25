import { makeStyles } from '@mui/styles';

import { gray } from 'styles/colorPalette';

export const useMobileStyles = makeStyles<any>((theme) => ({
  item: {
    borderRadius: 8,
    border: `1px solid ${gray}`,
    padding: '12px 8px 12px 8px',
  },
  rightInfo: {
    fontSize: theme.typography.pxToRem(12),
  },
}));
