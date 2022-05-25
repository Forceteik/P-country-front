import { Radar } from 'react-chartjs-2';

import { Grid, Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import PersonalTest from 'containers/modules/applicant/profile/Content/TestAndCompetency/Tests/components/PersonalTest';
import { personalTypeDictionary } from 'constants/common';
import { black, darkGray, gray, midDarkGray, orangeMain } from 'styles/colorPalette';

const options = {
  scale: {
    ticks: { beginAtZero: true, suggestedMin: 0 },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  layout: {
    padding: 15,
  },
};

const useStyles = makeStyles<any>((theme) => ({
  firstPersonBlock: {
    borderRadius: 20,
    border: `1px solid ${gray}`,
  },
  leftPersonBlock: {
    padding: '32px 36px 32px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: '24px 16px',
    },
  },
  firstLine: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  imgBox: {
    'width': 62,
    'height': 62,
    'flexShrink': 0,
    'marginRight': theme.spacing(2),
    'borderRadius': '50%',
    'overflow': 'hidden',
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
  },
  name: {
    fontSize: theme.typography.pxToRem(26),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(22),
    },
  },
  subTitle: {
    color: midDarkGray,
    fontSize: theme.typography.pxToRem(12),
    marginBottom: theme.spacing(0.8),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0.4),
    },
  },
  personType: {
    color: orangeMain,
    fontSize: theme.typography.pxToRem(26),
    fontFamily: 'inter-bold',
    marginRight: theme.spacing(1),
  },
  percent: {
    fontSize: theme.typography.pxToRem(12),
    color: darkGray,
    whiteSpace: 'nowrap',
  },
  info: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
  canvas: {
    [theme.breakpoints.down('md')]: {
      borderTop: `1px solid ${gray}`,
    },
    '& canvas': {
      maxHeight: 450,
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
  },
  commandDescr: {
    color: darkGray,
    marginTop: theme.spacing(1),
  },
  commandTitle: {
    fontSize: theme.typography.pxToRem(18),
    color: black,
    fontFamily: 'inter-med',
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2),
    },
  },
  shareBlock: {
    borderTop: `1px solid ${gray}`,
    padding: '27px 24px',
    [theme.breakpoints.down('lg')]: {
      padding: '24px 16px',
    },
  },
  rightPersonBlock: {
    borderLeft: `1px solid ${gray}`,
  },
}));

const FirstPersonBlock = ({ currentUser, typeReport, type = 'person', guest, radarData = null }) => {
  const classes = useStyles();
  const personType = currentUser.mbti.result.config_type.name;
  const personPersent = personalTypeDictionary[currentUser.mbti.result.config_type.scale];

  return (
    <Box className={classes.firstPersonBlock}>
      <Grid container>
        <Grid item xs={12} md={6} lg={7}>
          <Box className={classes.leftPersonBlock}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box className={classes.firstLine}>
                  <Box className={classes.imgBox}>
                    <img
                      src={
                        currentUser.media
                          ? currentUser.media.original_url
                          : '/images/avatar/placeholder-avatar-employee.png'
                      }
                    />
                  </Box>
                  <Typography className={classes.name}>
                    {currentUser.name} {currentUser.surname}
                  </Typography>
                </Box>
                {type === 'person' ? (
                  <>
                    <Typography className={classes.subTitle}>Тип личности:</Typography>
                    <Box className={classes.info}>
                      <Typography className={classes.personType} component="span">
                        {personType}
                      </Typography>
                      <Typography component="span" className={classes.percent}>
                        {personPersent}% людей в мире
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography className={classes.subTitle}>Основная командная роль:</Typography>
                    <Box className={classes.info}>
                      <Typography className={classes.personType} component="span">
                        {typeReport.report.header}
                      </Typography>
                    </Box>
                  </>
                )}
              </Grid>
              <Grid item xs={12}>
                <div className="reportTitleDescr" dangerouslySetInnerHTML={{ __html: typeReport.report.description }} />
              </Grid>
              {type === 'command' && (
                <Grid item xs={12}>
                  <Typography className={classes.commandDescr}>{typeReport.description}</Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
        {type === 'person' ? (
          <Grid item xs={12} md={6} lg={5} className={classes.rightPersonBlock}>
            <Grid container spacing={2} height={'100%'}>
              <Grid item xs={12}>
                <PersonalTest title={'Тестирование личности'} user={currentUser} report guest={guest} />
              </Grid>
              {/* Оля: пока скрыла блок с возможностью поделиться отчетом через соц сети */}
              {/* <Grid item xs={12}>
                <Box className={classes.shareBlock}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>
                        Расскажите своим друзьям и коллегам о результате теста и профиле в Talanty, это увеличит шанс
                        получить высокооплачиваемую работу или стажировку
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <SocialList report/>
                    </Grid>
                  </Grid>
                </Box>
              </Grid> */}
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} md={6} lg={5} className={classes.canvas}>
            <Typography className={classes.commandTitle}>Командная роль</Typography>
            {/*@ts-ignore*/}
            <Radar data={radarData} options={options} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default FirstPersonBlock;
