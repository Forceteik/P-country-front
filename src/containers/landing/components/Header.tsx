import Link from 'next/link';

import { Box, Grid, Hidden, List, ListItem, ListItemText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { useSession } from 'context/UserContext';
import Drawer from 'containers/landing/components/Drawer';
import { black, blueMain, darkGray } from 'styles/colorPalette';
import HeaderLogo from 'components/HeaderLogo';
import { FlexibleStyleButton } from 'components/Button';

import Container from './Container';

const useStyles = makeStyles<any>((theme) => ({
  header: {
    backgroundColor: 'transparent',
    padding: '21px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: '6px 0px',
    },
  },
  logoBtn: {
    minWidth: 162,
    width: 'fit-content',
  },
  employerBtn: {
    width: 260,
    marginRight: 16,
  },
  menu_list: {
    'display': 'flex',
    '& .MuiListItem-gutters': {
      marginLeft: theme.spacing(1.8),
      marginRight: theme.spacing(1.8),
    },
    '& .MuiListItemText-primary': {
      'transition': 'all 0.3s',
      'fontSize': theme.typography.pxToRem(14),
      'fontFamily': 'inter-med',
      'letterSpacing': '0.02em',
      'color': darkGray,
      '&:hover': {
        color: black,
      },
    },
  },
}));

const Header = ({ withoutPadding = false }) => {
  const classes = useStyles({ withoutPadding });
  const { currentUser } = useSession();

  return (
    <Box className={classes.header} id="top">
      <Container withoutPadding={withoutPadding}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <HeaderLogo link={'/'} />
          </Grid>
          <Hidden mdDown>
            <Grid item xs={10}>
              <Grid container spacing={3} alignItems="center" justifyContent="flex-end">
                <Grid item>
                  <List classes={{ root: classes.menu_list }} disablePadding>
                    <ListItem>
                      <Link href={'/team'}>
                        <a>
                          <ListItemText primary="Команда" />
                        </a>
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link href={'/blog'}>
                        <a>
                          <ListItemText primary="Блог" />
                        </a>
                      </Link>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item>
                  <Grid container>
                    {currentUser && currentUser.type !== 'employer' ? null : (
                      <Grid item className={classes.employerBtn}>
                        {currentUser && currentUser.type === 'employer' ? (
                          <FlexibleStyleButton
                            fullWidth
                            backgroundColor="#fff"
                            backgroundHover="#fff"
                            colorHover={blueMain}
                            nextLink
                            linkProps={{ href: '/employer/vacancies/create' }}
                          >
                            Разместить вакансию
                          </FlexibleStyleButton>
                        ) : (
                          <FlexibleStyleButton
                            fullWidth
                            backgroundColor="#fff"
                            backgroundHover="#fff"
                            colorHover={blueMain}
                            nextLink
                            linkProps={{ href: '/employer/register' }}
                          >
                            Разместить вакансию
                          </FlexibleStyleButton>
                        )}
                      </Grid>
                    )}

                    <Grid item className={classes.logoBtn}>
                      {currentUser ? (
                        <FlexibleStyleButton
                          fullWidth
                          textColor="#fff"
                          nextLink
                          linkProps={
                            currentUser.type === 'employer' ? { href: '/employer/profile' } : { href: '/applicant' }
                          }
                        >
                          Личный кабинет
                        </FlexibleStyleButton>
                      ) : (
                        <FlexibleStyleButton fullWidth textColor="#fff" nextLink linkProps={{ href: '/register' }}>
                          Зарегистрироваться
                        </FlexibleStyleButton>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item>
              <Drawer />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
