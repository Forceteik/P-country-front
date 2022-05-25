import { useRouter } from 'next/router';
import useAxios from 'axios-hooks';

import MBTI from 'containers/modules/applicant/tests/types/Mbti';
import Ability from 'containers/modules/applicant/tests/types/Ability';
import IQ from 'containers/modules/applicant/tests/types/IQ';
import Motivation from 'containers/modules/applicant/tests/types/Motivation';
import { OverlayLoader } from 'components/Loaders';
import Social from 'containers/modules/applicant/tests/types/Social';
import CorpValues from 'containers/modules/applicant/tests/types/CorpValues';

import Emotion from './types/Emotion';
import Determination from './types/Determination';
import Leadership from './types/Leadership';

const Start = () => {
  const router: any = useRouter();
  const { id, itemId } = router.query;
  const [{ data, loading }] = useAxios(`/tests/${id}`);

  if (loading) {
    return <OverlayLoader />;
  }

  let testItem = null;

  if (data.data.items.length === 1) {
    testItem = data.data.items[0];
  }

  if (data.data.items.length > 1) {
    testItem = data.data.items.find((item) => item.id === parseInt(itemId));
  }

  if (!testItem) {
    return null;
  }
  if (testItem.type === 'mbti') {
    return <MBTI />;
  }

  if (testItem.type === 'leadership') {
    return <Leadership />;
  }

  if (testItem.type === 'motivation') {
    return <Motivation />;
  }

  if (testItem.type === 'ability') {
    const group = testItem.testable.group;
    return <Ability group={group} />;
  }

  if (testItem.type === 'iq') {
    const itemId = testItem.testable.id;
    return <IQ itemId={itemId} />;
  }

  if (testItem.type === 'determination') {
    return <Determination />;
  }

  if (testItem.type === 'hall') {
    return <Emotion />;
  }

  if (testItem.type === 'gilford') {
    const itemId = testItem.testable.id;
    return <Social itemId={itemId} />;
  }

  if (testItem.type === 'corp_values') {
    return <CorpValues />;
  }

  return null;
};

export default Start;
