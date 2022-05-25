import cx from 'classnames';

import { Box, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import useMediaQuery from '@mui/material/useMediaQuery';

import testProfileStyle from 'containers/modules/common/styles/testProfileStyle';
import Button from 'components/Button';
import { darkGray, greenMain, greenWhite } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  role: {
    padding: '16px 20px',
    backgroundColor: greenWhite,
    width: '100%',
    borderRadius: 14,
  },
  roleTitle: {
    fontSize: theme.typography.pxToRem(12),
    color: darkGray,
    marginBottom: theme.spacing(0.5),
  },
  roleValue: {
    color: greenMain,
    fontFamily: 'inter-med',
  },
}));

const CorpValuesResult = ({ user, guest = false }) => {
  const currentUser = user;
  const corp_values = currentUser.corp_values;
  const isDone = corp_values?.status === 'completed';
  const mainScale: any = corp_values?.result_scales.sort((a, b) => a.points - b.points)[0] || [];

  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const classes = useStyles();
  const commonTestStyle = testProfileStyle({ report: false });

  return (
    <>
      {isDone ? (
        <Box className={cx(commonTestStyle.gridContainer, commonTestStyle.padding)}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className={commonTestStyle.titleTest} component="h3">
                    Тест ценностей
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={12}>
                  <Box className={classes.role}>
                    <Typography className={classes.roleTitle}>Основная орентированность:</Typography>
                    <Typography className={classes.roleValue}>{mainScale.scale.name}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography>{mainScale.scale.description}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box className={commonTestStyle.nullImgBox}>
          <img src={isSm ? '/images/tests/bg-blur/nullTest-bg.png' : '/images/tests/bg-blur/desctop-null.png'} alt="" />
          <Box className={commonTestStyle.nullInfo}>
            <Typography className={commonTestStyle.nullTitle}>Тест ценностей</Typography>
            <Typography className={commonTestStyle.nullText}>
              {guest ? 'Кандидат не прошел тест' : 'Для получения результатов пройдите тест'}
            </Typography>
            {!guest && (
              <Box className={commonTestStyle.nullBtnWidth}>
                <Button nextLink linkProps={{ href: '/applicant/tests/8' }} fullWidth small>
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

export default CorpValuesResult;
