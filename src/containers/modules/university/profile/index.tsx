import { useState } from 'react';

import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Sidebar from './components/Sidebar';
import TaskPage from './components/pages/TaskPage';
import OrganizationPage from './components/pages/OrganizationPage';

const useStyles = makeStyles<any, any>(() => ({
  profileRoot: {
    display: 'flex',
  },
  main: {
    width: 'calc(100% - 240px)',
    height: '100vh',
    backgroundColor: ({ selectedIndex }) => (selectedIndex === 1 ? '#F5F5F5' : '#fff'),
    padding: '40px 44px 40px 40px',
  },
}));

const Profile = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const classes = useStyles({ selectedIndex });

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box className={classes.profileRoot}>
      <Sidebar selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} />
      <Box component="main" className={classes.main}>
        {selectedIndex === 1 && <TaskPage />}
        {selectedIndex === 2 && <OrganizationPage />}
      </Box>
    </Box>
  );
};

export default Profile;
