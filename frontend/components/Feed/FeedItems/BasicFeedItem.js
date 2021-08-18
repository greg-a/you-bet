import React, { useState } from 'react';
import {
  Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { formatDate } from '../../../utils/formatters';
import useStyles from './FeedItem.style';
import useAuth from '../../../hooks/useAuth';
import ModalBase from '../../Modals/ModalBase';
import MainBet from '../../Modals/ModalBodies/MainBet';

const BasicFeedItem = ({ modalData, body, user, timestamp, children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo } = useAuth();
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const username = user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username;

  return (
    <div className={classes.container}>
      {modalData && (
        <ModalBase
          title="Bet"
          onClose={() => setModalOpen(false)}
          open={modalOpen}
          body={<MainBet betInfo={modalData} />}
        />
      )}
      <ListItem alignItems="flex-start" button onClick={() => setModalOpen(true)}>
        <ListItemAvatar>
          <Avatar alt={username} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          className={classes.body}
          primary={(
            <Grid container justifyContent="space-between">
              <b>{username}</b>
              <Typography variant="caption">{formatDate(timestamp)}</Typography>
            </Grid>
          )}
          secondary={<Typography className={classes.title} color="textSecondary" gutterBottom>
            {body}
          </Typography>}
        />
      </ListItem>
      {children}
    </div>
  );
};

export default BasicFeedItem;
