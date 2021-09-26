import React, { createContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { getProfileBets } from '../services';

export const profileFeedContext = createContext();
const { Provider } = profileFeedContext;

export const ProfileFeedProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { username } = router.query;
  const [profileFeed, setProfileFeed] = useState([]);
  const [profileInfo, setProfileInfo] = useState();

  const refreshProfileFeed = async () => {
    try {
      const { data: { bets, profileInfo } } = await getProfileBets(username);
      setProfileFeed(bets);
      setProfileInfo(profileInfo);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Provider value={{ profileFeed, profileInfo, refreshProfileFeed }}>
      {children}
    </Provider>
  );
};
