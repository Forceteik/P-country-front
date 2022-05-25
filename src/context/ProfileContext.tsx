import { createContext, useContext, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { LinearLoader } from 'components/Loaders';
import { generateReplainSnippet } from 'utils/common';

const ProfileContext = createContext({
  currentUser: null,
  userId: null,
  role: null,
  refetch: null,
  refetchLoading: null,
  profileLoading: false,
  rejections: 0,
  invitations: 0,
  employmentStatus: null,
});

export const useProfile = () => useContext(ProfileContext);

const ProfileProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [rejections, setRejections] = useState(0);
  const [invitations, setInvitations] = useState(0);
  const [employmentStatus, setEmploymentStatus] = useState(null);

  const [loading, setLoading] = useState(true);

  const [{ loading: profileLoading }, getProfile] = useAxios('/profile', { manual: true, useCache: true });

  const handleRefetch = async (options = null) => {
    const redirectPath = options?.redirectPath || null;
    const onRefetched = options?.onRefetched || null;

    getProfile()
      .then(({ data }) => {
        const userInfo = {
          ...data?.data,
          views: data?.views,
          responses: data?.responses,
          newResponses: data?.new_responses,
          competencyGroup: data.competency_group || [],
          createTime: data.created_at,
          newEmploymentStatus: data.employment_status,
        };
        setCurrentUser(userInfo);
        setInvitations(data.invitations);
        setRejections(data.rejections);
        setEmploymentStatus(data.employment_status);
        if (redirectPath) {
          router.push(redirectPath);
          location.reload(); //Нужно для того, что бы виджер Replain мог перезапустить сессию
        }
        if (onRefetched) {
          onRefetched();
        }
      })
      .catch(() => {
        setCurrentUser(null);
      });
  };

  useEffect(() => {
    getProfile()
      .then(({ data }) => {
        const userInfo = {
          ...data?.data,
          views: data?.views,
          responses: data?.responses,
          newResponses: data?.new_responses,
          competencyGroup: data.competency_group || [],
          createTime: data.created_at,
          employmentStatus: data.employment_status,
        };
        setCurrentUser(userInfo);
        setInvitations(data.invitations);
        setRejections(data.rejections);
        setEmploymentStatus(data.employment_status);
        setLoading(false);
      })
      .catch(() => {
        setCurrentUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LinearLoader progress={!loading} />;
  }
  let finalUser = null;
  let userId = null;
  let role = null;
  if (currentUser) {
    finalUser = currentUser;
    userId = currentUser.id;
    role = currentUser.type;
  }

  return (
    <ProfileContext.Provider
      value={{
        currentUser: finalUser,
        userId,
        role,
        invitations,
        employmentStatus,
        rejections,
        refetchLoading: loading,
        profileLoading: profileLoading,
        refetch: handleRefetch,
      }}
    >
      <Script
        type="text/javascript"
        id="replain-snippet"
        dangerouslySetInnerHTML={{ __html: generateReplainSnippet(finalUser) }}
      />
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
