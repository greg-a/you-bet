import React from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import styles from '../styles/Home.module.css';
import useFeedList from '../hooks/useFeedList';
import BetFeed from '../components/Feed/BetFeed/BetFeed';

const Home = () => {
  const { feedList } = useFeedList();

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <BetFeed betInfo={feedList} />
        </Grid>
      </Grid>
    </div>
  )
};

export default Home;
