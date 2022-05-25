import { Box } from '@mui/material';

import { getUserViewRoles } from 'utils/common';
import profileStyle from 'containers/modules/common/profile/style';
import { useProfile } from 'context/ProfileContext';

import ApplicantDescr from '../../../common/profile/About/ApplicantDescr';

const About = ({ title, user = null }) => {
  const currentUserFromSession = useProfile().currentUser;
  const currentUser = user || currentUserFromSession;
  const data = currentUser.employer?.about_company;
  const commonStyle = profileStyle();

  const viewRole = getUserViewRoles({ user, currentUser: currentUserFromSession });
  const isOwner = viewRole.isOwner;

  return (
    <Box className={commonStyle.box} component="section">
      <ApplicantDescr title={title} isOwner={isOwner} employer={true} data={data} labelForm="Расскажите о компании" />
    </Box>
  );
};

export default About;
