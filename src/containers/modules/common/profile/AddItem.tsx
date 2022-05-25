import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import DownloadIcon from 'components/icons/Download';
import { darkGray, gray, midDarkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any, any>((theme) => ({
  addTask: {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'center',
    'height': 297,
    'width': ({ sliderItem }) => (sliderItem ? 'auto' : '285px'),
    'cursor': 'pointer',
    'borderRadius': 20,
    'border': `2px dashed ${gray}`,
    'marginRight': theme.spacing(2),
    'padding': theme.spacing(3.5),
    'transition': 'all 0.3s',
    '&:hover': {
      'borderColor': darkGray,
      '& p': {
        color: darkGray,
      },
    },
    [theme.breakpoints.down('md')]: {
      height: 180,
      width: ({ sliderItem }) => (sliderItem ? '100%' : '100%'),
      marginRight: 0,
    },
    [theme.breakpoints.down('sm')]: {
      height: 80,
      flexDirection: 'row',
    },
  },
  title: {
    color: midDarkGray,
    lineHeight: '150%',
    marginTop: theme.spacing(2),
    transition: 'all 0.3s',
    textAlign: 'center',
    [theme.breakpoints.only('xs')]: {
      marginTop: 0,
      marginLeft: theme.spacing(2),
    },
  },
}));

const AddItem = ({ text = 'Добавить', handleClickOpen, sliderItem = false }) => {
  const classes = useStyles({ sliderItem });
  return (
    <Box className={classes.addTask} onClick={handleClickOpen}>
      <DownloadIcon color="#979DAD" width={29} height={34} />
      <Typography className={classes.title}>{text}</Typography>
    </Box>
  );
};

export default AddItem;
