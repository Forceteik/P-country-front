import React, { ReactNode } from 'react';

import {
  Tabs as DefaultTabs,
  Tab as DefaultTab,
  type TabProps as DefaultTabProps,
  type TabsProps as DefaultTabsProps,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { black, white, darkGray, ligthGray } from 'styles/colorPalette';

const useTabItemStyles = makeStyles<any>(() => ({
  root: {
    background: 'inherit',
    borderRadius: '10px',
    minWidth: 'auto',
    maxWidth: 'none',
    padding: '8px 28px',
    marginRight: '6px',
  },
  selected: {
    'background': white,
    '& .MuiTab-wrapper': {
      color: black,
    },
  },
  wrapper: {
    color: darkGray,
  },
}));

type TabProps = DefaultTabProps;

const Tab = ({ label, value, disabled, icon, className, ...otherProps }: TabProps) => {
  const tabItemClasses = useTabItemStyles();

  return (
    <DefaultTab
      classes={tabItemClasses}
      label={label}
      value={value}
      disabled={disabled}
      icon={icon}
      className={className}
      {...otherProps}
    />
  );
};

const useTabsContainerStyles = makeStyles<any>((theme) => ({
  root: {
    'background': ligthGray,
    'borderRadius': 10,
    'padding': '6px 0 6px 6px',
    'width': 'fit-content',
    '& .MuiButtonBase-root': {
      'minHeight': 40,
      'opacity': 1,
      'textTransform': 'none',
      'fontSize': theme.typography.pxToRem(16),
      'fontFamily': 'inter-med',
      'lineHeight': '110%',
      'color': darkGray,
      '&.Mui-selected': {
        color: black,
      },
    },
  },
  indicator: {
    display: 'none',
  },
}));

interface TabsProps extends DefaultTabsProps {
  children: ReactNode;
  onChange: (newValue: DefaultTabProps['value']) => void;
}

const Tabs = ({ children, value, onChange, ...otherProps }: TabsProps) => {
  const tabsContainerClasses = useTabsContainerStyles();

  const handleTabChange = (e, newValue) => {
    onChange(newValue);
  };

  return (
    <DefaultTabs value={value} disableRipple onChange={handleTabChange} classes={tabsContainerClasses} {...otherProps}>
      {children}
    </DefaultTabs>
  );
};

Tabs.Item = Tab;

export default Tabs;
