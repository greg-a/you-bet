import React from 'react';
import { useRouter } from 'next/router';
import { Avatar, Grid, IconButton, Typography } from '@material-ui/core';
import { formatDate, formatUsername } from '../../../utils/formatters';

const UserHeader = ({ userInfo, timestamp }) => {
  const router = useRouter();
  const username = formatUsername(userInfo);

  const handleAvatarClick = () => {
    router.push(`/${userInfo.username}`);
  };

  return (
    <Grid container style={{ padding: 8 }}>
      <Grid item xs={3}>
        <IconButton onClick={handleAvatarClick}>
          <Avatar
            alt={username}
            src={userInfo?.picURL || '/static/images/avatar/1.jpg'}
          />
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
