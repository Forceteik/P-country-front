import { useState } from 'react';
import useAxios from 'axios-hooks';
import Link from 'next/link';

import { Box, Grid, Hidden, Tooltip, Typography, useMediaQuery } from '@mui/material';

import Paper from 'components/icons/Paper';
import ResponseSentModal from 'containers/modules/common/modals/ResponseSentModal';
import CustomCircularProgress from 'components/CustomCircularProgress';
import { useTooltipOneLineStyles } from 'components/TextField';
import { checkIsAllTestsPassed, calcDayActivation } from 'utils/common';
import { MadFormatter } from 'utils/formatters';
import { CREATE_VACANCY_TEMPLATE } from 'constants/common';
import { useProfile } from 'context/ProfileContext';

import { useVacancyItemStyles } from '../styles';
import VacancyButtons from '../VacancyButtons';
import StatusBox from '../StatusBox';

import InfoList from './InfoList';

const deleteNbsp = (string) => {
  return string.replace(/&nbsp;/g, ' ');
};

/**
 * need to check that is the guest. Depending on this some attributes will be taken from different places like logo,
 * note: since vacancy can be a draft, need to check each object, that can be empty
 * @param item
 * @param link
 * @param guest
 * @param disabledView
 * @param refetch
 * @param refetchProfileProgress
 * @param withoutImg
 * @param hideName
 * @constructor
 */
const VacancyItem = ({
  item,
  link = null,
  guest = true,
  disabledView = false,
  refetch = null,
  refetchProfileProgress = null,
  withoutImg = false,
  hideName = false,
}) => {
  const classes = useVacancyItemStyles({ disabledView });

  const tooltipClasses = useTooltipOneLineStyles();

  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const { currentUser } = useProfile();

  const [{ loading }, sendResponse] = useAxios(
    { url: `/responses/response/${item.id}`, method: 'post' },
    { manual: true },
  );

  const [openResponseSentModal, setOpenResponseSentModal] = useState(false);
  const [isResponseSent, setIsResponseSent] = useState(item.response || false);

  if (!item) {
    return null;
  }

  const companyName = guest ? item.owner?.employer.name : currentUser.employer.name;
  const companyLogoMedia = guest ? item.owner?.media : currentUser.media;

  const vacancyLink = link || `/vacancies/${item.id}`;
  const companyLink = `/employers/${item.owner?.id}`;

  const isAllTestPassed = checkIsAllTestsPassed(currentUser);

  const handleClickSendResponse = (e) => {
    e.preventDefault();
    if (item.document) {
      setOpenResponseSentModal(true);
    } else {
      sendResponse().then(() => {
        setIsResponseSent(true);
        if (process.env.NEXT_PUBLIC_BUILD_MODE === 'prod') {
          //@ts-ignore
          window.ym(80438017, 'reachGoal', 'otklik');
        }
      });
    }
  };

  // когда отправка отклика происходит с модалки
  const handleResponseSubmit = () => {
    setIsResponseSent(true);
  };

  return (
    <Box className={classes.vacancyBox} component="article">
      {item.status && item.status === 'draft' ? (
        <Hidden smDown>
          <Tooltip
            title="Вакансия не заполнена, завершите редактирование вакансии для ее публикации"
            placement="top"
            arrow
            classes={tooltipClasses}
          >
            <Box className={classes.progress}>
              <CustomCircularProgress small progress={item.fullness} size={46} />
            </Box>
          </Tooltip>
        </Hidden>
      ) : (
        <>
          {companyLogoMedia && !withoutImg && (
            <Link href={companyLink}>
              <a className={classes.link} target="_blank">
                <Box className={classes.logo}>
                  <img src={companyLogoMedia.original_url} alt="логотип компании" />
                </Box>
              </a>
            </Link>
          )}
        </>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {companyName && !hideName && (
              <Grid item xs={12}>
                <Box className={classes.company}>
                  <Link href={companyLink}>
                    <a className={classes.link} target="_blank">
                      <Typography>{companyName}</Typography>
                    </a>
                  </Link>
                </Box>
              </Grid>
            )}

            {!guest && (
              <Grid item xs={12}>
                <StatusBox status={item.status} endDate={calcDayActivation(item)} />
              </Grid>
            )}

            <Grid item xs={12}>
              {disabledView ? (
                <Typography component={'h3'} className={classes.name}>
                  {item.name}
                </Typography>
              ) : (
                <Link href={vacancyLink}>
                  <a className={classes.link}>
                    <Typography component={'h3'} className={classes.name}>
                      {item.name}
                    </Typography>
                  </a>
                </Link>
              )}
            </Grid>
            <Grid item xs={12}>
              <InfoList vacancy={item} guest={guest} />
            </Grid>
          </Grid>
        </Grid>

        {item.description !== CREATE_VACANCY_TEMPLATE && (
          <Grid item xs={12}>
            <Box className={classes.descr} dangerouslySetInnerHTML={{ __html: deleteNbsp(item.description) }} />
          </Grid>
        )}
        {item.qualities && (
          <Grid item xs={12}>
            {item.qualities.map((qualityElem, index) => (
              <Box className={classes.stackItem} key={index}>
                <Typography>{qualityElem.name.name}</Typography>
              </Box>
            ))}
          </Grid>
        )}
        <Grid item xs={12}>
          <Grid
            container
            alignItems={isMobile ? 'stretch' : 'flex-end'}
            justifyContent={isMobile ? 'flex-end' : 'space-between'}
            spacing={2}
          >
            <Grid item xs={12} sm={9}>
              <Grid
                container
                spacing={isSm ? 2 : 3}
                alignItems={'center'}
                direction={item.status && item.status === 'published' && guest ? 'row-reverse' : 'row'}
                justifyContent={item.status && item.status === 'published' && guest ? 'flex-end' : 'flex-start'}
              >
                {item.document && (
                  <Grid item>
                    <Box className={classes.task}>
                      <Paper />
                      <Typography>Вакансия с материалами</Typography>
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <VacancyButtons
                    item={item}
                    guest={guest}
                    isResponseSent={isResponseSent}
                    isAllTestPassed={isAllTestPassed}
                    handleSendResponse={handleClickSendResponse}
                    loading={loading}
                    refetch={refetch}
                    refetchProfileProgress={refetchProfileProgress}
                  />
                </Grid>
              </Grid>
            </Grid>

            {item.status && item.status !== 'draft' && item.created_at && (
              <Grid item xs={12} sm={3}>
                <Typography className={classes.date}>{MadFormatter.toDate(item.created_at, 'D MMMM')}</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <ResponseSentModal
        vacancyId={item.id}
        open={openResponseSentModal}
        setOpen={setOpenResponseSentModal}
        onSubmit={handleResponseSubmit}
      />
    </Box>
  );
};

export default VacancyItem;
