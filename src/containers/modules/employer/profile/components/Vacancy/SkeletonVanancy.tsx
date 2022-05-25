import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import profileStyle from 'containers/modules/common/profile/style';

import { useStyles } from './styles';

const SkeletonVanancy = () => {
  const classes = useStyles();
  const commonStyle = profileStyle();
  return (
    <Box component="section" className={classes.vacancy}>
      <Box className={classes.vacancy}>
        <Typography className={commonStyle.blockTitleAbout} component="h2">
          <Skeleton width={250} />
        </Typography>
      </Box>
      <Box mt={2}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Box>
    </Box>
  );
};

export default SkeletonVanancy;
