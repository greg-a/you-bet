import React, { useState } from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack';
import { createCounterOffer } from '../../../services/index';
import ModalBase from '../../Modals/ModalBase';
import NewBetModal from '../../Modals/ModalBodies/NewBet';

const EditBetButton = ({ betInfo }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCounterOffer = async (counterOffer) => {
    try {
      await createCounterOffer({ ...counterOffer, ...{ betId: betInfo.id } });
      enqueueSnackbar('Successful Counter Offer!', { variant: 'success' });
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
            onSubmit={handleCounterOffer}
          />
        }
      />
    </div>
  );
};

export default EditBetButton;
