import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

import Avatar from 'containers/modules/common/profile/Avatar';
import SettingsBtn from 'containers/modules/common/profile/SettingsBtn';
import { getUserViewRoles } from 'utils/common';
import { useProfile } from 'context/ProfileContext';

import InfoList from './InfoList';

const useStyles = makeStyles<any>((theme) => ({
  subHeader: {
    marginBottom: theme.spacing(7.5),
    marginTop: theme.spacing(7.5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
    },
  },
  fullName: {
    fontSize: theme.typography.pxToRem(38),
    fontFamily: 'inter-bold',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(33),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
      marginRight: theme.spacing(1),
    },
  },
  verify: {
    cursor: 'pointer',
  },
}));

const SubHeader = ({ user = null, loading = false }) => {
  const classes = useStyles();
  // const tooltipClasses = useTooltipBasicStyles();

  const currentUserFromSession = useProfile().currentUser;
  const currentUser = user || currentUserFromSession;
  const employer = currentUser.employer;

  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isGuest = !viewRole.isOwner;

  return (
    <Box className={classes.subHeader}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
        <Grid item xs={12}>
          {loading ? (
            <Skeleton variant="circular" width={100} height={100} />
          ) : (
            <Avatar
              defaultImg="/images/avatar/placeholder-subheader-employer.png"
              currentUser={currentUser}
              guest={isGuest}
              employer
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={9}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Typography className={classes.fullName}>
                      {loading ? <Skeleton width={250} /> : currentUser?.employer?.name}
                    </Typography>

                    {/* <Tooltip title="Компания прошла проверку на сайте" placement="top" arrow classes={tooltipClasses}>
                    <Box className={classes.verify}>
                      <ShiledFilled />
                    </Box>
                  </Tooltip> */}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <InfoList employer={employer} isGuest={isGuest} loading={loading} />
                </Grid>
              </Grid>
            </Grid>
            {!loading && (
              <Grid item xs={'auto'}>
                {!isGuest && <SettingsBtn link="/employer/profile/settings" />}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubHeader;
