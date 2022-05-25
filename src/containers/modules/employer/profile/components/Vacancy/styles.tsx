import { makeStyles } from '@mui/styles';

import { orangeWhite, gray, pinkWhite, greenWhite } from 'styles/colorPalette';

export const useStyles = makeStyles<any>((theme) => ({
  accordion: {
    '& .MuiPaper-elevation1': {
      boxShadow: 'none',
    },
    '& .MuiAccordion-root': {
      borderRadius: 20,
    },
    '& .MuiAccordionSummary-content': {
      margin: '23px 20px 23px 0px',
      justifyContent: 'space-between',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        margin: '14px 10px 14px 0px',
      },
    },
    '& .MuiAccordionSummary-root': {
      padding: '0px 32px',
      [theme.breakpoints.down('sm')]: {
        padding: '0px 18px',
      },
    },
    '& .MuiAccordionDetails-root': {
      flexWrap: 'wrap',
      padding: 0,
    },
    '& article': {
      borderRadius: 0,
      borderBottom: 'none',
    },
  },
  draw: {
    '& .MuiAccordion-root': {
      backgroundColor: orangeWhite,
    },
    '& article:last-child': {
      borderRadius: '0% 0% 20px 20px',
      borderBottom: `1px solid ${gray}`,
    },
  },
  inactive: {
    '& .MuiAccordion-root': {
      backgroundColor: pinkWhite,
    },
    '& article:last-child': {
      borderRadius: '0% 0% 20px 20px',
      borderBottom: `1px solid ${gray}`,
    },
  },
  active: {
    '& .MuiAccordion-root': {
      backgroundColor: greenWhite,
    },
  },
  activeGuest: {
    '& .MuiAccordion-root': {
      border: `1px solid ${gray}`,
    },
    '& article:last-child': {
      borderRadius: '0% 0% 20px 20px',
      borderBottom: `1px solid ${gray}`,
    },
  },
  accTitle: {
    fontSize: theme.typography.pxToRem(18),
    lineHeight: '130%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  vacancy: {
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(3),
    },
  },
  activeVacancies: {
    '&:not(:last-child)': {
      '& .MuiAccordion-root': {
        backgroundColor: '#fff',
        borderRadius: 0,
        border: `1px solid ${gray}`,
        borderBottom: 'none',
      },
    },
    '&:last-child': {
      '& .MuiAccordion-root': {
        backgroundColor: '#fff',
        borderRadius: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        border: `1px solid ${gray}`,
      },
      '& .MuiAccordionDetails-root': {
        '& article:last-child': {
          borderRadius: '0% 0% 20px 20px',
          borderBottom: `1px solid ${gray}`,
        },
      },
    },
  },
}));
