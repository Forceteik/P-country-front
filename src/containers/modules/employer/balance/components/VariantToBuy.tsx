import { Grid, Hidden } from '@mui/material';

import PriceRadioGroup from './PriceRadioGroup';
import AdvantagesList from './AdvantagesList';

type PaymentTariffsType = Array<{
  id: number;
  name: string;
  price: number;
  discount: number;
}>;

type Props = {
  handleSelect: (value: number) => void;
  selectPrice: number;
  tariffs: PaymentTariffsType;
  handleOpenModal: (value: number) => void;
  setModalPay;
};

const VariantToBuy = ({ handleSelect, selectPrice, tariffs, handleOpenModal, setModalPay }: Props) => {
  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={12} sm={6}>
        <PriceRadioGroup
          items={tariffs}
          handleSelect={handleSelect}
          selectItem={selectPrice}
          handleOpenModal={handleOpenModal}
          setModalPay={setModalPay}
        />
      </Grid>
      <Hidden smDown>
        <Grid item xs={6}>
          <AdvantagesList />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default VariantToBuy;
