import { useState } from 'react';
import cx from 'classnames';

import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, useMediaQuery } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import InfoItem from 'containers/modules/applicant/profile/components/InfoItem';
import PlusBtn from 'containers/modules/common/profile/PlusBtn';
import AccordionDown from 'components/icons/AccordionDown';
import { contactOptions } from 'constants/common';
import { ProfileTitle } from 'components/Titles';
import { getContactUrlByType, getUserViewRoles } from 'utils/common';
import { useProfile } from 'context/ProfileContext';

import profileStyle from '../style';

import ContactForm from './ContactForm';
import ContactRemove from './ContactRemove';

/**
 * todo: отрефакторить. все слишком сложно и слишком много терновых операторов
 * @param user
 * @param employer
 * @param loading
 * @constructor
 */
const Contacts = ({ user = null, employer = false, loading = false }) => {
  const commonStyle = profileStyle();
  const { currentUser: sessionUser } = useProfile();

  const currentUser = user || sessionUser;

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editRowId, setEditRowId] = useState(0);

  const viewRole = getUserViewRoles({ user, currentUser: sessionUser });
  const isGuest = !viewRole.isOwner;
  const isOwner = viewRole.isOwner;
  const isEmployee = viewRole.isApplicant;

  const isHideContact = viewRole.isGuest || viewRole.isGuestApplicant;

  const contacts = currentUser?.contacts || [];
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  // константы и функцию showPriorityContact сделала чтобы приоритетный контакт всегда был на верхней позиции
  const priorityContact = contacts.find((item) => item.priority === true);
  const otherContacts = contacts.filter((item) => item.priority === false);

  const NullText = () => {
    if (isOwner && isEmployee) {
      return <Typography>Пройдите обязательные тесты, чтобы видеть контакты работодателя.</Typography>;
    }

    if (isGuest && currentUser.type === 'employee') {
      return <Typography>Соискатель еще не добавил контакты</Typography>;
    }

    if (isGuest && currentUser.type === 'employer') {
      return <Typography>Работодатель еще не добавил контакты</Typography>;
    }
  };

  const showCommonContacts = () => {
    if (loading) {
      return (
        <Typography>
          <Skeleton variant="text" width={200} />
        </Typography>
      );
    }

    return (
      <>
        {otherContacts.map((item, key) => {
          if (openEdit && item.id === editRowId) {
            return <ContactForm key={key} item={item} closeFnc={close} mode={'edit'} contactOptions={contactOptions} />;
          }
          if (item.type === 'linkedin' || item.type === 'instagram' || item.type === 'facebook') {
            return null;
          }
          return (
            <Box key={key} mb={2}>
              <InfoItem
                item={{
                  id: item.id,
                  label: contactOptions.find((i) => i.value === item.type).label,
                  value: item.value,
                  link: getContactUrlByType(item.value, item.type),
                  imagePath: contactOptions.find((i) => i.value === item.type).imagePath,
                  priority: item.priority,
                }}
                handleEdit={handleEdit}
                RemoveComponent={() => <ContactRemove itemId={item.id} />}
                guest={isGuest}
                isMobile={isMobile}
              />
            </Box>
          );
        })}

        {isGuest && !priorityContact && otherContacts.length === 0 && <NullText />}
        {openAdd ? (
          <ContactForm closeFnc={close} contactOptions={contactOptions} />
        ) : (
          !isGuest && <PlusBtn text={'Добавить контакт'} onClick={() => setOpenAdd(true)} />
        )}
      </>
    );
  };

  const showPriorityContact = () => {
    if (loading) {
      return (
        <Typography>
          <Skeleton variant="text" width={200} />
        </Typography>
      );
    }

    if (priorityContact) {
      if (openEdit && priorityContact.id === editRowId) {
        return <ContactForm item={priorityContact} closeFnc={close} mode={'edit'} contactOptions={contactOptions} />;
      }
      if (
        priorityContact.type === 'linkedin' ||
        priorityContact.type === 'instagram' ||
        priorityContact.type === 'facebook'
      ) {
        return null;
      }
      return (
        <Box mb={2}>
          <InfoItem
            item={{
              id: priorityContact.id,
              label: contactOptions.find((i) => i.value === priorityContact.type).label,
              value: priorityContact.value,
              link: getContactUrlByType(priorityContact.value, priorityContact.type),
              imagePath: contactOptions.find((i) => i.value === priorityContact.type).imagePath,
              priority: priorityContact.priority,
            }}
            handleEdit={handleEdit}
            RemoveComponent={() => <ContactRemove itemId={priorityContact.id} />}
            guest={isGuest}
            isMobile={isMobile}
          />
        </Box>
      );
    }
    return null;
  };

  const close = () => {
    setOpenAdd(false);
    setOpenEdit(false);
  };

  const handleEdit = (rowId) => {
    setEditRowId(rowId);
    setOpenEdit(!openEdit);
  };

  return (
    <Box className={cx(commonStyle.box, commonStyle.sticky)}>
      {isSm ? (
        <Accordion>
          <AccordionSummary expandIcon={<AccordionDown />}>
            <Typography component="h3">{loading ? <Skeleton width={150} /> : 'Контакты'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {isHideContact ? (
                <Grid item xs={12} md={8}>
                  <Typography className={commonStyle.desc_null}>Вы не можете просматривать контакты</Typography>
                </Grid>
              ) : (
                <>
                  {showPriorityContact()}
                  {showCommonContacts()}
                </>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {loading ? <Skeleton variant="text" height={50} /> : <ProfileTitle title="Контакты" />}
          </Grid>
          {isHideContact ? (
            <Grid item xs={12} md={8}>
              <Typography className={commonStyle.desc_null}>Вы не можете просматривать контакты</Typography>
            </Grid>
          ) : (
            <Grid item xs={12} md={employer ? 12 : 5}>
              {showPriorityContact()}
              {showCommonContacts()}
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Contacts;
