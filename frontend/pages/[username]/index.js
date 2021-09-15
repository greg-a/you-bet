import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Grid, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import styles from '../../styles/Home.module.css';
import { getProfileBets } from '../../services';
import { formatUsername } from '../../utils/formatters';
import BetFeed from '../../components/Feed/BetFeed/BetFeed';
import FollowButton from '../../components/Form/Buttons/FollowButton';
import useFollowList from '../../hooks/useFollowList';
import useAuth from '../../hooks/useAuth';

const User = () => {
  const { userInfo } = useAuth();
  const { followList } = useFollowList()
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter()
  const { username } = router.query;
  const [userFeed, setUserFeed] = useState([]);
  const [userProfile, setUserProfile] = useState();
  
  const followingUser = followList.followingList?.map(({ followedUserId }) => followedUserId).includes(userProfile?.id);
  
  const getUserFeed = async () => {
    try {
      const { data: { bets, profileInfo } } = await getProfileBets(username);
      if (profileInfo) setUserProfile(profileInfo);
      if (bets.length > 0) setUserFeed(bets);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    if (username) getUserFeed();
  }, [router.query]);

  if (!userProfile) return <p>loading...</p>
  return (
    <div style={{ marginTop: 150 }}>
      <Head>
        <title>{`${formatUsername(userProfile)} Profile`}</title>
      </Head>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={4}>
          <Grid container>
            <Grid item xs={9} md={10}>
              <Typography variant="h4">{formatUsername(userProfile)}</Typography>
              <Typography>{`@${userProfile?.username}`}</Typography>
            </Grid>
            <Grid item xs={2}>
              {userInfo.id !== userProfile?.id && (
                <FollowButton userInfo={userProfile} type={followingUser ? 'Unfollow' : 'Follow'} />
              )}
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
