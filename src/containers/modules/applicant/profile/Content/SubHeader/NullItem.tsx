import Link from 'next/link';
import cx from 'classnames';

import { Box, Typography } from '@mui/material';

import infoListStyle from 'containers/modules/common/styles/infoListStyle';

const NullItem = ({ text }) => {
  const infoListClasses = infoListStyle();
  return (
    <Box className={infoListClasses.listItems}>
      <Link href={'/applicant/profile/settings'}>
        <a>
          <Typography component="span" className={cx(infoListClasses.infoItem_null, infoListClasses.infoItem_link)}>
            {text}
          </Typography>
        </a>
      </Link>
    </Box>
  );
};

export default NullItem;
