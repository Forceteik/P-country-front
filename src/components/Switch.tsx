import { FormControlLabel } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DefaultSwitch from '@mui/material/Switch';
import Box from '@mui/material/Box';

import { greenMain, midDarkGray, white } from 'styles/colorPalette';

const useSwitchStyles = makeStyles<any>((theme) => ({
  root: {
    'alignItems': 'center',
    'padding': 0,
    'marginLeft': theme.spacing(2),
    '& .MuiSwitch-switchBase': {
      left: 1,
      top: 'unset',
    },
  },
  switchBase: {
    'padding': 1,
    '&$checked': {
      'transform': 'translateX(18px)',
      'color': white,
      '& + $track': {
        backgroundColor: greenMain,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 20,
    height: 20,
    boxShadow: 'none',
  },
  track: {
    width: 42,
    height: 24,
    borderRadius: 26 / 2,
    backgroundColor: midDarkGray,
    opacity: 1,
    transition: theme.transitions.create(['background-color']),
  },
  checked: {},
  focusVisible: {},
}));

const useControlledLabelStyles = makeStyles<any>(() => ({
  root: {
    marginLeft: 0,
  },
}));

const Switch = (props) => {
  const { label, ...otherProps } = props;

  const switchClasses = useSwitchStyles();
  const controlledLabelClasses = useControlledLabelStyles();

  return (
    <Box>
      <FormControlLabel
        control={
          <DefaultSwitch
            focusVisibleClassName={switchClasses.focusVisible}
            disableRipple
            classes={{
              root: switchClasses.root,
              switchBase: switchClasses.switchBase,
              thumb: switchClasses.thumb,
              track: switchClasses.track,
              checked: switchClasses.checked,
            }}
            {...otherProps}
          />
        }
        label={label}
        labelPlacement="start"
        classes={{
          root: controlledLabelClasses.root,
        }}
      />
    </Box>
  );
};

export default Switch;
