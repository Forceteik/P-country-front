import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/lab/PaginationItem';

import { greenMain, greenWhite, midDarkGray, orangeMain, orangeWhite, pinkMain, pinkWhite } from 'styles/colorPalette';
import LineProgress from 'components/LineProgress';

const useStyles = makeStyles<any, any>((theme) => ({
  root: {
    marginBottom: ({ wm }) => (wm ? '0px' : theme.spacing(4)),
  },
  current: {
    fontFamily: 'inter-bold',
    fontSize: theme.typography.pxToRem(32),
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
    },
  },
  total: {
    color: midDarkGray,
    fontSize: theme.typography.pxToRem(18),
  },
}));

export const calcProgressColor = (total, current) => {
  const persenger = Math.round((100 * current) / total);
  if (persenger < 33) {
    return pinkMain;
  } else if (persenger >= 33 && persenger < 80) {
    return orangeMain;
  }
  return greenMain;
};

export const calcProgressColorLight = (total, current) => {
  const persenger = Math.round((100 * current) / total);
  if (persenger < 33) {
    return pinkWhite;
  } else if (persenger >= 33 && persenger < 80) {
    return orangeWhite;
  }
  return greenWhite;
};

const TestProgress = ({ current, total, wm = false }) => {
  const classes = useStyles({ wm });
  return (
    <Box className={classes.root}>
      <Typography>
        <Typography component={'span'} className={classes.current}>
          {current}
        </Typography>

        <Typography component={'span'} className={classes.total}>
          / {total}
        </Typography>
      </Typography>
      <LineProgress
        withoutLabel
        color={calcProgressColor(total, current)}
        bgColor={calcProgressColorLight(total, current)}
        progress={(current / total) * 100}
        label={Math.round((current / total) * 100) + '%'}
      />
    </Box>
  );
};

export const TestProgressWithSelection = ({ questions = [], answers = [], siblingCount = 2, ...otherProps }) => {
  return (
    <Box width={'100%'}>
      <Pagination
        color="primary"
        siblingCount={siblingCount}
        renderItem={(item) => {
          let style: any = {
            color: 'blue',
          };

          const page = item.page;

          const selectedQuestion = questions[page - 1];
          if (selectedQuestion) {
            const isAnswered = answers.some((item) => item.questionId === selectedQuestion.id);
            if (isAnswered) {
              style = {
                color: 'gray',
              };
            }
          }

          if (item.selected || item.type === 'next' || item.type === 'previous') {
            style = {};
          }

          return <PaginationItem {...item} style={style} />;
        }}
        {...otherProps}
      />
    </Box>
  );
};

export default TestProgress;
