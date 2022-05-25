import Slider from 'react-slick';

import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
// import useMediaQuery from '@mui/material/useMediaQuery';

import RadioGroup from 'components/RadioGroup';
import { darkGray, greenMain, midDarkGray } from 'styles/colorPalette';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Statements = ({ title, task, options, selectedValues, handleSelect }) => {
  // const statements = options?.map((item) => ({ value: item.id, label: item.text })) || [];
  const classes = useItemStyles();
  // const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const onSelect = (e, statement_id) => {
    const value = { statement_id, answer_id: parseInt(e.target.value) };
    handleSelect(value);
  };
  // console.log("selectedValues", selectedValues);
  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.title}>{task}</Typography>
      {options && (
        <Slider {...settings}>
          {options.map((statement, key) => {
            const answers = statement.answers.map((item) => ({ value: item.id, label: item.text })) || [];
            const selectedValue = selectedValues.find((item) => item.statement_id === statement.id);
            // console.log("selectedValue?.answer_id", selectedValue);
            return (
              <Box className={classes.logicRadio} key={key}>
                <Typography>{statement.text}</Typography>
                <RadioGroup
                  items={answers}
                  selectedValue={selectedValue?.answer_id || 0}
                  vertical
                  itemClassName={classes.itemClassName}
                  onChange={(e) => onSelect(e, statement.id)}
                  withNumeration
                />
              </Box>
            );
          })}
        </Slider>
      )}
    </Box>
  );
};

const useItemStyles = makeStyles<any>((theme) => ({
  root: {
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
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(22),
    marginBottom: theme.spacing(4),
    lineHeight: '110%',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(20),
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      marginBottom: theme.spacing(2),
    },
  },
  itemClassName: {
    'padding': theme.spacing(2),
    'borderRadius': 16,
    'border': '1px solid #E1E3E8',
    'marginBottom': theme.spacing(2),
    'marginRight': 0,
    '& .MuiFormControlLabel-label': {
      fontSize: theme.typography.pxToRem(18),
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(16),
      },
    },
  },
  itemClassNameLogic: {
    'padding': '15px 24px',
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
    [theme.breakpoints.down('sm')]: {
      width: '49%',
      marginRight: 0,
      padding: '11px 19px',
    },
  },
  img: {
    marginBottom: theme.spacing(4),
    width: '100%',
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

export default Statements;
