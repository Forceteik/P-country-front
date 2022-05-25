import { useState } from 'react';
import Link from 'next/link';

import { Grid, Box, Typography, Hidden, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { blueLight, blueMain, darkGray, gray } from 'styles/colorPalette';
import Profile from 'components/icons/Profile';
import Eye from 'components/icons/Eye';
import { TetriatyButton } from 'components/Button';
import Close from 'components/icons/Close';
import DeleteVacancyModal from 'containers/modules/common/modals/DeleteVacancyModal';
import StatusBox from 'containers/modules/common/vacancy/StatusBox';
import EditSquare from 'components/icons/EditSquare';
import ShopCart from 'components/icons/ShopCart';
import Danger from 'components/icons/Danger';
import { useTooltipCustomStyles } from 'components/TextField';
import { isTimePassed, calcDayActivation } from 'utils/common';
import { useBalance } from 'context/BalanceContext';

const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    borderRadius: 20,
    border: `1px solid ${gray}`,
    padding: '32px 16px',
    [theme.breakpoints.down('lg')]: {
      position: 'absolute',
      height: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      zIndex: 10,
      borderRadius: 0,
      border: 'none',
      padding: 0,
    },
  },
  grid: {
    [theme.breakpoints.down('lg')]: {
      margin: '32px 24px',
    },
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      width: '40%',
    },
    [theme.breakpoints.down('md')]: {
      width: '65%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  iconBox: {
    width: 22,
    height: 20,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    '& .MuiFormControlLabel-root': {
      margin: 0,
      justifyContent: 'space-between',
      width: '100%',
    },
    '& .MuiSwitch-root': {
      height: 28,
    },
  },
  fill: {
    '& svg': {
      marginRight: theme.spacing(1),
    },
    '& svg path': {
      transition: 'all 0.3s',
    },
    '& .MuiButtonBase-root:hover': {
      '& svg path': {
        fill: blueMain,
      },
    },
    '& .MuiButtonBase-root:focus': {
      '& svg path': {
        fill: blueMain,
      },
    },
  },
  stroke: {
    '& svg': {
      marginRight: theme.spacing(1),
    },
    '& svg path': {
      transition: 'all 0.3s',
    },
    '& .MuiButtonBase-root:hover': {
      '& svg path': {
        stroke: blueMain,
      },
    },
    '& .MuiButtonBase-root:focus': {
      '& svg path': {
        stroke: blueMain,
      },
    },
  },
  close: {
    cursor: 'pointer',
  },
  btnInfo: {
    backgroundColor: blueLight,
    borderRadius: 8,
    padding: theme.spacing(2),
    display: 'flex',
  },
}));

const VacancySetting = ({
  openSettings = null,
  setOpenSettings = null,
  item,
  responsesCount = 0,
  candidatesCount = 0,
  recommendedCandidatesLink,
  dataIsShowQuestion,
}) => {
  const classes = useStyles();
  const { employerVacanciesCoupons } = useBalance();
  const tooltipClasses = useTooltipCustomStyles({ width: 200, padding: '8px 16px' });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [withQuestions, setWithQuestions] = useState(false);

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenModal = () => {
    setWithQuestions(dataIsShowQuestion.data.candidate_search_show);
    setOpenDeleteModal(true);
  };

  // TODO: Вынести в helpers
  const getPublishLink = () => {
    if (employerVacanciesCoupons !== 0) {
      return `/employer/publish?vacancy_id=${item.id}`;
    }

    return `/employer/publish/created?vacancy_id=${item.id}`;
  };

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.grid}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} sm={7} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography component="h3" fontSize={18} fontFamily={'inter-bold'}>
                  Управление вакансией
                </Typography>
              </Grid>
              <Hidden lgUp>
                <Grid item>
                  <Box onClick={() => setOpenSettings(!openSettings)} className={classes.close}>
                    <Close />
                  </Box>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7} lg={12}>
            <Grid container spacing={2}>
              {item.status === 'published' && (
                <Grid item xs={12}>
                  <Link href={recommendedCandidatesLink}>
                    <a>
                      <Grid container justifyContent="space-between" alignItems={'center'} columnSpacing={1}>
                        <Grid item xs={9}>
                          <Typography>Рекомендованные кандидаты:</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Box display={'flex'} alignItems={'center'}>
                            <Box className={classes.iconBox}>
                              <Profile />
                            </Box>
                            <Typography color={blueMain} ml={0.5}>
                              {candidatesCount}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </a>
                  </Link>
                </Grid>
              )}

              <Grid item xs={12}>
                <Grid container justifyContent="space-between" alignItems={'center'} columnSpacing={1}>
                  <Grid item xs={9}>
                    <Typography>Отклики:</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Tooltip
                      title="Количество Соискателей, откликнувшихся на данную вакансию"
                      placement={'top-end'}
                      classes={tooltipClasses}
                    >
                      <Box>
                        {item.status === 'published' ? (
                          <Link href={`/employer/responses/${item.id}?status=responded`}>
                            <a>
                              <Box display={'flex'} alignItems={'center'}>
                                <Box className={classes.iconBox}>
                                  <Profile />
                                </Box>
                                <Typography color={blueMain} ml={0.5}>
                                  {responsesCount}
                                </Typography>
                              </Box>
                            </a>
                          </Link>
                        ) : (
                          <Box display={'flex'} alignItems={'center'}>
                            <Box className={classes.iconBox}>
                              <Profile />
                            </Box>
                            <Typography color={blueMain} ml={0.5}>
                              {responsesCount}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="space-between" alignItems={'center'} columnSpacing={1}>
                  <Grid item xs={9}>
                    <Typography>Просмотры:</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Tooltip
                      title="Количество Соискателей, просмотревших данную вакансию"
                      placement={'top-end'}
                      classes={tooltipClasses}
                    >
                      <Box display={'flex'} alignItems={'center'}>
                        <Box className={classes.iconBox}>
                          <Eye color={darkGray} />
                        </Box>
                        <Typography color={blueMain} ml={0.5}>
                          {item.views}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={7} lg={12}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <StatusBox
                  status={item.status}
                  endDate={calcDayActivation(item)}
                  text={['Осталось', 'Остался', 'Осталось']}
                  fullWidth
                />
              </Grid>

              {item.status === 'hidden' && (
                <Grid item xs={12}>
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12} className={classes.fill}>
                      <TetriatyButton fullWidth small nextLink linkProps={{ href: getPublishLink() }}>
                        <ShopCart />
                        Опубликовать
                      </TetriatyButton>
                    </Grid>
                    <Grid item xs={12} className={classes.fill}>
                      <TetriatyButton
                        fullWidth
                        small
                        nextLink
                        linkProps={{ href: `/employer/vacancies/update/${item.id}` }}
                      >
                        <EditSquare />
                        Редактировать
                      </TetriatyButton>
                    </Grid>
                    <Grid item xs={12} className={classes.stroke}>
                      <TetriatyButton fullWidth small onClick={handleOpenModal}>
                        <Close />
                        Удалить
                      </TetriatyButton>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {item.status === 'published' && (
                <Grid item xs={12}>
                  <Grid container rowSpacing={2}>
                    {!isTimePassed(item.activated_at, { days: 1 }) && (
                      <Grid item xs={12} className={classes.fill}>
                        <Grid container rowSpacing={3}>
                          <Grid item xs={12}>
                            <Box className={classes.btnInfo}>
                              <Box flexShrink={0} pt={0.5}>
                                <Danger />
                              </Box>

                              <Typography>Вакансию можно редактировать в течение 24 часов после публикации</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <TetriatyButton
                              fullWidth
                              small
                              nextLink
                              linkProps={{ href: `/employer/vacancies/update/${item.id}` }}
                            >
                              <EditSquare />
                              Редактировать
                            </TetriatyButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item xs={12} className={classes.stroke}>
                      <TetriatyButton fullWidth small onClick={handleOpenModal}>
                        <Close />
                        Удалить
                      </TetriatyButton>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {openDeleteModal && (
        <DeleteVacancyModal
          open={openDeleteModal}
          handleClose={handleCloseModal}
          vacancyId={item.id}
          withQuestions={withQuestions}
        />
      )}
    </Box>
  );
};

export default VacancySetting;
