import React, { createContext, useEffect, useState } from 'react';
import { getAllBets, getFollowList } from '../services';

export const feedListContext = createContext();
const { Provider } = feedListContext;

export const FeedListProvider = ({ children }) => {
  const [feedList, setFeedList] = useState([]);
  const [followList, setFollowList] = useState();

  const refreshFeedList = async () => {
    try {
      const { data } = await getAllBets();
      setFeedList(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const refreshFollowList = async () => {
    try {
      const { data } = await getFollowList();
      setFollowList(data);
    } catch {
      alert(err.message);
    }
  };

  useEffect(() => {
    refreshFeedList();
    refreshFollowList();
  }, []);

  return (
    <Provider value={{ feedList, refreshFeedList, followList, refreshFollowList }}>
      {children}
    </Provider>
  );
};
