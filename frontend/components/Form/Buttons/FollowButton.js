import React, { useState } from 'react';
import { Chip } from '@material-ui/core';
import ModalBase from '../../Modals/ModalBase';
import FollowUser from '../../Modals/ModalBodies/FollowUser';
import useFollowList from '../../../hooks/useFollowList';

const FollowButton = ({ type, userInfo }) => {
  const { refreshFollowList } = useFollowList();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
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
