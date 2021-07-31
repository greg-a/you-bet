import React, { useState } from 'react';
import { Button, Grid, NoSsr } from '@material-ui/core';
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
    } catch (err) {
      console.log('error', err);
      enqueueSnackbar('Username or password is incorrect', { variant: 'error', persist: true })
    }
  };

  return (
    <Grid container style={{ textAlign: 'center', height: '80vh', paddingTop: '50px' }} justifyContent="center">
      <NoSsr>
        <Grid item md={12} className="logo-font">
          YouBet
        </Grid>
        <Grid item md={2}>
          <Grid container spacing={5}>
            <Grid item md={12}>
              <BasicTextInput
                type="text"
                placeholder="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={12}>
              <BasicTextInput
                type="password"
                placeholder="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={12}>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
            <Grid item md={12}>
              <Button variant="contained" color="secondary">
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
