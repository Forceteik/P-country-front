import { Box, Grid, useMediaQuery, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import profileStyle from 'containers/modules/common/profile/style';
import EmptyRecordsContainer from 'components/EmptyRecordsContainer';

import MainContent from './MainContent';
import MainContentWithTabs from './MainContentWithTabs';

const useStyles = makeStyles<any>((theme) => ({
  header: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(24),
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(0),
      paddingLeft: theme.spacing(0),
      fontSize: theme.typography.pxToRem(18),
    },
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CompetencyMatrix = ({ user = null, isOwner, competencyGroup }) => {
  const commonClasses = profileStyle();
  const classes = useStyles();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  return (
    <Box component="section" className={commonClasses.box}>
      {isSm ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.header}>Типы компетенций</Typography>
          </Grid>
          {competencyGroup.length === 0 ? (
            <Grid item xs={12}>
              <EmptyRecordsContainer
                title={isOwner ? 'Вы не прошли все тесты' : 'Кандидат не прошел все тесты'}
                descr="Типы компетенций станут доступны после прохождения всех обязательных тестов."
                showButton={isOwner}
                textButton="Пройти тесты"
                linkButton="/applicant/tests"
              />
            </Grid>
          ) : (
            <MainContentWithTabs competencyGroup={competencyGroup} />
          )}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={commonClasses.blockTitleAbout} component="h2">
              Психологический профиль
            </Typography>
          </Grid>

          {competencyGroup.length === 0 ? (
            <Grid item xs={12}>
              <EmptyRecordsContainer
                title={isOwner ? 'Вы не прошли все тесты' : 'Кандидат не прошел все тесты'}
                descr="Типы компетенций станут доступны после прохождения всех обязательных тестов."
                showButton={isOwner}
                textButton="Пройти тесты"
                linkButton="/applicant/tests"
                small
              />
            </Grid>
          ) : (
            <MainContent competencyGroup={competencyGroup} />
          )}
        </Grid>
      )}
    </Box>
  );
};

export default CompetencyMatrix;
