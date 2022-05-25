import { Box, Typography, RadioGroup, FormControlLabel, Radio, Grid, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueLight, blueMain } from 'styles/colorPalette';
import CheckBoxRound from 'components/icons/CheckBoxRound';
import CheckBoxRoundCheck from 'components/icons/CheckBoxRoundCheck';

const useStyles = makeStyles<any, any>((theme) => ({
  answersRadioGroup: {
    'display': 'flex',
    'flexWrap': 'nowrap',
    'flexDirection': 'row',
    'marginLeft': -8,
    'marginRight': -8,
    [theme.breakpoints.down('md')]: {
      'flexWrap': 'wrap',
      'marginLeft': -24,
      'marginRight': -24,

      '& .MuiButtonBase-root.MuiRadio-root': {
        padding: 0,
        paddingRight: 12,
        paddingLeft: 0,
      },
    },
    '& .MuiRadio-root': {
      '&:hover': {
        backgroundColor: 'unset',
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: -16,
      marginRight: -16,
    },
  },
  img: {
    'width': 32,
    'height': 35,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  },
  listItem: {
    maxWidth: ({ maxWidth }) => maxWidth,
    width: 'fit-content',
    [theme.breakpoints.down('md')]: {
      maxWidth: ({ maxWidth }) => '100%',
      width: '100%',
      textAlign: 'left',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  selectedListItem: {
    maxWidth: ({ maxWidth }) => maxWidth,
    width: 'fit-content',
    [theme.breakpoints.down('md')]: {
      maxWidth: ({ maxWidth }) => '100%',
      width: '100%',
      textAlign: 'left',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      backgroundColor: blueLight,
    },
  },
  text: {
    fontSize: theme.typography.pxToRem(14),
    minHeight: '41px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      textAlign: 'left',
      minHeight: 'unset',
      fontSize: theme.typography.pxToRem(16),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(1),
    },
  },
  selectedItem: {
    'marginRight': 8,
    'marginLeft': 8,
    [theme.breakpoints.down('md')]: {
      marginLeft: 20,
    },
    '& $text': {
      color: blueMain,
    },
  },
  defaultItem: {
    marginRight: 8,
    marginLeft: 8,
    [theme.breakpoints.down('md')]: {
      marginLeft: 20,
    },
  },
}));

const AnswersRadioGroup = ({ items, handleSelect, selectItem, maxWidth = '173px' }) => {
  const classes = useStyles({ maxWidth });
  const isMdDown = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  return (
    <RadioGroup defaultValue={0} className={classes.answersRadioGroup}>
      {items.map((item, id) => (
        <Box key={id} className={item.id === selectItem ? classes.selectedListItem : classes.listItem}>
          <FormControlLabel
            labelPlacement={isMdDown ? 'end' : 'top'}
            key={item.id}
            value={item.id}
            className={item.id === selectItem ? classes.selectedItem : classes.defaultItem}
            checked={item.id === selectItem}
            control={
              <Radio
                onClick={() => handleSelect(item.id)}
                disableRipple
                checkedIcon={<CheckBoxRoundCheck />}
                icon={<CheckBoxRound />}
                inputProps={{ 'aria-label': item.name }}
              />
            }
            label={
              <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems={'center'}
                wrap={isMdDown ? 'nowrap' : 'wrap'}
              >
                <Grid item>
                  <Box className={classes.img}>
                    <img src={item.img} />
                  </Box>
                </Grid>
                <Grid item lg={12}>
                  <Typography className={classes.text}>{item.text}</Typography>
                </Grid>
              </Grid>
            }
          />
        </Box>
      ))}
    </RadioGroup>
  );
};

export default AnswersRadioGroup;
