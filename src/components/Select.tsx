import { useRef, useState } from 'react';

import DefaultSelect from '@mui/material/Select';
import { FormControl, InputLabel, Box, MenuItem, Typography, FormHelperText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';

import ChevronDown from 'components/icons/ChevronDown';
import { black, blueLight, blueMain, gray } from 'styles/colorPalette';

const useStyles = makeStyles<any, any>((theme) => ({
  formControl: {
    '& .MuiOutlinedInput-root': {
      borderRadius: ({ small }) => (small ? 14 : 20),
      height: ({ small }) => (small ? 52 : 72),
      backgroundColor: '#fff',
      [theme.breakpoints.down('md')]: {
        height: ({ small }) => (small ? 52 : 52),
        borderRadius: ({ small }) => (small ? 14 : 14),
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '16px 16px 16px 24px',
    },
    [theme.breakpoints.down('md')]: {
      '& .MuiSelect-root.MuiInputBase-input.MuiSelect-outlined': {
        padding: '16px 16px 16px 24px',
      },
      '& .MuiSelect-iconOutlined.MuiSelect-icon': {
        right: 11,
      },
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {
      backgroundColor: '#fff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: gray,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#a7cdfa',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${blueMain}`,
    },
    '& .MuiSelect-iconOutlined': {
      display: ({ disabled }) => (disabled ? 'none' : 'block'),
      right: theme.spacing(3),
    },
    '& .MuiInputBase-root .Mui-disabled': {
      backgroundColor: '#fff',
      color: black,
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: gray,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink.Mui-disabled': {
      backgroundColor: '#fff',
    },
    // "& .MuiInputLabel-outlined": {
    //   transform: ({ small }) => (small ? "translate(24px, 19px) scale(1)" : "translate(27px, 28px) scale(1)"),
    // },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      backgroundColor: '#fff',
      paddingLeft: 3,
      transform: 'translate(13px, -6px) scale(0.75)',
    },
    '& .MuiInputLabel-outlined': {
      [theme.breakpoints.down('md')]: {
        transform: 'translate(23px, 16px) scale(1)',
      },
    },
  },
}));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    'transition': 'all 0.3s',
    'fontSize': theme.typography.pxToRem(18),
    'padding': '22px 10px 22px 44px',
    'fontFamily': 'inter-med',
    '&:hover': {
      backgroundColor: blueLight,
      color: blueMain,
    },
    '&:focus': {
      'color': black,
      'backgroundColor': '#fff',
      '&:hover': {
        color: blueMain,
        backgroundColor: blueLight,
      },
    },
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(14),
      padding: '10px 5px 10px 25px',
    },
  },
  selected: {
    color: blueMain,
  },
}))(MenuItem);

const Select = (props) => {
  const {
    label,
    options,
    defaultValue = '',
    value,
    onChange,
    small = false,
    error = false,
    helperText = '',
    disabled = false,
    onClose = null,
    onBlur = null,
  } = props;
  const ref = useRef(null);
  const classes = useStyles({ small, disabled });

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth error={error} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <DefaultSelect
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        label={label}
        ref={ref}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          // getContentAnchorEl: null,
          PaperProps: {
            style: {
              borderRadius: 20,
              color: black,
              boxShadow: '0px 24px 42px rgba(213, 219, 228, 0.52)',
            },
          },
        }}
        IconComponent={(props) => {
          return (
            <Box className={props.className}>
              <ChevronDown />
            </Box>
          );
        }}
        onBlur={onBlur}
        onClose={onClose}
      >
        {options.map((item, key) => (
          <StyledMenuItem key={key} value={item.value} disabled={item.disabled}>
            {item.label}
          </StyledMenuItem>
        ))}
      </DefaultSelect>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

const useSelectTextStyles = makeStyles<any, any>((theme) => ({
  formControl: {
    '& .MuiInput-underline:before': {
      display: 'none',
    },
    '& .MuiInput-underline:after': {
      display: 'none',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'unset',
    },
    '& .MuiSelect-select.MuiSelect-select': {
      paddingRight: theme.spacing(0.5),
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiInput-formControl': {
      [theme.breakpoints.down('md')]: {
        flexDirection: ({ compact }) => (compact ? 'row-reverse' : 'row'),
      },
    },
  },
  iconDown: {
    'width': 24,
    'height': 24,
    '& svg': {
      transition: 'transform 0.3s',
      transform: ({ open }) => (open ? 'rotate(-180deg)' : 'rotate(0deg)'),
    },
    [theme.breakpoints.down('md')]: {
      marginRight: ({ compact }) => (compact ? '10px' : 0),
    },
  },
  renderValue: {
    [theme.breakpoints.down('md')]: {
      fontSize: ({ compact }) => (compact ? theme.typography.pxToRem(12) : theme.typography.pxToRem(16)),
    },
    '& span': {
      color: blueMain,
      [theme.breakpoints.down('md')]: {
        display: ({ compact }) => (compact ? 'block' : 'inline-block'),
        fontSize: ({ compact }) => (compact ? theme.typography.pxToRem(12) : theme.typography.pxToRem(16)),
      },
    },
  },
  item: {
    'fontFamily': 'inter-med',
    'fontSize': theme.typography.pxToRem(14),
    'padding': '14px 24px',
    'transition': 'all 0.3s',
    '&:hover': {
      backgroundColor: blueLight,
      color: blueMain,
    },
    '&.Mui-selected': {
      'backgroundColor': blueLight,
      'color': blueMain,
      '&:hover': {
        backgroundColor: blueLight,
        color: blueMain,
      },
    },
  },
  paper: {
    '&::-webkit-scrollbar': {
      width: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: blueMain,
      borderRadius: 20,
    },
  },
  menu: {
    '& .MuiMenu-paper': {
      '&::-webkit-scrollbar': {
        width: 10,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: gray,
        borderRadius: 20,
      },
    },
  },
  icon: {
    'borderRadius': '50%',
    'width': 24,
    'height': 24,
    'border': `1px solid ${gray}`,
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    'position': 'relative',
    'backgroundColor': blueMain,
    '&:before': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      width: 9,
      height: 9,
      backgroundColor: '#fff',
      content: '""',
    },
  },
}));

const SelectText = (props) => {
  const { compact = false } = props;
  const [open, setOpen] = useState(false);
  const classes = useSelectTextStyles({ open, compact });

  return (
    <FormControl className={classes.formControl}>
      <DefaultSelect
        value={props.selectedValue}
        onChange={props.onChange}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        MenuProps={{
          className: classes.menu,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          PaperProps: {
            style: {
              borderRadius: 14,
              color: black,
              boxShadow: '0px 24px 42px rgba(213, 219, 228, 0.52)',
            },
          },
        }}
        renderValue={(value) => {
          return (
            <Box className={classes.renderValue}>
              {props.label}{' '}
              <Typography component="span">{props.options.find((item) => item.value === value).label}</Typography>
            </Box>
          );
        }}
        IconComponent={() => {
          return (
            <Box className={classes.iconDown}>
              <ChevronDown />
            </Box>
          );
        }}
      >
        {props.options.map((item, i) => (
          <MenuItem value={item.value} className={classes.item} key={i}>
            {item.label}
          </MenuItem>
        ))}
      </DefaultSelect>
    </FormControl>
  );
};

export { SelectText };

export default Select;
