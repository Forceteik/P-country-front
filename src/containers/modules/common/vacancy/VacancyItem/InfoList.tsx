import { Box, Tooltip, Typography } from '@mui/material';

import infoListStyle from 'containers/modules/common/styles/infoListStyle';
import { useTooltipOneLineStyles } from 'components/TextField';
import { showSalary } from 'utils/common';

const InfoList = ({ vacancy, guest }) => {
  const infoListClasses = infoListStyle();
  const tooltipClasses = useTooltipOneLineStyles();
  return (
    <Box className={infoListClasses.list}>
      {vacancy.salary_after_interview && (
        <Tooltip title="Зарплата по результатам собеседования" arrow placement={'top-start'} classes={tooltipClasses}>
          <Box className={infoListClasses.listItems}>
            <Typography className={infoListClasses.infoItem}>
              {showSalary(vacancy.salary_from, vacancy.salary_to, vacancy.salary_after_interview)}
            </Typography>
          </Box>
        </Tooltip>
      )}

      {vacancy.salary_from && (
        <Box className={infoListClasses.listItems}>
          <Typography className={infoListClasses.infoItem}>
            {showSalary(vacancy.salary_from, vacancy.salary_to, vacancy.salary_after_interview)}
          </Typography>
        </Box>
      )}

      {guest
        ? vacancy.city && (
            <Box className={infoListClasses.listItems}>
              <Typography className={infoListClasses.infoItem}>{vacancy.city?.name || ''}</Typography>
            </Box>
          )
        : vacancy.city?.name && (
            <Box className={infoListClasses.listItems}>
              <Typography className={infoListClasses.infoItem}>{vacancy.city?.name}</Typography>
            </Box>
          )}
      {vacancy.experiency?.name && (
        <Box className={infoListClasses.listItems}>
          <Typography className={infoListClasses.infoItem}>{vacancy.experiency?.name}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default InfoList;
