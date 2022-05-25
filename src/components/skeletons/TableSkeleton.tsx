import Skeleton from '@mui/material/Skeleton';
import { Box, Grid, Hidden, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles<any>((theme) => ({
  box: {
    border: '1px solid #E1E3E8',
    borderRadius: 20,
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
}));

const TableSkeleton = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  return (
    <Box component="section" className={classes.box}>
      <Grid container>
        <Hidden smDown>
          <Grid item xs={12}>
            <Skeleton height={50} variant="text" />
          </Grid>
        </Hidden>

        <Grid item xs={12}>
          <Skeleton height={isMobile ? 40 : 70} variant="text" />
        </Grid>
        <Grid item xs={12}>
          <Skeleton height={isMobile ? 40 : 70} variant="text" />
        </Grid>
        <Grid item xs={12}>
          <Skeleton height={isMobile ? 40 : 70} variant="text" />
        </Grid>
        <Grid item xs={12}>
          <Skeleton height={isMobile ? 40 : 70} variant="text" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableSkeleton;
