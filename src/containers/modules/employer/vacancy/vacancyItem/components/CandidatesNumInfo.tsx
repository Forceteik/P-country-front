import { Grid, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Button from 'components/Button';
import { black, blueLight, darkGray } from 'styles/colorPalette';
import Danger from 'components/icons/Danger';
import { calсEndingOfWords } from 'utils/formatters';

const useStyles = makeStyles<any>((theme) => ({
  candidateNum: {
    borderRadius: 20,
    backgroundColor: blueLight,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
    },
  },
  candidateNumText: {
    'color': darkGray,
    'fontFamily': 'inter-med',
    '& span': {
      fontFamily: 'inter-bold',
      color: black,
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
    },
  },
}));

const CandidatesNumInfo = ({ candidatesCount = 0, finalHref = '/', inactive = false, publishHref }) => {
  const classes = useStyles();

  if (inactive) {
    return (
      <Box className={classes.candidateNum}>
        <Grid container justifyContent={'space-between'} alignItems="center" spacing={2}>
          <Grid item>
            <Box pt={0.5}>
              <Danger />
            </Box>
          </Grid>
          <Grid item xs>
            <Typography className={classes.candidateNumText}>
              Для просмотра рекомендованных кандидатов опубликуйте вакансию
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5} md={3.2}>
            <Button small fullWidth nextLink linkProps={{ href: publishHref }}>
              Опубликовать
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
  return (
    <Box className={classes.candidateNum}>
      <Grid container justifyContent={'space-between'} alignItems="center" spacing={2}>
        <Grid item xs>
          <Typography className={classes.candidateNumText}>
            {calсEndingOfWords(candidatesCount, ['Доступно', 'Доступен', 'Доступны'])}{' '}
            <Typography component={'span'}>{candidatesCount}</Typography>{' '}
            {calсEndingOfWords(candidatesCount, [
              'рекомендованных кандидатов',
              'рекомендованный кандидат',
              'рекомендованных кандидата',
            ])}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5} md={3.2}>
          <Button small fullWidth nextLink linkProps={{ href: finalHref }}>
            Смотреть кандидатов
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidatesNumInfo;
