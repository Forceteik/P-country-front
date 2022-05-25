import makeStyles from '@mui/styles/makeStyles';

export const useTypographyStyles = makeStyles<any>(() => ({
  withHover: {
    '&:hover': {
      fontWeight: 700,
    },
  },
}));

export const useTooltipStyles = makeStyles<any>(() => ({
  tooltip: {
    fontSize: 14,
    borderRadius: 16,
    padding: 10,
  },
}));
