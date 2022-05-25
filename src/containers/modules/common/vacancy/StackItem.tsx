import { Box, Typography } from '@mui/material';

import { useStackItemStyles } from './styles';

const StackItem = ({ text }) => {
  const classes = useStackItemStyles();
  return (
    <Box className={classes.stackItem}>
      <Typography>{text}</Typography>
    </Box>
  );
};

export default StackItem;
