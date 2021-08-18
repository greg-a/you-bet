import React, { createContext, useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Grid, NoSsr, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import Theme from '../styles/mui-theme';
import '../styles/globals.css'
import { getCookie } from '../utils/utils';
import { checkJWToken } from '../services';
import ActionButton from '../components/Nav/ActionButton/ActionButton';
import { FeedListProvider } from '../contexts/feedListContext';
import AppBarLogo from '../components/Nav/AppBar/AppBar';
import AuthContext from '../contexts/authContext';

function MyApp({ Component, pageProps }) {
  const [jwToken, setJWToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  axios.defaults.headers.common['Authorization'] = `JWT ${jwToken}`;

  const handleRedirect = (path) => {
    if (window.location.pathname === '/signup') return null;
    if (window.location.pathname !== path) return window.location.href = path;
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
        <AppBarLogo />
        <Grid item md={12}>
          <div style={{ marginTop: 250 }} />
          <CircularProgress color="inherit" />
        </Grid>
      </Grid>
    </Backdrop>
  );
  return (
    <ThemeProvider theme={Theme}>
      <AuthContext.Provider value={{ userInfo }}>
        <SnackbarProvider>
          <FeedListProvider>
            <AppBarLogo />
            <div style={{ marginTop: 50 }} />
            <Component {...pageProps} />
            {userInfo && (
              <ActionButton />
            )}
          </FeedListProvider>
        </SnackbarProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default MyApp;
