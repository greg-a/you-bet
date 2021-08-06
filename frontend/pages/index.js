import React, {  useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import FeedList from '../components/Feed/FeedList';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FeedList />
    </div>
  )
};

export default Home;
