import { useState } from 'react';
import { useRouter } from 'next/router';

import { Grid, Hidden, Tabs, Tab, Box } from '@mui/material';

import SubHeader from 'containers/modules/common/settings/components/SubHeader';
// import Personal from 'containers/modules/applicant/settings/Personal';
// import Password from 'containers/modules/applicant/settings/Security';
// import Email from 'containers/modules/common/settings/Email';
// import Notifications from 'containers/modules/applicant/settings/Notifications';
// import DangerZone from 'containers/modules/applicant/settings/DangerZone';
import Layout from 'containers/layout/main';
import Profile from 'components/icons/Profile';
import Unlock from 'components/icons/Unlock';
// import Shield from 'components/icons/Shield';
import Notification from 'components/icons/Notification';
// import Security from 'containers/modules/employer/settings/components/Security/Security';
// import Requisites from 'containers/modules/employer/settings/components/Requisites/Requisites';
// import Verify from 'containers/modules/employer/settings/components/Verify';
import useSettingsStyle from 'containers/modules/common/settings/style';

function a11yProps(index) {
  return {
    'id': `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Index = () => {
  const router = useRouter();
  // const [checked, setChecked] = useState(true);
  const [value, setValue] = useState(2);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      router.push('/applicant/profile/settings');
    }
    if (newValue === 1) {
      router.push('/applicant/profile/settings/security');
    }
    if (newValue === 2) {
      router.push('/applicant/profile/settings/notifications');
    }
    setValue(newValue);
  };

  const classes = useSettingsStyle();

  return (
    <Layout>
      <SubHeader />
      <Hidden mdDown>
        <Grid container>
          <Grid item xs={3}>
            <Tabs orientation="vertical" value={value} onChange={handleTabChange} className={classes.tabs}>
              <Tab icon={<Profile />} label="Личные данные" {...a11yProps(0)} disableRipple disableFocusRipple />
              <Tab icon={<Unlock />} label="Безопасность" {...a11yProps(1)} disableRipple disableFocusRipple />
              <Tab icon={<Notification />} label="Уведомления" {...a11yProps(2)} disableRipple disableFocusRipple />
            </Tabs>
          </Grid>
          <Grid item xs={9}>
            <Box className={classes.rightBox}>
              NOTIFICATIONS
              {/*<Personal value={value} index={0} />*/}
              {/*<Security value={value} index={1} />*/}
              {/*<Notifications value={value} index={2} />*/}
            </Box>
          </Grid>
        </Grid>
      </Hidden>
    </Layout>
  );
};

export default Index;
// import { Box, makeStyles, Typography } from "@mui/material";
// import RadioGroup from "components/RadioGroup";
//
// const useStyles = makeStyles<any>((theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: theme.spacing(5),
//   },
//   title: {
//     fontFamily: "inter-bold",
//     fontSize: theme.typography.pxToRem(26),
//     marginBottom: theme.spacing(3),
//     [theme.breakpoints.down("sm")]: {
//       fontSize: theme.typography.pxToRem(22),
//       marginBottom: theme.spacing(2.5),
//     },
//   },
// }));
// const Notifications = () => {
//   const classes = useStyles();
//   return (
//     <Box className={classes.root}>
//       <Typography className={classes.title}>Уведомления</Typography>
//       <Item label={"Получать уведомления о просмотре профиля "} selectedValue={"do-not-send"} />
//       <Item label={"Получать уведомления о просмотре профиля "} selectedValue={"push"} />
//       <Item label={"Получать уведомления о просмотре профиля "} selectedValue={"sms"} />
//       <Item label={"Получать уведомления о просмотре профиля "} selectedValue={"email"} />
//       <Item label={"Получать уведомления о просмотре профиля "} selectedValue={"do-not-send"} />
//     </Box>
//   );
// };
//
// const useItemStyles = makeStyles<any>((theme) => ({
//   root: {
//     display: "flex",
//     padding: theme.spacing(2),
//     justifyContent: "space-between",
//     alignItems: "center",
//     border: "1px solid #E1E3E8;",
//     borderRadius: 20,
//     marginBottom: theme.spacing(2),
//     [theme.breakpoints.down("sm")]: {
//       flexDirection: "column",
//       alignItems: "flex-start",
//       alignSelf: "flex-start",
//     },
//   },
//   label: {
//     [theme.breakpoints.down("sm")]: {
//       marginBottom: theme.spacing(1),
//     },
//   },
//   buttons: {},
// }));
// const fakeItems = [
//   {
//     label: "Push",
//     value: "push",
//   },
//   {
//     label: "Почта",
//     value: "email",
//   },
//   {
//     label: "SMS",
//     value: "sms",
//   },
//   {
//     label: "Не получать",
//     value: "do-not-send",
//   },
// ];
// const Item = ({ label, selectedValue }) => {
//   const classes = useItemStyles();
//   return (
//     <Box className={classes.root}>
//       <Typography className={classes.label}>{label}</Typography>
//       <Box className={classes.buttons}>
//         <RadioGroup items={fakeItems} value={selectedValue} />
//       </Box>
//     </Box>
//   );
// };
//
// export default Notifications;
