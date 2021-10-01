import React from 'react';
import { Grid, List, makeStyles } from '@material-ui/core';
import BetFeedItem from '../FeedItems/BetFeedItem';
import CounterButton from '../../Form/Buttons/CounterButton';
import useSelectedBet from '../../../hooks/useSelectedBet';
import EmptyBetFeed from '../../Common/EmptyState/EmptyBetFeed';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const BetFeed = ({ betInfo }) => {
  const classes = useStyles();
  const { selectedBet } = useSelectedBet();
  return (
    <>
      <List className={classes.root}>
        {betInfo?.length > 0 ? (
          <>
            {betInfo.map((bet) => (
              <BetFeedItem betInfo={bet} key={bet.id} />
            ))}
          </>
        ) : (
          <EmptyBetFeed />
        )}
      </List>
    </>
  );
};

export default BetFeed;
