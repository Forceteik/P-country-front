import { useState } from 'react';
import useAxios from 'axios-hooks';

import { Box, Input, IconButton, Tooltip, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { DashedButton } from 'components/Button';
import { darkGray, greenMain, ligthGray, pinkMain } from 'styles/colorPalette';
import Close from 'components/icons/Close';
import { useTooltipStyles } from 'components/TextField';
import AccordionDone from 'components/icons/AccordionDone';
import { useProfile } from 'context/ProfileContext';

import { useSkillStyles } from './ProfSkillItem';

const useInputStyles = makeStyles<any>((theme) => ({
  root: {
    'padding': 0,
    'backgroundColor': ligthGray,
    'borderBottom': 0,
    'display': 'flex',
    'alignItems': 'center',
    'borderRadius': 60,
    'marginRight': theme.spacing(1.5),
    'marginBottom': theme.spacing(1.5),
    'cursor': 'pointer',
    '& button': {
      height: 40,
      width: 40,
      padding: 5,
      position: 'relative',
      top: 0,
    },
    '& .MuiInputBase-input': {
      textTransform: 'uppercase',
      fontSize: '12px',
      letterSpacing: '0.03em',
      height: 40,
      padding: '5px 10px 5px 20px',
      boxSizing: 'border-box',
    },
    '&:hover': {
      '& .MuiIconButton-root': {
        opacity: 1,
      },
    },
  },
}));

const AddSkillItem = () => {
  const { currentUser, refetch, profileLoading } = useProfile();
  const qualities = currentUser.qualities;
  const classes = useSkillStyles();
  const inputClasses = useInputStyles();
  const tooltipClasses = useTooltipStyles();
  const [skill, setSkill] = useState('');
  const [addMode, setAddMode] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [{ loading: createLoading }, createSkill] = useAxios({ url: 'qualities', method: 'post' }, { manual: true });
  const [{ loading: addLoading }, addSkill] = useAxios({ url: 'employee/qualities', method: 'post' }, { manual: true });

  const handleAdd = () => {
    if (skill.length > 50) {
      setErrorText('Превышен лимит в 50 символов');
    } else if (skill.length === 0) {
      handleCancel();
    } else {
      createSkill({ data: { quality: skill } }).then(({ data }) => {
        addSkill({ data: { quality_id: data.data.id } }).then(() => {
          setAddMode(false);
          setSkill('');
          refetch();
        });
      });
    }
  };

  const handleAddMode = () => {
    setAddMode(true);
  };

  const handleChange = (e) => {
    if (e.target.value.length > 50) {
      return setErrorText('Превышена макс. длина в 50 символов');
    }
    setSkill(e.target.value);
    if (qualities.some((item) => item.name.name.toLowerCase() === e.target.value.toLowerCase())) {
      setErrorText('Такой навык у Вас уже существует');
    } else {
      setErrorText('');
    }
  };

  const handleCancel = () => {
    setAddMode(false);
    setErrorText('');
    setSkill('');
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleAdd();
    }
  };

  if (createLoading || addLoading || profileLoading) {
    return (
      <Box className={classes.loaderBox}>
        <CircularProgress size={30} />
      </Box>
    );
  }

  if (!addMode) {
    return <DashedButton onClick={handleAddMode}>Добавить навык</DashedButton>;
  }
  return (
    <Box className={inputClasses.root} onKeyDown={handleKeyDown}>
      <Tooltip title={errorText} arrow open={!!errorText} placement={'top-start'} classes={tooltipClasses}>
        <Box>
          <Input
            autoFocus
            value={skill}
            onChange={handleChange}
            disableUnderline
            endAdornment={
              <Box display="flex">
                <IconButton onClick={handleAdd} disabled={errorText !== ''} size="large">
                  <AccordionDone width="16" height="16" color={errorText === '' ? greenMain : darkGray} />
                </IconButton>
                <IconButton onClick={handleCancel} size="large">
                  <Close color={pinkMain} />
                </IconButton>
              </Box>
            }
          />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default AddSkillItem;
