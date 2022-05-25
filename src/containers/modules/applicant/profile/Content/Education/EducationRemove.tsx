import useAxios from 'axios-hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useProfile } from 'context/ProfileContext';

import RemoveButton from '../../components/RemoveButton';
import RemoveModal from '../../../../common/modals/RemoveModal';

const EducationRemove = ({ itemId }) => {
  const [open, setOpen] = useState(false);
  const { refetch } = useProfile();
  const [{ loading: rloading }, removeEducation] = useAxios(
    { url: `employee/profile/education/${itemId}`, method: 'delete' },
    { manual: true },
  );

  const handleSubmit = () => {
    removeEducation().then(() => {
      setOpen(false);
      refetch();
      toast.info('Успешно удалено');
    });
  };
  const handleClickOpen = () => {
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
        text={'Вы действительно хотите удалить образование?'}
      />
    </>
  );
};

export default EducationRemove;
