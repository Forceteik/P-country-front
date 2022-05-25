import { Grid } from '@mui/material';

import PlusBtn from 'containers/modules/common/profile/PlusBtn';
import { contactOptions } from 'constants/common';

import ContactForm from './ContactForm';

const ContactActions = ({ openAdd, openEdit, setOpenEdit, isGuest, setEditItem, editItem, setOpenAdd }) => {
  const close = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  };

  return (
    <Grid item xs={12}>
      <Grid container>
        {openAdd ? (
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} sm={6} md={5}>
                <ContactForm closeFnc={close} contactOptions={contactOptions} setEditItem={setEditItem} />
              </Grid>
            </Grid>
          </Grid>
        ) : openEdit ? (
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} sm={7} md={5}>
                <ContactForm
                  mode={'edit'}
                  closeFnc={close}
                  contactOptions={contactOptions}
                  item={editItem}
                  setEditItem={setEditItem}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          !isGuest && (
            <Grid item xs={12}>
              <PlusBtn text={'Добавить контакт'} onClick={() => setOpenAdd(true)} />
            </Grid>
          )
        )}
      </Grid>
    </Grid>
  );
};

export default ContactActions;
