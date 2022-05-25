import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import InviteCandidateModal from 'containers/modules/common/modals/InviteCandidateModal';
import Button, { ButtonWithArrow, DangerButton } from 'components/Button';
import Download from 'components/icons/Download';
import { generateFullName } from 'utils/common';
import { MadFormatter } from 'utils/formatters';
import { blueMain, darkGray, gray, ligthGray } from 'styles/colorPalette';
import CompatibilityModal from 'containers/modules/common/modals/CompatibilityModal';

import InfoList from './InfoList';
import Compatibility from './Compatibility';

const useStyles = makeStyles<any>((theme) => ({
  box: {
    borderRadius: 20,
    border: `1px solid ${gray}`,
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: '24px 16px',
    },
  },
  imgBox: {
    'cursor': 'pointer',
    'width': 100,
    'height': 100,
    'borderRadius': '50%',
    'overflow': 'hidden',
    'marginRight': theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: 50,
      height: 50,
      marginRight: theme.spacing(0),
    },
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  name: {
    color: blueMain,
    cursor: 'pointer',
  },
  prof: {
    cursor: 'pointer',
    fontSize: theme.typography.pxToRem(22),
    fontFamily: 'inter-bold',
    marginBottom: theme.spacing(1),
    lineHeight: '125%',
    lineClamp: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    [theme.breakpoints.down('lg')]: {
      lineClamp: 3,
      marginBottom: 0,
      fontSize: theme.typography.pxToRem(18),
    },
  },
  descr: {
    color: darkGray,
    lineClamp: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    [theme.breakpoints.down('md')]: {
      lineClamp: 4,
    },
  },
  skillItem: {
    'display': 'inline-block',
    'backgroundColor': ligthGray,
    'borderRadius': 60,
    'padding': '10px 18px',
    'marginRight': theme.spacing(2),
    'marginBottom': theme.spacing(2),
    '& p': {
      color: darkGray,
      whiteSpace: 'nowrap',
      fontFamily: 'inter-med',
      fontSize: theme.typography.pxToRem(12),
      textTransform: 'uppercase',
      [theme.breakpoints.down('sm')]: {
        whiteSpace: 'normal',
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: '6px 8px',
      borderRadius: 14,
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.8),
    },
  },
  taskLink: {
    'marginBottom': theme.spacing(2),
    'cursor': 'pointer',
    'color': blueMain,
    'display': 'flex',
    'alignItems': 'center',
    'marginTop': theme.spacing(0.75),
    '& p': {
      marginRight: theme.spacing(0.75),
    },
  },
}));

const CandidateItem = ({
  item,
  status = null,
  extraData = null,
  vacancyId = null,
  handleInviteSubmit = null,
  handleReject = null,
  rejectResponseState = null,
  removeState = null,
  handleRemove = null,
  createDate = null,
  vacancySpecifiedSearch = false,
  showInviteButton = true,
  profileLink = null,
}) => {
  const classes = useStyles();
  const user = item.user;
  const compatibility = user.compatibility;
  const [openText, setOpenText] = useState(false);
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.down('lg'));
  const [openCompatibilityModal, setCompatibilityModal] = useState(false);

  const router = useRouter();

  const handleOpenText = () => {
    setOpenText(!openText);
  };

  const handleCompatibilityModal = () => {
    setCompatibilityModal(!openCompatibilityModal);
  };

  profileLink = profileLink || `/applicants/${item.user.id}`;

  if (router.query?.vacancy_id) {
    profileLink += `?vacancy_id=${router.query?.vacancy_id}`;
  }

  let Buttons = [];

  if (status) {
    if (status === 'responded') {
      Buttons = [
        ({ item }) => <InviteCandidateModal vacancyId={vacancyId} employeeId={item.id} onSubmit={handleInviteSubmit} />,
        ({ responseId, item }) => (
          <DangerButton
            small
            fullWidth
            onClick={(e) => handleReject(e, responseId, generateFullName(item))}
            loading={rejectResponseState.loading}
          >
            Отказать
          </DangerButton>
        ),
      ];
    } else if (status === 'search') {
      Buttons = [
        () => (
          <Button fullWidth small nextLink linkProps={{ href: profileLink }} nativelinkprops={{ target: '_blank' }}>
            Перейти в профиль
          </Button>
        ),
      ];
    } else {
      Buttons = [
        () => (
          <ButtonWithArrow small fullWidth loading={removeState.loading} handleClick={handleOpenText} open={openText}>
            Текст приглашения
          </ButtonWithArrow>
        ),
        ({ responseId }) => (
          <DangerButton small fullWidth onClick={(e) => handleRemove(e, responseId)} loading={removeState.loading}>
            Удалить из списка
          </DangerButton>
        ),
      ];
    }
  }

  return (
    <>
      <Box className={classes.box} component="article">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid
              container
              wrap={isMd ? 'wrap' : 'nowrap'}
              spacing={isMd ? 1 : 0}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Link href={profileLink}>
                  <a target="_blank">
                    <Box className={classes.imgBox}>
                      <img
                        src={
                          user.media?.preview_url ||
                          user.media?.original_url ||
                          '/images/avatar/placeholder-avatar-employee.png'
                        }
                        alt="Аватар соискателя"
                      />
                    </Box>
                  </a>
                </Link>
              </Grid>
              {vacancySpecifiedSearch && isMd && (
                <Grid item>
                  <Compatibility openModal={handleCompatibilityModal} compatibility={compatibility} />
                </Grid>
              )}
              <Grid item flexGrow={1} overflow={'hidden'}>
                <Grid container spacing={isMd ? 1 : 0}>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12} lg={8}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Link href={profileLink}>
                              <a target="_blank">
                                <Typography className={classes.name}>
                                  {user.surname} {user.name}
                                </Typography>
                              </a>
                            </Link>
                          </Grid>
                          {!!user.employee.position && (
                            <Grid item xs={12}>
                              <Link href={profileLink}>
                                <a target="_blank">
                                  <Typography className={classes.prof}>{user.employee.position}</Typography>
                                </a>
                              </Link>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                      {vacancySpecifiedSearch && !isMd && (
                        <Grid item xs={4}>
                          <Compatibility openModal={handleCompatibilityModal} compatibility={compatibility} />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <InfoList user={user} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {user.employee.about_me && (
            <Grid item xs={12}>
              <Typography className={classes.descr}>{user.employee.about_me}</Typography>
            </Grid>
          )}
          {user.qualities.length !== 0 && (
            <Grid item xs={12}>
              <Box>
                {user.qualities.map((item, i) => (
                  <Box className={classes.skillItem} key={i}>
                    <Typography>{item.name.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          )}
          {item.document && (
            <Grid item xs={12}>
              <Typography color={darkGray}>Соискатель прикрепил материалы</Typography>
              <Link href={item.document.original_url}>
                <a target={'_blank'}>
                  <Box className={classes.taskLink}>
                    <Typography>Скачать материалы</Typography>
                    <Download color={blueMain} />
                  </Box>
                </a>
              </Link>
            </Grid>
          )}
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="flex-end">
              {Buttons.map((ButtonComponent, key) => (
                <Grid item xs={12} sm={6} lg={4} key={key}>
                  <ButtonComponent item={user} {...extraData} />
                </Grid>
              ))}
              {createDate && (
                <Grid item flexGrow={1} textAlign={'right'}>
                  <Typography>{MadFormatter.toDate(createDate, 'D MMMM')}</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          {openText && (
            <Grid item xs={12}>
              <Typography color={darkGray} whiteSpace={'pre-line'}>
                {extraData.text}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      {/* Модальное окно, которое открывается при нажатии на прогресс совместимости */}
      <CompatibilityModal
        open={openCompatibilityModal}
        handleClose={handleCompatibilityModal}
        compatibility={compatibility}
        showInviteButton={showInviteButton}
        profileLink={profileLink}
        employeeId={item.user.id}
        expectation={user.employee.salary}
      />
    </>
  );
};

export default CandidateItem;
