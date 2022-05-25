import useAxios from 'axios-hooks';
import cx from 'classnames';

import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Close from 'components/icons/Close';
import { black, darkGray, ligthGray } from 'styles/colorPalette';
import { useProfile } from 'context/ProfileContext';

export const useSkillStyles = makeStyles<any>((theme) => ({
  root: {
    'display': 'flex',
    'height': 38,
    'alignItems': 'center',
    'background': ligthGray,
    'borderRadius': 60,
    'padding': '8px 0px 8px 26px',
    'marginRight': theme.spacing(1.5),
    'marginBottom': theme.spacing(1.5),
    'cursor': 'pointer',
    '&:hover': {
      '& .MuiIconButton-root': {
        opacity: 1,
      },
    },
  },
  label: {
    marginLeft: theme.spacing(1),
    textTransform: 'uppercase',
    color: darkGray,
    fontSize: theme.typography.pxToRem(12),
    letterSpacing: '0.03em',
    fontFamily: 'inter-med',
  },
  iconBox: {
    transition: 'all 0.3s',
    opacity: 0,
    padding: theme.spacing(1),
    marginLeft: '2px',
  },
  loaderBox: {
    display: 'flex',
    height: 38,
    alignItems: 'center',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  hidden: {
    visibility: 'hidden',
  },
}));

const ProfSkillItem = ({ name, id, guest = false }) => {
  const { refetch } = useProfile();
  const classes = useSkillStyles();
  const [{ data, loading: removeLoading }, removeSkill] = useAxios(
    { url: `employee/qualities/${id}`, method: 'delete' },
    { manual: true },
  );
  const isRemoved = data?.status === 200;

  const handleRemove = () => {
    removeSkill().then(() => {
      refetch();
    });
  };

  if (removeLoading || isRemoved) {
    return (
      <Box className={classes.loaderBox}>
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Typography className={classes.label}>{name}</Typography>
      {!guest ? (
        <IconButton onClick={handleRemove} className={classes.iconBox} size="large">
          <Close color={black} fontSize={18} />
        </IconButton>
      ) : (
        <IconButton className={cx(classes.iconBox, classes.hidden)} size="large">
          <Close color={black} fontSize={18} />
        </IconButton>
      )}
    </Box>
  );
};

export default ProfSkillItem;
