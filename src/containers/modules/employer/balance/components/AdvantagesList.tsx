import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import PriceCheck from 'components/icons/PriceCheck';

const useStyles = makeStyles<any>((theme) => ({
  advantagesList: {
    '& .MuiListItem-root': {
      'paddingLeft': theme.spacing(3),
      'alignItems': 'flex-start',
      'paddingTop': 0,
      '&:not(:last-child)': {
        paddingBottom: theme.spacing(2.5),
        paddingRight: 0,
      },
      '&:last-child': {
        paddingBottom: 0,
      },
    },
    '& .MuiListItemText-primary': {
      fontSize: theme.typography.pxToRem(14),
    },
    '& .MuiListItemIcon-root': {
      marginTop: 2,
      minWidth: 'unset',
      marginRight: theme.spacing(1.2),
    },
  },
}));

const advantagesItems = [
  'Срок действия вакансии - 30 календарных дней',
  'До 30 рекомендованных кандидатов на вакансию',
  'Доступ к результатам тестирования кандидатов (профиль личности, способности, зоны риска и рекомендации)',
  'Возможность загрузки кейсов, тестовых заданий',
  'Доступ к сопроводительным письмам',
  'Доступ к откликам',
];

const AdvantagesList = () => {
  const classes = useStyles();
  return (
    <List className={classes.advantagesList}>
      {advantagesItems.map((item, id) => (
        <ListItem key={id}>
          <ListItemIcon>
            <PriceCheck />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

export default AdvantagesList;
