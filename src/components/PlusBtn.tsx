import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import PlusBorder from 'components/icons/PlusBorder';

const useStyles = makeStyles<any>((theme) => ({
  btnMainBox: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  btn_text: {
    transition: 'all 0.3s',
    color: '#979DAD',
    marginLeft: theme.spacing(2),
  },
}));

const PlusBtn = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.btnMainBox}>
      <PlusBorder />
      <Typography className={classes.btn_text} component="span">
        {props.text}
      </Typography>
    </Box>
  );
};

export default PlusBtn;
