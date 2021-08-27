import React, { useState } from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack';
import useFeedList from '../../../hooks/useFeedList';
import ModalBase from '../../Modals/ModalBase';
import NewBetModal from '../../Modals/ModalBodies/NewBet';
import { editBet } from '../../../services/index';

const EditBetButton = ({ betInfo }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { refreshFeedList } = useFeedList();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditBet = async (newBet) => {
    try {
      await editBet(betInfo.id, newBet);
      enqueueSnackbar('Successfully edited bet', { variant: 'success' });
      refreshFeedList();
      handleClose();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <Button size="small" color="secondary" fullWidth onClick={handleClickOpen} disabled={betInfo.acceptedUserId > 0}>
        {betInfo.acceptedUserId ? 'Accepted' : 'Edit'}
      </Button>
      <ModalBase
        open={open}
        onClose={handleClose}
        title="Edit"
        body={
          <NewBetModal
            editBet={betInfo}
            onSubmit={handleEditBet}
          />
        }
      />
    </div>
  );
};

export default EditBetButton;
