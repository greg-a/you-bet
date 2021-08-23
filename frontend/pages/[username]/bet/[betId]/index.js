import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSnackbar } from 'notistack';
import styles from '../../../../styles/Home.module.css';
import MainBet from '../../../../components/Modals/ModalBodies/MainBet';
import { getUserBetById } from '../../../../services';

const Bet = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { username, betId } = router.query;
  const [betInfo, setBetInfo] = useState();

  const getBet = async () => {
    try {
      const { data } = await getUserBetById(username, betId);
      setBetInfo(data);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    getBet();
    console.log(username, betId);
  }, []);

  return (
    <div className={styles.container} style={{ marginTop: 100 }}>
      {betInfo && (
        <MainBet betInfo={betInfo} />
      )}
    </div>
  );
};

export default Bet;
