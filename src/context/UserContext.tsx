import { createContext, useContext, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import Script from 'next/script';

import { LinearLoader } from 'components/Loaders';
import { APP_ROUTES } from 'constants/routes';
import { generateReplainSnippet } from 'utils/common';

const UserContext = createContext({
  currentUser: null,
  userId: null,
  role: null,
  refetch: null,
  logout: null,
  refetchLoading: null,
  profileLoading: false,
  setCurrentUser: null,
});

export const useSession = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(true);
  // const [{ data, loading, error }, refetch] = useAxios("profile");
  const [{ loading: profileLoading }, getUser] = useAxios('/user', { manual: true });

  const handleRefetch = async (options = null) => {
    const redirectPath = options?.redirectPath || null;
    const onRefetched = options?.onRefetched || null;
    const token = localStorage.getItem('talantyLoginToken');

    try {
      if (token) {
        getUser()
          .then(({ data }) => {
            const userInfo = {
              ...data?.data,
              responses: data?.responses,
              newResponses: data?.new_responses,
              views: data?.views,
            };
            setCurrentUser(userInfo);
            if (redirectPath) {
              router.push(redirectPath);
              location.reload(); //Нужно для того, что бы виджер Replain мог перезапустить сессию
            }
            if (onRefetched) {
              onRefetched();
            }
          })
          .catch((e) => {
            //это происходит когда токен есть но он недействителен
            if (e.code === 'unauthenticated') {
              localStorage.removeItem('talantyLoginToken');
              setLoading(false);
              if (!APP_ROUTES.some((item) => item.path === router.pathname)) {
                router.push('/auth');
              }
            }
          });
      } else {
        setCurrentUser(null);
      }

      // await refetch();
    } catch (e) {
      // Handle cancellation
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);

    // В зависимости от роли выбираем на какую страницу делать редирект
    // Ждем промис от реплейса, чтобы <Redicrect> в <ProtectedRoute> успел взять значения роли пользователя
    if (localStorage.getItem('talantyUserRole') === 'employee') {
      router.replace('/auth').finally(() => {
        localStorage.removeItem('talantyUserRole');
        localStorage.removeItem('talantyLoginToken');
      });
    } else {
      router.replace('/employer/auth').finally(() => {
        localStorage.removeItem('talantyUserRole');
        localStorage.removeItem('talantyLoginToken');
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('talantyLoginToken');
    if (token) {
      getUser()
        .then(({ data }) => {
          const userInfo = {
            ...data?.data,
            responses: data?.responses,
            newResponses: data?.new_responses,
            views: data?.views,
          };
          setCurrentUser(userInfo);
          setLoading(false);
        })
        .catch((e) => {
          //это происходит когда токен есть но он недействителен
          if (e.code === 'unauthenticated' || e.code === 'user_not_approved') {
            localStorage.removeItem('talantyLoginToken');
            setLoading(false);
            if (!APP_ROUTES.some((item) => item.path === router.pathname)) {
              router.push('/auth');
            }
          }
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let replainData: any = localStorage.getItem('REPLAIN_55ba37e4-744f-4958-a21e-eb8dbcd5261e');
    replainData = replainData ? JSON.parse(replainData) : {};
    if (replainData?.form?.name === undefined) {
      localStorage.setItem('REPLAIN_CROSSTAB_55ba37e4-744f-4958-a21e-eb8dbcd5261e', '');
      localStorage.setItem('REPLAIN_55ba37e4-744f-4958-a21e-eb8dbcd5261e', '');
    }
    // };
  }, [currentUser]);

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
    <UserContext.Provider
      value={{
        currentUser: finalUser,
        setCurrentUser: setCurrentUser,
        userId,
        role,
        refetchLoading: loading,
        profileLoading: profileLoading,
        refetch: handleRefetch,
        logout: handleLogout,
      }}
    >
      <Script
        type="text/javascript"
        id="replain-snippet"
        dangerouslySetInnerHTML={{ __html: generateReplainSnippet(finalUser) }}
      />
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
