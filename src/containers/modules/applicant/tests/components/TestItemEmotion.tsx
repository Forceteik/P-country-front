import { useEffect, useState } from 'react';

import { Box, Typography, Grid, Slider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Tooltip from '@mui/material/Tooltip';

import { blueLight, darkGray, gray, midDarkGray } from 'styles/colorPalette';
import { useTooltipLightStyles } from 'components/TextField';

const useStyles = makeStyles<any>((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(26),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(22),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  slider: {
    '& .MuiSlider-thumb:hover': {
      boxShadow: '0px 2px 13px 3px rgba(163, 175, 192, 0.9)',
    },
    '& .MuiSlider-thumb.Mui-focusVisible': {
      boxShadow: '0px 2px 13px 1px rgba(163, 175, 192, 0.82)',
    },
    '& .MuiSlider-thumb.MuiSlider-active': {
      boxShadow: '0px 2px 13px 1px rgba(163, 175, 192, 0.82)',
    },
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: gray,
  },
  thumb: {
    width: 18,
    height: 18,
    border: '3px solid white',
    boxShadow: '0px 2px 13px 1px rgba(163, 175, 192, 0.82)',
  },
  defaultThumb: {
    width: 18,
    height: 18,
    border: '3px solid white',
    boxShadow: '0px 2px 13px 1px rgba(163, 175, 192, 0.82)',
    backgroundColor: darkGray,
  },
  track: {
    height: 6,
    borderRadius: 12,
  },
  rail: {
    height: 6,
    borderRadius: 0,
    backgroundColor: blueLight,
    opacity: 1,
  },
  label: {
    'width': '100%',
    'display': 'flex',
    'justifyContent': 'space-between',
    'marginBottom': theme.spacing(1),
    'alignItems': 'center',
    '& p': {
      fontSize: theme.typography.pxToRem(12),
      color: midDarkGray,
    },
  },
  mark: {
    height: 22,
    width: 2,
    color: blueLight,
    top: '17%',
    opacity: 1,
  },
}));

const marks = [
  {
    value: -3,
    label: 'Полностью не согласен',
  },
  {
    value: -2,
    label: 'В основном не согласен',
  },
  {
    value: -1,
    label: 'Отчасти не согласен',
  },
  {
    value: 0,
    label: 'Потяните ползунок',
  },
  {
    value: 1,
    label: 'Отчасти согласен',
  },
  {
    value: 2,
    label: 'В основном согласен',
  },
  {
    value: 3,
    label: 'Полностью согласен',
  },
];

const calculatePoint = (value) => {
  if (value < 0) {
    return value + 4;
  }
  return value + 3;
};

const generateLabel = (value) => {
  return marks.find((item) => item.value === value).label;
};
const ValueLabelComponent = (props) => {
  const { children, value } = props;
  const tooltipClasses = useTooltipLightStyles();

  return (
    <Tooltip enterTouchDelay={0} placement="bottom" title={generateLabel(value)} open={true} classes={tooltipClasses}>
      {children}
    </Tooltip>
  );
};

const TestItemEmotion = ({ nextQuestion, selectedValue, onChange }) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  const handleChange = (e, value) => {
    setProgress(value);
    const point = calculatePoint(value);
    onChange(nextQuestion.id, point, value);
  };

  useEffect(() => {
    if (selectedValue.point === -1) {
      setProgress(0);
    }
  }, [selectedValue]);

  if (!nextQuestion) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography className={classes.title}>{nextQuestion.text}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.label}>
            <Typography>Полностью не согласен</Typography>
            <Typography className={classes.right}>Полностью согласен</Typography>
          </Box>
          <Slider
            min={-3}
            max={3}
            // valueLabelDisplay="on"
            components={{
              ValueLabel: ValueLabelComponent,
            }}
            defaultValue={0}
            value={progress}
            track={false}
            marks={marks.map((item) => ({ value: item.value }))}
            onChange={handleChange}
            classes={{
              root: classes.slider,
              // thumb: selectedValue == -1 ? classes.defaultThumb : classes.thumb,
              thumb: classes.thumb,
              track: classes.track,
              rail: classes.rail,
              mark: classes.mark,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TestItemEmotion;
