import React, { useState } from 'react';
import { Chip } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import ModalBase from '../../Modals/ModalBase';
import FollowUser from '../../Modals/ModalBodies/FollowUser';
import useFollowList from '../../../hooks/useFollowList';
import { followUser, unfollowUser } from '../../../services';

const FollowButton = ({ type, userInfo }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { refreshFollowList } = useFollowList();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = async () => {
    // setModalOpen(true);
    try {
      if (type === 'Follow') await followUser(userInfo.id);
      if (type === 'Unfollow') await unfollowUser(userInfo.id);
      enqueueSnackbar(`${type} successful!`, { variant: 'success' });
      refreshFollowList();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    refreshFollowList();
  };

  return (
    <>
      <ModalBase
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        body={<FollowUser userInfo={userInfo} type={type} onSubmit={handleClose} />}
      />
      <Chip
        label={type}
        clickable
        color={type === 'Follow' ? 'secondary' : 'primary'}
        onClick={handleClick}
      />
    </>
  );
};

export default FollowButton;
