import cx from 'classnames';
import { useState } from 'react';

import { Box, Typography, Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { blueLight, blueMain } from 'styles/colorPalette';
import LineProgress from 'components/LineProgress';
import { TetriatyButton } from 'components/Button';
import { useProgressStyles } from 'containers/modules/employer/vacancy/style';
import { useTooltipStyles } from 'styles/helpers';

const Progress = ({
  title,
  progress,
  step,
  stepsValid,
  hideDraft = false,
  onDraftClick = null,
  draftDisabled = false,
  draftLoading = false,
  draftTooltipTitle = '',
  onNext,
  mode = 'create',
}) => {
  const classes = useProgressStyles();
  const [openTooltip, setOpenTooltip] = useState(false);
  const tooltipClasses = useTooltipStyles();

  const handleOpenTooltip = () => {
    setOpenTooltip(true);
  };

  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };

  const classForFirstItem = () => {
    let result = classes.progressItem;

    if (step === 1) {
      result = cx(classes.progressItem, classes.progressCurrent);
    }

    if (stepsValid.first) {
      result = cx(classes.progressItem, classes.progressValid);
    }

    return result;
  };

  const classForSecondItem = () => {
    let result = classes.progressItem;

    if (step === 2) {
      result = cx(classes.progressItem, classes.progressCurrent);
    }

    if (stepsValid.second) {
      result = cx(classes.progressItem, classes.progressValid);
    }

    if (mode === 'update') {
      result = cx(classes.progressItem, classes.progressBlocked);
    }

    // if (mode === "update") {
    //   result = classes.progressItem;
    // }

    // if (step === 1) {
    //   result = cx(classes.progressItem, classes.progressDefault);
    // } else if (step === 2 && !stepsValid.second) {
    //   result = cx(classes.progressItem, classes.progressCurrent);
    // }

    return result;
  };

  const classForThirdItem = () => {
    let result = classes.progressItem;

    if (step === 3) {
      result = cx(classes.progressItem, classes.progressCurrent);
    }

    if (stepsValid.third) {
      result = cx(classes.progressItem, classes.progressValid);
    }

    if (mode === 'update') {
      result = cx(classes.progressItem, classes.progressBlocked);
    }

    // if (mode === "update") {
    //   result = classes.progressItem;
    // }
    // if (step === 1 || step === 2) {
    //   return cx(classes.progressItem, classes.progressDefault);
    // } else if (step === 3 && !stepsValid.third) {
    //   return cx(classes.progressItem, classes.progressCurrent);
    // }}

    return result;
  };

  const handleClick = (targetStep) => () => {
    if (step === 1) {
      if (stepsValid.first && (mode === 'create' || mode === 'draft')) {
        if (targetStep === 3 && !stepsValid.third) {
          //do nothing
        } else {
          onNext(targetStep);
        }
      }
    } else if (step === 2) {
      if ((stepsValid.second || targetStep === 1) && (mode === 'create' || mode === 'draft')) {
        onNext(targetStep);
      }
    } else if (step === 3) {
      if ((stepsValid.third || targetStep === 2 || targetStep === 1) && (mode === 'create' || mode === 'draft')) {
        onNext(targetStep);
      }
    }
  };

  return (
    <Box className={classes.wrapper} component="aside">
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.root}>
            <Box className={classes.header}>
              <Typography className={classes.title}>{title}</Typography>
              <Typography className={classes.progress}>{progress}%</Typography>
            </Box>
            <Box mb={3}>
              <LineProgress progress={progress} color={blueMain} bgColor={blueLight} withoutLabel />
            </Box>
            <Box className={classes.progressStep}>
              <Box className={classForFirstItem()}>
                <Box />
                <Typography className={classes.stepNumber}>1 этап</Typography>
                <Typography component="span" onClick={handleClick(1)}>
                  Данные о вакансии
                </Typography>
              </Box>

              <Box className={classForSecondItem()}>
                <Box />
                <Typography className={classes.stepNumber}>2 этап</Typography>
                <Typography component="span" onClick={handleClick(2)}>
                  Совместимость по командной роли и компетенциям
                </Typography>
              </Box>

              <Box className={classForThirdItem()}>
                <Box />
                <Typography className={classes.stepNumber}>3 этап</Typography>
                <Typography component="span" onClick={handleClick(3)}>
                  Совместимость по ценностям
                </Typography>
              </Box>
            </Box>

            {/* {progressSize.map((item, i) => (
        <Box key={i} className={classes.box}>
          <Box className={i == 0 ? classes.firstCircle : item <= progress ? classes.circleActive : classes.circle} />
          <Typography className={i == 0 ? classes.label : item <= progress ? classes.labelActive : classes.label}>
            {item}%
          </Typography>
        </Box>
      ))} */}
          </Box>
        </Grid>
        {!hideDraft && (
          <Grid item xs={12}>
            <Tooltip
              title={draftTooltipTitle}
              arrow
              placement="top"
              classes={tooltipClasses}
              open={openTooltip}
              onClose={handleCloseTooltip}
              onOpen={handleOpenTooltip}
            >
              <Box>
                <TetriatyButton fullWidth disabled={draftDisabled} loading={draftLoading} onClick={onDraftClick}>
                  Сохранить в черновик
                </TetriatyButton>
              </Box>
            </Tooltip>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Progress;
