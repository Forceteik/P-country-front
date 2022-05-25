import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { ProfileTitle } from 'components/Titles';
import { darkGray, ligthGray } from 'styles/colorPalette';

const PersonalSkills = ({ personalSkills = [] }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProfileTitle title="Суперспособности" />
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" flexWrap="wrap">
          {personalSkills.map((item, key) => (
            <SkillItem name={item.skill.name} key={key} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default PersonalSkills;

const useSkillStyles = makeStyles<any>((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: ligthGray,
    height: 38,
    borderRadius: 60,
    padding: '10px 18px',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  label: {
    textTransform: 'uppercase',
    fontSize: theme.typography.pxToRem(12),
    color: darkGray,
    letterSpacing: '0.03em',
    fontFamily: 'inter-med',
  },
}));

export const SkillItem = ({ name }) => {
  const classes = useSkillStyles();

  return (
    <Box className={classes.root}>
      <Typography component={'div'} className={classes.label}>
        {name}
      </Typography>
    </Box>
  );
};
