import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import BasicTextInput from '../components/Form/Inputs/BasicTextInput';
import { createAccount } from '../services';

const initialForm = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password1: '',
  password2: '',
}

const Signup = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [newAccountInfo, setNewAccountInfo] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState(initialForm);
  const [passwordValid, setPasswordValid] = useState(true);

  const validatePasswords = (name, value) => {
    let passwordsMatch;
    if (name === 'password1') passwordsMatch = value === newAccountInfo.password2;
    if (name === 'password2') passwordsMatch = value === newAccountInfo.password1;
    setPasswordValid(passwordsMatch);
    return passwordsMatch;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAccountInfo((old) => ({ ...old, [name]: value }));

    let updateValidField = {};
    if (value.length > 0) updateValidField = { [name]: '' };
    setInvalidFields({ ...invalidFields, ...updateValidField }); 
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    handleChange(event);
    validatePasswords(name, value)
  }

  const validateSignupForm = () => {
    const fieldEntries = Object.entries(newAccountInfo);
    const invalidFieldsArr = fieldEntries.filter(([key, value]) => value.length === 0).map(([key]) => key);
    const messages = invalidFieldsArr.reduce((a, v) => ({ ...a, [v]: 'field cannot be blank' }), {});
    setInvalidFields({ ...invalidFields, ...messages });

    const isValid = invalidFieldsArr.length === 0 && passwordValid;
    return isValid;
  };

  const formatAccountInfo = () => {
    const newAccountInfoClone = { ...newAccountInfo };
    newAccountInfoClone.username = newAccountInfoClone.username.toLowerCase();
    newAccountInfoClone.password = newAccountInfoClone.password1;
    delete newAccountInfoClone.password1;
    delete newAccountInfoClone.password2;
    return newAccountInfoClone;
  };

  const handleServerErrors = (errors) => {
    const updatedInvalidFields = {};
    errors.forEach(({ message, path }) => {
      enqueueSnackbar(message, { variant: 'error' });
      updatedInvalidFields[path] = message;
    });
    setInvalidFields({ ...invalidFields, ...updatedInvalidFields });
  };

  const handleSubmit = async () => {
    if (validateSignupForm()) {
      try {
        setIsLoading(true);
        const formattedAccountInfo = formatAccountInfo();
        const { data } = await createAccount(formattedAccountInfo);

        setIsLoading(false);
        if (data.errors) return handleServerErrors(data.errors);

        enqueueSnackbar('Your account was created!', { variant: 'success' });
        router.push('/login');
      } catch (err) {
        enqueueSnackbar(err.message, { variant: 'error' });
        setIsLoading(false);
      }
    }
  };

  const handleBackButton = () => {
    router.push('/login');
  };

  return (
    <Grid container alignContent="center" direction="column" spacing={6} style={{ paddingTop: '100px' }}>
      <Grid item md={12} xs={8} style={{ textAlign: 'initial' }}>
        <Typography variant="h5">Sign Up</Typography>
      </Grid>
      <Grid item md={12}>
        <BasicTextInput
          type="text"
          placeholder="first name"
          name="first_name"
          onChange={handleChange}
          error={invalidFields.first_name.length > 0}
          helperText={invalidFields.first_name}
        />
      </Grid>
      <Grid item xs={12}>
        <BasicTextInput
          type="text"
          placeholder="last name"
          name="last_name"
          onChange={handleChange}
          error={invalidFields.last_name.length > 0}
          helperText={invalidFields.last_name}
        />
      </Grid>
      <Grid item xs={12}>
        <BasicTextInput
          type="text"
          placeholder="username"
          onChange={handleChange}
          error={invalidFields.username.length > 0}
          helperText={invalidFields.username}
        />
      </Grid>
      <Grid item xs={12}>
        <BasicTextInput
          type="email"
          placeholder="email"
          onChange={handleChange}
          error={invalidFields.email.length > 0}
          helperText={invalidFields.email}
        />
      </Grid>
      <Grid item xs={12}>
        <BasicTextInput
          name="password1"
          type="password"
          placeholder="password"
          onChange={handlePasswordChange}
          error={invalidFields.password1.length > 0}
          helperText={invalidFields.password1}
        />
      </Grid>
      <Grid item xs={12}>
        <BasicTextInput
          name="password2"
          type="password"
          placeholder="password"
          onChange={handlePasswordChange}
          error={!passwordValid}
          helperText={!passwordValid && 'Passwords do not match'}
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
