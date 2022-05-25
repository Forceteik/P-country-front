import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import useMediaQuery from '@mui/material/useMediaQuery';

import RadioGroup from 'components/RadioGroup';
import { blueLight, blueMain, darkGray, greenMain, midDarkGray } from 'styles/colorPalette';

const TestItemSocial = ({
  title,
  helperText = '',
  options,
  selectedValue,
  handleSelect,
  imgUrlWeb = null,
  imgUrlMobile = null,
}) => {
  //todo сделать в админке текст в виде нумерации, не стоить дополнять текст на фронте
  const answers = options?.map((item, key) => ({ value: item.id, label: item.text || `${key + 1}` })) || [];
  const classes = useItemStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>
      {helperText ? (
        <Box className={classes.helperTextBox}>
          <Typography>{helperText}</Typography>
        </Box>
      ) : (
        ''
      )}
      {(imgUrlMobile || imgUrlWeb) && (
        <img className={classes.img} src={isMobile ? imgUrlMobile?.original_url : imgUrlWeb?.original_url} alt="" />
      )}
      <RadioGroup
        items={answers}
        selectedValue={selectedValue}
        vertical
        className={classes.checkbox}
        itemClassName={classes.itemClassName}
        testItemCheck={classes.itemChecked}
        onChange={handleSelect}
        withNumeration
      />
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

export default TestItemSocial;
