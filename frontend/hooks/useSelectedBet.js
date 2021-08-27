import React, { useContext } from 'react';
import { selectedBetContext } from '../contexts/selectedBetContext';

const useSelectedBet = () => {
  const { selectedBet, setSelectedBet } = useContext(selectedBetContext);
  return { selectedBet, setSelectedBet };
};

export default useSelectedBet;
