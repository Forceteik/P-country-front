import { useState } from 'react';

import { Box, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { black, blueMain, darkGray } from 'styles/colorPalette';
import RoundImgIcon from 'components/RoundImgIcon';
import EditAndDeleteIcons from 'components/EditAndDeleteIcons';

export const useStyles = makeStyles<any>((theme) => ({
  root: {
    cursor: 'pointer',
    position: 'relative',
  },
  name: {
    fontWeight: 500,
    wordWrap: 'break-word',
    lineHeight: '130%',
    color: black,
  },
  label: {
    fontWeight: 400,
    wordWrap: 'break-word',
    fontSize: theme.typography.pxToRem(12),
    color: darkGray,
    lineHeight: '130%',
  },
  labelBlack: {
    fontWeight: 400,
    wordWrap: 'break-word',
    fontSize: theme.typography.pxToRem(12),
    color: black,
    lineHeight: '130%',
  },
  type: {
    fontFamily: 'inter-bold',
    wordWrap: 'break-word',
    lineHeight: '130%',
    fontSize: theme.typography.pxToRem(18),
    color: black,
  },
  location: {
    lineHeight: '130%',
    fontSize: theme.typography.pxToRem(14),
    color: darkGray,
  },
  link: {
    color: blueMain,
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '130%',
  },
}));

const EductionItem = ({ item, handleEdit = null, RemoveComponent = null, guest = false, isUniversity = false }) => {
  const [hovered, setHovered] = useState(false);
  const { id, imagePath = '', name, faculty, speciality, city, expirationYear, typeName } = item;

  const classes = useStyles({ isUniversity });

  return (
    <Box className={classes.root} onMouseLeave={() => setHovered(false)} onMouseEnter={() => setHovered(true)}>
      <Grid container spacing={2} wrap="nowrap" alignItems={isUniversity ? 'flex-start' : 'center'}>
        <Grid item>
          <RoundImgIcon imageSrc={imagePath} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Grid container spacing={1}>
            {!!expirationYear && (
              <Grid item xs={12}>
                <Typography className={classes.label}>{expirationYear} год окончания</Typography>
              </Grid>
            )}
            {isUniversity && (
              <Grid item xs={12}>
                <Typography className={classes.type}>{typeName}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography className={classes.name}>{name}</Typography>
            </Grid>
            {!!faculty && (
              <Grid item xs={12}>
                <Typography className={classes.label} component="p">
                  Факультет:{' '}
                  <Typography className={classes.labelBlack} component="span">
                    {faculty}
                  </Typography>
                </Typography>
              </Grid>
            )}
            {!!speciality && (
              <Grid item xs={12}>
                <Typography className={classes.label} component="p">
                  Специализация:{' '}
                  <Typography className={classes.labelBlack} component="span">
                    {speciality}
                  </Typography>
                </Typography>
              </Grid>
            )}
            {!!city && (
              <Grid item xs={12}>
                <Typography className={classes.label} component="p">
                  Город:{' '}
                  <Typography className={classes.labelBlack} component="span">
                    {city}
                  </Typography>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {hovered && !guest && (
        <EditAndDeleteIcons handleEditClick={() => handleEdit(id)} RemoveComponent={RemoveComponent} />
      )}
    </Box>
  );
};

export default EductionItem;
