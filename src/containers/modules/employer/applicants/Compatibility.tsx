import { Typography, Box, Tooltip, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { darkGray } from 'styles/colorPalette';
import { VacancyCircularProgress } from 'components/CustomCircularProgress';
import { useTooltipBasicStyles } from 'components/TextField';

const useStyles = makeStyles<any>((theme) => ({
  compatibility: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  compatibilityText: {
    fontFamily: 'inter-med',
    color: darkGray,
    fontSize: theme.typography.pxToRem(14),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
      marginRight: theme.spacing(1),
      fontSize: theme.typography.pxToRem(12),
    },
  },
}));

const Compatibility = ({ openModal, compatibility }) => {
  const tooltipClasses = useTooltipBasicStyles();
  const classes = useStyles();
  const isXs = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  if (!compatibility) {
    return null;
  }
  return (
    <Tooltip title="Нажмите для подробной информации" classes={tooltipClasses} placement="top" arrow>
      <Box className={classes.compatibility} onClick={openModal}>
        <Typography className={classes.compatibilityText}>Совместимость</Typography>
        <VacancyCircularProgress progress={compatibility?.value} size={isXs ? 50 : 62} />
      </Box>
    </Tooltip>
  );
};

export default Compatibility;
