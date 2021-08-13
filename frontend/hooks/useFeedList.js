import React, { useContext } from 'react';
import { feedListContext } from '../contexts/feedListContext';

const useFeedList = () => {
  const { feedList, updateFeedList } = useContext(feedListContext);
  return { feedList, updateFeedList };
};

export default useFeedList;
