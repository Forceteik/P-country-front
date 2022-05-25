import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueMain, midDarkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  pagination: {
    'display': 'flex',
    'justifyContent': 'center',
    'marginBottom': theme.spacing(4),
    '& .MuiPaginationItem-root': {
      'width': 22,
      'height': 22,
      'borderRadius': 6,
      'minWidth': 'unset',
      'color': midDarkGray,
      '&:hover': {
        backgroundColor: 'unset',
      },
    },
    '& .MuiPaginationItem-page.Mui-selected': {
      'backgroundColor': blueMain,
      'color': '#fff',
      '&:hover': {
        backgroundColor: blueMain,
      },
    },
    [theme.breakpoints.down('lg')]: {
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
}));

/**
 * todo: Переименовать просто на Pagination
 * @param props
 * @constructor
 */
const CustomPagination = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.pagination}>
      <Pagination {...props} />
    </Box>
  );
};

export default CustomPagination;
