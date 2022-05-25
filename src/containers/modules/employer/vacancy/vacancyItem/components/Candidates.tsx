import { Grid, Box, Typography, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import EmptyRecordsContainer from 'components/EmptyRecordsContainer';
import { OverlayLoader } from 'components/Loaders';
import Info from 'components/icons/Info';
import { useTooltipCustomStyles } from 'components/TextField';
import 'slick-carousel/slick/slick.css';
import { mockNullCandidats } from 'constants/common';
import { midDarkGray } from 'styles/colorPalette';
import { useBalance } from 'context/BalanceContext';

import CandidatesNumInfo from './CandidatesNumInfo';
import SliderCandidates from './SliderCandidates';

const useStyles = makeStyles<any>((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-bold',
    marginRight: theme.spacing(1),
  },

  tooltipIcon: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Candidates = ({ vacancy, candidatesCount, loading, candidates, recommendedCandidatesLink }) => {
  const classes = useStyles();
  const { employerVacanciesCoupons } = useBalance();
  const tooltipClasses = useTooltipCustomStyles({ width: 367, padding: '8px 16px' });

  if (loading) {
    return <OverlayLoader />;
  }

  const getPublishLink = () => {
    if (employerVacanciesCoupons !== 0) {
      return `/employer/publish?vacancy_id=${vacancy.id}`;
    }

    return `/employer/publish/created?vacancy_id=${vacancy.id}`;
  };

  if (vacancy.status === 'published') {
    return (
      <>
        {candidatesCount ? (
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Box display={'flex'} alignItems="center">
                    <Typography className={classes.title}>Подходящие кандидаты</Typography>
                    <Tooltip
                      title='Подходящие кандидаты - люди, которые наиболее точно подходят требованиям вашей вакансии. Они ранжированы по "индексу соответствия".'
                      arrow
                      placement={'top'}
                      classes={tooltipClasses}
                      PopperProps={{ disablePortal: true }}
                    >
                      <Box className={classes.tooltipIcon}>
                        <Info />
                      </Box>
                    </Tooltip>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <SliderCandidates candidates={candidates} vacancy={vacancy} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CandidatesNumInfo
                candidatesCount={candidatesCount}
                finalHref={recommendedCandidatesLink}
                publishHref={getPublishLink()}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Box display={'flex'} alignItems="center">
                <Typography className={classes.title}>Подходящие кандидаты</Typography>
                <Box className={classes.tooltipIcon}>
                  <Info color={midDarkGray} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <EmptyRecordsContainer
                title={'Рекомендованные кандидаты не найдены'}
                descr="Не расстраивайтесь! Как только кандидат появится, система отобразит его в списке."
              />
            </Grid>
          </Grid>
        )}
      </>
    );
  }
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Box display={'flex'} alignItems="center">
              <Typography className={classes.title}>Подходящие кандидаты</Typography>
              <Box className={classes.tooltipIcon}>
                <Info color={midDarkGray} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <SliderCandidates candidates={mockNullCandidats} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CandidatesNumInfo inactive publishHref={getPublishLink()} />
      </Grid>
    </Grid>
  );
};

export default Candidates;
