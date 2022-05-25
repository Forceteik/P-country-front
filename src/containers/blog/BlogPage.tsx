import cx from 'classnames';
import Link from 'next/link';
import Head from 'next/head';

import { Box, Typography, Grid, Container, List, ListItem, ListItemText, Hidden } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Header from 'containers/landing/components/Header';
import { blueLight } from 'styles/colorPalette';
import Button from 'components/Button';
import PrevLink from 'components/PrevLink';
import { useSession } from 'context/UserContext';

import Footer from '../landing/components/Footer';

import SubscribeItem from './components/SubscribeItem';

const useStyles = makeStyles<any>((theme) => ({
  mainBox: {
    backgroundColor: blueLight,
    borderRadius: '0px 0px 40px 40px',
    overflowX: 'hidden',
    [theme.breakpoints.down('lg')]: {
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(5),
    },
  },
  container: {
    maxWidth: 1134,
    margin: '0px auto',
    padding: '0px 60px',
    [theme.breakpoints.down('lg')]: {
      padding: '0px 40px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 16px',
    },
  },
  mainGrid: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(10),
  },
  accentSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    padding: '42px 35px 42px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: '32px 15px',
    },
  },
  disableLastMargin: {
    '& p:last-child': {
      marginBottom: 0,
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(30),
    fontFamily: 'inter-bold',
    lineHeight: '110%',
    color: '#003B77',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(25),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  secondTitle: {
    fontSize: theme.typography.pxToRem(24),
    color: '#003B77',
    lineHeight: '120%',
    letterSpacing: '-0.045em',
    marginBottom: theme.spacing(3),
    fontFamily: 'inter-med',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  titleWithNum: {
    display: 'flex',
    alignItems: 'center',
    width: '41%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  titleWithNumFull: {
    display: 'flex',
    alignItems: 'center',
  },
  num: {
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(1.5),
    fontSize: theme.typography.pxToRem(64),
    fontFamily: 'inter-med',
    color: '#C5D2DF',
    lineHeight: '110%',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(43),
    },
  },
  textMedium: {
    color: '#253341',
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '136%',
    marginBottom: theme.spacing(3),
    fontFamily: 'inter-med',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  textReg: {
    color: '#253341',
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '136%',
    marginBottom: theme.spacing(3.5),
  },
  date: {
    color: 'rgba(96, 133, 172, 1)',
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  link: {
    color: '#419CF9',
    cursor: 'pointer',
  },
  italic: {
    marginBottom: theme.spacing(3.5),
    fontStyle: 'italic',
  },
  italicLittle: {
    fontFamily: 'inter-med',
    lineHeight: '120%',
  },
  italicBig: {
    fontFamily: 'inter-med',
    fontSize: theme.typography.pxToRem(24),
    color: '#003B77',
    lineHeight: '120%',
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(20),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
  },
  imgFirstBox: {
    'width': '100%',
    'height': 383,
    'borderRadius': 20,
    'overflow': 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    [theme.breakpoints.down('md')]: {
      height: 330,
    },
  },
  imgBox: {
    'width': '100%',
    '& img': {
      width: '100%',
    },
  },
  centerImgBox: {
    'width': '60%',
    'margin': '0px auto',
    '& img': {
      width: '100%',
    },
  },
  centerBtn: {
    width: '40%',
    margin: '0px auto',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  list: {
    '& li': {
      'padding': '0px 0px 16px 22px',
      'position': 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 6,
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '#419CF9',
      },
    },
    '& .MuiListItemText-root': {
      margin: 0,
    },
    '& span': {
      lineHeight: '130%',
      fontFamily: 'inter',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.pxToRem(14),
      },
    },
  },
  pr50: {
    paddingRight: theme.spacing(6),
  },
  pl32: {
    paddingLeft: theme.spacing(4),
  },
}));

const BlogPage = () => {
  const classes = useStyles();
  const { currentUser } = useSession();
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.only('md'));
  const isSm = useMediaQuery<any>((theme) => theme.breakpoints.only('sm'));
  const isXs = useMediaQuery<any>((theme) => theme.breakpoints.only('xs'));
  return (
    <>
      <Head>
        <title>Комплексные алгоритмы </title>
        <meta property="og:title" content={'Комплексные алгоритмы платформы Потенциал страны'} key="title" />
      </Head>
      <Box className={classes.mainBox}>
        <Header />
        <Container maxWidth={'lg'}>
          <Grid
            container
            spacing={isXs ? 6 : isSm ? 6 : isMd ? 6 : 8}
            className={classes.mainGrid}
            justifyContent="center"
          >
            <Grid item xs={12} component="section">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={5}>
                  <PrevLink link={'/blog'} text={'Назад в блог'} />
                  <Typography component="h1" className={classes.title}>
                    Комплексные алгоритмы платформы Потенциал страны: новый инструмент для HR и перспективы для
                    специалистов
                  </Typography>
                  <Hidden smUp>
                    <Box className={classes.imgBox} mb={3}>
                      <img src="/images/blog/blog-1-full.jpg" alt="" />
                    </Box>
                  </Hidden>
                  <Typography className={classes.textMedium}>
                    Из чего состоит передовая система оценки, которая позволит кандидату найти работу мечты, а бизнесу -
                    идеального сотрудника?
                  </Typography>
                  <Typography className={classes.date}>12.04.21</Typography>
                </Grid>
                <Hidden smDown>
                  <Grid item xs={7}>
                    <Box className={classes.imgFirstBox}>
                      <img src="/images/blog/blog-1-full.jpg" alt="" />
                    </Box>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>

            <Grid item xs={12} component="section">
              <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.textMedium}>
                    При отборе подходящих кандидатов уже давно не хватает таких простых инструментов как резюме и
                    собеседования. Потенциального сотрудника нужно оценить со всех сторон: реальные компетенции, уровень
                    мотивации и обучаемости, согласованность с культурой компании - и это лишь верхушка айсберга.
                  </Typography>
                  <Typography className={classes.textMedium}>
                    Самим соискателям тоже теперь требуется нечто большее, чем базовые знания о компании куда он идет,
                    уровне зарплаты и соц.пакете, функционале и корпоративной культуре. Перед устройством на работу
                    (особенно первую) кандидаты хотят лучше узнать свои слабые и сильные стороны, определиться с
                    приоритетными направлениями для карьеры. Особенно сложный выбор стоит перед студентами гуманитарных
                    специальностей, которые пытаются найти верный путь в современной цифровой экономике страны. Наша
                    методология помогает им верно определить свою роль и найти достойную работу.
                  </Typography>
                  <Typography className={classes.textMedium} component="div">
                    Платформа Потенциал страны{' '}
                    <a className={classes.link} href={'https://p-strana.ru'}>
                      https://p-strana.ru
                    </a>{' '}
                    создана как раз для того, чтобы помочь обеим сторонам - и нанимателю, и сотруднику - идеально
                    закрыть вакансию. Она включает в себя систему тестов и комплексную оценку, которая решает вопрос
                    профориентации, устройства на работу и развития карьеры молодых специалистов России.
                  </Typography>
                  <Typography className={classes.textMedium}>
                    Студенты и молодые специалисты проходят тесты, заполняют информацию о себе и могут пользоваться
                    платформой для поиска идеального карьерного пути, работы над собой. Также их кандидатуры попадают в
                    общую базу, где их могут заметить работодатели. Компании же используют платформу Потенциал страны
                    для поиска самых перспективных молодых специалистов, оценки их потенциала и рекомендаций по их
                    обучению
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={5} lg={3}>
                  <Link href={currentUser ? '/applicant/tests' : '/auth'}>
                    <Button fullWidth>Попробовать бесплатно</Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} component="section">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Box className={classes.imgBox}>
                    <img src="/images/blog/blog-1-1.png" alt="" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h2" className={classes.title}>
                    Как работает методология?
                  </Typography>
                  <Typography className={classes.textMedium}>
                    Оценка идет не столько по опыту, сколько по потенциалу сотрудников, что особенно важно в хантинге
                    молодых талантов. И при этом решает классическую проблему устройства на работу для выпускников -
                    требования по большому стажу даже на стартовых должностях.
                  </Typography>
                  <Typography className={classes.textMedium}>
                    Каждый тест из наших групп уже получил широкое признание и стал “золотым стандартом” в Европе и США.
                    Потенциал страны - первая платформа в России, которая популяризирует лучшие зарубежные практики в
                    нашей стране и при этом собрала в своей методологии самый полный набор тестов. Этот комплекс
                    закрывает буквально каждый важный и даже второстепенный аспект соискателя.
                  </Typography>
                  <Typography className={classes.textMedium}>
                    Помогают нам в этом продвинутые технологии с применением искусственного интеллекта и машинного
                    обучения. Умные алгоритмы не только дают картину в 360 градусов на любого кандидата за счет
                    комплексной оценки результатов всех тестирований, но и сами собирают данные из профилей и соцсетей
                    специалиста.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box className={classes.accentSection}>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Typography component="h3" className={classes.secondTitle}>
                          Основные преимущества такого подхода
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <List className={classes.list} disablePadding>
                          <ListItem>
                            <ListItemText primary="Простой процесс для всех. Специалисту достаточно внести информацию о себе и пройти тестирования, а работодателю - заполнить анкету своей компании. Все следующие шаги - на алгоритме платформы Потенциал страны." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Компания видит все потенциально важные аспекты сотрудника в одном экране. Самый умелый специалист будет бесполезен, если не готов учиться и ломается при любом стрессе. И напротив, даже самый надежный кандидат не подойдет, если не имеет нужных навыков. Комплексные тесты выявляют каждую деталь и дают доступ к идеальным кандидатам." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="За счет технологий “machine learning” алгоритм подбора студентов под каждую вакансию постоянно совершенствуется и учитывает в оценке такие комбинации факторов, которые упустит обычный рекрутер. " />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} component="section">
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Box className={classes.imgBox}>
                    <img src="/images/blog/blog-1-2.png" alt="" />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography component="h2" className={classes.title}>
                        В чем новизна тестирования?{' '}
                      </Typography>
                      <Typography className={classes.textMedium}>
                        Наша система тестов включает исследования по всем ключевым направлениям - Soft-навыки,
                        психотипы, аспекты мотивации и обучаемости, потенциал и приоритеты. Такая сводная оценка не
                        только сразу же выявляет “красные флаги” в потенциальных сотрудниках, но и позволяет отобрать
                        тех, кто идеально подходит под необходимую должность и миссию компании.
                      </Typography>
                      <Typography className={classes.textMedium}>
                        Неординарность нашего тестирования для России не только в его всеохватности (анализируем
                        профессиональные, личностные и даже прогнозируемые качества кандидата). Методика платформы
                        Потенциал страны также гибко подстраивается под нужды каждого проекта и при этом опирается на
                        передовые мировые технологии в области отбора и оценки кадров.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Link href={currentUser ? '/applicant/tests' : '/auth'}>
                        <Button fullWidth>Попробовать</Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} component="section">
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Typography component="h2" className={classes.title}>
                    Какие тесты мы используем?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Box className={classes.accentSection}>
                        <Box className={classes.titleWithNum}>
                          <Typography className={classes.num} component="span">
                            01
                          </Typography>
                          <Typography component="h3" className={classes.secondTitle}>
                            Тестирование личности и командной роли{' '}
                          </Typography>
                        </Box>
                        <Typography className={classes.textReg}>
                          Один из краеугольных блоков тестов, который состоит из теста MBTI и теста Белбина. Это один из
                          самых современных методов оценки личностных особенностей, который ставит кандидата перед
                          выбором между равнозначными вариантами. Он не только точный, но и быстрый. Благодаря
                          применению этой комбинации тестов в результате соискатель получает набор личностных
                          характеристик по каждому фактору, стилю обучения и склонностям к определенной профессиональной
                          деятельности.
                        </Typography>
                        <Typography className={classes.textReg}>
                          Тест MBTI основан на так называемой типологии Майерс-Бриггс, созданной на базе типологии Юнга
                          американскими психологами. Он широко распространен в США и Европе - в Штатах, к примеру, до
                          70% выпускников средних школ проходят это тестирование, чтобы определиться с выбором
                          профессии. Результаты теста помогают не только с карьерным, но и личностным ростом.
                        </Typography>
                        <Typography className={classes.textReg}>
                          Тест Белбина разработан доктором психологических наук из Великобритании. Он используется для
                          определения оптимальной роли сотрудника в команде. Тест оценивает разные качества личности
                          кандидата таким образом, что компания сразу понимает, на каком месте его потенциал будет
                          раскрыт максимально - в области реализации, координации, генерации идей или других.
                        </Typography>
                        <Box className={classes.imgBox}>
                          <img src="/images/blog/blog-1-3.png" />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={classes.accentSection}>
                        <Box className={classes.titleWithNum}>
                          <Typography className={classes.num} component="span">
                            02
                          </Typography>
                          <Typography component="h3" className={classes.secondTitle}>
                            Тестирование мотивации
                          </Typography>
                        </Box>
                        <Typography className={classes.textReg}>
                          Передовой метод исследования мотивации, который позволяет эффективно оценить ключевые движущие
                          факторы для кандидата. Оценка при этом получается оперативной за счет вопросов с применением
                          равнозначных характеристик. Они позволяют избежать лишних пунктов в тесте, которые в менее
                          эффективных методиках применяются для оценки честности респондентов.
                        </Typography>
                        <Typography className={classes.textReg}>
                          В результате мы получаем набор из 8 основных мотивов, относящихся к внешней или внутренней
                          мотивации, и описание наиболее выраженных из них.
                        </Typography>
                        <Box className={classes.centerImgBox}>
                          <img src="/images/blog/blog-1-4.png" />
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box className={classes.accentSection}>
                        <Box className={classes.titleWithNum}>
                          <Typography className={classes.num} component="span">
                            03
                          </Typography>
                          <Typography component="h3" className={classes.secondTitle}>
                            Тестирование способностей (Soft Skills)
                          </Typography>
                        </Box>
                        <Typography className={classes.textReg}>
                          Это автоматизированная методика, с помощью которой мы оцениваем развитость разных способностей
                          сотрудника на фоне других кандидатов. Помимо выявления сильных сторон она также позволяет
                          делать точные прогнозы об оптимальном карьерном пути. К примеру, респондент с высоким
                          математическим интеллектом имеет большой потенциал в программировании или аналитике, но
                          сниженный в журналистике или копирайтинге.
                        </Typography>
                        <Typography className={classes.textReg}>
                          В результате сотрудник видит числовую оценку по каждой из своих способностей, понимает уровень
                          их развития по сравнению с выборкой респондентов, а также получает краткое описание уровня
                          проявления по каждой из способностей. HR-специалистам эти данные помогают не просто
                          рассматривать конкретного кандидата, а увидеть его в контексте всех соискателей и узнавать
                          заранее его слабые и сильные стороны на общем фоне.
                        </Typography>
                        <Box className={classes.centerImgBox}>
                          <img src="/images/blog/blog-1-5.jpg" />
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box className={cx(classes.accentSection, classes.disableLastMargin)} height="100%">
                        <Box className={classes.titleWithNumFull}>
                          <Typography className={classes.num} component="span">
                            04
                          </Typography>
                          <Typography component="h3" className={classes.secondTitle}>
                            Тестирование профессиональных навыков (Hard Skills)
                          </Typography>
                        </Box>
                        <Typography className={classes.textReg}>
                          При устройстве на работу важны не только аспекты личности и предрасположенности специалиста,
                          но и его текущие умения. На платформе Потенциал страны используется стандартная методика для
                          автоматизированной оценки знаний, которая уже отлично зарекомендовала себя с точки зрения
                          эффективности.
                        </Typography>
                        <Typography className={classes.textReg}>
                          Это тестирование генерирует оценку уровня знаний по определённым темам и дает краткую типовую
                          характеристику, раскрывающую общий и частный уровень знаний по каждому из направлений
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box className={cx(classes.accentSection, classes.disableLastMargin)} height="100%">
                        <Box className={classes.titleWithNumFull}>
                          <Typography className={classes.num} component="span">
                            05
                          </Typography>
                          <Typography component="h3" className={classes.secondTitle}>
                            Тестирование компетенций (Case Study)
                          </Typography>
                        </Box>
                        <Typography className={classes.textReg}>
                          Расширенное тестирование с применением набора развернутых кейсов. Специалист получает описание
                          конкретной ситуации, на которую он может реагировать разными способами. У отвечающего будет
                          больше типов действий и вариантов ответов чем при стандартном Тестировании оценки ситуаций.
                          Такой подход вытаскивает из ответов максимум информации о потенциале кандидата.
                        </Typography>
                        <Typography className={classes.textReg}>
                          Тестирование компетенций позволяет оценить уровень способности к восприятию новой информации и
                          применению ее на практике. HR-специалист, взглянув на результат, сразу понимает, насколько
                          быстро кандидат адаптируется, привыкает к нововведениям, схватывает знания о свежих практиках
                          и инструментах.
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box className={cx(classes.accentSection, classes.disableLastMargin)} height="100%">
                        <Box className={classes.titleWithNum}>
                          <Typography className={classes.num} component="span">
                            06
                          </Typography>
                          <Typography component="h3" className={classes.secondTitle}>
                            Профориентация
                          </Typography>
                        </Box>
                        <Typography className={classes.textReg}>
                          Совокупность тестов, которая помогает специалисту понять, в каких профессиональных областях он
                          будет развиваться быстрее и успешнее, а в каких столкнется с трудностями. Часто люди
                          пренебрегают возможностью такой оценки, годами пытаются улучшить навыки и получить повышение в
                          совсем не подходящей им специальности. А потом решаются на смену профессии и за пару лет легко
                          перешагивают планку, которую годами не могли пробить на предыдущей должности.
                        </Typography>
                        <Typography className={classes.textReg}>
                          Профориентационные тесты, применяемые в системе платформы Потенциал страны, дают сотруднику
                          полное видение карьерного будущего, а работодателю позволяют выбрать самых перспективных
                          специалистов, которые идеально закроют конкретную вакансию.
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item component="section" xs={12} sm={8}>
              <Box textAlign="center">
                <Typography component="h2" className={classes.title}>
                  Что получаем в результате?
                </Typography>
                <Typography className={classes.textMedium}>
                  Даже результат каждого конкретного теста дает и соискателю, и компании ценную информацию. Но платформа
                  Потенциал страны шагнула дальше и разработала систему сводной консолидированной оценки по всем тестам
                  и оцифровала данные по навыкам кандидатов.
                </Typography>
                <Box className={classes.centerBtn}>
                  <Link href={currentUser ? '/applicant/tests' : '/auth'}>
                    <Button fullWidth>Пройти тест</Button>
                  </Link>
                </Box>
                <Box className={classes.italic}>
                  <Typography className={classes.italicLittle}>
                    После прохождения всех тестов каждая сторона получает желаемое:
                  </Typography>{' '}
                  <Typography className={classes.italicBig}>полный цифровой профиль соискателя.</Typography>
                </Box>
                <Box className={classes.imgBox}>
                  <img src="/images/blog/blog-1-6.jpg" />
                </Box>
              </Box>
            </Grid>

            <Grid item component="section" xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography className={classes.textMedium}>
                    Студенты и молодые специалисты могут почерпнуть из него рекомендации по развитию компетенций.
                    Насколько вы хороши сейчас? А насколько вы на данный момент лучше или хуже других кандидатов?
                    Дотягивает ли ваш уровень до того, который необходим для желанной должности? Для любого человека,
                    ищущего работу, эти вопросы становятся основными - и сводная оценка платформы Потенциал страны
                    позволяет на него ответить.
                  </Typography>
                  <Typography className={classes.textMedium}>
                    При этом далеко не все еще точно определились со сферой деятельности. Их волнует другое - какую
                    профессию выбрать и как развивать свою карьеру? Результаты тестов нашей платформы дают ответы и на
                    эти вопросы. Правильно проведенная профориентация позволяет тысячам специалистов работать на тех
                    должностях, которые точно подходят им по уровню навыков, складу характера и другим параметрам.
                  </Typography>
                  <Typography className={classes.textMedium}>
                    HR-специалисты тоже получают колоссальную пользу от комплексного профиля кандидата. Во-первых, они
                    сразу же отмечают самых перспективных соискателей, которые идеально соответствуют должности и миссии
                    компании. Во-вторых, тестирование облегчает дальнейшую работу с сотрудником, ведь HR-менеджер знает,
                    как его правильно мотивировать и повысить вовлеченность. А результаты тестов обучаемости позволяют
                    заранее предсказать, как быстро сотрудник адаптируется и насколько интенсивно сможет расти на новом
                    месте.
                  </Typography>
                  <Typography className={classes.textMedium}>
                    Сводный оцифрованный профиль соискателя - это передовая практика, которая становится стандартом на
                    рынке труда. Имеющие его кандидаты получают всё больше преимуществ, а использующие его компании -
                    ценных специалистов.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <SubscribeItem withFooter />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default BlogPage;
