import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import AccordionDown from 'components/icons/AccordionDown';
import { blueMain, darkGray } from 'styles/colorPalette';
import Button from 'components/Button';

import Container from './Container';

const useStyles = makeStyles<any>((theme) => ({
  questionsRoot: {
    'backgroundColor': '#F1F6FF',
    'paddingTop': theme.spacing(14),
    'paddingBottom': theme.spacing(15),
    '& a': {
      color: blueMain,
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: 0,
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(7),
    },

    '& .MuiAccordion-root': {
      borderRadius: '0px 16px',
      border: '1px solid #E1E3E8',
      boxShadow: 'none',
    },
    '& .MuiAccordionSummary-root': {
      minHeight: 'unset',
      padding: '22px 32px 22px 20px',
      [theme.breakpoints.down('sm')]: {
        padding: '14px 19px 16px 16px',
      },
    },
    '& .MuiAccordionSummary-content': {
      '& p': {
        fontFamily: 'inter-med',
        paddingRight: theme.spacing(2),
      },
      'margin': 0,
    },
    '& .MuiAccordionDetails-root': {
      padding: '22px 32px 22px 20px',
      paddingTop: theme.spacing(3),
      color: darkGray,
      borderTop: '1px solid #E1E3E8',
      [theme.breakpoints.down('sm')]: {
        padding: '14px 19px 16px 16px',
      },
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(38),
    fontFamily: 'inter-bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(26),
    },
  },
  questionsContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    paddingLeft: 'max(40px, calc((100% - 1110px) / 2))',
    [theme.breakpoints.down('md')]: {
      padding: '0px',
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3.4),
    },
  },
  left: {
    flexShrink: 0,
    width: 640,
    marginRight: '58px',
    [theme.breakpoints.down('lg')]: {
      width: 500,
      marginRight: '32px',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginRight: 0,
      marginBottom: theme.spacing(10.6),
      padding: '0px 24px 0px 24px',
    },
  },
  right: {
    backgroundColor: '#E0EEFE',
    borderRadius: '40px 0px 0px 0px',
    height: '600px',
    width: 'calc(100% - 640px - 58px)',
    position: 'relative',
    [theme.breakpoints.down('lg')]: {
      width: 'calc(100% - 500px - 32px)',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 550,
      marginLeft: 24,
    },
    [theme.breakpoints.down('sm')]: {
      height: 377,
    },
  },
  infoBox: {
    position: 'absolute',
    zIndex: 10,
    bottom: 33,
    left: 64,
    padding: '32px 24px 29px 24px',
    backgroundColor: '#fff',
    width: 232,
    borderRadius: '0px 30px',
    [theme.breakpoints.down('md')]: {
      left: '15%',
    },
    [theme.breakpoints.down('sm')]: {
      left: '23px',
      bottom: '24px',
    },
  },
  infoBadge: {
    'backgroundColor': blueMain,
    'borderRadius': 4,
    'padding': '2px 12px',
    'width': 'fit-content',
    '& p': {
      color: '#fff',
      fontSize: theme.typography.pxToRem(12),
      fontFamily: 'inter-med',
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
    },
  },
  imgBg: {
    width: 411,
    objectFit: 'contain',
    height: '110%',
    position: 'absolute',
    bottom: 0,
    left: 30,
    zIndex: 5,
    [theme.breakpoints.down('md')]: {
      left: '50%',
      transform: 'translateX(-52%)',
    },
    [theme.breakpoints.down('sm')]: {
      height: '114%',
    },
  },
}));

const Questions = () => {
  const classes = useStyles();
  return (
    <Box className={classes.questionsRoot} id="questions">
      <Container>
        <Typography component={'h2'} className={classes.title}>
          Вопросы и ответы
        </Typography>
      </Container>
      <Box className={classes.questionsContainer}>
        <Box className={classes.left}>
          <Grid container rowSpacing={{ xs: 2.4, md: 3.2 }}>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<AccordionDown width="12" height="6.8" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Использование платформы платное?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Использование платформы бесплатное для образовательных учреждений, студентов, выпускников и в целом
                    соискателей. Важно подписать Соглашение о сотрудничестве после этапа регистрации. Для вопросов по
                    соглашению о сотрудничестве вы можете написать нам на почту{' '}
                    <a href="mailto:info@talanty.online">info@talanty.online</a>.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<AccordionDown width="12" height="6.8" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Соблюдаете ли вы 152-ФЗ (закон о персональных данных)?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    ООО «ТЭЛЕНТИ» при обработке персональных данных принимает правовые, организационные и технические
                    меры по обеспечению безопасности персональных данных, необходимые и достаточные для выполнения
                    обязанностей, предусмотренных указанным Федеральным законом, с учетом целей обработки персональных
                    данных.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<AccordionDown width="12" height="6.8" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Нужны ли IT специалисты для подключения?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Нет, для подключения не требуются IT специалисты. Представителю образовательного учреждения
                    требуется пройти процесс регистрации, подписать соглашение и заполнить информацию о Вузе. (Это
                    займет 5-7 мин). Далее все функции становятся доступными и можно смело пользоваться платформой.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<AccordionDown width="12" height="6.8" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Насколько детальную аналитику вы даете?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Аналитика настолько точная, насколько она может быть. Мы используем различные способы сбора
                    информации, как от студентов, так и от работодателей, чтобы предоставлять образовательному
                    учреждению реальную картину по трудоустройству учащихся/выпускников и по их результатам
                    тестирования.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<AccordionDown width="12" height="6.8" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Возможно ли подключение колледжей и школ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Да, возможно. Пройти регистрацию и использовать платформу может любое образовательное учреждение
                    Российской Федерации.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.right}>
          <Box className={classes.infoBox}>
            <Grid container rowSpacing={1.5}>
              <Grid item xs={12}>
                <Box className={classes.infoBadge}>
                  <Typography>Служба поддержки</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize={14} fontFamily="inter-med">
                  Игорь
                </Typography>
                <Typography fontSize={14} color={darkGray}>
                  ”Я всегда на связи”
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button small fullWidth>
                  Спросить
                </Button>
              </Grid>
            </Grid>
          </Box>
          <img src="/images/university/landing/questions-man.png" className={classes.imgBg} />
        </Box>
      </Box>
    </Box>
  );
};

export default Questions;
