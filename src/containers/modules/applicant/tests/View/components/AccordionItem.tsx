import cx from 'classnames';

import { Box, Grid, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import AccordionDown from 'components/icons/AccordionDown';
import AccordionDone from 'components/icons/AccordionDone';
import Button from 'components/Button';
import Time from 'components/icons/Time';
import MessageBlow from 'components/icons/MessageBlow';
import { darkGray, greenMain } from 'styles/colorPalette';
import { MadFormatter } from 'utils/formatters';

import { viewStyles } from '../style';

const AccordionItem = ({ item, expanded, handleChange, testId }) => {
  const classes = viewStyles();
  const { title, id, image } = item;

  let desc = item.description;
  const href = `/applicant/tests/${testId}/instruction?itemId=${item.id}`;

  const nextAttempt = item.testable.user?.next_attempt;
  const isDone = item.testable.user?.status === 'completed';

  if (isDone) {
    if (nextAttempt) {
      desc = `Возможность повторного прохождения теста будет доступна ${MadFormatter.toDateShort(nextAttempt)}`;
    }
  }

  return (
    <Box className={cx({ [classes.doneTest]: isDone })}>
      <Accordion expanded={isDone ? false : expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
        <AccordionSummary expandIcon={!isDone && <AccordionDown />}>
          <Box>
            <Box className={classes.header}>
              <Box display={'flex'} alignItems="center">
                <Box className={classes.icon}>
                  <img src={image.original_url} alt="" />
                </Box>
                <Typography className={classes.itemTitle}>{title}</Typography>
              </Box>
              {isDone && <AccordionDone color={greenMain} />}
            </Box>
            <Box className={classes.bottom}>
              <Typography className={classes.detailsText}>{desc}</Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {item.question_count && (
                  <Grid item>
                    <Box className={classes.timeBox}>
                      <MessageBlow />
                      <Typography className={classes.timeText}>{item.question_count}</Typography>
                    </Box>
                  </Grid>
                )}
                <Grid item>
                  <Box className={classes.timeBox}>
                    <Time color={darkGray} fontSize={16} />
                    <Typography className={classes.timeText}>{item.duration} минут</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10} sm={7} lg={6}>
              <Button fullWidth nextLink linkProps={{ href }}>
                Перейти к тесту
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AccordionItem;
