import { Box, CircularProgress, Typography, Grid, useMediaQuery } from '@mui/material';

import progressItemProfileStyle from 'containers/modules/common/styles/progressItemProfileStyle';

const ProgressItem = ({ title, desc, progress, backgroundColor, color, img = false, linked = false }) => {
  const classes = progressItemProfileStyle({ backgroundColor, color, linked });
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <Box position="relative" height="100%">
      <Box className={classes.progressItem}>
        <Grid container alignItems="center" spacing={isMobile ? 1 : 2} wrap="nowrap">
          <Grid item>
            {img ? (
              <Box className={classes.imgBox}>
                <img src="/images/profile/progress-test.png" alt="" width="88px" height="88px" />
              </Box>
            ) : (
              <Box className={classes.circularBox}>
                <CircularProgress
                  variant="determinate"
                  value={progress == 0 ? 5 : progress}
                  size={isMobile ? 44 : 88}
                  classes={{
                    colorPrimary: classes.colorPrimary,
                    circle: classes.circle,
                  }}
                />
                <Box className={classes.text_box}>
                  <Typography variant="caption" component="div" className={classes.circularPercentage}>{`${Math.round(
                    progress,
                  )}%`}</Typography>{' '}
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item>
            <Typography className={classes.title}>{title}</Typography>
            <Typography className={classes.desc}>{desc}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProgressItem;
