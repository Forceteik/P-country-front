import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import FirstScreen from './components/FirstScreen';
import Advantages from './components/Advantages';
import Questions from './components/Questions';
import Footer from './components/Footer';

const useStyles = makeStyles(() => ({
  box: {
    overflowX: 'hidden',
  },
}));

const Index = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <FirstScreen />
      <Box>
        <Advantages />
      </Box>
      <Box>
        <Questions />
      </Box>
      <Footer />
    </Box>
  );
};

export default Index;
