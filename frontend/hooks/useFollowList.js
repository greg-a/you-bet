import React, { useContext } from 'react';
import { followListContext } from '../contexts/followListContext';

const useFollowList = () => {
  const { followList, refreshFollowList } = useContext(followListContext);
  return { followList, refreshFollowList };
};

export default useFollowList;
