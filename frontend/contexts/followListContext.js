import React, { createContext, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { getFollowList } from '../services';

export const followListContext = createContext();
const { Provider } = followListContext;

export const FollowListProvider = ({ children }) => {
  const { userInfo } = useAuth();
  const [followList, setFollowList] = useState([]);

  const refreshFollowList = async () => {
    try {
      const { data } = await getFollowList();
      setFollowList(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (userInfo) refreshFollowList();
  }, [userInfo]);

  return (
    <Provider value={{ followList, refreshFollowList }}>
      {children}
    </Provider>
  );
};
