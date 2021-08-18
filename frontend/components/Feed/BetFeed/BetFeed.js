import React from 'react';
import { List, makeStyles } from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import BetFeedItem from '../FeedItems/BetFeedItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const BetFeed = ({ betInfo }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {betInfo?.length > 0 ? (
        <>
          {betInfo.map((bet) => (
            <BetFeedItem betInfo={bet} key={bet.id} />
          ))}
        </>
      ) : (
        <p>no results</p>
      )}
    </List>
  );
};

export default BetFeed;
