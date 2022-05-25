import useAxios from 'axios-hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';

import RemoveModal from 'containers/modules/common/modals/RemoveModal';
import { useProfile } from 'context/ProfileContext';

import RemoveButton from '../../components/RemoveButton';

const ExperienceRemove = ({ itemId }) => {
  const [open, setOpen] = useState(false);
  const { refetch } = useProfile();
  const [{ loading: rloading }, removeContact] = useAxios(
    { url: `employee/profile/experience/${itemId}`, method: 'delete' },
    { manual: true },
  );

  const handleSubmit = () => {
    removeContact().then(() => {
      setOpen(false);
      refetch();
      toast.info('Успешно удалено');
    });
  };
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <RemoveButton handleClick={handleClickOpen} />
      <RemoveModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        rloading={rloading}
        text={'Вы действительно хотите удалить опыт работы?'}
      />
    </>
  );
};

export default ExperienceRemove;
