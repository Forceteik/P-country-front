import { useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import useAxios from 'axios-hooks';
import Head from 'next/head';

import { Box, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { MadFormatter } from 'utils/formatters';
import { DangerButton } from 'components/Button';
// import ShiledFilled from 'components/icons/ShiledFilled';
import ChevronDown from 'components/icons/ChevronDown';
import { blueLight, blueMain, darkGray, gray, greenMain, orangeMain } from 'styles/colorPalette';
import { useSession } from 'context/UserContext';

const useStyles = makeStyles<any>((theme) => ({
  box: {
    border: `1px solid ${gray}`,
    borderRadius: 20,
    padding: '32px 32px 36px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: '28px 24px 24px 20px',
    },
  },
  statusItem: {
    'display': 'flex',
    'alignItems': 'center',
    'borderRadius': 8,
    'paddingRight': theme.spacing(2),
    'paddingLeft': theme.spacing(2),
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
    '& p': {
      textTransform: 'uppercase',
      fontFamily: 'inter-med',
      fontSize: theme.typography.pxToRem(12),
      lineHeight: '28px',
      margin: 0,
    },
  },
  statusNew: {
    'backgroundColor': blueLight,
    '& p': {
      color: blueMain,
    },
  },
  statusProgress: {
    'backgroundColor': orangeMain,
    '& p': {
      color: '#ffffff',
    },
  },
  statusInvite: {
    'backgroundColor': greenMain,
    '& p': {
      color: '#ffffff',
    },
  },
  statusReject: {
    'backgroundColor': gray,
    '& p': {
      color: darkGray,
    },
  },
  imgBox: {
    'textAlign': 'right',
    'height': 50,
    '& img': {
      height: '100%',
      maxWidth: '100%',
      objectFit: 'contain',
    },
    [theme.breakpoints.down('sm')]: {
      height: 32,
    },
  },
  vacancyName: {
    color: blueMain,
    fontSize: 22,
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  desrcLink: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  descrIcon: {
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s',
  },
  descrIconOpen: {
    display: 'flex',
    alignItems: 'center',
    transform: 'rotate(180deg)',
    transition: 'all 0.3s',
  },
}));

// responded - в процессе
const ResponseItem = (props) => {
  const { company, status, id, updated_at, is_new, vacancy, text } = props.item;
  const [descrOpen, setDescrOpen] = useState(false);
  const { refetch } = useSession();
  const classes = useStyles();
  const [{ loading }, removeResponse] = useAxios({ url: `/responses/${id}`, method: 'delete' }, { manual: true });

  const [, viewResponse] = useAxios({ url: `/responses/${id}/viewed`, method: 'put' }, { manual: true });

  const handleClickDescr = () => {
    if (is_new) {
      viewResponse().then(() => refetch());
    }
    setDescrOpen(!descrOpen);
  };

  const handleRemove = () => {
    removeResponse().then(() => {
      props.onRemove && props.onRemove();
    });
  };

  return (
    <Box className={classes.box}>
      <Head>
        <title>{vacancy.name}</title>
        <meta property="og:title" content={`${vacancy.name}`} key="title" />
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
            <Grid item xs={6} sm={9}>
              <Box display={'flex'} alignItems={'center'}>
                <Typography mr={1}>{company.employer.name}</Typography>
                {/* {true && <ShiledFilled />} */}
              </Box>
            </Grid>

            {props?.item.company?.media && (
              <Grid item xs={6} sm={3}>
                <Box className={classes.imgBox}>
                  <img
                    src={props.item.company.media.preview_url || props.item.company.media.original_url}
                    alt="логотип компании"
                  />
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box display={'flex'}>
                <StatusLabel status={status} />
                {is_new && (
                  <Box className={cx(classes.statusItem, classes.statusNew)}>
                    <Typography>Новое</Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
            <Grid item xs={12}>
              <Link href={`/vacancies/${vacancy.id}?from=responses`}>
                <a target="_blank">
                  <Typography className={classes.vacancyName}>{vacancy.name}</Typography>
                </a>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        {text && (
          <Grid item xs={12}>
            <Grid container spacing={3} justifyContent="space-between" alignItems="flex-end">
              <Grid item xs={12} sm={4} md={3} lg={2}>
                <Box className={classes.desrcLink} onClick={handleClickDescr}>
                  <Typography mr={1} fontFamily={'inter-med'}>
                    Подробнее
                  </Typography>
                  <Box className={descrOpen ? classes.descrIconOpen : classes.descrIcon}>
                    <ChevronDown />
                  </Box>
                </Box>
              </Grid>
              {descrOpen && (
                <>
                  <Grid item xs={12}>
                    <Box whiteSpace={'pre-line'}>{text}</Box>
                  </Grid>
                  <Grid item xs={12} sm={4} md={3} lg={2}>
                    <DangerButton fullWidth small onClick={handleRemove} loading={loading}>
                      Удалить
                    </DangerButton>
                  </Grid>
                </>
              )}
              <Grid item>
                <Typography textAlign={'right'} color={darkGray}>
                  {MadFormatter.toDate(updated_at, 'D MMMM')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

//Я добавила еще вариант Отказ
const StatusLabel = ({ status }) => {
  const classes = useStyles();
  if (status === 'responded') {
    return (
      <Box className={cx(classes.statusItem, classes.statusProgress)}>
        <Typography>В процессе</Typography>
      </Box>
    );
  } else if (status === 'invited') {
    return (
      <Box className={cx(classes.statusItem, classes.statusInvite)}>
        <Typography>Приглашение</Typography>
      </Box>
    );
  }
  return (
    <Box className={cx(classes.statusItem, classes.statusReject)}>
      <Typography>Отказ</Typography>
    </Box>
  );
};

export default ResponseItem;
