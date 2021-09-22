import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import ModalBase from '../../Modals/ModalBase';
import SimpleConfirm from '../../Modals/ModalBodies/SimpleConfirm';
import useFeedList from '../../../hooks/useFeedList';
import { deleteBet } from '../../../services';

const CancelBetButton = ({ betInfo }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { refreshFeedList } = useFeedList();
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleSubmit = async () => {
    try {
      await deleteBet(betInfo.id);
      enqueueSnackbar('Bet was deleted', { variant: 'success' });
      console.log('bet was deleted')
    } catch {
      enqueueSnackbar('Error: could not delete', { variant: 'error' });
    }
    handleClose();
    refreshFeedList();
  };

  return (
    <div>
      <Button
        size="small"
        color="secondary"
        fullWidth
        onClick={handleClickOpen}
        disabled={betInfo.acceptedUserId > 0}
      >
        {betInfo.acceptedUserId ? 'Accepted' : 'Cancel'}
      </Button>
      <ModalBase
        open={open}
        onClose={handleClose}
        title="Cancel Bet"
        body={
          <SimpleConfirm
            body="Are you sure you want to cancel this bet?"
            button="Yes, cancel this bet"
            onSubmit={handleSubmit}
          />
        }
      />
    </div>
  );
};

export default CancelBetButton;
