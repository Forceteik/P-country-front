import { Box, Tooltip, Typography } from '@mui/material';

import { showSalary } from 'utils/common';
import { useTooltipOneLineStyles } from 'components/TextField';
import infoListStyle from 'containers/modules/common/styles/infoListStyle';

const VacancyInfoList = ({ vacancy }) => {
  const infoListClasses = infoListStyle();
  const tooltipClasses = useTooltipOneLineStyles();
  return (
    <Box className={infoListClasses.list}>
      {vacancy.salary_after_interview && (
        <Tooltip
          title='Подходящие кандидаты - люди, которые наиболее точно подходят требованиям вашей вакансии. Они ранжированы по "индексу соответствия".'
          arrow
          placement={'top'}
          classes={tooltipClasses}
          PopperProps={{ disablePortal: true }}
        >
          <Box className={infoListClasses.listItems}>
            <Typography component="span" className={infoListClasses.infoItem}>
              {showSalary(vacancy.salary_from, vacancy.salary_to, vacancy.salary_after_interview)}
            </Typography>
          </Box>
        </Tooltip>
      )}
      {!vacancy.salary_after_interview && (
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            {showSalary(vacancy.salary_from, vacancy.salary_to, vacancy.salary_after_interview)}
          </Typography>
        </Box>
      )}
      {vacancy.city && (
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            {vacancy.city.name}
          </Typography>
        </Box>
      )}
      <Box className={infoListClasses.listItems}>
        <Typography component="span" className={infoListClasses.infoItem}>
          {vacancy.experiency.name === 'нет опыта' ? null : 'Опыт'} {vacancy.experiency.name}
        </Typography>
      </Box>
      <Box className={infoListClasses.listItems}>
        <Typography component="span" className={infoListClasses.infoItem}>
          {vacancy.employment_types.map((item) => item.employment_type.name).join(', ')}
        </Typography>
      </Box>
    </Box>
  );
};

export default VacancyInfoList;
