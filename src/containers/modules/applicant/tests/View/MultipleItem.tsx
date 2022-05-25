import { useState } from 'react';

import { Box, Grid, Typography, Hidden, useMediaQuery } from '@mui/material';

import Layout from 'containers/layout/main';
import PrevLink from 'components/PrevLink';
import { getTestUserData } from 'utils/common';
import Button from 'components/Button';

import { viewStyles } from './style';
import AccordionItem from './components/AccordionItem';

const MultipleItem = ({ test, reportLink }) => {
  const [expanded, setExpanded] = useState('');
  const classes = viewStyles();
  const userData = getTestUserData(test.items);
  const isMobile = useMediaQuery<any>((theme) => theme.breakpoints.down('sm'));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Layout>
      <Box className={classes.content}>
        <Grid container spacing={5}>
          <Grid item sm={12} md={6}>
            <Box className={classes.left}>
              <Grid container spacing={isMobile ? 3 : 4}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <PrevLink link={'/applicant/tests/'} text={'Назад к тестам'} />
                    </Grid>
                    <Grid item xs={12} md={11}>
                      <Typography className={classes.title}>{test.title}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {test.items
                    .filter((item) => item.is_released)
                    .map((item, key) => (
                      <AccordionItem
                        testId={test.id}
                        item={item}
                        key={key}
                        expanded={expanded}
                        handleChange={handleChange}
                      />
                    ))}
                </Grid>
                {userData.status === 'Пройден' && (
                  <Grid item xs={8} sm={5}>
                    <Button fullWidth nextLink linkProps={{ href: reportLink }}>
                      Полный отчет
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
          <Hidden mdDown>
            <Grid item sm={12} md={6}>
              <Box className={classes.right}>
                <img src={test.image_big.original_url} alt="" />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Layout>
  );
};

export default MultipleItem;
