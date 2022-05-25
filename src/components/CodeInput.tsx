import dynamic from 'next/dynamic';

import { Box, FormControl, FormHelperText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { pinkMain } from 'styles/colorPalette';
const ReactCodeInput = dynamic(import('react-code-input'));

const useStyles = makeStyles<any>((theme) => ({
  root: {
    '& > input': {
      'webkitAppearance': 'none',
      'MozAppearance': 'textfield',
      'borderRadius': 20,
      'border': '1px solid #E1E3E8',
      'margin': 8,
      'paddingLeft': theme.spacing(3.5),
      'paddingRight': 0,
      'width': 72,
      'fontFamily': 'inter-med',
      'height': 72,
      'boxSizing': 'border-box',
      '&:focus': {
        outline: 'none',
        border: '1px solid #3770FF',
      },
      'fontSize': theme.typography.pxToRem(20),
      [theme.breakpoints.down('md')]: {
        width: 61,
        height: 61,
        paddingLeft: theme.spacing(3),
        borderRadius: theme.spacing(2),
        margin: 3,
      },
    },
    [theme.breakpoints.down('lg')]: {
      textAlign: 'center',
    },
  },
  rootInvalid: {
    '& > input': {
      'webkitAppearance': 'none',
      'MozAppearance': 'textfield',
      'borderRadius': 20,
      'border': `1px solid ${pinkMain}`,
      'margin': 8,
      'paddingLeft': theme.spacing(3.5),
      'paddingRight': 0,
      'width': 72,
      'color': pinkMain,
      'fontFamily': 'inter-med',
      'height': 72,
      'boxSizing': 'border-box',
      '&:focus': {
        outline: 'none',
        border: `1px solid ${pinkMain}`,
      },
      'fontSize': theme.typography.pxToRem(20),
      [theme.breakpoints.down('md')]: {
        width: 61,
        height: 61,
        paddingLeft: theme.spacing(3),
        borderRadius: theme.spacing(2),
        margin: 3,
      },
    },
  },
}));

const CodeInput = (props) => {
  const classes = useStyles();

  return (
    <Box onKeyDown={props.onKeyDown || null}>
      <FormControl variant="outlined" fullWidth error={props.error}>
        <ReactCodeInput
          className={props.error === true ? classes.rootInvalid : classes.root}
          fields={4}
          inputMode="numeric"
          name="sms-code"
          {...props}
        />
        {props.error && <FormHelperText>{props.helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default CodeInput;
