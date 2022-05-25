import { Box, Typography } from '@mui/material';

import { useTeamBannerStyles } from './style';

const Banner = () => {
  const classes = useTeamBannerStyles();
  return (
    <Box className={classes.mainBanner}>
      <img src="/images/team/team-mail.png" alt="" />
      <Typography className={classes.text}>
        По вопросам к команде платформы Потенциал страны обращайтесь на почту
      </Typography>
      <a href="mailto:info@talanty.online" className={classes.mailLink}>
        info@talanty.online
      </a>
    </Box>
  );
};

export default Banner;
