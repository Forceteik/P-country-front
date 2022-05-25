import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import AccordionDown from 'components/icons/AccordionDown';
import VacancyItem from 'containers/modules/common/vacancy/VacancyItem';
import { midDarkGray } from 'styles/colorPalette';

import { useStyles } from './styles';

const DraftBlock = ({ items, isExpanded, handleChange, refetch, refetchProfileProgress }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.draw}>
      <Accordion expanded={isExpanded === 'draftExpanded'} onChange={handleChange('draftExpanded')}>
        <AccordionSummary expandIcon={<AccordionDown color={midDarkGray} />}>
          <Typography className={classes.accTitle}>Черновики вакансий</Typography>
          <Typography>{items.count}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {items.vacancies.map((item, i) => (
            <VacancyItem
              item={item}
              link={`/employer/vacancies/${item.id}`}
              key={i}
              guest={false}
              disabledView
              refetch={refetch}
              refetchProfileProgress={refetchProfileProgress}
              withoutImg={true}
              hideName={true}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default DraftBlock;
