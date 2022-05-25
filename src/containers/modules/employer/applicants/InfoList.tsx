import { Typography, Box } from '@mui/material';

import infoListStyle from 'containers/modules/common/styles/infoListStyle';
import { MadFormatter, calсEndingOfWordsWithNum } from 'utils/formatters';

const InfoList = ({ user }) => {
  const classes = infoListStyle();

  return (
    <Box className={classes.list}>
      {!!user.employee.city && (
        <Box className={classes.listItems}>
          <Typography>{user.employee.city.name}</Typography>
        </Box>
      )}
      {!!user.employee.age && (
        <Box className={classes.listItems}>
          <Typography>{calсEndingOfWordsWithNum(user.employee.age, ['лет', 'год', 'года'])}</Typography>
        </Box>
      )}
      {!!user.employee.experience && (
        <Box className={classes.listItems}>
          <Typography>{user.employee.experience.name}</Typography>
        </Box>
      )}
      {!!user.employee.salary && (
        <Box className={classes.listItems}>
          <Typography>{MadFormatter.toCurrency(user.employee.salary)}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default InfoList;
