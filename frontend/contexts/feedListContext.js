import React, { createContext, useEffect, useState } from 'react';
import { getAllBets } from '../services';

export const feedListContext = createContext();
const { Provider } = feedListContext;

export const FeedListProvider = ({children}) => {
  const [feedList, setFeedList] = useState([]);

  const refreshFeedList = async () => {
    try {
    const { data } = await getAllBets();
    setFeedList(data);
    } catch (err) {
      alert(err.message);
      console.log(err)
    }
  };

  useEffect(() => {
    refreshFeedList();
  }, []);

  return (
    <Provider value={{ feedList, refreshFeedList }}>
      {children}
    </Provider>
  );
};
