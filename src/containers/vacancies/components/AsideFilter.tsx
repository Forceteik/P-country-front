import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash.isempty';

import { Grid, Typography, Box, FormControlLabel, Checkbox, useMediaQuery, Hidden } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import TextField from 'components/TextField';
import Select from 'components/Select';
import CheckBoxIcon from 'components/icons/CheckBoxIcon';
import CheckBoxIconCheck from 'components/icons/CheckBoxIconCheck';
import Autocomplete from 'components/Autocomplete';
import Close from 'components/icons/Close';
import Button from 'components/Button';
import { generateFinalQuery, withClearPagination } from 'utils/common';
import { periodOptions, sortOptions } from 'constants/common';
import { midDarkGray } from 'styles/colorPalette';

const useStyles = makeStyles<any>((theme) => ({
  asideFilterBox: {
    marginBottom: theme.spacing(5),
    backgroundColor: '#fff',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      top: 0,
      zIndex: 10,
      padding: 20,
      marginBottom: 0,
    },
  },
  expandedTitle: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-med',
    marginBottom: theme.spacing(2.5),
  },
  checkBox: {
    'display': 'flex',
    'flexDirection': 'column',
    '& svg': {
      width: 24,
      height: 24,
      marginRight: theme.spacing(0.5),
    },
    [theme.breakpoints.down('md')]: {
      '& .MuiFormControlLabel-root': {
        display: 'block',
      },
    },
  },
  reset: {
    'cursor': 'pointer',
    '& p': {
      color: midDarkGray,
      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
      },
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
  close: {
    cursor: 'pointer',
  },
}));

const AsideFilter = ({ openFilter, setOpenFilter, dictionaryData }) => {
  const classes = useStyles({ openFilter });
  const router: any = useRouter();
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));

  const [salary, setSalary] = useState('');

  const handleResetAll = () => {
    router.replace(router.pathname);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleSortChange = (value) => {
    const splittedValue = value.split('_');
    router.push({
      query: {
        ...withClearPagination(router.query),
        sort_field: splittedValue[0],
        sort_direction: splittedValue[1],
      },
    });
  };

  const handlePeriodChange = (value) => {
    if (value === 'all') {
      const finalQuery = { ...router.query };
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
          date: value,
        },
      });
    }
  };

  useEffect(() => {
    if (router.query?.salary) {
      setSalary(router.query.salary);
    }
  }, [router.query?.salary]);

  useEffect(() => {
    let timeOutId;
    if (salary !== '') {
      timeOutId = setTimeout(() => {
        setSalary(salary);
        const finalQuery = { ...router.query };

        if (router.query?.predefined_filter_id) {
          delete finalQuery.predefined_filter_id;
        }

        router.push({
          query: {
            ...withClearPagination(finalQuery),
            salary,
          },
        });
      }, 1000);
    } else {
      timeOutId = setTimeout(() => {
        const finalQuery = { ...router.query };
        delete finalQuery.salary;
        router.push({ query: finalQuery });
      }, 1000);
    }

    return () => clearTimeout(timeOutId);
  }, [salary]);

  const handleSalary = (e) => {
    setSalary(e.target.value);
  };

  /**
   * Изменение сферы деятельности
   * @param e
   * @param option
   */
  const handleActivityChange = (e, option) => {
    if (option) {
      const finalQuery = {
        ...withClearPagination(router.query),
        activity_id: option.value,
      };

      if (router.query?.predefined_filter_id) {
        delete finalQuery.predefined_filter_id;
      }
      router.push({
        query: finalQuery,
      });
    } else {
      const finalQuery = { ...withClearPagination(router.query) };

      if (isEmpty(finalQuery)) {
        router.replace(router.pathname);
      } else {
        delete finalQuery.activity_id;
        router.push({
          query: finalQuery,
        });
      }
    }
  };

  const handleWorkSchedules = (e, itemId) => {
    itemId = itemId.toString();
    const finalQuery = generateFinalQuery(router, itemId, 'work_schedules');

    if (router.query?.predefined_filter_id) {
      delete finalQuery.predefined_filter_id;
    }

    if (isEmpty(finalQuery)) {
      router.replace(router.pathname);
    } else {
      router.push({
        query: finalQuery,
      });
    }
  };

  const handleExperiences = (e, itemId) => {
    itemId = itemId.toString();
    const finalQuery = generateFinalQuery(router, itemId, 'experience');

    if (router.query?.predefined_filter_id) {
      delete finalQuery.predefined_filter_id;
    }

    if (isEmpty(finalQuery)) {
      router.replace(router.pathname);
    } else {
      router.push({
        query: finalQuery,
      });
    }
  };

  const handleEmploymentType = (e, itemId) => {
    itemId = itemId.toString();
    const finalQuery = generateFinalQuery(router, itemId, 'employment_types');

    if (router.query?.predefined_filter_id) {
      delete finalQuery.predefined_filter_id;
    }

    if (isEmpty(finalQuery)) {
      router.replace(router.pathname);
    } else {
      router.push({
        query: finalQuery,
      });
    }
  };

  const sortValue = router.query?.sort_field
    ? `${router.query.sort_field}_${router.query.sort_direction}`
    : 'date_desc';
  const periodValue = router.query?.date ? router.query.date : 'all';

  const foundActivity = router.query?.activity_id
    ? dictionaryData.activities.find((item) => item.id === parseInt(router.query?.activity_id))
    : null;

  return (
    <Box className={classes.asideFilterBox}>
      <Grid container spacing={isSm ? 3 : 5} justifyContent="center">
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography fontSize={18} fontFamily={'inter-bold'}>
                Расширенный поиск
              </Typography>
            </Grid>
            <Grid item>
              <Box onClick={() => setOpenFilter(!openFilter)} className={classes.close}>
                <Close />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Hidden mdUp>
          <Grid item xs={12}>
            <Select
              small
              label={'Сортировать по'}
              value={sortValue}
              onChange={handleSortChange}
              options={sortOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              small
              value={periodValue}
              onChange={handlePeriodChange}
              label={'За период'}
              options={periodOptions}
            />
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <Typography className={classes.expandedTitle}>Уровень дохода</Typography>
          <TextField small label="Зарплата от руб" value={salary} onChange={handleSalary} />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.expandedTitle}>Сфера деятельности</Typography>
          <Autocomplete
            small
            column={1}
            value={foundActivity ? { value: foundActivity.id, label: foundActivity.name } : null}
            onChange={handleActivityChange}
            options={dictionaryData.activities.map((item) => ({ value: item.id, label: item.name }))}
            label="Сфера деятельности"
            noOptionsText={'Деятельность не найдена'}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.expandedTitle}>График работы</Typography>
          <Box className={classes.checkBox}>
            {dictionaryData.work_schedules.map((item, key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    disableRipple
                    icon={<CheckBoxIcon />}
                    checked={router.query['work_schedules[]']?.includes(item.id.toString())}
                    checkedIcon={<CheckBoxIconCheck />}
                    onChange={(e) => handleWorkSchedules(e, item.id)}
                  />
                }
                label={item.name}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.expandedTitle}>Опыт работы</Typography>
          <Box className={classes.checkBox}>
            {dictionaryData.experiences.map((item, key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    disableRipple
                    icon={<CheckBoxIcon />}
                    checkedIcon={<CheckBoxIconCheck />}
                    checked={router.query['experience[]']?.includes(item.id.toString())}
                    onChange={(e) => handleExperiences(e, item.id)}
                  />
                }
                label={item.name}
              />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.expandedTitle}>Тип занятости</Typography>
          <Box className={classes.checkBox}>
            {dictionaryData.employment_types.map((item, key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    disableRipple
                    icon={<CheckBoxIcon />}
                    checkedIcon={<CheckBoxIconCheck />}
                    checked={router.query['employment_types[]']?.includes(item.id.toString())}
                    onChange={(e) => handleEmploymentType(e, item.id)}
                  />
                }
                label={item.name}
              />
            ))}
          </Box>
        </Grid>
        <Hidden mdUp>
          <Grid item xs={12} sm={7}>
            <Button fullWidth onClick={handleCloseFilter}>
              Найти
            </Button>
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <Box className={classes.reset} onClick={handleResetAll}>
            <Typography>Сбросить все фильтры</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AsideFilter;
