import Link from 'next/link';

import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import 'slick-carousel/slick/slick.css';

const useItemStyles = makeStyles<any, any>((theme) => ({
  container: {
    position: 'relative',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    marginRight: ({ list }) => (list ? 0 : theme.spacing(1.5)),
    marginLeft: ({ list }) => (list ? 0 : theme.spacing(1.5)),
    backgroundColor: 'white',
    padding: '30px 20px',
    overflow: 'hidden',
    borderRadius: 24,
    height: 500,
    boxShadow: '1px 12px 18px -3px rgb(0 0 0 / 7%)',
    [theme.breakpoints.only('xs')]: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      boxShadow: 'none',
      padding: '24px 20px',
      height: 'unset',
    },
  },
  emptyInfo: {
    'position': 'absolute',
    'top': '50%',
    'left': '50%',
    'width': '100%',
    'height': '100%',
    'backgroundColor': 'rgba(255, 255, 255, 0.6)',
    'transform': 'translate(-50%, -50%)',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    'flexDirection': 'column',
    '& p': {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  emptyDate: {
    fontFamily: 'inter-bold',
  },
  imgContainer: {
    'height': 250,
    'width': '100%',
    'overflow': 'hidden',
    'borderRadius': 24,
    'filter': ({ released }) => (released ? 'none' : 'blur(5px)'),
    '&>img': {
      objectFit: 'cover',
      objectPosition: 'center',
      width: '100%',
      height: '100%',
    },
    [theme.breakpoints.only('xs')]: {
      'height': 160,
      '&>img': {},
    },
  },
  title: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(24),
    fontFamily: 'inter-med',
    lineHeight: '120%',
    color: theme.palette.secondary.dark,
    lineClamp: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  desc: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '136%',
    color: 'rgba(37, 51, 65, 0.7)',
    lineClamp: 3,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'box',
    boxOrient: 'vertical',
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  link: {
    color: '#419CF9',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: theme.typography.pxToRem(14),
    fontFamily: 'inter-med',
  },
  date: {
    fontSize: 14,
    color: 'rgba(0, 59, 119, 0.6)',
    fontFamily: 'inter-med',
  },
  infoBox: {
    filter: ({ released }) => (released ? 'none' : 'blur(5px)'),
  },
}));

const SliderItem = (props) => {
  const { item, list = false } = props;
  const { title, desc, imgPath, date, released } = item;
  const classes = useItemStyles({ released, list });
  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.imgContainer}>
          <img src={imgPath} alt="" />
        </Box>
        <Box className={classes.infoBox}>
          <Typography className={classes.title}>{title}</Typography>
          <Box flexGrow={1}>
            <Typography className={classes.desc}>{desc}</Typography>
          </Box>
          <Box className={classes.bottomContainer}>
            <Link href={'/blog/item'}>
              <Typography className={classes.link}>Подробнее</Typography>
            </Link>
            <Box className={classes.bottomRightContainer}>
              <Typography className={classes.date}>{date}</Typography>
            </Box>
          </Box>
        </Box>
        {!released && (
          <Box className={classes.emptyInfo}>
            <Typography>Статья находится в разработке</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SliderItem;
