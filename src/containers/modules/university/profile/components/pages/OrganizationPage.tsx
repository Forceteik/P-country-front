import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import infoListStyle from 'containers/modules/common/styles/infoListStyle';
import ApplicantDescr from 'containers/modules/common/profile/About/ApplicantDescr';

import UniversityAreas from '../UniversityAreas';
import Avatar from '../Avatar';
import PageTitle from '../PageTitle';
import Сourses from '../Сourses';

const useStyles = makeStyles<any>((theme) => ({
  organizationPage: {
    width: '100%',
    maxWidth: 1500,
  },
  universityName: {
    fontSize: theme.typography.pxToRem(28),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
  },
}));

const mockAreas = [
  { id: 1, area: { id: 5, name: 'Дизайн' } },
  { id: 2, area: { id: 6, name: 'IT' } },
  { id: 3, area: { id: 7, name: 'Бухгалтерия и экономика' } },
  { id: 4, area: { id: 8, name: 'Автобизнес' } },
  { id: 10, area: { id: 11, name: 'Бытовые услуги' } },
];

const OrganizationPage = () => {
  const classes = useStyles();
  const infoListClasses = infoListStyle();
  return (
    <Box className={classes.organizationPage}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <PageTitle text="Страница организации" />
        </Grid>
        <Grid item xs={12}>
          <Grid container rowSpacing={6}>
            <Grid item xs={12}>
              <Grid container columnSpacing={4} alignItems="center">
                <Grid item>
                  <Avatar radius={159} src="/images/mockUniversity/logoUniversity.png" />
                </Grid>
                <Grid item xs>
                  <Grid container rowSpacing={1.5}>
                    <Grid item xs={7.3}>
                      <Typography className={classes.universityName}>
                        Московский государственный технический университет
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={infoListClasses.list}>
                        <Box className={infoListClasses.listItems}>
                          <Typography component="span" className={infoListClasses.infoItem}>
                            Москва
                          </Typography>
                        </Box>
                        <Box className={infoListClasses.listItems}>
                          <Typography component="span" className={infoListClasses.infoItem}>
                            1 200 студентов на платформе
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {/* Оля: пока форма изменения описания открываться не будет - на бэке надо завестин новый тип пользователя - университет */}
              <ApplicantDescr
                title={'Описание'}
                isOwner={true}
                data={''}
                additionalEmployeeData={null}
                university
                labelForm="Описание организации"
              />
            </Grid>
            <Grid item xs={12}>
              <UniversityAreas areas={mockAreas} />
            </Grid>
            <Grid item xs={12}>
              <Сourses />
            </Grid>
            {/* Не удалять, резервирую пробел внизу страницы */}
            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrganizationPage;
