import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import SingleTestSkeleton from 'components/skeletons/SingleTestSkeleton';

import SingleItem from './SingleItem';
import MultipleItem from './MultipleItem';

const ViewTest = () => {
  const router: any = useRouter();
  const [reportLink, setReportLink] = useState('');
  const [{ data, loading }] = useAxios(`/tests/${router.query.id}`, { useCache: false });

  const createReportLink = () => {
    switch (data?.data.items[0].type) {
      case 'mbti': {
        setReportLink('/applicant/mbti/report');
        break;
      }
      case 'determination': {
        setReportLink('/applicant/determination/report');
        break;
      }
      case 'motivation': {
        setReportLink('/applicant/motivation/report');
        break;
      }
      case 'hall': {
        setReportLink('/applicant/hall/report');
        break;
      }
      case 'social': {
        setReportLink('/applicant/social/report');
        break;
      }
      case 'iq': {
        setReportLink('/applicant/iq/report');
        break;
      }
      case 'leadership': {
        setReportLink('/applicant/leadership/report');
        break;
      }
      // case 8: {
      //   setReportLink('');
      //   break;
      // }
      default: {
        setReportLink('/');
      }
    }
  };

  useEffect(() => {
    createReportLink();
  }, [loading]);

  if (loading) {
    return <SingleTestSkeleton />;
  }

  if (data.data.items.length === 1) {
    return <SingleItem test={data.data} reportLink={reportLink} />;
  }

  if (data.data.items.length > 1) {
    return <MultipleItem test={data.data} reportLink={reportLink} />;
  }
  return <Box>Тест не найден</Box>;
};

export default ViewTest;
