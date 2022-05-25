import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Skeleton from '@mui/material/Skeleton';

import infoListStyle from 'containers/modules/common/styles/infoListStyle';
import { gray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  vacancyBox: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'relative',
    padding: '42px 32px 42px 42px',
    borderRadius: 20,
    border: `1px solid ${gray}`,
    [theme.breakpoints.down('lg')]: {
      padding: '28px 20px 24px',
    },
  },
  company: {
    'display': 'flex',
    'alignItems': 'center',
    'width': '70%',
    '& p': {
      marginRight: theme.spacing(1),
    },
  },
  name: {
    maxWidth: '75%',
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    lineHeight: '120%',
  },
  logo: {
    'position': 'absolute',
    'top': 42,
    'right': 32,
    'width': 120,
    'height': 50,
    'display': 'flex',
    'justify-content': 'flex-end',
    'textAlign': 'center',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
    [theme.breakpoints.down('md')]: {
      top: 14,
      right: 17,
    },
  },
  buttonBox: {
    'display': 'grid',
    'grid-auto-flow': 'column',
    'gap': theme.spacing(2),
    'width': 'fit-content',
  },
  roundedSkeleton: {
    borderRadius: 20,
  },
}));

const VacancyItemSkeleton = () => {
  const classes = useStyles({ disabledView: false });
  const infoListClasses = infoListStyle();

  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  return (
    <Box className={classes.vacancyBox} component="article">
      <Box className={classes.logo}>
        <Skeleton variant="circular" width={50} height={50} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box className={classes.company}>
                <Skeleton variant="text" width={100} />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography component={'h3'} className={classes.name}>
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item xs={12} overflow={'hidden'}>
              <Box className={infoListClasses.list}>
                <Box className={infoListClasses.listItems}>
                  <Typography className={infoListClasses.infoItem}>
                    <Skeleton width={70} />
                  </Typography>
                </Box>
                <Box className={infoListClasses.listItems}>
                  <Typography className={infoListClasses.infoItem}>
                    <Skeleton width={70} />
                  </Typography>
                </Box>
                <Box className={infoListClasses.listItems}>
                  <Typography className={infoListClasses.infoItem}>
                    <Skeleton width={70} />
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box className={classes.buttonBox}>
            <Skeleton className={classes.roundedSkeleton} width={110} height={50} />
            <Skeleton className={classes.roundedSkeleton} width={110} height={50} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems={isMobile ? 'stretch' : 'flex-end'}
            justifyContent={isMobile ? 'flex-end' : 'space-between'}
            spacing={2}
          >
            <Grid item xs={12} sm={3}>
              <Skeleton className={classes.roundedSkeleton} variant="rectangular" width={170} height={50} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VacancyItemSkeleton;
