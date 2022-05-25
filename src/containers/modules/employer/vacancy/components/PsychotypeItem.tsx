import cx from 'classnames';

import { Box, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { darkGray, gray, greenMain } from 'styles/colorPalette';
const useStyles = makeStyles<any, any>((theme) => ({
  accordion: {
    '& .MuiAccordion-rounded:last-child': {
      borderRadius: 20,
      boxShadow: 'none',
      [theme.breakpoints.down('sm')]: {
        borderRadius: 16,
      },
    },
    '& .MuiPaper-root': {
      backgroundColor: ({ color }) => {
        return color;
      },
    },
    '& .MuiAccordionSummary-root': {
      padding: '26px 53px 24px 72px',
      [theme.breakpoints.down('sm')]: {
        padding: '24px 14px',
      },
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
    },
    '& .MuiAccordionDetails-root': {
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
      },
    },
  },
  title: {
    color: ({ textColor }) => textColor,
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-med',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      marginLeft: theme.spacing(4.6),
    },
  },
  checkBox: {
    position: 'absolute',
    content: '""',
    width: 32,
    height: 32,
    borderRadius: '50%',
    top: -5,
    left: -47,
    backgroundColor: '#fff',
    border: `1px solid ${gray}`,
    [theme.breakpoints.down('sm')]: {
      width: 24,
      height: 24,
      top: 0,
      left: 3,
    },
  },
  choosen: {
    '&:before': {
      position: 'absolute',
      content: '""',
      width: 12,
      height: 12,
      borderRadius: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: ({ textColor }) => (textColor === '#fff' ? greenMain : textColor),
    },
  },
  summary: {
    color: ({ textColor }) => (textColor === '#fff' ? textColor : darkGray),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
}));

const PsychotypeItem = ({ item, onChange, isActive, color, textColor }) => {
  const { name, description, short_description } = item;
  const classes = useStyles({ color, textColor });

  const handleCheck = () => {
    onChange(item.id);
  };

  return (
    <Grid item xs={12} className={classes.accordion}>
      <Accordion className={classes.accordion} onClick={handleCheck} expanded={isActive}>
        <AccordionSummary>
          <Box position="relative">
            <Typography component="h3" className={classes.title}>
              {name}
            </Typography>
            <Typography className={classes.summary}>{short_description}</Typography>
            <Box className={isActive ? cx(classes.checkBox, classes.choosen) : classes.checkBox} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box dangerouslySetInnerHTML={{ __html: description }} />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default PsychotypeItem;
