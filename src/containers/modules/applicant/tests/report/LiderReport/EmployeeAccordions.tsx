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

const EmployeeAccordions = ({ data }) => {
  const classes = useStyles();
  return (
    <>
      {data.scales.map((item, key) => (
        <Box className={classes.rowLider} key={key}>
          <Accordion>
            <AccordionSummary expandIcon={<AccordionDown />}>
              <Typography component="h3" className={classes.accordionTitle}>
                {item.scale.group.name}
              </Typography>
              <Typography component="h3" className={classes.accordionTitleExpanded}>
                {item.scale.group.description}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="reportDetails">
              <Typography className="liderParagraph">{item.scale.description}</Typography>
              {item.scale.blocks.length > 0 && (
                <Box className="twoColumnRoot">
                  <Box className="twoColumnItem">
                    <List
                      className="reportList reportPositiveList"
                      subheader={
                        <ListSubheader component="div" className="liderListTitle">
                          Плюсы:
                        </ListSubheader>
                      }
                    >
                      {item.scale.blocks
                        .filter((block) => block.type === 'benefits_for_applicant')
                        .map((block, key) =>
                          block.descriptions.map((desc, index) => (
                            <ListItem>
                              <Typography key={index}>{desc.text}</Typography>
                            </ListItem>
                          )),
                        )}
                    </List>
                  </Box>
                  <Box className="twoColumnItem">
                    <List
                      className="reportList reportNegativeList"
                      subheader={
                        <ListSubheader component="div" className="liderListTitle">
                          Минусы:
                        </ListSubheader>
                      }
                    >
                      {item.scale.blocks
                        .filter((block) => block.type === 'cons_for_applicant')
                        .map((block, key) =>
                          block.descriptions.map((desc, index) => (
                            <ListItem>
                              <Typography key={index}>{desc.text}</Typography>
                            </ListItem>
                          )),
                        )}
                    </List>
                  </Box>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </>
  );
};

export default EmployeeAccordions;
