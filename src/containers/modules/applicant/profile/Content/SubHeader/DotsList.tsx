import capitalize from 'lodash.capitalize';

import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import infoListStyle from 'containers/modules/common/styles/infoListStyle';
import { calсEndingOfWordsWithNum, MadFormatter } from 'utils/formatters';
import { useProfile } from 'context/ProfileContext';

import NullItem from './NullItem';

const DotsList = ({ user, guest = false, loading = false }) => {
  const sessionUser = useProfile().currentUser;
  const currentUser = user || sessionUser;
  const infoListClasses = infoListStyle();

  if (loading || !currentUser.employee) {
    return (
      <Box className={infoListClasses.list}>
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            <Skeleton variant="text" width={100} />
          </Typography>
        </Box>
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            <Skeleton variant="text" width={100} />
          </Typography>
        </Box>
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            <Skeleton variant="text" width={100} />
          </Typography>
        </Box>
        <Box className={infoListClasses.listItems}>
          <Box component="span">
            <Typography component="span" className={infoListClasses.infoItem_label}>
              <Skeleton variant="text" width={350} />
            </Typography>
          </Box>
        </Box>
        <Box className={infoListClasses.listItems}>
          <Box component="span">
            <Typography component="span" className={infoListClasses.infoItem_label}>
              <Skeleton variant="text" width={250} />
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={infoListClasses.list}>
      {currentUser.employee.age > 0 ? (
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            {calсEndingOfWordsWithNum(currentUser.employee.age, ['лет', 'год', 'года'])}
          </Typography>
        </Box>
      ) : !guest ? (
        <NullItem text="Укажите возраст" />
      ) : null}

      {currentUser.employee.city ? (
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            {currentUser.employee.city.name}
          </Typography>
        </Box>
      ) : !guest ? (
        <NullItem text="Укажите город" />
      ) : null}

      {currentUser.employee.experience ? (
        <Box className={infoListClasses.listItems}>
          <Box component="span">
            <Typography component="span" className={infoListClasses.infoItem_label}>
              Опыт:{' '}
            </Typography>
            <Typography component="span" className={infoListClasses.infoItem}>
              {currentUser.employee.experience.name}
            </Typography>
          </Box>
        </Box>
      ) : !guest ? (
        <NullItem text="Укажите опыт" />
      ) : null}

      {currentUser.employee.position ? (
        <Box className={infoListClasses.listItems}>
          <Box component="span">
            <Typography component="span" className={infoListClasses.infoItem_label}>
              Должность:{' '}
            </Typography>
            <Typography component="span" className={infoListClasses.infoItem}>
              {capitalize(currentUser.employee.position)}
            </Typography>
          </Box>
        </Box>
      ) : !guest ? (
        <NullItem text="Укажите должность" />
      ) : null}

      {currentUser.employee.salary ? (
        <Box className={infoListClasses.listItems}>
          <Box component="span">
            <Typography component="span" className={infoListClasses.infoItem_label}>
              Желаемая зарплата:{' '}
            </Typography>
            <Typography component="span" className={infoListClasses.infoItem}>
              {MadFormatter.toCurrency(currentUser.employee.salary, '₽')}
            </Typography>
          </Box>
        </Box>
      ) : !guest ? (
        <NullItem text="Укажите желаемую зарплату" />
      ) : null}
    </Box>
  );
};

export default DotsList;
