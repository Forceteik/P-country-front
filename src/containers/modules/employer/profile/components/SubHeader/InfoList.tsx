import Link from 'next/link';

import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import infoListStyle from 'containers/modules/common/styles/infoListStyle';

const InfoList = ({ employer, isGuest, loading = false }) => {
  const infoListClasses = infoListStyle();

  if (loading || !employer) {
    return (
      <Box className={infoListClasses.list}>
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            <Skeleton variant="text" width={100} />
          </Typography>
        </Box>
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            <Skeleton variant="text" width={100} />
          </Typography>
        </Box>
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            <Skeleton variant="text" width={100} />
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={infoListClasses.list}>
      {employer.city ? (
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            {employer.city.name}
          </Typography>
        </Box>
      ) : (
        !isGuest && (
          <Box className={infoListClasses.listItems}>
            <Link href={'/employer/profile/settings'}>
              <a>
                <Typography component="span" className={infoListClasses.infoItem_null}>
                  Укажите город
                </Typography>
              </a>
            </Link>
          </Box>
        )
      )}

      {employer.activity ? (
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            <Typography component="span" className={infoListClasses.infoItem_null}>
              Cфера деятельности:{' '}
            </Typography>
            {employer.activity.name}
          </Typography>
        </Box>
      ) : (
        !isGuest && (
          <Box className={infoListClasses.listItems}>
            <Link href={'/employer/profile/settings'}>
              <a>
                <Typography component="span" className={infoListClasses.infoItem_null}>
                  Укажите сферу деятельности
                </Typography>
              </a>
            </Link>
          </Box>
        )
      )}

      {employer.company_size ? (
        <Box className={infoListClasses.listItems}>
          <Typography component="span" className={infoListClasses.infoItem}>
            <Typography component="span" className={infoListClasses.infoItem_null}>
              Размер компании:{' '}
            </Typography>
            {employer.company_size.name}
          </Typography>
        </Box>
      ) : (
        !isGuest && (
          <Box className={infoListClasses.listItems}>
            <Link href={'/employer/profile/settings'}>
              <a>
                <Typography component="span" className={infoListClasses.infoItem_null}>
                  Укажите размер компании
                </Typography>
              </a>
            </Link>
          </Box>
        )
      )}
    </Box>
  );
};

export default InfoList;
