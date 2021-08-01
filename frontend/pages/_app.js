import React, { createContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import Theme from '../styles/mui-theme';
import '../styles/globals.css'
import { getCookie } from '../utils/utils';
import { checkJWToken } from '../services';

function MyApp({ Component, pageProps }) {
  const AuthContext = createContext();
  const [jwToken, setJWToken] = useState();
  const [userInfo, setUserInfo] = useState();

  axios.defaults.headers.common['Authorization'] = `JWT ${jwToken}`;

  const handleAutoLogin = async () => {
    try {
      const { data } = await checkJWToken();
      setUserInfo(data);
    } catch (err) {
      window.location.href = '/login'
    }
  };

  useEffect(() => {
    if (jwToken && !userInfo) handleAutoLogin();
  }, [jwToken]);

  useEffect(() => {
    setJWToken(getCookie('JWToken'));
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <AuthContext.Provider value={{ userInfo }}>
        <SnackbarProvider>
          <Component {...pageProps} />
        </SnackbarProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp
