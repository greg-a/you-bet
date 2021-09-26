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
import { FollowListProvider } from '../contexts/followListContext';
import { ProfileFeedProvider } from '../contexts/profileFeedContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [jwToken, setJWToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  axios.defaults.headers.common['Authorization-jwt'] = `JWT ${jwToken}`;

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
    setIsLoading(false);
  };

  useEffect(() => {
    if (jwToken && !userInfo) return handleAutoLogin();
  }, [jwToken]);

  useEffect(() => {
    setJWToken(getCookie('JWToken'));
    setIsLoading(false)
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
      <AuthContext.Provider value={{ userInfo, setUserInfo, setJWToken }}>
        <SnackbarProvider>
          <FollowListProvider>
            <FeedListProvider>
              <ProfileFeedProvider>
                <SelectedBetProvider>
                  <AppBarLogo />
                  <div style={{ marginTop: 50 }} />
                  <Component {...pageProps} />
                  {userInfo && (
                    <ActionButton />
                  )}
                </SelectedBetProvider>
              </ProfileFeedProvider>
            </FeedListProvider>
          </FollowListProvider>
        </SnackbarProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default MyApp;
