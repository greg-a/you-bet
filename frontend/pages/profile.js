import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import BasicTextInput from '../components/Form/Inputs/BasicTextInput';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { userInfo: { username, first_name, last_name, email } } = useAuth();
  return (
    <Grid container style={{ textAlign: 'center', height: '70vh', paddingTop: '70px' }} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4">Profile</Typography>
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <BasicTextInput
              label="email"
              value={email} 
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <BasicTextInput
              label="username"
              value={username} 
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <BasicTextInput
              name="first_name"
              label="first name"
              value={first_name}
            />
          </Grid>
          <Grid item xs={6}>
            <BasicTextInput
              name="last_name"
              label="last name"
              value={last_name}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
