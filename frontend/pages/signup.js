import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import BasicTextInput from '../components/Form/Inputs/BasicTextInput';
import SimpleButton from '../components/Form/Buttons/SimpleButton';
import { createAccount } from '../services';

const Signup = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [newAccountInfo, setNewAccountInfo] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAccountInfo((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createAccount(newAccountInfo);
      enqueueSnackbar('Your create was created!', { variant: 'success' });
      window.location.href = '/';
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
    console.log(newAccountInfo);
  };

return (
  <Grid container alignContent="center" direction="column" spacing={3}>
    <Grid item>
      <BasicTextInput
        type="text"
        placeholder="first name"
        name="first_name"
        onChange={handleChange}
      />
    </Grid>
    <Grid item>
      <BasicTextInput
        type="text"
        placeholder="last name"
        name="last_name"
        onChange={handleChange}
      />
    </Grid>
    <Grid item md={12}>
      <BasicTextInput
        type="text"
        placeholder="username"
        onChange={handleChange}
      />
    </Grid>
    <Grid item md={4}>
      <BasicTextInput
        type="email"
        placeholder="email"
        onChange={handleChange}
      />
    </Grid>
    <Grid item>
      <BasicTextInput
        type="password"
        placeholder="password"
        onChange={handleChange}
      />
    </Grid>
    <Grid item>
      <BasicTextInput
        type="password"
        placeholder="password"
        onChange={handleChange}
      />
    </Grid>
    <Grid item>
      <SimpleButton onClick={handleSubmit} title="Submit" />
    </Grid>
  </Grid>
);
};

export default Signup;
