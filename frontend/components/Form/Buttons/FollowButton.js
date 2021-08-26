import React, { useState } from 'react';
import { Chip } from '@material-ui/core';
import ModalBase from '../../Modals/ModalBase';
import FollowUser from '../../Modals/ModalBodies/FollowUser';

const FollowButton = ({ type = 'Follow', userInfo }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <ModalBase
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        body={<FollowUser userInfo={userInfo} type={type} />}
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
