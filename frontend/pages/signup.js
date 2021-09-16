import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import BasicTextInput from '../components/Form/Inputs/BasicTextInput';
import SimpleButton from '../components/Form/Buttons/SimpleButton';
import { createAccount } from '../services';

const Signup = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [newAccountInfo, setNewAccountInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAccountInfo((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setTimeout(() => setIsLoading(true), 500);
      const newAccountInfoClone = { ...newAccountInfo };
      newAccountInfoClone.username = newAccountInfoClone.username.toLowerCase();
      await createAccount(newAccountInfoClone);
      enqueueSnackbar('Your account was created!', { variant: 'success' });
      setIsLoading(false);
      router.push('/login');
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
      setIsLoading(false);
    }
  };

  const handleBackButton = () => {
    router.push('/login');
  };

  return (
    <Grid container alignContent="center" direction="column" spacing={3} style={{ paddingTop: '100px' }}>
      <Grid item md={12} xs={8} style={{ textAlign: 'initial' }}>
        <Typography variant="h5">Sign Up</Typography>
      </Grid>
      <Grid item md={12}>
        <BasicTextInput
          type="text"
          placeholder="first name"
          name="first_name"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <BasicTextInput
          type="text"
          placeholder="last name"
          name="last_name"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <BasicTextInput
          type="text"
          placeholder="username"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <BasicTextInput
          type="email"
          placeholder="email"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <BasicTextInput
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <BasicTextInput
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          {isLoading ? (
            <CircularProgress color="secondary" size={25} />
          ) : (
            'Submit'
          )}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="contained" color="secondary" onClick={handleBackButton}>
          Back to login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Signup;
