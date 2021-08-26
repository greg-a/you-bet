import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Backdrop, CircularProgress, Grid, ThemeProvider } from '@material-ui/core';
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
import { SelectedBetProvider } from '../contexts/selectedBetContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [jwToken, setJWToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  axios.defaults.headers.common['Authorization'] = `JWT ${jwToken}`;

  const handleAutoLogin = async () => {
    try {
      const { data } = await checkJWToken();
      if (data) {
        setUserInfo(data);
      } else {
        router.push('/login');
      }
    } catch (err) {
      router.push('/login');
    }
    setTimeout(() => setIsLoading(false), 500);
  };

  useEffect(() => {
    if (jwToken && !userInfo) return handleAutoLogin();
  }, [jwToken]);
  
  useEffect(() => {
    setJWToken(getCookie('JWToken'));
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) return (
    <ThemeProvider theme={Theme}>
      <Backdrop open>
        <Grid container style={{ textAlign: 'center', height: '80vh' }} justifyContent="center" alignContent="center">
          <AppBarLogo />
          <Grid item xs={12}>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      </Backdrop>
    </ThemeProvider>
  );
  return (
    <ThemeProvider theme={Theme}>
      <AuthContext.Provider value={{ userInfo, setUserInfo }}>
        <SnackbarProvider>
          <FeedListProvider>
            <SelectedBetProvider>
              <AppBarLogo />
              <div style={{ marginTop: 50 }} />
              <Component {...pageProps} />
              {userInfo && (
                <ActionButton />
              )}
            </SelectedBetProvider>
          </FeedListProvider>
        </SnackbarProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default MyApp;
