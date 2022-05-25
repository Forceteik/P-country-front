import Image from 'next/image';
import Head from 'next/head';
import { FacebookShareButton, VKShareButton } from 'next-share';

import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/material';

const useStyles = makeStyles<any, any>((theme) => ({
  socialList: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      justifyContent: ({ report }) => (report ? 'flex-start' : 'center'),
    },
  },
  socialItem: {
    'cursor': 'pointer',
    'transition': 'all 0.3s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
  },
}));

const SocialList = ({ report = false }) => {
  const classes = useStyles({ report });
  const url = 'https://stagefront.talanty.online/applicants/198/reports/mbti';
  const title = 'Тестирование типа личности и командной роли';
  // const description = 'Ура!!! я прошел тестирование типа личности и командной роли';
  const img = 'https://p-strana.ru/images/snippet_pStrany.jpg';

  return (
    <Box className={classes.socialList}>
      <Head>
        <title>Your Website Title</title>
        <meta property="og:url" content="https://www.your-domain.com/your-page.html" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Your Website Title" />
        <meta property="og:description" content="Your description" />
        <meta property="og:image" content="https://www.your-domain.com/path/image.jpg" />
      </Head>
      <Box className={classes.socialItem}>
        <FacebookShareButton
          url={'https://github.com/next-share'}
          quote={'next-share is a social share buttons for your next React apps.'}
          hashtag={'#nextshare'}
        >
          <Image src="/images/icons/social/facebook-2.svg" alt="facebook" width="52" height="52" />
        </FacebookShareButton>
      </Box>
      <Box className={classes.socialItem}>
        <VKShareButton
          url={url}
          image={img}
          title={title}
          // description={description}
        >
          <Image src="/images/icons/social/vk-2.svg" alt="в контакте" width="52" height="52" />
        </VKShareButton>
      </Box>
      <Box className={classes.socialItem}>
        <Image
          src="/images/icons/social/copy.svg"
          alt="скопировать ссылку"
          width="52"
          height="52"
          onClick={() => navigator.clipboard.writeText(url)}
        />
      </Box>
    </Box>
  );
};

export default SocialList;
