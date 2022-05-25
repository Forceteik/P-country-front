import { Box, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

import { blueMain, gray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  box: {
    border: `1px solid ${gray}`,
    borderRadius: 20,
    padding: '32px 32px 36px 24px',
    [theme.breakpoints.down('md')]: {
      padding: '28px 24px 24px 20px',
    },
  },
  company: {
    display: 'flex',
    alignItems: 'center',
  },
  companyName: {
    marginRight: theme.spacing(1),
  },
  status: {
    display: 'flex',
  },
  imgBox: {
    textAlign: 'right',
    height: 50,
    [theme.breakpoints.down('md')]: {
      height: 32,
    },
  },
  vacancyName: {
    color: blueMain,
    fontSize: 22,
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  avatar: {
    marginLeft: 'auto',
  },
}));

const ResponseItemSkeleton = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
            <Grid item xs={6} sm={9}>
              <Box className={classes.company}>
                <Typography className={classes.companyName}>
                  <Skeleton variant="text" width={150} />
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box className={classes.imgBox}>
                <Skeleton className={classes.avatar} variant="circular" width={70} height={70} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.status}>
                <Typography>
                  <Skeleton variant="text" width={130} height={50} />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
            <Grid item xs={12}>
              <Typography className={classes.vacancyName}>
                <Skeleton variant="text" width={240} />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResponseItemSkeleton;
