import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { formatUsername } from '../../../utils/formatters';
import SimpleButton from '../../Form/Buttons/SimpleButton';
import { followUser, unfollowUser } from '../../../services';

const FollowUser = ({ type, userInfo }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async () => {
    try {
      if (type === 'Follow') await followUser(userInfo.id);
      if (type === 'Unfollow') await unfollowUser(userInfo.id);
      enqueueSnackbar(`${type} successful!`, { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Grid container>
      <Typography variant="h5">{type}</Typography>&nbsp;&nbsp;
      <Typography color="primary" variant="h5">{formatUsername(userInfo)}</Typography>
      <Typography variant="h5" paragraph>?</Typography>
      <Grid item xs={12}>
        <SimpleButton title={type} onClick={handleClick} />
      </Grid>
    </Grid>
  );
};

export default FollowUser;
