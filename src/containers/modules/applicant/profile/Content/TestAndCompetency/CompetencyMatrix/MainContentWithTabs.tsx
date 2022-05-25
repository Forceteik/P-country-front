import { useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Tabs, Tab, Typography } from '@mui/material';

import AccordionDown from 'components/icons/AccordionDown';
import { BgCircularProgress } from 'components/CustomCircularProgress';

import CompetencyLineProgresses from './CompetencyLineProgresses';
import { useMainContentStyles } from './style';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const MainContentWithTabs = ({ competencyGroup }) => {
  const classes = useMainContentStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      'id': `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  };

  return (
    <div className={classes.tabsRoot}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {competencyGroup.map((item, key) => (
          <Tab label={item.name} {...a11yProps(key)} key={key} />
        ))}
      </Tabs>
      {competencyGroup.map((item, key) => (
        <TabPanel value={value} index={key} key={key}>
          <Box className={classes.rootItem} component="article">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <BgCircularProgress progress={item.result?.percents || 0} />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.header}>{item.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{item.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Accordion elevation={0} className={classes.accordionRoot}>
                  <Box width={'fit-content'}>
                    <AccordionSummary className={classes.accordionSummmary} expandIcon={<AccordionDown />}>
                      <Box className={classes.accordionDown}>
                        <Typography className={classes.accordionDownTitle}>Составляющие компетенции</Typography>
                      </Box>
                    </AccordionSummary>
                  </Box>
                  <AccordionDetails className={classes.accordionDetails}>
                    <CompetencyLineProgresses competencies={item.competencies} />
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      ))}
    </div>
  );
};

export default MainContentWithTabs;
