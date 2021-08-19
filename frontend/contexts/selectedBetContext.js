import React, { createContext, useState } from 'react';

export const selectedBetContext = createContext();
const { Provider } = selectedBetContext;

export const SelectedBetProvider = ({ children }) => {
  const [selectedBet, setSelectedBet] = useState();

  return (
    <Provider value={{ selectedBet, setSelectedBet }}>
      {children}
    </Provider>
  );
};
