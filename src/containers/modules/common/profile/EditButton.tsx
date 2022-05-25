import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { darkGray, midDarkGray } from 'styles/colorPalette';
import Edit from 'components/icons/Edit';

const useStyles = makeStyles<any>(() => ({
  iconItem: {
    'cursor': 'pointer',
    '& svg': {
      '& path': {
        transition: 'all 0.2s',
      },
    },
    '&:hover': {
      '& svg': {
        '& path': {
          stroke: darkGray,
        },
      },
    },
  },
}));

const EditButton = ({ handleClick }) => {
  const classes = useStyles();
  return (
    <Box className={classes.iconItem} onClick={handleClick}>
      <Edit color={midDarkGray} />
    </Box>
  );
};

export default EditButton;
