import React, { useContext } from 'react';
import { feedListContext } from '../contexts/feedListContext';

const useFeedList = () => {
  const { feedList, refreshFeedList } = useContext(feedListContext);
  return { feedList, refreshFeedList };
};

export default useFeedList;
