import React, { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';

import Tabs from 'components/Tabs';
import About from 'containers/modules/common/profile/About';
import { getUserViewRoles } from 'utils/common';
import CompetencyInfo from 'components/CompetencyInfo';
import { useProfile } from 'context/ProfileContext';

import Contacts from '../Content/Contacts/Contacts';
import TestAndCompetency from '../Content/TestAndCompetency';

const InfoTabs = ({ user = null, initialSelectedTab = 'about', competencyGroup, loading = false }) => {
  const [selectedTab, setSelectedTab] = useState<string>(initialSelectedTab);

  const currentUser = useProfile().currentUser;
  const viewRole = getUserViewRoles({ user, currentUser: currentUser });
  const isOwner = viewRole.isOwner;

  useEffect(() => {
    setSelectedTab(initialSelectedTab);
  }, [initialSelectedTab]);

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tabs.Item label={isOwner ? 'О себе' : 'О кандидате'} value="about" />
        <Tabs.Item label="Психологический профиль" value="test-results" />
        <Tabs.Item label="Контакты" value="contacts" />
      </Tabs>

      <Box marginTop={5.25}>
        {selectedTab === 'about' && (
          <Grid item xs={12}>
            <About title={isOwner ? 'О себе' : 'О кандидате'} user={user} loading={loading} />
          </Grid>
        )}
        {selectedTab === 'test-results' && (
          <Grid item xs={12}>
            <CompetencyInfo compatibility={user.compatibility} expectation={user.employee.salary} />
            <br />
            <br />
            <TestAndCompetency user={user} competencyGroup={competencyGroup} isOwner={isOwner} />
          </Grid>
        )}
        {selectedTab === 'contacts' && (
          <Grid item xs={12}>
            <Contacts user={user} />
          </Grid>
        )}
      </Box>
    </>
  );
};

export default InfoTabs;
