import React, {  useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  }
  const getResults = () => {
    const api_key = '1759f720000783a8192a1813062de125';

    // To get odds for a sepcific sport, use the sport key from the last request
    //   or set sport to "upcoming" to see live and upcoming across all sports
    let sport_key = 'upcoming'

    axios.get('https://api.the-odds-api.com/v3/odds', {
      params: {
        api_key: api_key,
        sport: sport_key,
        region: 'us', // uk | us | eu | au
        mkt: 'h2h' // h2h | spreads | totals
      }
    }).then(response => {
      // odds_json['data'] contains a list of live and 
      //   upcoming events and odds for different bookmakers.
      // Events are ordered by start time (live events are first)
      console.log(
        `Successfully got ${response.data.data.length} events`,
        `Here's the first event:`
      )
      console.log(JSON.stringify(response.data.data[0]))

      // Check your usage
      console.log()
      console.log('Remaining requests', response.headers['x-requests-remaining'])
      console.log('Used requests', response.headers['x-requests-used'])

    })
      .catch(error => {
        console.log('Error status', error.response.status)
        console.log(error.response.data)
      })
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input onChange={handleInputChange} value={input} />
      <button onClick={getResults}>
        search
      </button>
    </div>
  )
}
