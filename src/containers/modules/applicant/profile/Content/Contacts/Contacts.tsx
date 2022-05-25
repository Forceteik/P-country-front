import { useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, useMediaQuery } from '@mui/material';

import InfoItem from 'containers/modules/applicant/profile/components/InfoItem';
import AccordionDown from 'components/icons/AccordionDown';
import { contactOptions } from 'constants/common';
import { ProfileTitle } from 'components/Titles';
import { getContactUrlByType, getUserViewRoles } from 'utils/common';
import profileStyle from 'containers/modules/common/profile/style';
import { useProfile } from 'context/ProfileContext';

import ContactRemove from './ContactRemove';
import ContactActions from './ContactActions';

/**
 * todo: отрефакторить. все слишком сложно и слишком много терновых операторов
 * @param user
 * @param employer
 * @constructor
 */

const Contacts = ({ user = null, employer = false }) => {
  const commonStyle = profileStyle();
  const { currentUser: sessionUser } = useProfile();
  const currentUser = user || sessionUser;

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);

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
      return (
        <Typography className={commonStyle.desc_null}>
          Пройдите обязательные тесты, чтобы видеть контакты работодателя.
        </Typography>
      );
    }

    if (isGuest && currentUser.type === 'employee') {
      return <Typography className={commonStyle.desc_null}>Соискатель еще не добавил контакты</Typography>;
    }

    if (isGuest && currentUser.type === 'employer') {
      return <Typography className={commonStyle.desc_null}>Работодатель еще не добавил контакты</Typography>;
    }
  };

  const showCommonContacts = () => {
    return (
      <>
        {otherContacts.map((item, key) => {
          if (item.type === 'linkedin' || item.type === 'instagram' || item.type === 'facebook') {
            return null;
          }
          return (
            <Grid item xs={12} sm={6} md={4} key={key}>
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
                key={key}
                RemoveComponent={() => <ContactRemove itemId={item.id} />}
                guest={isGuest}
                isMobile={isMobile}
                setEditItem={setEditItem}
                editItem={item}
              />
            </Grid>
          );
        })}
      </>
    );
  };

  const showPriorityContact = () => {
    if (priorityContact) {
      if (
        priorityContact.type === 'linkedin' ||
        priorityContact.type === 'instagram' ||
        priorityContact.type === 'facebook'
      ) {
        return null;
      }
      return (
        <Grid item xs={12} sm={6} md={4}>
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
            setEditItem={setEditItem}
            editItem={priorityContact}
          />
        </Grid>
      );
    }
  };

  const handleEdit = () => {
    setOpenEdit(!openEdit);
  };

  return (
    <Box className={commonStyle.box} component="section">
      {isSm && !employer ? (
        <Accordion>
          <AccordionSummary expandIcon={<AccordionDown />}>
            <Typography component="h3">Контакты</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              {showPriorityContact()}
              {showCommonContacts()}
              {isGuest && !priorityContact && otherContacts.length === 0 && (
                <Grid item xs={12}>
                  <NullText />
                </Grid>
              )}
              <ContactActions
                openAdd={openAdd}
                setOpenAdd={setOpenAdd}
                openEdit={openEdit}
                isGuest={isGuest}
                editItem={editItem}
                setEditItem={setEditItem}
                setOpenEdit={setOpenEdit}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProfileTitle title="Контакты" />
          </Grid>
          {isHideContact ? (
            <Grid item xs={12} md={8}>
              <Typography className={commonStyle.desc_null}>Вы не можете просматривать контакты</Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {showPriorityContact()}
                {showCommonContacts()}
                {isGuest && !priorityContact && otherContacts.length === 0 && (
                  <Grid item xs={12}>
                    <NullText />
                  </Grid>
                )}
                <ContactActions
                  openAdd={openAdd}
                  setOpenAdd={setOpenAdd}
                  openEdit={openEdit}
                  isGuest={isGuest}
                  editItem={editItem}
                  setEditItem={setEditItem}
                  setOpenEdit={setOpenEdit}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Contacts;
