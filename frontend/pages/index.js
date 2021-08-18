import React from 'react';
import Head from 'next/head';
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
      <BetFeed betInfo={feedList} />
    </div>
  )
};

export default Home;
