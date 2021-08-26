import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import styles from '../../styles/Home.module.css';
import { getFollowList, getUserBets } from '../../services';
import { formatUsername } from '../../utils/formatters';
import BetFeed from '../../components/Feed/BetFeed/BetFeed';
import FollowButton from '../../components/Form/Buttons/FollowButton';

const User = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter()
  const { username } = router.query;
  const [userFeed, setUserFeed] = useState([]);
  const [userProfile, setUserProfile] = useState();

  const getUserFeed = async () => {
    try {
      const { data } = await getUserBets(username);
      if (data.length > 0) {
        setUserFeed(data);
        setUserProfile(data[0].main_user);
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
    const { data } = await getFollowList();
    console.log('following', data)
  };

  useEffect(() => {
    getUserFeed();
  }, []);

  return (
    <div style={{ marginTop: 150 }}>
      <Head>
        <title>{`${formatUsername(userProfile)} Profile`}</title>
      </Head>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h4">Greg Allebach</Typography>
            </Grid>
            <Grid item xs={2}>
              <FollowButton userInfo={userProfile} />
            </Grid>
            <Grid item xs={12} md={12}>
              <BetFeed betInfo={userFeed} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default User;
