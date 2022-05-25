import { Box, Grid, Hidden, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

import Avatar from 'containers/modules/common/profile/Avatar';
import SettingsBtn from 'containers/modules/common/profile/SettingsBtn';
import { getUserViewRoles } from 'utils/common';
import { contactOptions } from 'constants/common';
import { ligthGray } from 'styles/colorPalette';
import { useProfile } from 'context/ProfileContext';

import DotsList from './DotsList';
import EmployerBtns from './EmployerBtns';

const useStyles = makeStyles<any>((theme) => ({
  subHeader: {
    marginBottom: theme.spacing(6.5),
    marginTop: theme.spacing(7.5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
    },
  },
  fullName: {
    fontSize: theme.typography.pxToRem(26),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
  },
  contactImg: {
    'borderRadius': '50%',
    'backgroundColor': ligthGray,
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'marginRight': theme.spacing(2),
    'width': 52,
    'height': 52,
    '& img': {
      width: 24,
      heigth: 24,
    },
  },
}));

const SubHeader = ({ user = null, loading = false }) => {
  const classes = useStyles();
  const sessionUser = useProfile().currentUser;
  const currentUser = user || sessionUser;

  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const isXs = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const viewRole = getUserViewRoles({ user, currentUser: sessionUser });
  const isEmployer = viewRole.isEmployer;
  // const isGuest = viewRole.isGuest || viewRole.isGuestApplicant;
  const isOwner = viewRole.isOwner;
  const isHideContact = viewRole.isGuest || viewRole.isGuestApplicant;

  const handleInviteSubmit = () => {
    // refetch();
  };

  // Если нет приоритетного контакта, не показываем ничего
  const PriorityContact = ({ contacts, contactOptions, loading = true }) => {
    const contact = contacts.find((item) => item.priority === true);
    // if (!contact) {
    //   contact = contacts.find((item) => item.type === "phone" || null);
    // }
    if (loading) {
      return (
        <Box display="flex" alignItems="center">
          <Box className={classes.contactImg}>
            <Skeleton variant="circular" width={50} height={50} />
          </Box>
          <Typography fontSize={14}>
            <Skeleton variant="text" width={100} />
          </Typography>
        </Box>
      );
    }

    if (contact && contact.type !== 'linkedin') {
      if (contact.type === 'linkedin') {
        return null;
      }
      if (contact.type === 'instagram') {
        return null;
      }
      return (
        <Box display="flex" alignItems="center">
          <Box className={classes.contactImg}>
            <img src={contactOptions.find((i) => i.value === contact.type).imagePath} />
          </Box>
          <Typography fontSize={14}>{contact.value}</Typography>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box className={classes.subHeader}>
      <Grid
        container
        alignItems={isSm ? 'flex-end' : 'flex-start'}
        wrap={isSm ? 'wrap' : 'nowrap'}
        spacing={isSm ? 3 : 4}
      >
        <Grid item xs={12} md={'auto'}>
          <Grid container justifyContent="space-between" alignItems="flex-end">
            <Grid item>
              {loading ? (
                <Skeleton variant="circular" width={isXs ? 82 : 160} height={isXs ? 82 : 160} />
              ) : (
                <Avatar
                  defaultImg="/images/avatar/placeholder-avatar-employee.png"
                  currentUser={currentUser}
                  guest={!isOwner}
                  profile
                  radius={160}
                />
              )}
            </Grid>
            <Hidden mdUp>
              <Grid item>{isOwner && !loading && <SettingsBtn link="/applicant/profile/settings" />}</Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12} md>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.fullName}>
                {loading ? <Skeleton width={200} /> : `${currentUser.name} ${currentUser.surname}`}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={isEmployer ? 12 : 9} overflow={'hidden'}>
              <DotsList user={user} guest={!isOwner} loading={loading} />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="space-between">
                {!isHideContact && (
                  <Grid item xs={6}>
                    <PriorityContact
                      contacts={currentUser.contacts}
                      contactOptions={contactOptions}
                      loading={loading}
                    />
                  </Grid>
                )}

                <Hidden mdDown>
                  {isOwner && !loading && (
                    <Grid item>
                      <SettingsBtn link="/applicant/profile/settings" />
                    </Grid>
                  )}
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {isEmployer && (
          <Hidden smDown>
            <Grid item xs={6} md={4} alignSelf="center">
              <EmployerBtns currentUser={currentUser} handleInviteSubmit={handleInviteSubmit} />
            </Grid>
          </Hidden>
        )}
      </Grid>
    </Box>
  );
};

export default SubHeader;
