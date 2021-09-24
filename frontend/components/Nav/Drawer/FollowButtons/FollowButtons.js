import React, { useState } from 'react';
import { Grid, Link, ListItemText } from '@material-ui/core';
import useFollowList from '../../../../hooks/useFollowList';
import ModalBase from '../../../Modals/ModalBase';
import SearchResultsFeed from '../../../Feed/SearchResults/SearchResults';

const FollowButtons = ({ onClose }) => {
  const { followList: { followerList, followingList } } = useFollowList();
  const [modalTitle, setModalTitle] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = (title) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <ModalBase 
        open={modalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        body={(
          <SearchResultsFeed 
            userList={modalTitle === 'Followers' ? followerList : followingList}
            onUserClick={handleModalClose}
          />
          )}
      />
      <Grid item xs={4}>
        <Link component="button" color="secondary" onClick={() => handleClick('Followers')}>
          <ListItemText primary="Followers" secondary={followerList?.length || 0} secondaryTypographyProps={{ color: "secondary" }} />
        </Link>
      </Grid>
      <Grid item xs={4}>
        <Link component="button" color="secondary" onClick={() => handleClick('Following')}>
          <ListItemText primary="Following" secondary={followingList?.length || 0} secondaryTypographyProps={{ color: "secondary", }} />
        </Link>
      </Grid>
    </Grid>
  );
};

export default FollowButtons;
