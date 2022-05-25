import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import AccordionDown from 'components/icons/AccordionDown';
import VacancyItem from 'containers/modules/common/vacancy/VacancyItem';
import { midDarkGray } from 'styles/colorPalette';

import { useStyles } from './styles';

const InactiveBlock = ({ items }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.inactive}>
      <Accordion>
        <AccordionSummary expandIcon={<AccordionDown color={midDarkGray} />}>
          <Typography className={classes.accTitle}>Неактивные вакансии</Typography>
          <Typography>{items.count}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {items.vacancies.map((item, i) => (
            <VacancyItem
              item={item}
              link={`/employer/vacancies/${item.id}`}
              key={i}
              guest={false}
              withoutImg={true}
              hideName={true}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default InactiveBlock;
