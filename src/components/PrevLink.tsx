import Link from 'next/link';

import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import ArrowPrev from 'components/icons/ArrowPrev';
import { midDarkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: midDarkGray,
    fontSize: theme.typography.pxToRem(12),
    width: 'fit-content',
    minHeight: 26,
  },
  linkText: {
    marginLeft: '5px',
    display: 'inline-block',
    fontSize: '12px',
    width: '100%',
  },
}));

const PrevLink = ({ link = '#', text, withoutLink = false }) => {
  const classes = useStyles();
  return (
    <>
      {withoutLink ? (
        <Box className={classes.link}>
          <ArrowPrev color={midDarkGray} width={'6'} height={'12'} />
          <Typography className={classes.linkText}>{text}</Typography>
        </Box>
      ) : (
        <Link href={link}>
          <a>
            <Box className={classes.link}>
              <ArrowPrev color={midDarkGray} width={'6'} height={'12'} />
              <Typography className={classes.linkText}>{text}</Typography>
            </Box>
          </a>
        </Link>
      )}
    </>
  );
};

export default PrevLink;
