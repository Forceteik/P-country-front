import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid } from '@mui/material';

import AccordionDown from 'components/icons/AccordionDown';
import { BgCircularProgress } from 'components/CustomCircularProgress';

import CompetencyLineProgresses from './CompetencyLineProgresses';
import { useMainContentStyles } from './style';

const MainContent = ({ competencyGroup }) => {
  const classes = useMainContentStyles();

  return (
    <Grid item xs={12}>
      <Box className={classes.wrapper}>
        <Typography className={classes.header}>Типы компетенций</Typography>
        {competencyGroup.map((item, key) => {
          return (
            <Box className={classes.rootItem} key={key}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={10}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography className={classes.title}>{item.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>{item.description}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <BgCircularProgress progress={item.result?.percents || 0} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Accordion elevation={0} className={classes.accordionRoot}>
                    <Box width={'fit-content'}>
                      <AccordionSummary className={classes.accordionSummmary} expandIcon={<AccordionDown />}>
                        <Box display={'flex'} alignItems="center">
                          <Typography className={classes.accordionDownTitle}>Составляющие компетенции</Typography>
                        </Box>
                      </AccordionSummary>
                    </Box>
                    <AccordionDetails>
                      <CompetencyLineProgresses competencies={item.competencies} />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
};

export default MainContent;
