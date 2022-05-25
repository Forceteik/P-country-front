import React from 'react';
import isEmpty from 'lodash.isempty';
import { useRouter } from 'next/router';

import { Box, Checkbox, FormControlLabel } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import CheckBoxIcon from 'components/icons/CheckBoxIcon';
import CheckBoxIconCheck from 'components/icons/CheckBoxIconCheck';
import { generateFinalQuery } from 'utils/common';

const useStyles = makeStyles<any>((theme) => ({
  checkBox: {
    'display': 'flex',
    'flexDirection': 'column',
    '& svg': {
      width: 24,
      height: 24,
      marginRight: theme.spacing(0.5),
    },
    [theme.breakpoints.down('md')]: {
      '& .MuiFormControlLabel-root': {
        display: 'block',
      },
    },
  },
}));

const RenderExperience = ({ experiences }) => {
  const classes = useStyles();
  const router = useRouter();

  const handleExperiences = async (e, itemId) => {
    itemId = itemId.toString();
    const finalQuery = generateFinalQuery(router, itemId, 'experience');

    if (isEmpty(finalQuery)) {
      await router.replace(router.pathname);
    } else {
      await router.push({
        query: finalQuery,
      });
    }
  };

  return (
    <Box className={classes.checkBox}>
      {experiences.map((item, key) => (
        <FormControlLabel
          key={key}
          control={
            <Checkbox
              disableRipple
              icon={<CheckBoxIcon />}
              checkedIcon={<CheckBoxIconCheck />}
              checked={router.query['experience[]']?.includes(item.id.toString())}
              onChange={(e) => handleExperiences(e, item.id)}
            />
          }
          label={item.name}
        />
      ))}
    </Box>
  );
};

export default RenderExperience;
