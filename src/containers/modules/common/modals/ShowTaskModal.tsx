import cx from 'classnames';

import { Box, Dialog, DialogContent, Typography, Grid } from '@mui/material';

import Button from 'components/Button';
import Close from 'components/icons/Close';

import { useItemStyles, usePaperStylesFlexibleWidth } from './styles';

const ShowTaskModal = ({ openTaskShow, setOpenTaskShow, item }) => {
  const classes = useItemStyles();
  const paperClasses = usePaperStylesFlexibleWidth({ width: 732 });

  const handleClose = () => {
    setOpenTaskShow(false);
  };

  return (
    <Dialog
      open={openTaskShow}
      onClose={handleClose}
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
        <Box className={cx(classes.modalPaper, classes.pBig)}>
          <Box className={classes.closeIcon} onClick={handleClose}>
            <Close color={'#fff'} />
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className={classes.mainTitle}>{item.name}</Typography>
                </Grid>
                {item.link && (
                  <Grid item xs={12}>
                    <a href={`https://${item.link}`} aria-label="В контакте" target={'_blank'} rel="noreferrer">
                      {item.link}
                    </a>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography className={classes.mainDescr}>{item.description}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Button
                fullWidth
                nextLink
                linkProps={{ href: item.media?.original_url || '/not-found' }}
                nativelinkprops={{ target: '_blank' }}
              >
                Скачать материалы
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ShowTaskModal;
