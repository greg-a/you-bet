import React, { useContext } from 'react';
import AuthContext from '../contexts/authContext';

const useAuth = () => {
  const { userInfo, setJWToken } = useContext(AuthContext);
  return { userInfo, setJWToken };
}

export default useAuth;
