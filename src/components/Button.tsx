import { useCallback } from 'react';
import Link from 'next/link';

import DefaultButton from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

import {
  black,
  blueActive,
  blueHover,
  blueLight,
  blueMain,
  darkGray,
  gray,
  greenMain,
  ligthGray,
  midDarkGray,
  pinkLight,
  pinkMain,
  pinkWhite,
} from 'styles/colorPalette';

import AccordionDown from './icons/AccordionDown';
import Download from './icons/Download';
import Close from './icons/Close';

const useStyles = makeStyles<any, any>((theme) => ({
  root: {
    'backgroundColor': blueMain,
    'borderRadius': ({ small }) => (small ? 14 : 20),
    'border': 0,
    'textDecoration': 'none',
    'color': '#ffffff',
    'padding': '16px 20px',
    'transition': 'all 0.3s',
    'height': ({ small }) => (small ? 52 : 72),
    '&:hover': { backgroundColor: blueHover, textDecoration: 'none', boxShadow: 'none' },
    '&:focus': { backgroundColor: blueHover, textDecoration: 'none', boxShadow: 'none' },
    '&:active': { backgroundColor: blueActive, textDecoration: 'none', boxShadow: 'none' },
    'fontSize': ({ small }) => (small ? theme.typography.pxToRem(16) : theme.typography.pxToRem(18)),
    'lineHeight': '115%',
    '&.Mui-disabled': {
      height: ({ small }) => (small ? 52 : 72),
      backgroundColor: '#E0E0E0',
    },
    [theme.breakpoints.down('md')]: {
      'height': '52px !important',
      'borderRadius': '14px !important',
      'fontSize': `${theme.typography.pxToRem(16)} !important`,
      '&.Mui-disabled': {
        height: 52,
      },
    },
  },
  disabled: {
    background: 'black',
  },
  whiteProgress: {
    color: '#ffffff',
  },
  blackProgress: {
    color: '#000000',
  },
}));

const Button = (props) => {
  const { nextLink, linkProps, loading = false, disabled = false, small = false, ...otherProps } = props;
  const classes = useStyles({ small });
  if (nextLink) {
    return (
      <Link {...linkProps}>
        <a {...otherProps.nativelinkprops}>
          <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps}>
            {props.children}
          </DefaultButton>
        </a>
      </Link>
    );
  }
  return (
    <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps} disabled={loading || disabled}>
      {loading ? <CircularProgress size={24} className={classes.whiteProgress} /> : props.children}
    </DefaultButton>
  );
};

const useHugStyles = makeStyles<any, any>((theme) => ({
  root: {
    'backgroundColor': blueMain,
    'borderRadius': 8,
    'border': 0,
    'textDecoration': 'none',
    'color': '#ffffff',
    'padding': '8px 20px',
    'transition': 'all 0.3s',
    'textTransform': 'uppercase',
    'height': 34,
    '&:hover': { backgroundColor: blueHover, textDecoration: 'none', boxShadow: 'none' },
    '&:focus': { backgroundColor: blueHover, textDecoration: 'none', boxShadow: 'none' },
    '&:active': { backgroundColor: blueActive, textDecoration: 'none', boxShadow: 'none' },
    'fontSize': theme.typography.pxToRem(12),
    'lineHeight': '115%',
    '&.Mui-disabled': {
      height: 34,
      backgroundColor: '#E0E0E0',
    },
  },
  disabled: {
    background: 'black',
  },
  whiteProgress: {
    color: '#ffffff',
  },
  blackProgress: {
    color: '#000000',
  },
}));

const HugButton = (props) => {
  const { nextLink, linkProps, loading = false, disabled = false, small = false, ...otherProps } = props;
  const classes = useHugStyles({ small });
  if (nextLink) {
    return (
      <Link {...linkProps}>
        <a {...otherProps.nativelinkprops}>
          <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps}>
            {props.children}
          </DefaultButton>
        </a>
      </Link>
    );
  }
  return (
    <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps} disabled={loading || disabled}>
      {loading ? <CircularProgress size={24} className={classes.whiteProgress} /> : props.children}
    </DefaultButton>
  );
};

const useSecondaryStyles = makeStyles<any, any>((theme) => ({
  root: {
    'backgroundColor': ({ type }) => {
      if (type === 'warning') {
        return '#FFF1F7';
      }
      return blueLight;
    },
    'borderRadius': ({ small }) => (small ? 14 : 20),
    'textDecoration': 'none',
    'height': ({ small }) => (small ? 52 : 72),
    'boxShadow': 'none',
    'transition': 'all 0.3s',
    'fontFamily': ({ type }) => (type === 'medium' ? 'inter-med' : 'inter'),
    'padding': ({ type }) => (type === 'medium' ? '16px 28px' : '16px 20px'),
    '&.Mui-disabled': {
      color: '#b3b3b3',
      lineHeight: '115%',
    },
    '&': {
      whiteSpace: 'nowrap',
      transition: 'all, 0.3s',
      fontSize: ({ small }) => (small ? theme.typography.pxToRem(16) : theme.typography.pxToRem(18)),
      color: ({ type }) => {
        if (type === 'warning') {
          return '#EF466F';
        }
        return blueMain;
      },
      lineHeight: '115%',
    },
    '&:hover': {
      'backgroundColor': ({ type }) => {
        if (type === 'warning') {
          return '#FFF1F7';
        }
        return blueLight;
      },
      'boxShadow': 'none',
      '&:focus': { textDecoration: 'none', boxShadow: 'none' },
      '&:active': { textDecoration: 'none', boxShadow: 'none' },
      'color': ({ type }) => {
        if (type === 'warning') {
          return '#d7365b';
        }
        return blueHover;
      },
    },
    [theme.breakpoints.down('md')]: {
      height: '52px !important',
      borderRadius: '14px !important',
      fontSize: ({ smallFont }) =>
        smallFont ? `${theme.typography.pxToRem(14)} !important` : `${theme.typography.pxToRem(16)} !important`,
      whiteSpace: 'normal',
    },
  },
}));

/**
 * sent next/Link via Button => component={Link} is immposible due to multiple child
 * React.Children.only expected to receive a single React element child.
 * https://github.com/vercel/next.js/issues/1605
 * That's why I send it manually via nexLink prop
 * @param props
 * @constructor
 */
const SecondaryButton = (props) => {
  const {
    nextLink,
    linkProps,
    type = 'default',
    loading = false,
    small = false,
    disabled = false,
    smallFont = false,
    ...otherProps
  } = props;
  const classes = useSecondaryStyles({ type, small, smallFont });

  if (nextLink) {
    return (
      <Link {...linkProps}>
        <a {...otherProps.nativelinkprops}>
          <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps} />
        </a>
      </Link>
    );
  }
  return (
    <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps} disabled={loading || disabled}>
      {loading ? <CircularProgress size={24} /> : props.children}
    </DefaultButton>
  );
};

const useGreenStyles = makeStyles<any, any>((theme) => ({
  root: {
    'backgroundColor': ({ type }) => {
      if (type === 'warning') {
        return '#FFF1F7';
      }
      return greenMain;
    },
    'borderRadius': ({ small }) => (small ? 14 : 20),
    'textDecoration': 'none',
    'height': ({ small }) => (small ? 52 : 72),
    'boxShadow': 'none',
    'padding': '16px 20px',
    'whiteSpace': 'nowrap',
    'transition': 'all 0.3s',
    'fontSize': ({ small }) => (small ? theme.typography.pxToRem(16) : theme.typography.pxToRem(18)),
    'color': ({ type }) => {
      if (type === 'warning') {
        return '#EF466F';
      }
      return '#ffffff';
    },
    'lineHeight': '115%',
    '&.Mui-disabled': {
      color: '#b3b3b3',
      lineHeight: '115%',
    },

    '&:hover': {
      'backgroundColor': ({ type }) => {
        if (type === 'warning') {
          return '#FFF1F7';
        }
        return '#22a58b';
      },
      'boxShadow': 'none',
      '&:focus': { textDecoration: 'none', boxShadow: 'none' },
      '&:active': { textDecoration: 'none', boxShadow: 'none' },
      'color': ({ type }) => {
        if (type === 'warning') {
          return '#d7365b';
        }
        return '#FFFFFF';
      },
    },
    [theme.breakpoints.down('md')]: {
      height: '52px !important',
      borderRadius: '14px !important',
      fontSize: `${theme.typography.pxToRem(16)} !important`,
      whiteSpace: 'normal',
    },
  },
}));

export const GreenButton = (props) => {
  const {
    nextLink,
    linkProps,
    type = 'default',
    loading = false,
    small = false,
    disabled = false,
    ...otherProps
  } = props;
  const classes = useGreenStyles({ type, small });

  if (nextLink) {
    return (
      <Link {...linkProps}>
        <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps} />
      </Link>
    );
  }
  return (
    <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps} disabled={loading || disabled}>
      {loading ? <CircularProgress size={24} /> : props.children}
    </DefaultButton>
  );
};

const useDashedStyles = makeStyles<any>((theme) => ({
  root: {
    'height': 38,
    'backgroundColor': 'transparent',
    'border': '2px dashed #E1E3E8',
    'borderRadius': 60,
    'padding': '0px 16px',
    'transition': 'all 0.3s',
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: blueMain,
      color: blueMain,
    },
  },
  label: {
    transition: 'all 0.3s',
    color: '#979DAD',
    textTransform: 'uppercase',
    fontFamily: 'inter',
    fontSize: theme.typography.pxToRem(12),
    letterSpacing: '0.03em',
  },
}));

const useMainInvertStyles = makeStyles<any, any>((theme) => ({
  root: {
    'backgroundColor': '#fff',
    'borderRadius': ({ small }) => (small ? 14 : 20),
    'border': 0,
    'textDecoration': 'none',
    'color': black,
    'padding': theme.spacing(2),
    'transition': 'all 0.3s',
    'height': ({ small }) => (small ? 52 : 72),
    '&:hover': { backgroundColor: ligthGray, textDecoration: 'none', boxShadow: 'none' },
    '&:focus': { backgroundColor: ligthGray, textDecoration: 'none', boxShadow: 'none' },
    '&:active': { backgroundColor: gray, textDecoration: 'none', boxShadow: 'none' },
    'fontSize': ({ small }) => (small ? theme.typography.pxToRem(16) : theme.typography.pxToRem(18)),
    'lineHeight': '115%',
    '&.Mui-disabled': {
      height: ({ small }) => (small ? 52 : 72),
    },
    [theme.breakpoints.down('md')]: {
      'height': '52px !important',
      'borderRadius': '14px !important',
      'fontSize': `${theme.typography.pxToRem(16)} !important`,
      '&.Mui-disabled': {
        height: 52,
      },
    },
  },
}));

const MainInvertButton = (props) => {
  const { nextLink, linkProps, loading = false, disabled = false, small = false, ...otherProps } = props;
  const classes = useMainInvertStyles({ small });
  if (nextLink) {
    return (
      <Link {...linkProps}>
        <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps}>
          {props.children}
        </DefaultButton>
      </Link>
    );
  }
  return (
    <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps} disabled={loading || disabled}>
      {loading ? <CircularProgress size={24} className={classes.blackProgress} /> : props.children}
    </DefaultButton>
  );
};

const useSplitRightButton = makeStyles<any, any>((theme) => ({
  root: {
    'backgroundColor': '#fff',
    'borderRadius': '0px 20px 20px 0px',
    'border': `1px solid ${gray}`,
    'textDecoration': 'none',
    'color': ({ deleteStile }) => (deleteStile ? midDarkGray : blueMain),
    'padding': theme.spacing(2),
    'transition': 'all 0.3s',
    'height': 72,
    '&:hover': { backgroundColor: '#fff', textDecoration: 'none', boxShadow: 'none', border: `1px solid #a7cdfa` },
    '&:focus': { backgroundColor: '#fff', textDecoration: 'none', boxShadow: 'none', border: `1px solid #a7cdfa` },
    '&:active': { backgroundColor: '#fff', textDecoration: 'none', boxShadow: 'none', border: `1px solid #a7cdfa` },
    'fontSize': theme.typography.pxToRem(18),
    'lineHeight': '115%',
    '&.Mui-disabled': {
      height: ({ small }) => (small ? 52 : 72),
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: `${theme.typography.pxToRem(16)} !important`,
    },
    [theme.breakpoints.down('md')]: {
      'borderRadius': '0px 14px 14px 0px',
      'height': '52px !important',
      'padding': '8px 12px 8px 12px',
      'fontSize': `${theme.typography.pxToRem(14)} !important`,
      '&.Mui-disabled': {
        height: 52,
      },
    },
  },
}));

const SplitRightButton = (props) => {
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const {
    nextLink,
    linkProps,
    loading = false,
    disabled = false,
    small = false,
    deleteStile = false,
    ...otherProps
  } = props;
  const classes = useSplitRightButton({ small, deleteStile });

  const EndIcon = useCallback(() => {
    if (loading) {
      return null;
    }
    if (deleteStile) {
      return <Close color={midDarkGray} />;
    }
    return <Download width={isMobile ? 12 : 18} height={isMobile ? 14 : 21} />;
  }, [loading, deleteStile]);

  if (nextLink) {
    return (
      <Link {...linkProps}>
        <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps}>
          {props.children}
        </DefaultButton>
      </Link>
    );
  }

  return (
    <DefaultButton
      variant="contained"
      disableRipple
      classes={classes}
      {...otherProps}
      disabled={loading || disabled}
      endIcon={<EndIcon />}
    >
      {loading ? <CircularProgress size={24} className={classes.blackProgress} /> : props.children}
    </DefaultButton>
  );
};

const useTetriatyStyles = makeStyles<any, any>((theme) => ({
  root: {
    'backgroundColor': '#fff',
    'borderRadius': ({ small }) => (small ? 14 : 20),
    'border': `1px solid ${gray}`,
    'textDecoration': 'none',
    'color': black,
    'padding': theme.spacing(2),
    'height': ({ small }) => (small ? 52 : 72),
    '&:hover': {
      backgroundColor: '#fff',
      textDecoration: 'none',
      boxShadow: 'none',
      borderColor: blueMain,
      color: blueMain,
    },
    '&:focus': {
      backgroundColor: '#fff',
      textDecoration: 'none',
      boxShadow: 'none',
      borderColor: blueMain,
      color: blueMain,
    },
    '&:active': {
      backgroundColor: '#fff',
      textDecoration: 'none',
      boxShadow: 'none',
      borderColor: blueHover,
      color: blueHover,
    },
    'fontSize': ({ small }) => (small ? theme.typography.pxToRem(16) : theme.typography.pxToRem(18)),
    'lineHeight': '115%',
    'transition': 'all 0.3s',
    '&.Mui-disabled': {
      height: ({ small }) => (small ? 52 : 72),
    },
    [theme.breakpoints.down('md')]: {
      'height': '52px !important',
      'borderRadius': '14px !important',
      'fontSize': `${theme.typography.pxToRem(16)} !important`,
      '&.Mui-disabled': {
        height: 52,
      },
    },
  },
}));

const TetriatyButton = (props) => {
  const { nextLink, linkProps, loading = false, disabled = false, small = false, ...otherProps } = props;
  const classes = useTetriatyStyles({ small });
  if (nextLink) {
    return (
      <Link {...linkProps}>
        <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps}>
          {props.children}
        </DefaultButton>
      </Link>
    );
  }
  return (
    <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps} disabled={loading || disabled}>
      {loading ? <CircularProgress size={24} className={classes.blackProgress} /> : props.children}
    </DefaultButton>
  );
};

const useDangerStyles = makeStyles<any, any>((theme) => ({
  root: {
    'backgroundColor': pinkWhite,
    'borderRadius': ({ small }) => (small ? 14 : 20),
    'border': 'none',
    'textDecoration': 'none',
    'color': pinkMain,
    'padding': theme.spacing(2),
    'height': ({ small }) => (small ? 52 : 72),
    '&:hover': {
      backgroundColor: pinkLight,
      textDecoration: 'none',
      boxShadow: 'none',
      borderColor: 'none',
      color: pinkMain,
    },
    '&:focus': {
      backgroundColor: pinkLight,
      textDecoration: 'none',
      boxShadow: 'none',
      borderColor: 'none',
      color: pinkMain,
    },
    '&:active': {
      backgroundColor: pinkLight,
      textDecoration: 'none',
      boxShadow: 'none',
      borderColor: 'none',
      color: pinkMain,
    },
    'fontSize': ({ small }) => (small ? theme.typography.pxToRem(16) : theme.typography.pxToRem(18)),
    'lineHeight': '115%',
    'transition': 'all 0.3s',
    '&.Mui-disabled': {
      height: ({ small }) => (small ? 52 : 72),
    },
    [theme.breakpoints.down('md')]: {
      'height': '52px !important',
      'borderRadius': '14px !important',
      'fontSize': `${theme.typography.pxToRem(16)} !important`,
      '&.Mui-disabled': {
        height: 52,
      },
    },
  },
}));

const DangerButton = (props) => {
  const { nextLink, linkProps, loading = false, disabled = false, small = false, ...otherProps } = props;
  const classes = useDangerStyles({ small });
  if (nextLink) {
    return (
      <Link {...linkProps}>
        <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps}>
          {props.children}
        </DefaultButton>
      </Link>
    );
  }
  return (
    <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps} disabled={loading || disabled}>
      {loading ? <CircularProgress size={24} className={classes.blackProgress} /> : props.children}
    </DefaultButton>
  );
};

const DashedButton = (props) => {
  const { ...otherProps } = props;
  const classes = useDashedStyles();
  return <DefaultButton classes={classes} {...otherProps} />;
};

const useWithArrowStyles = makeStyles<any, any>((theme) => ({
  root: {
    'backgroundColor': blueLight,
    'borderRadius': ({ small }) => (small ? 14 : 20),
    'border': 'none',
    'textDecoration': 'none',
    'color': darkGray,
    'padding': theme.spacing(2),
    'height': ({ small }) => (small ? 52 : 72),
    '&:hover': {
      backgroundColor: gray,
      textDecoration: 'none',
      boxShadow: 'none',
      borderColor: 'none',
      color: black,
    },
    '&:focus': {
      textDecoration: 'none',
      boxShadow: 'none',
      borderColor: 'none',
    },
    '&:active': {
      backgroundColor: gray,
      textDecoration: 'none',
      boxShadow: 'none',
      borderColor: 'none',
      color: black,
    },
    'fontSize': ({ small }) => (small ? theme.typography.pxToRem(16) : theme.typography.pxToRem(18)),
    'lineHeight': '115%',
    'transition': 'all 0.3s',
    'whiteSpace': 'nowrap',
    '&.Mui-disabled': {
      height: ({ small }) => (small ? 52 : 72),
    },
    [theme.breakpoints.down('md')]: {
      'height': '52px !important',
      'borderRadius': '14px !important',
      'fontSize': `${theme.typography.pxToRem(16)} !important`,
      '&.Mui-disabled': {
        height: 52,
      },
    },
  },
  endIcon: {
    transform: ({ open }) => (!open ? 'none' : 'rotate(180deg)'),
  },
}));

const ButtonWithArrow = (props) => {
  const { loading = false, disabled = false, handleClick, open = false, small = false, ...otherProps } = props;

  const classes = useWithArrowStyles({ small, open });
  return (
    <DefaultButton
      variant="contained"
      onClick={handleClick}
      disableRipple
      classes={classes}
      {...otherProps}
      disabled={loading || disabled}
      endIcon={<AccordionDown />}
    >
      {loading ? <CircularProgress size={24} className={classes.blackProgress} /> : props.children}
    </DefaultButton>
  );
};

const useFlexibleStyles = makeStyles<any, any>((theme) => ({
  root: {
    'backgroundColor': ({ backgroundColor }) => backgroundColor,
    'borderRadius': ({ borderRadius }) => borderRadius,
    'border': 'none',
    'textDecoration': 'none',
    'padding': '16px 20px',
    'transition': 'all 0.3s',
    'height': ({ height }) => height,
    'fontSize': theme.typography.pxToRem(16),
    'fontFamily': ({ fontFamily }) => fontFamily,
    'letterSpacing': '0.02em',
    'color': ({ textColor }) => textColor,
    '&:hover': {
      backgroundColor: ({ backgroundHover }) => backgroundHover,
      textDecoration: 'none',
      boxShadow: 'none',
      color: ({ colorHover }) => colorHover,
    },
    '&:focus': {
      backgroundColor: ({ backgroundHover }) => backgroundHover,
      textDecoration: 'none',
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: ({ backgroundHover }) => backgroundHover,
      textDecoration: 'none',
      boxShadow: 'none',
    },
    '&.Mui-disabled': {
      height: ({ height }) => height,
    },
    [theme.breakpoints.down('md')]: {
      'height': '52px !important',
      '&.Mui-disabled': {
        height: 52,
      },
    },
  },
}));

const FlexibleStyleButton = (props) => {
  const {
    nextLink,
    linkProps,
    loading = false,
    disabled = false,
    small = false,
    backgroundColor = blueMain,
    backgroundHover = blueHover,
    borderRadius = 8,
    height = 58,
    textColor = darkGray,
    colorHover = '#fff',
    fontFamily = 'inter-med',
    ...otherProps
  } = props;
  const classes = useFlexibleStyles({
    small,
    backgroundColor,
    backgroundHover,
    borderRadius,
    height,
    textColor,
    fontFamily,
    colorHover,
  });
  if (nextLink) {
    return (
      <Link {...linkProps}>
        <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps}>
          {props.children}
        </DefaultButton>
      </Link>
    );
  }
  return (
    <DefaultButton variant="contained" disableRipple classes={classes} {...otherProps} disabled={loading || disabled}>
      {loading ? <CircularProgress size={24} className={classes.blackProgress} /> : props.children}
    </DefaultButton>
  );
};

export {
  SecondaryButton,
  DashedButton,
  MainInvertButton,
  TetriatyButton,
  DangerButton,
  ButtonWithArrow,
  SplitRightButton,
  FlexibleStyleButton,
  HugButton,
};
export default Button;
