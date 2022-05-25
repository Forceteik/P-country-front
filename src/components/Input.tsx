import { FormControl, InputLabel, InputBase } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles<any>(() => ({
  formControl: {
    borderRadius: '20px',
  },
}));

const CustomLabel = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#FCFDFF',
      padding: '0px 2px',
    },
    outlined: {},
    formControl: {
      top: 0,
      left: 0,
      position: 'absolute',
      transform: 'translate(23px, 26px)',
    },
    shrink: {
      'transform': 'translate(18px, -3px) scale(0.75) !important',
      'top': '0px',
      '&:focus': {
        color: '#3770FF',
      },
    },
  }),
)(InputLabel);

const CustomInputForSelect = withStyles((theme) =>
  createStyles({
    root: {},
    input: {
      'backgroundColor': '#ffffff',
      'border': '1px solid #E1E3E8',
      'height': '72px',
      'borderRadius': '20px',
      'paddingTop': theme.spacing(0.75),
      'paddingLeft': theme.spacing(4),
      'boxSizing': 'border-box',
      '&:focus': {
        border: '1px solid #3770FF',
        borderRadius: '20px',
      },
    },
  }),
)(InputBase);

const MainIput = (props) => {
  const classes = useStyles();
  const { label } = props;

  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <CustomLabel htmlFor="component-error">{label}</CustomLabel>
      <CustomInputForSelect />
    </FormControl>
  );
};

export default MainIput;
