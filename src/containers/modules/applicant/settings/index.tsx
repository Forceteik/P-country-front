import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Box, Grid, Tabs, Tab, Typography, Hidden, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import SubHeader from 'containers/modules/common/settings/components/SubHeader';
import Personal from 'containers/modules/applicant/settings/Personal';
import Layout from 'containers/layout/main';
import Profile from 'components/icons/Profile';
import Unlock from 'components/icons/Unlock';
import PassRestore from 'containers/modules/common/settings/PassRestore';
import Login from 'containers/modules/common/settings/Login';
import Email from 'containers/modules/common/settings/Email';
import useSettingsStyle from 'containers/modules/common/settings/style';
import AccordionDown from 'components/icons/AccordionDown';
import DeleteAccount from 'components/DeleteAccount';
import ProfileProvider from 'context/ProfileContext';

function a11yProps(index) {
  return {
    'id': `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Index = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      router.push('/applicant/profile/settings');
    }
    if (newValue === 1) {
      router.push('/applicant/profile/settings/security');
    }
    // if (newValue === 2) {
    //   router.push("/applicant/profile/settings/notifications");
    // }
    setValue(newValue);
  };

  const classes = useSettingsStyle();

  return (
    <Layout currentPage="Настройки">
      <Head>
        <title>Настройки</title>
        <meta property="og:title" content="Настройки" key="title" />
      </Head>
      <SubHeader />
      <Hidden mdDown>
        <Grid container>
          <Grid item xs={3}>
            <Tabs orientation="vertical" value={value} onChange={handleChange} className={classes.tabs}>
              <Tab icon={<Profile />} label="Личные данные" {...a11yProps(0)} disableRipple disableFocusRipple />
              <Tab icon={<Unlock />} label="Безопасность" {...a11yProps(1)} disableRipple disableFocusRipple />
              {/* <Tab
                disabled
                icon={<Notification />}
                label="Уведомления"
                {...a11yProps(2)}
                disableRipple
                disableFocusRipple
              /> */}
            </Tabs>
          </Grid>
          <Grid item xs={9}>
            <Box className={classes.rightBox}>
              <Personal value={value} index={0} />
              {/* <Security value={value} index={1} /> */}
              {/*<Notifications value={value} index={2} />*/}
            </Box>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden mdUp>
        <Box mb={5}>
          <Grid container>
            <Grid item xs={12}>
              <Accordion className={classes.accordion} elevation={0}>
                <AccordionSummary expandIcon={<AccordionDown />}>
                  <Box className={classes.titleWithIcon}>
                    <Profile />
                    <Typography className={classes.titleIcon}>Личные данные</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Personal />
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion className={classes.accordion} elevation={0}>
                <AccordionSummary expandIcon={<AccordionDown />}>
                  <Box className={classes.titleWithIcon}>
                    <Unlock />
                    <Typography className={classes.titleIcon}>Безопасность</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <PassRestore type="applicant" />
                    </Grid>
                    <Grid item xs={12}>
                      <Login />
                    </Grid>
                    <Grid item xs={12}>
                      <Email />
                    </Grid>
                    <Grid item xs={12}>
                      <DeleteAccount isPhoneCode />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            {/* 
            <Grid item xs={12}>
              <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<AccordionDown />}>
                  <Box className={classes.titleWithIcon}>
                    <Notification />
                    <Typography className={classes.titleIcon}>Уведомления</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Notifications />
                </AccordionDetails>
              </Accordion>
            </Grid> */}
          </Grid>
        </Box>
      </Hidden>
    </Layout>
  );
};

const IndexWrappedProfileProvider = () => (
  <ProfileProvider>
    <Index />
  </ProfileProvider>
);

export default IndexWrappedProfileProvider;
