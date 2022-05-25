import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { ProfileTitle } from 'components/Titles';

import { darkGray, orangeWhite } from '../../../../../../styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  wrapper: {
    borderRadius: 20,
    backgroundColor: orangeWhite,
  },
  item: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: '14px',
    lineHeight: '21px',
    color: darkGray,
  },
  icon: {
    width: '26px',
    height: '26px',
    marginRight: theme.spacing(1.5),
  },
}));

const RiskFactors = ({ riskFactorsData }) => {
  const classes = useStyles();

  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  if (!riskFactorsData || !riskFactorsData.length) {
    return null;
  }

  return (
    <Box className={classes.wrapper} component="section" padding={4}>
      <ProfileTitle title="Факторы риска" />
      <Box mt={2.5}>
        <Grid container spacing={2.5}>
          {riskFactorsData.map((item) => (
            <Grid key={item.risk_factor.id} item xs={!isSm ? 6 : 12}>
              <Box className={classes.item}>
                <img className={classes.icon} src="/images/icons/warning.png" alt="warning icon" />
                <Typography className={classes.text}>{item.risk_factor.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default RiskFactors;
