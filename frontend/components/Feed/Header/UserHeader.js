import React from 'react';
import { Avatar, Grid, IconButton, Typography } from '@material-ui/core';
import { formatUsername } from '../../../utils/formatters';

const UserHeader = ({ userInfo }) => {
  const username = formatUsername(userInfo);
  return (
    <Grid container spacing={3}>
      <Grid item>
        <IconButton>
          <Avatar alt={username} src={userInfo.picURL || "/static/images/avatar/1.jpg"} />
        </IconButton>
      </Grid>
      <Grid item style={{ alignSelf: 'center' }}>
        <Typography variant="h5">
          {username}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserHeader;
