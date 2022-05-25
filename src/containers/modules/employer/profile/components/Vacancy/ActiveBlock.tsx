import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';

import AccordionDown from 'components/icons/AccordionDown';
import VacancyItem from 'containers/modules/common/vacancy/VacancyItem';
import { midDarkGray } from 'styles/colorPalette';

import { useStyles } from './styles';

const ActiveBlock = ({ items, isGuest }) => {
  const calcSpecializationCount = (arr) => {
    let number = 0;
    arr.map((item) => {
      number = number + item.count;
    });

    return number;
  };

  //Функция, которая сортирует блоки опубликованных вакансий по количеству вакансий в каждом блоке: ИТ:6, Дизайн:4, Рестораны: 1
  const sortArrByNumeric = (arr) => {
    return arr.sort(({ count: a }, { count: b }) => b - a);
  };

  // Функция, которая сортирует вакансии в блоках по дате окончания купона: От вакансий, которые скоро истекут до самых свежих
  const sortArrByExpireTime = (arr) => {
    return arr.map((vacancyBlock) => {
      if (vacancyBlock.vacancies.length < 2) {
        return vacancyBlock;
      }

      return {
        ...vacancyBlock,
        vacancies: vacancyBlock.vacancies.sort((a, b) => {
          return new Date(a.activation_end_at).getTime() - new Date(b.activation_end_at).getTime();
        }),
      };
    });
  };

  const classes = useStyles();
  return (
    <Grid item xs={12}>
      {isGuest ? (
        <Grid container rowSpacing={2}>
          {sortArrByNumeric(items).map((item, key) => (
            <Grid item xs={12} className={classes.activeGuest} key={key}>
              <Accordion>
                <AccordionSummary expandIcon={<AccordionDown color={midDarkGray} />}>
                  <Typography className={classes.accTitle}>{item.name}</Typography>
                  <Typography>{item.count}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item.vacancies.map((vac, key) => (
                    <VacancyItem
                      withoutImg={true}
                      item={vac}
                      link={isGuest ? `/vacancies/${vac.id}` : `/employer/vacancies/${vac.id}`}
                      key={key}
                      guest={isGuest}
                      hideName={true}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box className={classes.active}>
          <Accordion>
            <AccordionSummary expandIcon={<AccordionDown color={midDarkGray} />}>
              <Typography className={classes.accTitle}>Опубликованные вакансии</Typography>
              <Typography>{calcSpecializationCount(items)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {sortArrByExpireTime(sortArrByNumeric(items)).map((item, id) => (
                <Box key={id} className={classes.activeVacancies}>
                  <Accordion>
                    <AccordionSummary expandIcon={<AccordionDown color={midDarkGray} />}>
                      <Typography className={classes.accTitle}>{item.name}</Typography>
                      <Typography>{item.count}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {item.vacancies.map((vac, key) => (
                        <VacancyItem
                          withoutImg={true}
                          item={vac}
                          link={isGuest ? `/vacancies/${vac.id}` : `/employer/vacancies/${vac.id}`}
                          key={key}
                          guest={isGuest}
                          hideName={true}
                        />
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Grid>
  );
};

export default ActiveBlock;
