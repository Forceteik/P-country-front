import { Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';

import Button from 'components/Button';
import { blueMain, darkGray, gray } from 'styles/colorPalette';
import Eye from 'components/icons/Eye';
import Profile from 'components/icons/Profile';
import { MadFormatter } from 'utils/formatters';
import { showSalary } from 'utils/common';

const useStyles = makeStyles<any>((theme) => ({
  item: {
    'border': `1px solid ${gray}`,
    'padding': theme.spacing(4),
    '&:first-child': {
      borderRadius: '20px 20px 0px 0px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  title: {
    fontFamily: 'inter-bold',
    fontSize: 22,
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  infoListItem: {
    'display': 'inline-block',
    'marginRight': 12,
    'paddingRight': 12,
    'position': 'relative',
    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translate(50%, -50%)',
      width: 6,
      height: 6,
      backgroundColor: gray,
      borderRadius: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      'display': 'block',
      'marginRight': 0,
      'paddingRight': 0,
      '&:not(:last-child)::after': {
        display: 'none',
      },
    },
  },
  activityInfo: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'unset',
    },
  },
  activityInfoItem: {
    'display': 'flex',
    'alignItems': 'center',
    '&:not(:last-child)': {
      marginRight: theme.spacing(3),
    },
  },
  descr: {
    'overflow': 'hidden',
    'maxHeight': 200,
    'color': darkGray,
    'position': 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      background:
        'linear-gradient(180deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.4) 80%, rgba(255,255,255,0.8) 90%, rgba(255,255,255,0.98) 98%, rgba(255,255,255,1) 100%)',
      top: 0,
      left: 0,
    },
  },
}));

const ResponseItem = ({ item }) => {
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Box component="article" className={classes.item}>
      <Grid container spacing={isMobile ? 2 : 3}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1} direction={isMd ? 'column-reverse' : 'row'}>
                <Grid item xs={12} lg={8}>
                  <Typography component="h2" className={classes.title}>
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Box className={classes.activityInfo}>
                    <Box className={classes.activityInfoItem}>
                      <Eye />
                      <Typography ml={0.5} color={darkGray}>
                        {item.views}
                      </Typography>
                      {item.views_daily !== 0 && (
                        <Typography ml={0.5} color={blueMain}>
                          +{item.views_daily}
                        </Typography>
                      )}
                    </Box>
                    <Box className={classes.activityInfoItem}>
                      <Profile />
                      <Typography ml={0.5} color={darkGray}>
                        {item.responses_count}
                      </Typography>
                      {item.response_new_count !== 0 && (
                        <Typography ml={0.5} color={blueMain}>
                          +{item.response_new_count}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Box className={classes.infoListItem}>
                  <Typography>{showSalary(item.salary_from, item.salary_to, item.salary_after_interview)}</Typography>
                </Box>
                {item.city && (
                  <Box className={classes.infoListItem}>
                    <Typography>{item.city?.name}</Typography>
                  </Box>
                )}

                <Box className={classes.infoListItem}>
                  <Typography>{item.experiency.name}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.descr} dangerouslySetInnerHTML={{ __html: item.description }} />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={isMobile ? 2 : 0}
            justifyContent="space-between"
            alignItems={isMobile ? 'stretch' : 'flex-end'}
            direction={isMobile ? 'column-reverse' : 'row'}
          >
            <Grid item xs={12} sm={6} md={5} lg={3}>
              <Button fullWidth small nextLink linkProps={{ href: `/employer/responses/${item.id}?status=responded` }}>
                Просмотр откликов
              </Button>
            </Grid>
            <Grid item>
              <Typography color={darkGray}>{MadFormatter.toDate(item.created_at, 'D MMMM')}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResponseItem;
