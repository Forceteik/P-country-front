import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { ProfileTitle } from 'components/Titles';

import { useMainContentStyles } from '../TestAndCompetency/CompetencyMatrix/style';
import { greenMain } from '../../../../../../styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  item: {
    display: 'flex',
    width: '100%',
  },
  mark: {
    backgroundColor: greenMain,
    width: 3,
    borderRadius: 20,
    marginRight: theme.spacing(1),
    flexShrink: 0,
  },
}));

const Interactions = ({ interactionsData }) => {
  const mainContentClasses = useMainContentStyles();
  const classes = useStyles();

  if (!interactionsData || !interactionsData.length) {
    return null;
  }

  return (
    <Box className={mainContentClasses.wrapper} component="section" padding={4}>
      <ProfileTitle title="Рекомендации по взаимодействию" />
      <Grid container>
        <Grid item xs={12}>
          {interactionsData.map((item) => (
            <Box className={classes.item} key={item.interaction.id} mt={2.5}>
              <Box className={classes.mark} />
              <Typography>{item.interaction.text}</Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Interactions;
