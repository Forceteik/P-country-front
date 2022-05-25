import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import FirstSection from 'containers/landing/FirstSection';
import SecondSection from 'containers/landing/SecondSection';
import ThirdSection from 'containers/landing/ThirdSection';
import FourthSection from 'containers/landing/FourthSection';
import FifthSection from 'containers/landing/FifthSection';
import FooterBanner from 'containers/landing/components/FooterBanner';
import Footer from 'containers/landing/components/Footer';
import { landingBlack } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  wrapper: {
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
    [theme.breakpoints.only('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  contextWrapper: {
    '& p': {
      color: landingBlack,
    },
    '& h2': {
      color: landingBlack,
    },
    '& h4': {
      color: landingBlack,
    },
    '& h5': {
      color: landingBlack,
    },
    '& h6': {
      color: landingBlack,
    },
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.contextWrapper}>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <FooterBanner />
        <Footer />
      </Box>
    </>
  );
};

export default Landing;
