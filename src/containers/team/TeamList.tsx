import { Box, Typography, List, ListItem, Grid, useMediaQuery } from '@mui/material';

import { useTeamListStyles } from './style';

const TeamList = () => {
  const classes = useTeamListStyles();
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));
  return (
    <Grid container spacing={isMobile ? 2 : 4} mb={6.5}>
      <Grid item xs={12} md={6}>
        <Box className={classes.teamItem} component="article">
          <Box className={classes.header}>
            <Box className={classes.avatar}>
              <img src="/images/team/team-1.png" alt="" />
            </Box>
            <Box className={classes.headerInfo}>
              <Typography className={classes.prof}>Co-Founder</Typography>
              <Typography className={classes.name} component="p">
                Павел <br /> Якименко
              </Typography>
            </Box>
          </Box>
          <Box className={classes.infoBox}>
            <List>
              <ListItem className={classes.infoItem}>
                <Typography>
                  Идейный вдохновитель, подключение менторов и советников, коммуникации с партнерами и государством{' '}
                </Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>
                  Венчурный инвестор, предприниматель (строительство, нефтехимия, банки, промышленность)
                </Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>
                  40 лет, более 10 запущенных бизнес-проектов, общий оборот бизнес-проектов &gt; 40 млрд. ₽
                </Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>Образование: Финансовый университет при Правительстве РФ</Typography>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box className={classes.teamItem} component="article">
          <Box className={classes.header}>
            <Box className={classes.avatar}>
              <img src="/images/team/team-5.png" alt="" />
            </Box>
            <Box className={classes.headerInfo}>
              <Typography className={classes.prof}>CEO</Typography>
              <Typography className={classes.name} component="p">
                Марина
                <br /> Бунтова
              </Typography>
            </Box>
          </Box>
          <Box className={classes.infoBox}>
            <List>
              <ListItem className={classes.infoItem}>
                <Typography>СЕО проекта, B2B & GR коммуникации, менеджмент</Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>
                  Президент Фонда Императорского Михайловского театра, руководитель проектов в ЗАО Биокад
                </Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>Руководитель аппарата Председателя совета директоров в Юлмарт</Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>
                  Образование: РАНХиГС (Современное публичное управление), НИУ ВШЭ (Управление проектами), СПбГУПТД
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box className={classes.teamItem} component="article">
          <Box className={classes.header}>
            <Box className={classes.avatar}>
              <img src="/images/team/team-2.png" alt="" />
            </Box>
            <Box className={classes.headerInfo}>
              <Typography className={classes.prof}>Co-Founder</Typography>
              <Typography className={classes.name} component="p">
                Илья <br /> Трофименко
              </Typography>
            </Box>
          </Box>
          <Box className={classes.infoBox}>
            <List>
              <ListItem className={classes.infoItem}>
                <Typography>SMO, разработка продуктовой стратегии, продвижение на внешние рынки</Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>Директор программ цифровой трансформации в X5 Retail Group </Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>
                  Запустил более 60 проектов в IT, в том числе 2 крупнейшие программы лояльности в РФ - для Сбербанка и
                  для Пятёрочки
                </Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>Образование: Skolkovo, Mail.ru, НГУ, Британская Высшая Школа Дизайна, НИУ ВШЭ</Typography>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box className={classes.teamItem} component="article">
          <Box className={classes.header}>
            <Box className={classes.avatar}>
              <img src="/images/team/team-3.png" alt="" />
            </Box>
            <Box className={classes.headerInfo}>
              <Typography className={classes.prof}>CPO</Typography>
              <Typography className={classes.name} component="p">
                Петр <br /> Боголепов
              </Typography>
            </Box>
          </Box>
          <Box className={classes.infoBox}>
            <List>
              <ListItem className={classes.infoItem}>
                <Typography>Продуктовое виденье, управление командой</Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>
                  Операционный директор онлайн-школы Tooligram Academy, основатель нескольких e-commerce платформ,
                  бренда одежды и бренда косметики
                </Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>Посетил 19 стран, опыт в бизнесе 7 лет</Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>Образование: Финансовый университет при Правительстве РФ, HSE</Typography>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box className={classes.teamItem} component="article">
          <Box className={classes.header}>
            <Box className={classes.avatar}>
              <img src="/images/team/team-6.png" alt="" />
            </Box>
            <Box className={classes.headerInfo}>
              <Typography className={classes.prof}>CTO</Typography>
              <Typography className={classes.name} component="p">
                Георгий <br /> Бодров
              </Typography>
            </Box>
          </Box>
          <Box className={classes.infoBox}>
            <List>
              <ListItem className={classes.infoItem}>
                <Typography>
                  Формирование ИТ-команды, технологическая архитектура, управление разработкой, программные алгоритмы
                </Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>13 компаний на уровнях: аудитора, PM, СТО, TeamLead mobile, ios-dev</Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>8 лет в IT, 4 года в iOS-разработке</Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>
                  Образование: МФТИ (Прикладная математика и компьютерные науки), Cambridge High School (Data Science)
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box className={classes.teamItem} component="article">
          <Box className={classes.header}>
            <Box className={classes.avatar}>
              <img src="/images/team/team-4.png" alt="" />
            </Box>
            <Box className={classes.headerInfo}>
              <Typography className={classes.prof}>главный методолог</Typography>
              <Typography className={classes.name} component="p">
                Юлия <br /> Елизарова
              </Typography>
            </Box>
          </Box>
          <Box className={classes.infoBox}>
            <List>
              <ListItem className={classes.infoItem}>
                <Typography>Разработка алгоритмического ядра психологических тестов</Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>
                  Клинический психолог, профайлер-верификатор, полиграфолог, графолог. Автор методики оценки компетенций
                  и соответствия занимаемой должности для Правительства Московской области
                </Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <Typography>10 лет опыта в области психологии, соавтор книги "Лжец: отклонить".</Typography>
              </ListItem>
              <ListItem className={classes.infoItem}>
                <Typography>
                  Образование: МГУ им. Г. И. Невельского (Психология, Социальная педагогика, Психология в сфере
                  коммуникаций управления)
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TeamList;
