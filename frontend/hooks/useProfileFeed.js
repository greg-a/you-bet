import React, { useContext } from 'react';
import { profileFeedContext } from '../contexts/profileFeedContext';

const useProfileFeed = () => {
  const { profileFeed, profileInfo, refreshProfileFeed } = useContext(profileFeedContext);
  return { profileFeed, profileInfo, refreshProfileFeed };
};

export default useProfileFeed;
