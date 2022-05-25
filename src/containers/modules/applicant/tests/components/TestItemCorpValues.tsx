import { ReactSortable } from 'react-sortablejs';
import { useEffect, useState } from 'react';

import makeStyles from '@mui/styles/makeStyles';
import { Box, Typography } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { blueLight, blueMain, darkGray, greenMain, midDarkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  itemContainer: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    justifyContent: 'space-between',
  },
  itemAnswer: {
    padding: '20px 24px',
    border: '1px solid #E1E3E8',
    borderRight: 'none',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    width: '100%',
    display: 'flex',
    cursor: 'pointer',
  },
  itemHandle: {
    background: '#F0F5FB',
    display: 'flex',
    alignItems: 'center',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  itemIcon: {
    transform: 'rotate(90deg)',
    color: '#979DAD',
    cursor: 'pointer',
  },
  main: {
    '& .sortable-chosen': {
      '& $itemIcon': {
        color: blueMain,
      },
    },
  },
}));

const TestItemCorpValues = ({ title, options, onChange }) => {
  const classes = useItemStyles();
  // const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const gridClasses = useStyles();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (options) {
      setAnswers(options.map((item) => ({ id: item.id, name: item.text })));
    }
  }, [options]);

  useEffect(() => {
    onChange(answers);
  }, [answers]);

  return (
    <Box width={'100%'}>
      <Typography className={classes.title}>{title}</Typography>
      <Box className={gridClasses.main}>
        <ReactSortable list={answers} setList={setAnswers} animation={200}>
          {answers.map((item, key) => (
            <Box key={item.id} className={gridClasses.itemContainer}>
              <Box padding={2.5}>
                <Typography>{key + 1}</Typography>
              </Box>
              <Box className={gridClasses.itemAnswer}>
                <Typography>{item.name}</Typography>
              </Box>
              <Box className={gridClasses.itemHandle}>
                <DragIndicatorIcon className={gridClasses.itemIcon} />
              </Box>
            </Box>
          ))}
        </ReactSortable>
      </Box>
    </Box>
  );
};

const useItemStyles = makeStyles<any>((theme) => ({
  root: {
    'marginLeft': 0,
    '& .MuiFormControlLabel-root': {
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
  },
  logicRadio: {
    'marginBottom': theme.spacing(2),
    '& .MuiFormGroup-root': {
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between',
      },
    },
  },
  checkbox: {
    '& .MuiFormGroup-root': {
      marginLeft: 0,
      flexDirection: 'column',
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
      },
    },
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(26),
    marginBottom: theme.spacing(3.5),
    lineHeight: '110%',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(20),
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  itemClassName: {
    'padding': '11px 16px 11px 16px',
    'borderRadius': 16,
    'border': '1px solid #E1E3E8',
    'marginRight': 0,
    'marginLeft': 0,
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiFormControlLabel-label': {
      fontSize: theme.typography.pxToRem(18),
      lineHeight: '150%',
      fontFamily: 'inter-med',
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(16),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(14),
        fontFamily: 'inter',
      },
    },
    '& .MuiIconButton-colorSecondary:hover': {
      backgroundColor: 'unset',
    },
    '& .MuiRadio-root': {
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      'padding': '16px 10px 16px 18px',
      '& .MuiButtonBase-root': {
        display: 'none',
      },
    },
  },
  itemChecked: {
    'borderRadius': 16,
    'padding': '11px 16px 11px 16px',
    'marginRight': 0,
    'marginLeft': 0,
    'border': '1px solid #fff',
    'backgroundColor': blueLight,
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiFormControlLabel-label': {
      color: blueMain,
      fontSize: theme.typography.pxToRem(18),
      lineHeight: '150%',
      fontFamily: 'inter-med',
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(16),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(14),
        fontFamily: 'inter',
      },
    },
    '& .MuiIconButton-colorSecondary:hover': {
      backgroundColor: 'unset',
    },
    '& .MuiRadio-root': {
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      'padding': '16px 10px 16px 18px',
      '& .MuiButtonBase-root': {
        display: 'none',
      },
    },
  },
  itemClassNameLogic: {
    'padding': '11px 22px 11px 15px',
    'borderRadius': 16,
    'border': '1px solid #E1E3E8',
    'marginRight': theme.spacing(3),
    'marginBottom': theme.spacing(1),

    '& .MuiFormControlLabel-label': {
      color: midDarkGray,
      fontSize: theme.typography.pxToRem(18),
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(16),
      },
    },
    '& .MuiIconButton-colorSecondary:hover': {
      backgroundColor: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      marginRight: 0,
      padding: '11px 19px',
    },
  },
  itemClassNameLogicCheck: {
    'backgroundColor': blueLight,
    'padding': '11px 22px 11px 15px',
    'borderRadius': 16,
    'border': '1px solid #fff',
    'marginRight': theme.spacing(3),
    'marginBottom': theme.spacing(1),
    '& .MuiFormControlLabel-label': {
      color: blueMain,
      fontSize: theme.typography.pxToRem(18),
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(16),
      },
    },
    '& .MuiIconButton-colorSecondary:hover': {
      backgroundColor: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      marginRight: 0,
      padding: '11px 19px',
    },
  },

  img: {
    marginBottom: theme.spacing(4),
    width: '100%',
  },
  imgLogic: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  helperTextBox: {
    'color': darkGray,
    'marginBottom': theme.spacing(3),
    'padding': 0,
    'paddingLeft': theme.spacing(2),
    'position': 'relative',
    '&:before': {
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      content: '""',
      borderRadius: 23,
      width: 4,
      height: '100%',
      backgroundColor: greenMain,
    },
  },
}));

export default TestItemCorpValues;
