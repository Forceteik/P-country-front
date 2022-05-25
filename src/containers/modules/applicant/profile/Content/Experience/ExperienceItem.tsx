import { useState } from 'react';

import { Grid, Typography, Box, Hidden } from '@mui/material';

import RoundImgIcon from 'components/RoundImgIcon';
import { calcExperienceDuration } from 'utils/formatters';
import EditAndDeleteIcons from 'components/EditAndDeleteIcons';

import { useStyles } from '../Education/EductionItem';

const ExperienceItem = ({ item, handleEdit = null, RemoveComponent = null, guest = false }) => {
  const classes = useStyles();
  const [hovered, setHovered] = useState(false);

  return (
    <Box onMouseLeave={() => setHovered(false)} onMouseEnter={() => setHovered(true)} position={'relative'}>
      <Grid container spacing={2} className={classes.wrap}>
        <Grid item xs={12} md={'auto'}>
          <Grid container spacing={1} alignItems="center" wrap="nowrap">
            <Grid item>
              <RoundImgIcon imageSrc={'/images/icons/college.png'} />
            </Grid>
            <Hidden mdUp>
              <Grid item>
                <Typography className={classes.label}>
                  {calcExperienceDuration(item.start_date, item.end_date)}
                </Typography>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12} md>
          <Grid container rowSpacing={1}>
            <Hidden mdDown>
              <Grid item xs={12}>
                <Typography className={classes.label}>
                  {calcExperienceDuration(item.start_date, item.end_date)}
                </Typography>
              </Grid>
            </Hidden>

            <Grid item xs={12}>
              <Typography className={classes.type}>{item.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container columnSpacing={2} alignItems="baseline">
                <Grid item>
                  <Typography className={classes.location}>{item.city.name}</Typography>
                </Grid>
                {item.site && (
                  <Grid item>
                    <a href={item.site} className={classes.link}>
                      {item.site}
                    </a>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.name}>{item.position}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.label}>Обязанности на рабочем месте: </Typography>
              <Typography className={classes.labelBlack}>{item.duties}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.label}>Главное достижение: </Typography>
              <Typography className={classes.labelBlack}>{item.achievement}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {hovered && !guest && (
        <EditAndDeleteIcons handleEditClick={() => handleEdit(item.id)} RemoveComponent={RemoveComponent} />
      )}
    </Box>
  );
};

export default ExperienceItem;
