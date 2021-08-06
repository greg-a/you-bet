import React, { createContext, useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Grid, NoSsr, ThemeProvider } from '@material-ui/core';
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
  const [isLoading, setIsLoading] = useState(true);

  axios.defaults.headers.common['Authorization'] = `JWT ${jwToken}`;

  const handleRedirect = (path) => {
    if (window.location.pathname !== path) window.location.href = path;
  };

  const handleAutoLogin = async () => {
    try {
      const { data } = await checkJWToken();
      if (data) {
        setUserInfo(data);
      } else {
        handleRedirect('/login');
      }
    } catch (err) {
      handleRedirect('/login');
    }
    setTimeout(() => setIsLoading(false), 500);
  };

  useEffect(() => {
    if (jwToken && !userInfo) handleAutoLogin();
  }, [jwToken]);

  useEffect(() => {
    setJWToken(getCookie('JWToken'));
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) return (
    <Backdrop open>
      <Grid container style={{ textAlign: 'center', height: '80vh' }} justifyContent="center">
        <NoSsr>
          <Grid item md={12} className="logo-font">
            YouBet
          </Grid>
        </NoSsr>
        <Grid item md={12}>
          <CircularProgress color="inherit" />
        </Grid>
      </Grid>
    </Backdrop>
  );
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
