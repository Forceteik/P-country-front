import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { generatePercentColor } from 'containers/modules/applicant/profile/Content/utils';
import LineProgress from 'components/LineProgress';
import { ligthGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  accordionText: {
    fontSize: theme.typography.pxToRem(14),
    marginTop: theme.spacing(1),
  },
}));

const CompetencyLineProgresses = ({ competencies }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      {competencies.map((item, key) => (
        <Grid item xs={12} sm={6} lg={4} key={key}>
          <Box>
            <LineProgress
              progress={item.result.percents}
              color={generatePercentColor(Math.round(item.result?.percents || 0))}
              label={`${Math.round(item.result?.percents || 0)}%`}
              bgColor={ligthGray}
            />
            <Typography className={classes.accordionText}>{item.name}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CompetencyLineProgresses;
