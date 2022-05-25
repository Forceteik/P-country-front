import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles<any, any>((theme) => ({
  root: {
    'display': 'flex',
    'width': '100%',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  mark: {
    backgroundColor: ({ type }) => {
      if (type == 'plus') return '#22C2A4';
      if (type == 'minus') return '#EF466F';
      if (type == 'normal') return '#F28601';
      return '#b3b3b3';
    },
    height: 18,
    width: 4,
    borderRadius: 20,
    marginRight: theme.spacing(1),
  },
  label: {
    fontSize: theme.typography.pxToRem(12),
    color: '#979DAD',
  },
}));

const List = ({ items }) => {
  const itemsPlus = items.filter((item) => item.type === 'plus');
  const itemsMinus = items.filter((item) => item.type === 'minus');
  const itemsRec = items.filter((item) => item.type === 'none');
  const itemsNormal = items.filter((item) => item.type === 'normal');

  const renderItems = (arr) => {
    const list = arr.map((item, key) => {
      const { text, type = 'none', name } = item;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const classes = useStyles({ type });

      return (
        <Box className={classes.root} key={key}>
          <Box>
            <Box className={classes.mark} />
          </Box>
          <Box>
            {name && <Typography className={classes.label}>{name}</Typography>}
            {text && <Typography fontSize={14}>{text}</Typography>}
          </Box>
        </Box>
      );
    });
    return list;
  };

  return (
    <>
      {renderItems(itemsPlus)}
      {renderItems(itemsNormal)}
      {renderItems(itemsMinus)}
      {renderItems(itemsRec)}
    </>
  );
};

export default List;
