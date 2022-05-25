import cx from 'classnames';

import { Box, Typography, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import List from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/List';
import testProfileStyle from 'containers/modules/common/styles/testProfileStyle';
import Button from 'components/Button';

const generateLevelData = (index) => {
  if (index >= 0 && index <= 1) {
    return {
      type: 'plus',
      name: 'Высокий',
    };
  }
  if (index > 1 && index <= 3) {
    return {
      type: 'normal',
      name: 'Средний',
    };
  }
  if (index > 3 && index <= 5) {
    return {
      type: 'minus',
      name: 'Низкий',
    };
  }

  return {
    type: 'plus',
    name: 'Высокий',
  };
};

const CorpValuesLevels = ({ user, guest }) => {
  const currentUser = user;
  const isDone = currentUser?.corp_values?.status === 'completed';
  const levels = currentUser.corp_values?.result_scales.sort((a, b) => a.points - b.points) || [];
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
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
                    Уровни ценностей
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <List
                    items={levels.map((item, index) => ({
                      type: generateLevelData(index).type,
                      text: item.scale.name,
                      name: generateLevelData(index).name,
                    }))}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box className={commonTestStyle.nullImgBox}>
          <img src={isSm ? '/images/tests/bg-blur/nullTest-bg.png' : '/images/tests/bg-blur/desctop-null.png'} alt="" />
          <Box className={commonTestStyle.nullInfo}>
            <Typography className={commonTestStyle.nullTitle}>Уровни ценностей</Typography>
            <Typography className={commonTestStyle.nullText}>
              {guest ? 'Кандидат не прошел тест' : 'Для получения результатов пройдите тест'}
            </Typography>
            {!guest && (
              <Box className={commonTestStyle.nullBtnWidth}>
                <Button nextLink linkProps={{ href: '/applicant/tests/8' }} small fullWidth>
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

export default CorpValuesLevels;
