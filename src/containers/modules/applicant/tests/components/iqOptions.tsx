import RadioGroup from 'components/RadioGroup';

import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueLight, blueMain, darkGray, gray, ligthGray } from 'styles/colorPalette';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import cx from 'classnames';
import { useEffect, useRef, Fragment } from 'react';

const IQOptions = ({ options = [], selectedValues, handleSelect, loading }) => {
  const length = options.length;
  const classes = useItemStyles({ length });
  const sliderRef = useRef(null);
  const onSelect = (e, statement_id) => {
    const value = { statement_id, answer_id: parseInt(e.target.value), label: e.target.ariaLabel };
    handleSelect(value);
    sliderRef?.current.slickNext();
  };

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        sliderRef.current.slickGoTo(0, true);
      }, 500);
    }
  }, [loading]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    adaptiveHeight: true,
    ref: sliderRef,
    appendDots: (dots) => {
      // console.log("dots", dots);
      return <ul>{dots}</ul>;
    },
    // onReInit: () => {
    //   console.log("onReInit yeah");
    // },
    // afterChange: (current, next) => slickGoTo(slideIndex)
  };

  return (
    <>
      {options && (
        <Box className={classes.root}>
          <Slider dotsClass={cx('slick-dots', classes.slickDots)} {...settings}>
            {options.map((statement, key) => {
              const answers = statement.answers.map((item) => ({ value: item.id, label: item.text })) || [];
              const selectedValue = selectedValues.find((item) => item.statement_id === statement.id);
              return (
                <Fragment key={key}>
                  <Typography className={classes.action}>Выберите один вариант</Typography>
                  {options.length > 1 && (
                    <Box className={classes.statement}>
                      <Box className={classes.statementInner}>
                        <Typography className={classes.statementTitle}>{key + 1}. Утверждение</Typography>
                        <Typography>{statement.text}</Typography>
                      </Box>
                    </Box>
                  )}
                  <Box className={classes.logicRadio} key={key}>
                    <RadioGroup
                      items={answers}
                      selectedValue={selectedValue?.answer_id || 0}
                      vertical
                      itemClassName={classes.itemClassName}
                      testItemCheck={classes.itemChecked}
                      onChange={(e) => onSelect(e, statement.id)}
                      withNumeration
                    />
                  </Box>
                </Fragment>
              );
            })}
          </Slider>
        </Box>
      )}
    </>
  );
};

export const useItemStyles = makeStyles<any, any>((theme) => ({
  root: {
    'position': 'relative',
    '& .MuiFormControlLabel-root': {
      marginRight: 11,
      marginLeft: 0,
    },
    '& .slick-arrow': {
      'zIndex': 15,
      'position': 'absolute',
      'cursor': 'pointer',
      'top': 0,
      'fontSize': 0,
      'border': 'none',
      'width': 30,
      'height': 30,
      'backgroundColor': 'transparent',
      '&:before': {
        display: 'none',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none !important',
      },
    },
    '& .slick-prev': {
      right: ({ length }) => (length == 2 ? 69 : length == 3 ? 93 : length == 4 ? 110 : length * 25),
      left: 'unset',
      backgroundImage: 'url(/images/icons/arrowLeft.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    '& .slick-next': {
      right: 0,
      backgroundImage: 'url(/images/icons/arrowRight.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      cursor: 'pointer',
    },
    '& .slick-slider': {
      position: 'unset',
    },
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
  },
  logicRadio: {
    '& .MuiFormGroup-root': {
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between',
      },
    },
  },
  statement: {
    marginLeft: 16,
  },
  statementInner: {
    backgroundColor: ligthGray,
    borderRadius: 20,
    border: `1px solid ${gray}`,
    padding: '24px 18px 21px 23px',
    marginBottom: theme.spacing(3),
    marginRight: 11,
    marginLeft: -11,
    [theme.breakpoints.down('sm')]: {
      padding: '24px 16px 24px 16px',
    },
  },
  statementTitle: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  statementText: {
    fontSize: theme.typography.pxToRem(18),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
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
      'padding': '8px 6px 8px 14px',
      '& .MuiButtonBase-root': {
        // display: "none",
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
      'padding': '8px 6px 8px 14px',
      '& .MuiButtonBase-root': {
        // display: "none",
      },
    },
  },
  slickDots: {
    '&:after': {
      position: 'absolute',
      backgroundColor: '#fff',
      width: '250px',
      height: '40px',
      top: -5,
      right: -35,
      content: '""',
      zIndex: -1,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    'backgroundColor': '#fff',
    'margin': 0,
    'zIndex': 10,
    'listStyle': 'none',
    'display': 'flex !important',
    'justifyContent': 'center',
    'position': 'absolute',
    'width': 'fit-content',
    'flexShrink': 0,
    'top': -1,
    'right': 31,
    'padding': '0px !important',

    [theme.breakpoints.down('sm')]: {
      top: 'unset',
      bottom: -28,
      right: '50%',
      transform: 'translate(50%)',
    },
    '& li': {
      padding: 0,
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
    },
    '& li button': {
      cursor: 'pointer',
      border: 'none',
      backgroundColor: gray,
      width: 10,
      height: 10,
      borderRadius: '50%',
      fontSize: 0,
      display: 'inline-block',
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        width: 8,
        height: 8,
      },
    },
    '& li button:before': {
      display: 'none',
    },
    '& li.slick-active button': {
      backgroundColor: blueMain,
      width: 16,
      height: 10,
      borderRadius: '100px',
      [theme.breakpoints.down('sm')]: {
        height: 8,
      },
    },
  },
  action: {
    color: darkGray,
    marginBottom: 24,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
}));

export default IQOptions;
