import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import EditButton from 'containers/modules/common/profile/EditButton';

const useStyles = makeStyles<any>((theme) => ({
  iconsBox: {
    'backgroundColor': 'white',
    // 'height': '',
    'opacity': 1,
    'position': 'absolute',
    'justifyContent': 'flex-end',
    'display': 'flex',
    'top': 30,
    'right': 0,
    'alignItems': 'flex-start',
    '& svg': {
      'margin': '0px 5px',
      '& path': {
        transition: 'all 0.3s',
      },
    },
    [theme.breakpoints.down('md')]: {
      right: 0,
    },
  },
}));

const EditAndDeleteIcons = ({ handleEditClick, RemoveComponent = null }) => {
  const classes = useStyles();

  return (
    <Box className={classes.iconsBox}>
      <EditButton handleClick={handleEditClick} />
      {RemoveComponent && <RemoveComponent />}
    </Box>
  );
};

export default EditAndDeleteIcons;
