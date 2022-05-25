import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

import profileStyle from 'containers/modules/common/profile/style';
import { black } from 'styles/colorPalette';

export const useStyles = makeStyles<any>((theme) => ({
  name: {
    fontWeight: 500,
    wordWrap: 'break-word',
    lineHeight: '130%',
    color: black,
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(26),
    lineHeight: '110%',
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
}));

const EducationSkeleton = () => {
  const commonStyle = profileStyle();
  const classes = useStyles(true);

  return (
    <Box className={commonStyle.box}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.title} component="h3">
            <Skeleton variant="text" width={200} />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <Grid container spacing={2} wrap="nowrap" alignItems="center">
                  <Grid item>
                    <Skeleton variant="circular" width={50} height={50} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography className={classes.name}>
                          <Skeleton variant="text" width={200} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Grid container spacing={2} wrap="nowrap" alignItems="center">
                  <Grid item>
                    <Skeleton variant="circular" width={50} height={50} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography className={classes.name}>
                          <Skeleton variant="text" width={200} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Grid container spacing={2} wrap="nowrap" alignItems="center">
                  <Grid item>
                    <Skeleton variant="circular" width={50} height={50} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography className={classes.name}>
                          <Skeleton variant="text" width={200} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EducationSkeleton;
