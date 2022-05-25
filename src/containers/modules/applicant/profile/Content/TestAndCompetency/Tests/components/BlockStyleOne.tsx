import { Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { generatePercentColor } from 'containers/modules/applicant/profile/Content/utils';
import LineProgress from 'components/LineProgress';
import { blueLight, darkGray, gray, orangeMain } from 'styles/colorPalette';
import { personalTypeDictionary } from 'constants/common';

const useStyles = makeStyles<any, any>((theme) => ({
  box: {
    padding: theme.spacing(3),
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: ({ integral }) =>
      integral ? 'center/cover  no-repeat url(/images/tests/bg-blur/rightBlock-nul2.png)' : blueLight,
    borderLeft: ({ integral }) => (integral ? `1px solid ${gray}` : 'none'),
    [theme.breakpoints.down('lg')]: {
      borderRadius: 20,
      padding: '30px 20px',
      background: ({ integral }) => (integral ? blueLight : blueLight),
    },
  },
  title: {
    color: ({ color }) => color,
    fontSize: theme.typography.pxToRem(26),
    fontFamily: 'inter-bold',
    lineHeight: '115%',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(26),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  subTitle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2.5),
    color: darkGray,
    fontSize: theme.typography.pxToRem(12),
  },
  descr: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '150%',
    marginTop: ({ integral }) => (integral ? theme.spacing(1) : '0px'),
  },
  progress: {
    marginTop: theme.spacing(2),
    width: '100%',
    marginBottom: theme.spacing(2.5),
  },
}));

const BlockStyleOne = ({ data }) => {
  const color = data.percent ? generatePercentColor(data.percent) : orangeMain;
  const integral = !data.scale && !data.percent;
  const classes = useStyles({ color, integral });

  if (!data) {
    return null;
  }

  return (
    <Box className={classes.box}>
      {data.percent && <Typography className={classes.title}>{data.name}</Typography>}
      {data.scale && <Typography className={classes.title}>{data.name}</Typography>}
      {data.scale && (
        <Typography className={classes.subTitle}>{personalTypeDictionary[data.scale]}% людей в мире</Typography>
      )}
      {data.percent && (
        <Box className={classes.progress}>
          <LineProgress progress={data.percent} color={color} label={`${data.percent}%`} bgColor="#fff" />
        </Box>
      )}
      {data.scale && <Typography className={classes.descr}>{data.description}</Typography>}
      {data.percent && !data.scale ? (
        <Typography className={classes.descr}>{data.description}</Typography>
      ) : (
        !data.percent && !data.scale && <Typography>{data.description}</Typography>
      )}
    </Box>
  );
};

export default BlockStyleOne;
