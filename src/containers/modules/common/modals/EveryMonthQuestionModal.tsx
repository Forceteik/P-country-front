import { useState } from 'react';
import cx from 'classnames';
import useAxios from 'axios-hooks';

import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';

import Button from 'components/Button';
import Close from 'components/icons/Close';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';
import AnswersRadioGroup from './components/AnswersRadioGroup';

const modalData = [
  { id: 1, text: 'Нашел работу через Потенциал страны', img: '/images/icons/gladeSmile.png' },
  { id: 2, text: 'Нашел работу с помощью Вуза', img: '/images/icons/education_big.png' },
  { id: 3, text: 'Нашел работу на другой площадке', img: '/images/icons/computer.png' },
  { id: 4, text: 'Нашел самостоятельно', img: '/images/icons/winkedSmile.png' },
  { id: 5, text: 'Еще не нашел работу, в поиске', img: '/images/icons/sadSmile2.png' },
];

const EveryMonthQuestionModal = ({ open, onClose }) => {
  const [status, setStatus] = useState('index'); //index - базовая страница с вопросами, success - страница успеха после отправки ответа
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: status === 'index' ? 834 : 542 });

  const [selectAnswer, setSelectAnswer] = useState(0);

  const [{ loading }, sendInfo] = useAxios({ url: '/employee/employment-status', method: 'post' }, { manual: true });

  const handleClose = () => {
    if (status === 'success') {
      setSelectAnswer(0);
      setStatus('index');
      onClose();
    } else {
      sendInfo({
        data: { closing_form: true },
      }).then(() => {
        setSelectAnswer(0);
        setStatus('index');
        onClose();
      });
    }
  };

  const handleSelect = (value) => {
    setSelectAnswer(value);
  };

  const handleSendAnswer = () => {
    sendInfo({
      data: { employment_status_id: selectAnswer },
    }).then(() => {
      setStatus('success');
    });
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{
        classes: paperClasses,
      }}
      classes={{
        scrollPaper: classes.scroll,
      }}
      BackdropProps={{
        style: {
          background: 'rgba(35, 38, 47, 0.8)',
          backdropFilter: 'blur(29px)',
        },
      }}
    >
      <DialogContent>
        <Box className={cx(classes.modalPaper, classes.pMeduim)} textAlign="center">
          <Box className={classes.closeIcon} onClick={handleClose}>
            <Close color={'#fff'} />
          </Box>
          {status === 'index' && (
            <Grid container rowSpacing={{ xs: 2, sm: 3.6 }}>
              <Grid item xs={12}>
                <Grid container rowSpacing={1}>
                  <Grid item xs={12}>
                    <Typography className={classes.smallTitle} textAlign="left">
                      У вас получилось найти работу?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.regularDescr} textAlign="left">
                      Выберите из списка:
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <AnswersRadioGroup items={modalData} handleSelect={handleSelect} selectItem={selectAnswer} />
              </Grid>
              <Grid item xs={12} sm={7.2}>
                <Button fullWidth onClick={handleSendAnswer} disabled={selectAnswer < 1} loading={loading}>
                  Отправить
                </Button>
              </Grid>
            </Grid>
          )}
          {status === 'success' && (
            <Grid container rowSpacing={4}>
              <Grid item xs={12}>
                <Typography className={classes.smallTitle}>Спасибо за ответ</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth onClick={handleClose}>
                  Закрыть
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EveryMonthQuestionModal;
