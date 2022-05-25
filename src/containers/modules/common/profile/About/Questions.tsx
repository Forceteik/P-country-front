import { Box, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { darkGray, gray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  questionItem: {
    borderTop: `1px solid ${gray}`,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const Questions = ({ data }) => {
  const classes = useStyles();
  return (
    <Box mt={4}>
      {data.map((item, id) => (
        <Box className={classes.questionItem} key={id}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography fontFamily={'inter-med'}>{item.question}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color={darkGray}>{item.answer}</Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Questions;
