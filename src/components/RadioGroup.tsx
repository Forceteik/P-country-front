import cx from 'classnames';
import { Fragment } from 'react';

import { FormControlLabel, Radio, Box, RadioGroup as DefaultRadioGroup } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueMain, gray } from 'styles/colorPalette';

const useStyles = makeStyles<any, any>((theme) => ({
  icon: {
    'borderRadius': '50%',
    'width': 32,
    'height': 32,
    'border': `1px solid ${gray}`,
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
    [theme.breakpoints.down('md')]: {
      width: 24,
      height: 24,
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
      width: 12,
      height: 12,
      backgroundColor: '#fff',
      content: '""',
    },
    [theme.breakpoints.down('md')]: {
      '&:before': {
        width: 8,
        height: 8,
      },
    },
  },
  root: {
    display: 'flex',
    flexDirection: ({ vertical }) => (vertical ? 'column' : 'row'),
  },
  numeration: {
    color: '#979DAD',
  },
  numerationCheck: {
    color: blueMain,
  },
}));

//resolve console error
// mergeClasses.js:25 Material-UI: The key `icon` provided to the classes prop is not implemented in ForwardRef(Radio).
const RadioGroup = (props) => {
  const {
    items,
    vertical = false,
    itemClassName = null,
    itemClassNameChecked = null,
    testItemCheck = null,
    selectedValue,
    withNumeration = false,
    className = null,
    ...otherProps
  } = props;
  const classes = useStyles({ vertical });

  return (
    <Box className={className}>
      <DefaultRadioGroup {...otherProps} className={classes.root} value={selectedValue} defaultValue={0}>
        {items.map((item, key) => {
          let className;
          let showExtraContent;

          if (itemClassNameChecked) {
            // if (key === selectedValue || item.value === selectedValue) {
            if (item.value === selectedValue) {
              className = itemClassNameChecked;
              showExtraContent = true;
            } else {
              className = itemClassName;
            }
          } else {
            if (testItemCheck) {
              if (item.value === selectedValue) {
                className = testItemCheck;
                showExtraContent = true;
              } else {
                className = itemClassName;
              }
            } else {
              className = itemClassName;
            }
          }

          return (
            <Fragment key={key}>
              <FormControlLabel
                key={key}
                value={item.value}
                className={
                  className
                  // itemClassNameChecked
                  //   ? key === selectedValue || item.value === selectedValue
                  //     ? itemClassNameChecked
                  //     : itemClassName
                  //   : testItemCheck
                  //   ? item.value === selectedValue
                  //     ? testItemCheck
                  //     : itemClassName
                  //   : itemClassName
                }
                control={
                  <Radio
                    disableRipple
                    checkedIcon={<span className={cx(classes.icon, classes.checkedIcon)} />}
                    icon={<span className={classes.icon} />}
                    inputProps={{ 'aria-label': item.label }}
                  />
                }
                label={
                  <>
                    <span
                      className={
                        testItemCheck
                          ? item.value === selectedValue
                            ? classes.numerationCheck
                            : classes.numeration
                          : classes.numeration
                      }
                    >
                      {withNumeration ? `${key + 1}. ` : ''}
                    </span>
                    <span>{item.label[0].toUpperCase() + item.label.slice(1)}</span>
                  </>
                }
              />
              {showExtraContent && item.ExtraContent && <item.ExtraContent />}
            </Fragment>
          );
        })}
      </DefaultRadioGroup>
    </Box>
  );
};

export default RadioGroup;
