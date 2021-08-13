import React, { createContext, useEffect, useState } from 'react';
import { getAllBets } from '../services';

export const feedListContext = createContext();
const { Provider } = feedListContext;

export const FeedListProvider = ({children}) => {
  const [feedList, setFeedList] = useState([]);

  const updateFeedList = async () => {
    try {
    const { data } = await getAllBets();
    setFeedList(data);
    } catch (err) {
      alert(err.message);
      console.log(err)
    }
  };

  useEffect(() => {
    updateFeedList();
  }, []);

  return (
    <Provider value={{ feedList, updateFeedList }}>
      {children}
    </Provider>
  );
};
