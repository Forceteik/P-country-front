import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Plus from 'components/icons/PlusBorder';
import { blueMain, midDarkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  btnMainBox: {
    'cursor': 'pointer',
    'display': 'flex',
    'alignItems': 'center',
    'color': midDarkGray,
    '& circle': {
      transition: 'all 0.3s',
    },
    '& path': {
      transition: 'all 0.3s',
    },
    '&:hover': {
      'color': blueMain,
      '& circle': {
        stroke: blueMain,
      },
      '& path': {
        stroke: blueMain,
      },
    },
  },
  btn_text: {
    transition: 'all 0.3s',
    marginLeft: theme.spacing(2),
  },
}));

const PlusBtn = (props) => {
  const classes = useStyles();
  const { onClick } = props;

  return (
    <Box className={classes.btnMainBox} onClick={onClick}>
      <Plus />
      <Typography className={classes.btn_text} component="span">
        {props.text}
      </Typography>
    </Box>
  );
};

export default PlusBtn;
