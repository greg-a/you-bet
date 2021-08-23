import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSnackbar } from 'notistack';
import styles from '../../styles/Home.module.css';
import { getUserBets } from '../../services';
import { formatUsername } from '../../utils/formatters';
import BetFeed from '../../components/Feed/BetFeed/BetFeed';
import { Grid } from '@material-ui/core';

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
      enqueueSnackbar(err.message, {  variant: 'error' });
    }
  };

  useEffect(() => {
    getUserFeed();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${formatUsername(userProfile)} Profile`}</title>
      </Head>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <BetFeed betInfo={userFeed} />
        </Grid>
      </Grid>
    </div>
  );
};

export default User;
