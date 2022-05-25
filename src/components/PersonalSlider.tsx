import { Slider } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const PersonalSlider = withStyles((theme) => ({
  root: {
    'pointerEvents': 'none',
    '& .MuiSlider-thumb': {
      display: 'none',
    },
  },
  colorSecondary: { color: '#3770FF' },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d8e6ff',
  },
  mark: {
    'color': 'transparent',
    'backgroundColor': 'transparent',
    '& + &': {
      width: '4px',
      height: '8px',
      borderRadius: '50%',
      color: '#F0F5FB',
      backgroundColor: '#F0F5FB',
      [theme.breakpoints.down('md')]: {
        backgroundColor: 'transparent',
      },
    },
  },
}))(Slider);

export default PersonalSlider;
