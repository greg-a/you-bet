import React, {  useEffect, useState } from 'react';
import Head from 'next/head';
import { useSnackbar } from 'notistack';
import styles from '../styles/Home.module.css';
import FeedList from '../components/Feed/FeedList';
import { getAllBets } from '../services/bets-services';

const Home = () => {
  const { enqueueSnackbar: alert } = useSnackbar();
  const [feed, setFeed] = useState();

  useEffect(async () => {
    try {
    const { data } = await getAllBets();
    setFeed(data);
    console.log(data)
    } catch (err) {
      alert(err.message)
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeedList data={feed} />
    </div>
  )
};

export default Home;
