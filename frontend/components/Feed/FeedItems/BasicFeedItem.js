import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { formatDate, formatUsername } from '../../../utils/formatters';
import useStyles from './FeedItem.style';
import useAuth from '../../../hooks/useAuth';
import ModalBase from '../../Modals/ModalBase';
import MainBet from '../../Modals/ModalBodies/MainBet';
import useSelectedBet from '../../../hooks/useSelectedBet';

const BasicFeedItem = ({ modalData, body, user, timestamp, children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { userInfo } = useAuth();
  const router = useRouter();
  const { selectedBet, setSelectedBet } = useSelectedBet();
  const previousBet = useRef(selectedBet);
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const username = formatUsername(user);

  const handleBetClick = () => {
    setSelectedBet(modalData);
    router.push(`/${user.username}/bet/${modalData.id}`);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedBet(previousBet.current);
  };

  const handleAvatarClick = (event) => {
    event.stopPropagation();
    router.push(`/${user.username}`);
  };

  return (
    <div className={classes.container}>
      {modalData && (
        <ModalBase
          title="Bet"
          onClose={handleModalClose}
          open={modalOpen}
          body={<MainBet betInfo={modalData} />}
        />
      )}
      <ListItem alignItems="flex-start" button onClick={handleBetClick} style={{ overflowWrap: 'anywhere' }}>
        <ListItemAvatar>
          <Avatar alt={username} src="/static/images/avatar/1.jpg" onClick={handleAvatarClick} />
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
