import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash.isempty';

import { Box, Grid, Hidden, Typography, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import TextField from 'components/TextField';
import Select from 'components/Select';
import Autocomplete from 'components/Autocomplete';
import Close from 'components/icons/Close';
import Button from 'components/Button';
import Switch from 'components/Switch';
import { withClearPagination } from 'utils/common';
import { periodOptions, sortOptionsCandidates } from 'constants/common';
import { midDarkGray, white } from 'styles/colorPalette';
import RenderExperience from 'containers/modules/employer/applicants/components/RenderExperience';

const useStyles = makeStyles<any>((theme) => ({
  asideFilterBox: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: white,
      zIndex: 10,
      padding: 20,
      paddingBottom: theme.spacing(3),
      marginBottom: 0,
    },
  },
  expandedTitle: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-med',
    marginBottom: theme.spacing(2.5),
  },
  mainTitle: {
    fontSize: theme.typography.pxToRem(18),
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('lg')]: {
      fontSize: theme.typography.pxToRem(16),
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
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.down('md'));
  const [salary, setSalary] = useState('');
  const router: any = useRouter();

  const handleResetAll = () => {
    router.replace(`/employer/applicants?vacancy_id=${router.query.vacancy_id}`);
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

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handlePeriodChange = (value) => {
    if (value === 'all') {
      const finalQuery = { ...withClearPagination(router.query) };
      delete finalQuery.date;
      router.push({ query: finalQuery });
      return;
    }

    router.push({
      query: {
        ...withClearPagination(router.query),
        date: value,
      },
    });
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
        router.push({
          query: {
            ...router.query,
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

  const handleActivityChange = (e, option) => {
    if (option) {
      router.push({
        query: {
          ...withClearPagination(router.query),
          specialization_id: option.value,
        },
      });
    } else {
      router.push({
        query: {
          ...withClearPagination(router.query),
          specialization_id: 0,
        },
      });
    }
  };

  // const handlePsychtypeChange = (e, option) => {
  //   if (option) {
  //     router.push({
  //       query: {
  //         ...withClearPagination(router.query),
  //         psychotype_id: option.value,
  //       },
  //     });
  //   } else {
  //     router.push({
  //       query: {
  //         ...withClearPagination(router.query),
  //         psychotype_id: 0,
  //       },
  //     });
  //   }
  // };

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

  //Для добавления навыков
  // const handleSkills = (e) => {
  //   setSkills((prevCount) => [...prevCount, e.target.textContent]);
  // };

  const sortValue = router.query?.sort_field
    ? `${router.query.sort_field}_${router.query.sort_direction}`
    : 'date_desc';
  const periodValue = router.query?.date ? router.query.date : 'all';

  const foundSpecialization = router.query?.specialization_id
    ? dictionaryData.data.specializations.find((item) => item.id === parseInt(router.query?.specialization_id))
    : null;

  // const foundPsychotype = data?.data ? { label: data.data.psychotype.name, value: data.data.psychotype.id } : null;

  const isAllApplicantsSearch = !!router.query?.all;

  return (
    <Box className={classes.asideFilterBox}>
      <Grid container spacing={isSm ? 3 : 5} justifyContent="center">
        <Hidden mdUp>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography className={classes.mainTitle}>Расширенный поиск</Typography>
              </Grid>
              <Grid item>
                <Box onClick={() => setOpenFilter(!openFilter)} className={classes.close}>
                  <Close />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <Grid item xs={12}>
            <Select
              small
              label={'Сортировать по'}
              value={sortValue}
              onChange={handleSortChange}
              options={sortOptionsCandidates}
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
          <Grid item xs={12}>
            <Switch
              label={'Показать всех'}
              checked={isAllApplicantsSearch}
              onChange={handleAllApplicantsSearchChange}
            />
          </Grid>
        </Hidden>

        <Grid item xs={12}>
          <Typography className={classes.expandedTitle}>Уровень дохода</Typography>
          <TextField small label="Зарплата до руб" value={salary} onChange={handleSalary} />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.expandedTitle}>Проф. область</Typography>
          <Autocomplete
            small
            column={1}
            value={foundSpecialization ? { value: foundSpecialization.id, label: foundSpecialization.name } : null}
            onChange={handleActivityChange}
            options={dictionaryData.data.specializations.map((item) => ({ value: item.id, label: item.name }))}
            label="Проф. область"
            noOptionsText={'Проф. область не найдена'}
            isOptionEqualToValue={(option, value) => option.value === value.value}
          />
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*  <Typography className={classes.expandedTitle}>Проф. навыки</Typography>*/}
        {/*  <Autocomplete*/}
        {/*    small*/}
        {/*    multiple*/}
        {/*    value={[]}*/}
        {/*    onChange={handleQualities}*/}
        {/*    onInputChange={handleSkills}*/}
        {/*    options={skillsOptions}*/}
        {/*    label="Проф. навыки"*/}
        {/*    // loading={loading}*/}
        {/*    loadingText={"Поиск проф. навыка.."}*/}
        {/*    noOptionsText={"Проф. навык не найдена"}*/}
        {/*  />*/}
        {/*</Grid>*/}

        <Grid item xs={12}>
          <Typography className={classes.expandedTitle}>Опыт работы</Typography>
          {dictionaryData.data.experiences && <RenderExperience experiences={dictionaryData.data.experiences} />}
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
