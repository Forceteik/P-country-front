import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Close from 'components/icons/Close';
import { darkGray, ligthGray, black } from 'styles/colorPalette';

const useSkillStyles = makeStyles<any>((theme) => ({
  root: {
    'display': 'flex',
    'alignItems': 'center',
    'backgroundColor': ligthGray,
    'height': 38,
    'borderRadius': 60,
    'padding': '10px 18px',
    'marginRight': theme.spacing(1.5),
    'marginBottom': theme.spacing(1.5),
    '&:hover': {
      '& $deleteBox': {
        display: 'flex',
      },
    },
  },
  label: {
    textTransform: 'uppercase',
    fontSize: theme.typography.pxToRem(12),
    color: darkGray,
    letterSpacing: '0.03em',
    fontFamily: 'inter-med',
  },
  deleteBox: {
    cursor: 'pointer',
    display: 'none',
    marginLeft: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
  },
}));

type Props = {
  name: string;
  onDelete?: () => void;
  isLoading?: boolean;
};

export const SkillsItem = ({ name, onDelete, isLoading = false }: Props) => {
  const classes = useSkillStyles();

  if (isLoading) {
    return (
      <Box className={classes.root}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Typography component={'div'} className={classes.label}>
        {name}
      </Typography>
      {onDelete && (
        <Box onClick={onDelete} className={classes.deleteBox}>
          <Close fontSize={18} color={black} />
        </Box>
      )}
    </Box>
  );
};

const Skills = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box display="flex" flexWrap="wrap">
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Skills;
