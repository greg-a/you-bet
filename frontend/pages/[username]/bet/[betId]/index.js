import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSnackbar } from 'notistack';
import styles from '../../../../styles/Home.module.css';
import MainBet from '../../../../components/Modals/ModalBodies/MainBet';
import { getUserBetById } from '../../../../services';
import useFeedList from '../../../../hooks/useFeedList';
import { formatUsername } from '../../../../utils/formatters';

const Bet = () => {
  const { feedList } = useFeedList();
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
    if (feedList.length > 0) return getBet();
  }, [feedList]);

  return (
    <div className={styles.container} style={{ marginTop: 100 }}>
      <Head>
        <title>{`${formatUsername(betInfo?.main_user)} Bet`}</title>
      </Head>
      {betInfo ? (
        <MainBet betInfo={betInfo} />
      ) : (
        <div>oops, this bet doesn't exist :(</div>
      )}
    </div>
  );
};

export default Bet;
