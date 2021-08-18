import React from 'react';
import { Grid } from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import BasicFeedItem from './BasicFeedItem';
import CommentButton from '../../Form/Buttons/CommentButton';
import CounterButton from '../../Form/Buttons/CounterButton';
import EditBetButton from '../../Form/Buttons/EditBetButton';
import AcceptBetButton from '../../Form/Buttons/AcceptBetButton';

const BetFeedItem = ({ betInfo }) => {
  const { userInfo } = useAuth();
  return (
    <BasicFeedItem data={betInfo}>
      <Grid container justifyContent="space-around">
        <Grid item md={4}>
          <CommentButton betInfo={betInfo} />
        </Grid>
        <Grid item md={4}>
          <CounterButton betInfo={betInfo} />
        </Grid>
        <Grid item md={4}>
          {userInfo.id === betInfo.main_user.id ? (
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
