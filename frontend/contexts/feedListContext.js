import React, { createContext, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useFollowList from '../hooks/useFollowList';
import { getAllBets } from '../services';

export const feedListContext = createContext();
const { Provider } = feedListContext;

export const FeedListProvider = ({ children }) => {
  const { userInfo } = useAuth();
  const { followList } = useFollowList();
  const [feedList, setFeedList] = useState([]);

  const refreshFeedList = async () => {
    try {
      const { data } = await getAllBets();
      setFeedList(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    if (userInfo) refreshFeedList();
  }, [userInfo, followList]);

  return (
    <Provider value={{ feedList, refreshFeedList }}>
      {children}
    </Provider>
  );
};
