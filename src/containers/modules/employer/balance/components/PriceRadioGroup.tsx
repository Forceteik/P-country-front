import { Box, Typography, RadioGroup, FormControlLabel, Radio, Hidden, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueLight, darkGray, greenMain } from 'styles/colorPalette';
import { MadFormatter } from 'utils/formatters';
import Button from 'components/Button';
import CheckBoxRound from 'components/icons/CheckBoxRound';
import CheckBoxRoundCheck from 'components/icons/CheckBoxRoundCheck';

import AdvantagesList from './AdvantagesList';

const useStyles = makeStyles<any>((theme) => ({
  boldTitle: {
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    marginBottom: theme.spacing(1),
  },
  price: {
    'borderRight': '1px solid #E1E3E8',
    '& .MuiFormControlLabel-root': {
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      marginLeft: 0,
      marginRight: 0,
      padding: '16px 24px',
    },
    '& .MuiRadio-root': {
      padding: 0,
    },
    [theme.breakpoints.down('sm')]: {
      borderRight: 'none',
    },
  },
  sale: {
    backgroundColor: greenMain,
    color: '#fff',
    borderRadius: 8,
    fontSize: theme.typography.pxToRem(12),
    fontFamily: 'inter-bold',
    padding: '4px 8px',
    marginLeft: theme.spacing(1),
  },
  selectedItem: {
    backgroundColor: blueLight,
  },
  defaultItem: {},
}));

const PriceRadioGroup = ({ items, handleSelect, selectItem, handleOpenModal, setModalPay }) => {
  const classes = useStyles();

  return (
    <Box>
      <RadioGroup className={classes.price} defaultValue={0}>
        {items.map((item) => {
          return (
            <Box key={item.id}>
              <FormControlLabel
                labelPlacement="start"
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
                  <>
                    <Typography className={classes.boldTitle}>{item.name}</Typography>
                    <Typography fontSize={18}>
                      <Typography component={'span'} color={darkGray} fontSize={18}>
                        Цена:{' '}
                      </Typography>
                      {MadFormatter.toCurrency(item.price, '₽')}
                      {!!item.discount && (
                        <Typography component="span" className={classes.sale}>
                          -{item.discount}%
                        </Typography>
                      )}
                    </Typography>
                    {item.id === selectItem && (
                      <Hidden smUp>
                        <Grid container rowSpacing={2}>
                          <Grid item xs={12}>
                            <AdvantagesList />
                          </Grid>
                          <Grid item xs={12}>
                            <Button fullWidth small onClick={() => handleOpenModal(setModalPay)}>
                              Оплатить
                            </Button>
                          </Grid>
                        </Grid>
                      </Hidden>
                    )}
                  </>
                }
              />
            </Box>
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default PriceRadioGroup;
