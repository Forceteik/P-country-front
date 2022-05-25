import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Box, Grid, Tabs, Tab, Typography, Hidden, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import Layout from 'containers/layout/main';
import useSettingsStyle from 'containers/modules/common/settings/style';
import SubHeader from 'containers/modules/common/settings/components/SubHeader';
import Profile from 'components/icons/Profile';
import Unlock from 'components/icons/Unlock';
import Bag from 'components/icons/Bag';
import AccordionDown from 'components/icons/AccordionDown';

import Personal from './components/Personal';
import Security from './components/Security/Security';
import Requisites from './components/Requisites/Requisites';

function a11yProps(index) {
  return {
    'id': `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Settings = () => {
  const [value, setValue] = useState(1);
  const router = useRouter();

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      router.push('/employer/profile/settings');
    }
    if (newValue === 1) {
      router.push('/employer/profile/settings/security');
    }
    if (newValue === 2) {
      router.push('/employer/profile/settings/bank-details');
    }
    // if (newValue === 3) {
    //   router.push("/employer/profile/settings/verification");
    // }
    // if (newValue === 4) {
    //   router.push("/employer/profile/settings/notifications");
    // }
    setValue(newValue);
  };

  const classes = useSettingsStyle();

  return (
    <Layout>
      <Head>
        <title>Безопасность</title>
        <meta property="og:title" content={'Безопасность'} key="title" />
      </Head>
      <SubHeader />
      <Hidden mdDown>
        <Grid container>
          <Grid item xs={3}>
            <Tabs orientation="vertical" value={value} onChange={handleChange} className={classes.tabs}>
              <Tab icon={<Profile />} label="Личные данные" {...a11yProps(0)} disableRipple disableFocusRipple />
              <Tab icon={<Unlock />} label="Безопасность" {...a11yProps(1)} disableRipple disableFocusRipple />
              <Tab icon={<Bag />} label="Реквизиты" {...a11yProps(2)} disableRipple disableFocusRipple />
              {/* <Tab icon={<Shield />} disabled label="Верификация" {...a11yProps(3)} disableRipple disableFocusRipple />
              <Tab
                icon={<Notification />}
                disabled
                label="Уведомления"
                {...a11yProps(4)}
                disableRipple
                disableFocusRipple
              /> */}
            </Tabs>
          </Grid>
          <Grid item xs={9}>
            <Box className={classes.rightBox}>
              <Security value={value} index={1} />
            </Box>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Box mb={5}>
          <Grid container>
            <Grid item xs={12}>
              <Accordion className={classes.accordion}>
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
              <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<AccordionDown />}>
                  <Box className={classes.titleWithIcon}>
                    <Unlock />
                    <Typography className={classes.titleIcon}>Безопасность</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Security />
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<AccordionDown />}>
                  <Box className={classes.titleWithIcon}>
                    <Bag />
                    <Typography className={classes.titleIcon}>Реквизиты</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Requisites />
                </AccordionDetails>
              </Accordion>
            </Grid>
            {/* 
            <Grid item xs={12}>
              <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<AccordionDown />}>
                  <Box className={classes.titleWithIcon}>
                    <Shield />
                    <Typography className={classes.titleIcon}>Верификация</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Verify />
                </AccordionDetails>
              </Accordion>
            </Grid> */}
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

export default Settings;
