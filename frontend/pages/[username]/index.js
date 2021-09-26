import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Grid, Typography } from '@material-ui/core';
import { formatUsername } from '../../utils/formatters';
import BetFeed from '../../components/Feed/BetFeed/BetFeed';
import FollowButton from '../../components/Form/Buttons/FollowButton';
import useFollowList from '../../hooks/useFollowList';
import useAuth from '../../hooks/useAuth';
import useProfileFeed from '../../hooks/useProfileFeed';

const User = () => {
  const { userInfo } = useAuth();
  const { followList } = useFollowList()
  const router = useRouter();
  const { profileFeed, profileInfo, refreshProfileFeed } = useProfileFeed();
  const { username } = router.query;
  
  const followingUser = followList.followingList?.map(({ followedUserId }) => followedUserId).includes(profileInfo?.id);

  useEffect(() => {
    if (username) refreshProfileFeed();
  }, [router.query]);

  if (!profileInfo) return <p>loading...</p>
  return (
    <div style={{ marginTop: 150 }}>
      <Head>
        <title>{`${formatUsername(profileInfo)} Profile`}</title>
      </Head>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={4}>
          <Grid container>
            <Grid item xs={9} md={10}>
              <Typography variant="h4">{formatUsername(profileInfo)}</Typography>
              <Typography>{`@${profileInfo?.username}`}</Typography>
            </Grid>
            <Grid item xs={2}>
              {userInfo.id !== profileInfo?.id && (
                <FollowButton userInfo={profileInfo} type={followingUser ? 'Unfollow' : 'Follow'} />
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <BetFeed betInfo={profileFeed} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default User;
