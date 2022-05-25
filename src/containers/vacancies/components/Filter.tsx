import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash.isempty';

import { Grid, Typography, Box, Hidden, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import TextField from 'components/TextField';
import Button from 'components/Button';
import { SelectText } from 'components/Select';
import Swap from 'components/icons/Swap';
import { black, blueMain } from 'styles/colorPalette';
import { periodOptions, sortOptions } from 'constants/common';
import { LocationInputV2 as LocationInput } from 'components/LocationInput';
import { withClearPagination } from 'utils/common';

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

const Filter = ({ openFilter, setOpenFilter, total }) => {
  const [search, setSearch] = useState('');
  const classes = useStyles({ openFilter });
  const router: any = useRouter();
  const query = router.query;
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    if (query?.query) {
      setSearch(query.query);
    }
  }, [query]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    const splittedValue = e.target.value.split('_');
    router.push({
      query: {
        ...withClearPagination(query),
        sort_field: splittedValue[0],
        sort_direction: splittedValue[1],
      },
    });
  };

  const handlePeriodChange = (e) => {
    if (e.target.value === 'all') {
      const finalQuery = { ...query };
      delete finalQuery.date;
      // Если объект пустой, то чтобы сработал роут, нужно использовать replace. push не работает
      if (isEmpty(finalQuery)) {
        router.replace(router.pathname);
      } else {
        router.push({
          query: {
            ...withClearPagination(finalQuery),
          },
        });
      }
    } else {
      router.push({
        query: {
          ...withClearPagination(router.query),
          date: e.target.value,
        },
      });
    }
  };

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    if (search !== '') {
      router.push({
        query: {
          ...query,
          query: search,
        },
      });
    } else {
      const finalQuery = { ...withClearPagination(query) };
      delete finalQuery.query;

      if (isEmpty(finalQuery)) {
        router.replace(router.pathname);
      } else {
        router.push({ query: finalQuery });
      }
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

  const sortValue = query?.sort_field ? `${query.sort_field}_${query.sort_direction}` : 'date_desc';
  const periodValue = query?.date ? query.date : 'all';
  const cityId = query?.city_id || null;
  const cityName = query?.city_name || null;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container spacing={isMobile ? 2 : 3}>
          <Grid item xs={12} sm={6}>
            <TextField
              small={isMobile}
              label="Профессия или компания"
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LocationInput onChange={handleCityChange} selectedOption={{ value: cityId, label: cityName }} />
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <Button fullWidth height onClick={handleSearchClick}>
              Найти
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Hidden mdDown>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" spacing={4}>
            <Grid item xs={9}>
              <Grid container columnSpacing={3} rowSpacing={1}>
                <Grid item>
                  <Box display={'flex'} height="100%" alignItems={'center'}>
                    <Typography>
                      Найдено вакансий:{' '}
                      <Typography component={'span'} fontFamily="inter-bold">
                        {total}
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <SelectText
                    label={'Сортировать по'}
                    options={sortOptions}
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
