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
import ModalBase from '../../Modals/ModalBase';
import MainBet from '../../Modals/ModalBodies/MainBet';

const BasicFeedItem = ({ data, children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo } = useAuth();
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const user = data.main_user.first_name && data.main_user.last_name ? `${data.main_user.first_name} ${data.main_user.last_name}` : data.main_user.username;

  return (
    <div className={classes.container}>
      <ModalBase
        title="Bet"
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        body={<MainBet betInfo={data} />}
      />
      <ListItem alignItems="flex-start" button onClick={() => setModalOpen(true)}>
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
      {children}
    </div>
  );
};

export default BasicFeedItem;
