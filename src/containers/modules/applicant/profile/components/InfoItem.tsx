import { useEffect, useState } from 'react';

import { Box, Typography, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { black, blueMain } from 'styles/colorPalette';
import Star from 'components/icons/Star';
import RoundImgIcon from 'components/RoundImgIcon';
import EditAndDeleteIcons from 'components/EditAndDeleteIcons';

export const useStyles = makeStyles<any, any>((theme) => ({
  label: {
    wordWrap: 'break-word',
    lineHeight: '130%',
    marginRight: theme.spacing(0.5),
    color: ({ priority }) => (priority ? blueMain : black),
    marginBottom: ({ contact }) => (contact ? theme.spacing(0.5) : 0),
  },
  value: {
    wordWrap: 'break-word',
    fontSize: theme.typography.pxToRem(12),
    color: '#535C73',
    lineHeight: '130%',
    userSelect: 'text',
  },
}));

const InfoItem = ({
  item,
  handleEdit = null,
  RemoveComponent = null,
  guest = false,
  isMobile,
  setEditItem = null,
  editItem = null,
}) => {
  const [hovered, setHovered] = useState(false);
  const { id, label = 'Телефон', value, imagePath = '', priority = false, link } = item;
  const classes = useStyles({ priority });

  // На мобилках обязательно показываем контролы, иначе пользователь не сможет удалить или изменить контакты
  useEffect(() => {
    if (isMobile) {
      setHovered(true);
    }
  }, [isMobile]);

  const handleEditClick = (e) => {
    e.preventDefault();
    handleEdit(id);
    if (editItem) {
      setEditItem(editItem);
    }
  };

  return (
    <a href={link} target="_blank" rel="nofollow norefferer noindex noreferrer">
      <Box position="relative" onMouseLeave={() => setHovered(false)} onMouseEnter={() => setHovered(true)}>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item>
            <RoundImgIcon imageSrc={imagePath} />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Box display="flex" alignItems="center" marginBottom={0.5}>
              <Typography className={classes.label}>{label}</Typography>
              {priority && <Star />}
            </Box>
            <Typography className={classes.value} noWrap>
              {value}
            </Typography>
          </Grid>
        </Grid>
        {hovered && !guest && (
          <EditAndDeleteIcons handleEditClick={handleEditClick} RemoveComponent={RemoveComponent} />
        )}
      </Box>
    </a>
  );
};

export default InfoItem;
