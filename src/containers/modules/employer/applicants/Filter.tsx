import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash.isempty';

import { Box, Grid, Hidden, Tooltip, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import TextField, { useTooltipBasicStyles } from 'components/TextField';
import Button from 'components/Button';
import Select, { SelectText } from 'components/Select';
import Swap from 'components/icons/Swap';
import { LocationInputV2 as LocationInput } from 'components/LocationInput';
import Switch from 'components/Switch';
import { periodOptions, sortOptionsCandidates, sortOptionsCandidatesVacancy } from 'constants/common';
import { withClearPagination } from 'utils/common';
import { black, blueMain } from 'styles/colorPalette';

const useStyles = makeStyles<any, any>((theme) => ({
  textBtn: {
    'display': 'flex',
    'alignItems': 'center',
    'cursor': 'pointer',
    'marginTop': theme.spacing(1),
    '& svg path': {
      fill: ({ openFilter }) => (openFilter ? blueMain : black),
    },
    '& p': {
      marginRight: theme.spacing(1),
      color: ({ openFilter }) => (openFilter ? blueMain : black),
    },
  },
}));

const Filter = ({ openFilter, setOpenFilter, total, vacancySpecifiedSearch = false, vacancyData }) => {
  const [search, setSearch] = useState('');
  const classes = useStyles({ openFilter });
  const tooltipClasses = useTooltipBasicStyles();
  const router: any = useRouter();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    if (router.query?.query) {
      setSearch(router.query.query);
    }
  }, [router.query]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearchClick();
    }
  };

  const handleSortChange = (e) => {
    const splittedValue = e.target.value.split('_');
    router.push({
      query: {
        ...withClearPagination(router.query),
        sort_field: splittedValue[0],
        sort_direction: splittedValue[1],
      },
    });
  };

  const handlePeriodChange = (e) => {
    if (e.target.value === 'all') {
      const finalQuery = { ...withClearPagination(router.query) };
      delete finalQuery.date;
      router.push({ query: finalQuery });
      return;
    }

    router.push({
      query: {
        ...withClearPagination(router.query),
        date: e.target.value,
      },
    });
  };

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleSearchClick = () => {
    if (search !== '') {
      router.push({
        query: {
          ...router.query,
          query: search,
        },
      });
    } else {
      const finalQuery = { ...withClearPagination(router.query) };
      delete finalQuery.query;
      router.push({ query: finalQuery });
    }
  };
  const handleCityChange = (cityId, name, code) => {
    if (cityId) {
      router.push({
        query: {
          ...withClearPagination(router.query),
          city_id: cityId,
          city_name: name,
          city_code: code,
        },
      });
    } else {
      const finalQuery = { ...withClearPagination(router.query) };
      delete finalQuery.city_id;
      delete finalQuery.city_name;
      delete finalQuery.city_code;

      if (isEmpty(finalQuery)) {
        router.replace(router.pathname);
      } else {
        router.push({ query: finalQuery });
      }
    }
  };

  const handleAllApplicantsSearchChange = () => {
    if (!isAllApplicantsSearch) {
      router.push({
        query: {
          ...withClearPagination(router.query),
          all: true,
        },
      });
    } else {
      const finalQuery = { ...withClearPagination(router.query) };
      delete finalQuery.all;

      if (isEmpty(finalQuery)) {
        router.replace(router.pathname);
      } else {
        router.push({ query: finalQuery });
      }
    }
  };

  const sortValue = router.query?.sort_field
    ? `${router.query.sort_field}_${router.query.sort_direction}`
    : 'date_desc';
  const periodValue = router.query?.date ? router.query.date : 'all';
  const cityId = router.query?.city_id || null;
  const cityName = router.query?.city_name || null;
  const isAllApplicantsSearch = !!router.query?.all;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={isMobile ? 2 : 3}>
          <Grid item xs={12} sm={6}>
            {vacancySpecifiedSearch && (
              <Tooltip title="Изменение недоступно" classes={tooltipClasses} placement="top" arrow>
                <Box>
                  <Select
                    disabled
                    label={'Название вакансии'}
                    options={[{ value: 777, label: vacancyData?.name }]}
                    value={777}
                  />
                </Box>
              </Tooltip>
            )}
            {!vacancySpecifiedSearch && (
              <TextField
                small={isMobile}
                label="Профессия или навык"
                value={search}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LocationInput
              onChange={handleCityChange}
              onKeyDown={handleKeyDown}
              selectedOption={{ value: cityId, label: cityName }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button fullWidth onClick={handleSearchClick}>
              Найти
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Hidden mdDown>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" spacing={4}>
            <Grid item xs={9}>
              <Grid container spacing={2}>
                <Grid item>
                  <Box display={'flex'} height="100%" alignItems={'center'}>
                    <Typography>
                      Найдено кандидатов:{' '}
                      <Typography component={'span'} fontFamily="inter-bold">
                        {total}
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <SelectText
                    label={'Сортировать по'}
                    options={vacancySpecifiedSearch ? sortOptionsCandidatesVacancy : sortOptionsCandidates}
                    selectedValue={sortValue}
                    onChange={handleSortChange}
                  />
                </Grid>
                <Grid item>
                  <SelectText
                    label={'За'}
                    options={periodOptions}
                    selectedValue={periodValue}
                    onChange={handlePeriodChange}
                  />
                </Grid>
                {!vacancySpecifiedSearch && (
                  <Grid item>
                    <Switch
                      label={'Показать всех'}
                      checked={isAllApplicantsSearch}
                      onChange={handleAllApplicantsSearchChange}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Box className={classes.textBtn} onClick={handleOpenFilter}>
                <Typography>Расширенный поиск</Typography>
                <Swap />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default Filter;
