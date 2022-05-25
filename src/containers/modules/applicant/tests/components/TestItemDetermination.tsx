import { useEffect, useState } from 'react';

import { Box, Typography, Grid, Slider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueLight, darkGray, gray, midDarkGray } from 'styles/colorPalette';

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
    border: '4px solid white',
    boxShadow: '0px 2px 13px 1px rgba(163, 175, 192, 0.82)',
  },
  defaultThumb: {
    width: 18,
    height: 18,
    border: '4px solid white',
    boxShadow: '0px 2px 13px 1px rgba(163, 175, 192, 0.82)',
    backgroundColor: darkGray,
  },
  track: {
    height: 6,
    borderRadius: 12,
  },
  rail: {
    height: 6,
    borderRadius: 12,
    backgroundColor: blueLight,
  },
  label: {
    'width': '100%',
    'display': 'flex',
    'justifyContent': 'space-between',
    'alignItems': 'center',
    '& p': {
      fontSize: theme.typography.pxToRem(12),
      color: midDarkGray,
    },
  },
}));

const calculatePoint = (value) => {
  switch (true) {
    case value >= 0 && value <= 20: {
      return 0;
    }
    case value >= 21 && value <= 40: {
      return 1;
    }
    case value >= 41 && value <= 60: {
      return 2;
    }
    case value >= 61 && value <= 80: {
      return 3;
    }
    case value >= 81 && value <= 100: {
      return 4;
    }
    case value >= 101 && value <= 120: {
      return 5;
    }
  }
};

const TestItemDetermination = ({ item, index, onChange, selectedValue }) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const handleChange = (e, value) => {
    setProgress(value);
    const point = calculatePoint(value);
    onChange(item.id, point, index);
  };

  useEffect(() => {
    if (selectedValue === -1) {
      setProgress(0);
    }
  }, [selectedValue]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography className={classes.title}>{item.text}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Slider
              // step={1}
              min={0}
              max={120}
              onChange={handleChange}
              value={progress}
              classes={{
                root: classes.slider,
                thumb: selectedValue == -1 ? classes.defaultThumb : classes.thumb,
                track: classes.track,
                rail: classes.rail,
              }}
            />
            <Box className={classes.label}>
              <Typography>Не согласен</Typography>
              <Typography>Полностью согласен</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.line} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TestItemDetermination;
