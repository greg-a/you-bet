import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Grid, NoSsr, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import BasicTextInput from '../components/Form/Inputs/BasicTextInput';
import { userLogin } from '../services';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const router = useRouter();
  const { setJWToken, userInfo, setUserInfo } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [loginInfo, setLoginInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginInfo((old) => ({ ...old, [name]: value }));
  };

  const saveJWToken = (token) => {
    document.cookie = `JWToken=${token}`;
    setJWToken(token);
  };

  const handleSubmit = async () => {
    try {
      setTimeout(() => setIsLoading(true), 500);
      const loginInfoClone = { ...loginInfo };
      loginInfoClone.username = loginInfoClone.username.toLowerCase();
      const { data } = await userLogin(loginInfoClone);
      saveJWToken(data);
      setIsLoading(false);
      router.push('/');
    } catch (err) {
      enqueueSnackbar('Username or password is incorrect', { variant: 'error', persist: true });
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  useEffect(() => {
    if (userInfo) router.push('/');
  }, []);

  return (
    <Grid container style={{ textAlign: 'center', height: '70vh', paddingTop: '150px' }} justifyContent="center">
      <NoSsr>
        <Grid item md={2}>
          <Grid container spacing={5} justifyContent="center">
            <Grid item md={12} xs={8} style={{ textAlign: 'initial' }}>
              <Typography variant="h5">Login</Typography>
            </Grid>
            <Grid item md={12} xs={8}>
              <BasicTextInput
                type="text"
                placeholder="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={12} xs={8}>
              <BasicTextInput
                type="password"
                placeholder="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item container xs={6} md={12} spacing={10} justifyContent="center">
            <Grid item xs={12}>
              <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
                {isLoading ? (
                  <CircularProgress color="secondary" size={25} />
                ) : (
                    'Submit'
                  )}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleCreateAccount} variant="contained" color="secondary" fullWidth>
                Create Account
              </Button>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
      </NoSsr>
    </Grid>
  );
};

export default LoginPage;
