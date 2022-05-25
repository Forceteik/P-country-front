import cx from 'classnames';
import useAxios from 'axios-hooks';
import { useState } from 'react';

import { Box, Dialog, DialogContent } from '@mui/material';

import Close from 'components/icons/Close';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';
import AnswerPageEmployer from './components/AnswerPageEmployer';

/**
 * Вакансию можно удалить как в списке, так и при просмотре самой вакансии
 * если vacancyId !== null значить удаление происходит через список черновиков
 * @param open
 * @param handleClose
 * @param vacancyId
 * @constructor
 */
const EmployerQuestionModal = ({ open, handleClose, vacancyId = null, refetch }) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 751 });
  const [selectAnswer, setSelectAnswer] = useState(1);
  const [differText, setDifferText] = useState({ value: '', isValid: true, message: '' });

  const id = vacancyId;

  const [{ loading }, sendAnswer] = useAxios(
    { url: `/vacancies/${id}/candidate_search`, method: 'post' },
    { manual: true },
  );

  const cleanData = () => {
    setSelectAnswer(1);
    setDifferText({ value: '', isValid: true, message: '' });
  };

  const handleSendAnswer = () => {
    let data;

    if (selectAnswer === 4) {
      data = { candidate_search_id: selectAnswer, comment: differText.value };
    } else {
      data = { candidate_search_id: selectAnswer };
    }

    sendAnswer({ data: data }).then(() => {
      handleClose();
      cleanData();
      refetch();
    });
  };

  const handleCloseModal = () => {
    sendAnswer({ data: { closing_form: true } }).then(() => {
      handleClose();
      cleanData();
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
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
        <Box className={cx(classes.modalPaper, classes.pMeduim)}>
          <Box className={classes.closeIcon} onClick={handleCloseModal}>
            <Close color={'#fff'} />
          </Box>
          <AnswerPageEmployer
            selectAnswer={selectAnswer}
            setSelectAnswer={setSelectAnswer}
            differText={differText}
            setDifferText={setDifferText}
            handleSendAnswer={handleSendAnswer}
            loading={loading}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EmployerQuestionModal;
