import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { darkGray, midDarkGray } from 'styles/colorPalette';
import Close from 'components/icons/Close';

const useStyles = makeStyles<any>((theme) => ({
  iconItem: {
    'marginLeft': theme.spacing(0.5),
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

const RemoveButton = ({ handleClick }) => {
  const classes = useStyles();
  return (
    <Box className={classes.iconItem} onClick={handleClick}>
      <Close color={midDarkGray} />
    </Box>
  );
};

export default RemoveButton;
