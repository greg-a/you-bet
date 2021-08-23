import React from 'react';
import { Grid } from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import BasicFeedItem from './BasicFeedItem';
import CommentButton from '../../Form/Buttons/CommentButton';
import CounterButton from '../../Form/Buttons/CounterButton';
import EditBetButton from '../../Form/Buttons/EditBetButton';
import AcceptBetButton from '../../Form/Buttons/AcceptBetButton';
import BetDetailsButton from '../../Form/Buttons/BetDetailsButton';

const BetFeedItem = ({ betInfo }) => {
  const { userInfo } = useAuth();
  return (
    <BasicFeedItem
      user={betInfo.main_user}
      modalData={betInfo}
      body={betInfo.description}
      timestamp={betInfo.createdAt}
    >
      <Grid container justifyContent="space-around">
        <Grid item md={3}>
          <BetDetailsButton betInfo={betInfo} />
        </Grid>
        <Grid item md={3}>
          <CommentButton betInfo={betInfo} />
        </Grid>
        <Grid item md={3}>
          <CounterButton betInfo={betInfo} />
        </Grid>
        <Grid item md={3}>
          {userInfo?.id === betInfo.main_user.id ? (
            <EditBetButton betInfo={betInfo} />
          ) : (
            <AcceptBetButton betInfo={betInfo} />
          )}
        </Grid>
      </Grid>
    </BasicFeedItem>
  );
};

export default BetFeedItem;
