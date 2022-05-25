import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

import { Box, Hidden, List, ListItem, ListItemText, Grid, useMediaQuery } from '@mui/material';

import { SecondaryButton } from 'components/Button';
import BurgerMenu from 'containers/layout/main/components/BurgerMenu';
import HeaderAvatarMenu from 'containers/layout/main/components/HeaderAvatarMenu';
import { useSession } from 'context/UserContext';
import Badge from 'components/Bagde';
import HeaderLogo from 'components/HeaderLogo';
import headerStyle from 'containers/modules/common/styles/headerStyle';
import { MadFormatter } from 'utils/formatters';
import { useBalance } from 'context/BalanceContext';

const generateMenuData = (extraData) => [
  {
    role: 'employer',
    profileLink: '/employer/profile',
    items: [
      {
        link: '/employer/profile',
        label: 'Профиль',
      },
      {
        link: '/employer/responses',
        label: 'Отклики',
        badge: extraData?.badge || 0,
      },
      {
        link: '/employer/profile/settings',
        label: 'Настройки',
      },
      {
        link: '/employer/balance',
        label: 'Баланс',
        balance: MadFormatter.toCurrency(extraData?.employerPaymentBalance, '₽') || 0,
      },
    ],
    mobile: {
      items: [
        { label: 'Профиль', link: '/employer/profile' },
        // { label: 'Поиск сотрудников', link: '/employer/applicants' },
        { label: 'Отклики', link: '/employer/responses', badge: extraData?.badge || 0 },
        { label: 'Настройки', link: '/employer/profile/settings' },
        { label: 'Баланс', link: '/employer/balance' },
      ],
      showLogout: true,
    },
    showMobileLogout: true,
    // mainButton: {
    //   link: '/employer/applicants',
    //   label: 'Поиск сотрудников',
    // },
    showAvatar: true,
  },
  {
    role: 'employee',
    profileLink: '/applicant',
    items: [
      {
        link: '/applicant',
        label: 'Профиль',
      },
      {
        link: '/applicant/tests',
        label: 'Тесты',
      },
      {
        link: '/applicant/responses',
        label: 'Отклики',
        badge: extraData?.badge || 0,
      },
      {
        link: '/applicant/profile/settings',
        label: 'Настройки',
      },
    ],
    mobile: {
      items: [
        {
          link: '/applicant',
          label: 'Профиль',
        },
        {
          link: '/vacancies',
          label: 'Поиск вакансий',
        },
        {
          link: '/applicant/tests',
          label: 'Тесты',
        },
        {
          link: '/applicant/responses',
          label: 'Отклики',
          badge: extraData?.badge || 0,
        },
      ],
      showLogout: true,
    },
    mainButton: {
      link: '/vacancies',
      label: 'Поиск вакансий',
    },
    showAvatar: true,
  },
  {
    role: 'guest',
    profileLink: `/`,
    items: [],
    mobile: {
      items: [
        {
          link: '/register',
          label: 'Зарегистрироваться',
        },
      ],
      showLogout: false,
    },
    mainButton: {
      link: '/register',
      label: 'Зарегистрироваться',
    },
    showAvatar: false,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Header = ({ currentPage = null, user = null }) => {
  const classes = headerStyle();
  const isMd = useMediaQuery<any>((theme) => theme.breakpoints.down('lg'));
  const role = useSession().role || 'guest';
  const { currentUser } = useSession();
  const router = useRouter();
  const { employerPaymentBalance } = useBalance();

  const { id } = router.query;

  const menuData = generateMenuData({
    badge: currentUser?.newResponses || null,
    userId: currentUser?.id || id,
    employerPaymentBalance: employerPaymentBalance,
  }).find((item) => item.role === role);

  return (
    <Box className={classes.header}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className={classes.logo}>
          <HeaderLogo link={menuData.profileLink} />
        </Grid>
        <Hidden mdDown>
          <Grid item xs={6} lg={7}>
            <Box className={classes.menu}>
              <List disablePadding>
                {menuData.items.map((item, key) => {
                  if (item.badge) {
                    return (
                      <ListItem key={key}>
                        <Badge badgeContent={`+${item.badge}`}>
                          <Link href={item.link}>
                            <a>
                              <ListItemText
                                primary={item.label}
                                className={currentPage === item.label ? classes.active : classes.notActive}
                              />
                            </a>
                          </Link>
                        </Badge>
                      </ListItem>
                    );
                  }
                  return (
                    <ListItem key={key}>
                      <Link href={item.link}>
                        <a>
                          <ListItemText
                            secondary={item.balance ? `(${item.balance})` : null}
                            primary={item.label}
                            className={currentPage === item.label ? classes.active : classes.notActive}
                          />
                        </a>
                      </Link>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Grid>
        </Hidden>
        <Hidden mdDown>
          <Grid item xs={4} lg={3}>
            <Grid container alignItems="center" justifyContent="flex-end" spacing={isMd ? 2 : 5} wrap="nowrap">
              {menuData.mainButton && (
                <Grid item xs={8}>
                  <SecondaryButton nextLink linkProps={{ href: menuData.mainButton.link }} small fullWidth>
                    {menuData.mainButton.label}
                  </SecondaryButton>
                </Grid>
              )}
              {menuData.showAvatar && (
                <Grid item>
                  <HeaderAvatarMenu role={role} />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item>
            <BurgerMenu data={menuData.mobile} link={menuData.profileLink} />
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
};

export default Header;
