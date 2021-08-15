import React, { useState } from 'react';
import {
  Avatar, Button, Grid, ListItem, ListItemAvatar, ListItemText, Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { formatDate } from '../../../utils/formatters';
import useStyles from './FeedItem.style';
import AcceptBetButton from '../../Form/Buttons/AcceptBetButton';
import CommentButton from '../../Form/Buttons/CommentButton';
import CounterButton from '../../Form/Buttons/CounterButton';
import useAuth from '../../../hooks/useAuth';
import EditBetButton from '../../Form/Buttons/EditBetButton';

const FeedItem = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo } = useAuth();
  const classes = useStyles();

  const [confirmDialog, setConfirmDialog] = useState({ open: false });
  const user = data.main_user.first_name && data.main_user.last_name ? `${data.main_user.first_name} ${data.main_user.last_name}` : data.main_user.username;

  return (
    <div className={classes.container}>
      <ListItem alignItems="flex-start" button>
        <ListItemAvatar>
          <Avatar alt={user} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          className={classes.body}
          primary={(
            <Grid container justifyContent="space-between">
              <b>{user}</b>
              <Typography variant="caption">{formatDate(data.createdAt)}</Typography>
            </Grid>
          )}
          secondary={<Typography className={classes.title} color="textSecondary" gutterBottom>
            {data.description}
          </Typography>}
        />
      </ListItem>
      <Grid container justifyContent="space-around">
        <Grid item md={4}>
          <CommentButton betInfo={data} />
        </Grid>
        <Grid item md={4}>
          <CounterButton betInfo={data} />
        </Grid>
        <Grid item md={4}>
          {userInfo.id === data.main_user.id ? (
            <EditBetButton betInfo={data} />
          ) : (
            <AcceptBetButton betInfo={data} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default FeedItem;
