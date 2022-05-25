import cx from 'classnames';

import { Box, Typography, Tooltip, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import List from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/List';
import Button, { SecondaryButton } from 'components/Button';
import { useTooltipBasicStyles } from 'components/TextField';
import testProfileStyle from 'containers/modules/common/styles/testProfileStyle';

const Professions = ({ user, guest }) => {
  const currentUser = user;
  const isDone = currentUser?.mbti?.status === 'completed';
  const professions = currentUser.mbti?.result?.config_type?.professions || [];
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const tooltipClasses = useTooltipBasicStyles();
  const commonTestStyle = testProfileStyle({ report: false });

  return (
    <>
      {isDone ? (
        <Box className={cx(commonTestStyle.gridContainer, commonTestStyle.padding)}>
          <Grid container spacing={3} alignContent="space-between" justifyContent="center">
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className={commonTestStyle.titleTest} component="h3">
                    Рекомендованные профессии
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <List
                    items={professions.map((item) => ({
                      type: 'plus',
                      text: item.profession.name,
                      name: '',
                    }))}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={8} md={12}>
              <Tooltip title="Блок находится в разработке" arrow placement={'top'} classes={tooltipClasses}>
                <Box>
                  <SecondaryButton fullWidth disabled small>
                    Полный список
                  </SecondaryButton>
                </Box>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box className={commonTestStyle.nullImgBox}>
          <img src={isSm ? '/images/tests/bg-blur/nullTest-bg.png' : '/images/tests/bg-blur/desctop-null.png'} alt="" />
          <Box className={commonTestStyle.nullInfo}>
            <Typography className={commonTestStyle.nullTitle}>Рекомендованные профессии</Typography>
            <Typography className={commonTestStyle.nullText}>
              {guest ? 'Кандидат не прошел тест' : 'Для получения результатов пройдите тест'}
            </Typography>
            {!guest && (
              <Box className={commonTestStyle.nullBtnWidth}>
                <Button nextLink linkProps={{ href: '/applicant/tests/1' }} small fullWidth>
                  Пройти тест
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Professions;
