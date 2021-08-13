import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import FeedList from '../components/Feed/FeedList';
import useFeedList from '../hooks/useFeedList';

const Home = () => {
  const { feedList } = useFeedList();

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeedList data={feedList} />
    </div>
  )
};

export default Home;
