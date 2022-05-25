import Link from 'next/link';

import { Grid, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { blueMain, darkGray, gray } from 'styles/colorPalette';
import { CircularProgressWithImg } from 'components/CustomCircularProgress';
import 'slick-carousel/slick/slick.css';
import ProgressText from 'components/ProgressText';

const useStyles = makeStyles<any>((theme) => ({
  sliderItem: {
    borderRadius: 20,
    border: `1px solid ${gray}`,
    padding: '24px 16px',
    overflow: 'hidden',
  },
  sliderItemNull: {
    'borderRadius': 20,
    'padding': '24px 16px',
    'overflow': 'hidden',
    'border': `1px solid ${gray}`,
    '&:before': {
      content: '""',
      zIndex: 10,
      position: 'absolute',

      width: '100%',
      height: '100%',
      backdropFilter: 'blur(2px)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    'position': 'relative',
  },
  compatibility: {
    fontSize: theme.typography.pxToRem(14),
    fontFamily: 'inter-med',
    color: darkGray,
  },
}));

const SliderCandidateItem = ({ vacancy = null, candidate }) => {
  const classes = useStyles();
  const progress = Math.round(candidate.user.compatibility.value);

  return (
    <Box>
      <Box mr={2} ml={2}>
        <Box className={vacancy ? classes.sliderItem : classes.sliderItemNull}>
          <Grid container spacing={2} alignItems="center">
            {vacancy ? (
              <Grid item>
                <Link href={`/applicants/${candidate.user.id}?vacancy_id=${vacancy.id}`}>
                  <a target="_blank">
                    <CircularProgressWithImg
                      progress={progress}
                      imgSrc={candidate.user.media?.preview_url || '/images/avatar/placeholder-avatar-employee.png'}
                    />
                  </a>
                </Link>
              </Grid>
            ) : (
              <Grid item>
                <CircularProgressWithImg
                  progress={progress}
                  imgSrc={candidate.user.media?.preview_url || '/images/avatar/placeholder-avatar-employee.png'}
                />
              </Grid>
            )}

            <Grid item>
              <Typography className={classes.compatibility}>Совместимость</Typography>
              <ProgressText progress={progress} />
            </Grid>
            {vacancy ? (
              <Grid item xs={12}>
                <Link href={`/applicants/${candidate.user.id}?vacancy_id=${vacancy.id}`}>
                  <a target="_blank">
                    <Typography color={blueMain}>
                      {candidate.user.name} {candidate.user.surname}
                    </Typography>
                  </a>
                </Link>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography color={blueMain}>
                  {candidate.user.name} {candidate.user.surname}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SliderCandidateItem;
