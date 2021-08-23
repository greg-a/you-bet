import React from 'react';
import { Grid, List, ListSubheader, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import BasicFeedItem from '../FeedItems/BasicFeedItem';
import CounterButton from '../../Form/Buttons/CounterButton';
import AcceptBetButton from '../../Form/Buttons/AcceptBetButton';
import useAuth from '../../../hooks/useAuth';
import EditBetButton from '../../Form/Buttons/EditBetButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    overflowY: 'auto',
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const CounterFeed = ({ betInfo }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { userInfo } = useAuth();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container justifyContent="center" style={{ height: '100%' }} spacing={6}>
      <Grid item xs={11} style={{ marginTop: 10 }}>
        <CounterButton betInfo={betInfo} variant="contained" />
      </Grid>
      <Grid item xs={11}>
        <List className={classes.root} dense>
          <ListSubheader color="primary">Counter Offers</ListSubheader>
          {betInfo?.counter_bets.length > 0 ? (
            <>
              {betInfo.counter_bets.map((counter) => (
                <BasicFeedItem
                  body={counter.description}
                  user={counter.main_user}
                  timestamp={counter.createdAt}
                  key={counter.id}
                  modalData={betInfo}
                >
                  {counter.main_user.id === userInfo?.id ? (
                    <EditBetButton betInfo={counter} />
                  ) : (
                    <AcceptBetButton betInfo={counter} />
                  )}
                </BasicFeedItem>
              ))}
            </>
          ) : (
            <p>no counter offers</p>
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default CounterFeed;
