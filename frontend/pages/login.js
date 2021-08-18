import React, { useState } from 'react';
import { Button, Grid, NoSsr, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import BasicTextInput from '../components/Form/Inputs/BasicTextInput';
import { userLogin } from '../services';

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loginInfo, setLoginInfo] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginInfo((old) => ({ ...old, [name]: value }));
  };

  const saveJWToken = (token) => {
    document.cookie = `JWToken=${token}`;
  };

  const handleSubmit = async () => {
    try {
    const { data } = await userLogin(loginInfo);
    saveJWToken(data);
    window.location.href = '/';
    } catch (err) {
      enqueueSnackbar('Username or password is incorrect', { variant: 'error', persist: true })
    }
  };

  const handleCreateAccount = () => {
    window.location.href = '/signup';
  };

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
            <Grid item md={12} xs={12}>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
            <Grid item md={12} xs={12}>
              <Button onClick={handleCreateAccount} variant="contained" color="secondary">
                Create Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </NoSsr>
    </Grid>
  );
};

export default LoginPage;
