import React from 'react';
import { Grid, Link, ListItemText } from '@material-ui/core';
import useFollowList from '../../../../hooks/useFollowList';

const FollowButtons = () => {
  const { followList: { followerList, followingList } } = useFollowList();
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={4}>
        <Link component="button" color="secondary">
          <ListItemText primary="Followers" secondary={followerList?.length || 0} secondaryTypographyProps={{ color: "secondary" }} />
        </Link>
      </Grid>
      <Grid item xs={4}>
        <Link component="button" color="secondary">
          <ListItemText primary="Following" secondary={followingList?.length || 0} secondaryTypographyProps={{ color: "secondary", }} />
        </Link>
      </Grid>
    </Grid>
  );
};

export default FollowButtons;
