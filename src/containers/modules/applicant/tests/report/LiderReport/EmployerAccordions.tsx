import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from '@mui/material';

import AccordionDown from 'components/icons/AccordionDown';

import useStyles from '../style';

const EmployerAccordions = ({ data }) => {
  const classes = useStyles();

  const adaptationFactors = data.blocks.filter((item) => item.group === 'factors_adaptation_and_disadaptation');
  const plusMinuses = data.blocks.filter((item) => item.group === 'group_pros_and_minuses');
  const makingDecisions = data.blocks
    .filter((item) => item.group === 'other')[0]
    .making_decisions.filter((item) => item.descriptions.length > 0)
    .map((item) => item.descriptions[0]);

  const recommendations = data.blocks
    .filter((item) => item.group === 'other')[0]
    .interaction_recommendations.filter((item) => item.descriptions.length > 0)
    .map((item) => item.descriptions[0]);

  return (
    <>
      {adaptationFactors.length > 0 && (
        <Box className={classes.rowLider}>
          <Accordion>
            <AccordionSummary expandIcon={<AccordionDown />}>
              <Typography component="h3" className={classes.accordionTitleEmployer}>
                {adaptationFactors[0].group_title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="reportDetails reportDetailsEmployer">
              <Box className="twoColumnRoot">
                <Box className="twoColumnItem">
                  <List
                    className="reportList reportPositiveList"
                    subheader={
                      <ListSubheader component="div" className="liderListTitleEmployer">
                        Факторы адаптации
                      </ListSubheader>
                    }
                  >
                    {adaptationFactors[0].factors_of_adaptation.map((item, key) =>
                      item.descriptions.map((desc, index) => (
                        <ListItem key={index}>
                          <Typography>{desc.text}</Typography>
                        </ListItem>
                      )),
                    )}
                  </List>
                </Box>
                <Box className="twoColumnItem">
                  <List
                    className="reportList reportNegativeList"
                    subheader={
                      <ListSubheader component="div" className="liderListTitleEmployer">
                        Факторы дезадаптации
                      </ListSubheader>
                    }
                  >
                    {adaptationFactors[0].factors_of_maladaptation.map((item, key) =>
                      item.descriptions.map((desc, index) => (
                        <ListItem key={index}>
                          <Typography>{desc.text}</Typography>
                        </ListItem>
                      )),
                    )}
                  </List>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
      {makingDecisions.length > 0 && (
        <Box className={classes.rowLider}>
          <Accordion>
            <AccordionSummary expandIcon={<AccordionDown />}>
              <Typography component="h3" className={classes.accordionTitleEmployer}>
                Принятие решений
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="reportDetails reportDetailsEmployer">
              <List className="reportList reportPositiveList">
                {makingDecisions.map((item, key) => (
                  <ListItem key={key}>
                    <Typography>{item.text}</Typography>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}

      {plusMinuses.length > 0 && (
        <Box className={classes.rowLider}>
          <Accordion>
            <AccordionSummary expandIcon={<AccordionDown />}>
              <Typography component="h3" className={classes.accordionTitleEmployer}>
                {plusMinuses[0].group_title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="reportDetails reportDetailsEmployer">
              <Box className="twoColumnRoot">
                <Box className="twoColumnItem">
                  <List
                    className="reportList reportPositiveList"
                    subheader={
                      <ListSubheader component="div" className="liderListTitleEmployer">
                        Плюсы
                      </ListSubheader>
                    }
                  >
                    {plusMinuses[0].pros.map((item, key) =>
                      item.descriptions.map((desc, index) => (
                        <ListItem key={index}>
                          <Typography>{desc.text}</Typography>
                        </ListItem>
                      )),
                    )}
                  </List>
                </Box>
                <Box className="twoColumnItem">
                  <List
                    className="reportList reportNegativeList"
                    subheader={
                      <ListSubheader component="div" className="liderListTitleEmployer">
                        Минусы
                      </ListSubheader>
                    }
                  >
                    {plusMinuses[0].minuses.map((item, key) =>
                      item.descriptions.map((desc, index) => (
                        <ListItem key={index}>
                          <Typography>{desc.text}</Typography>
                        </ListItem>
                      )),
                    )}
                  </List>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}

      {recommendations.length > 0 && (
        <Box className={classes.rowLider}>
          <Accordion>
            <AccordionSummary expandIcon={<AccordionDown />}>
              <Typography component="h3" className={classes.accordionTitleEmployer}>
                Подстройка и рекомендации по взаимодействию
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="reportDetails reportDetailsEmployer">
              <List className="reportList reportPositiveList">
                {recommendations.map((item, key) => (
                  <ListItem key={key}>
                    <Typography>{item.text}</Typography>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </>
  );
};

export default EmployerAccordions;
