import React from 'react';
import { Avatar, Grid, IconButton, Typography } from '@material-ui/core';
import { formatDate, formatUsername } from '../../../utils/formatters';

const UserHeader = ({ userInfo, timestamp }) => {
  const username = formatUsername(userInfo);
  return (
    <Grid container>
      <Grid item xs={2}>
        <IconButton>
          <Avatar alt={username} src={userInfo.picURL || '/static/images/avatar/1.jpg'} />
        </IconButton>
      </Grid>
      <Grid item xs={9} style={{ alignSelf: 'center' }}>
        <Grid container justifyContent="space-between">
          <b>{username}</b>
          <Typography variant="caption">{formatDate(timestamp)}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserHeader;
