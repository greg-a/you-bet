import React, { useContext } from 'react';
import AuthContext from '../contexts/authContext';

const useAuth = () => {
  const { userInfo } = useContext(AuthContext);
  return { userInfo };
}

export default useAuth;
