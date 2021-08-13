import React, { useState } from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack';
import { createCounterOffer } from '../../../services/index';
import ModalBase from '../../Modals/ModalBase';
import BetDescription from '../Description/BetDescription';
import NewBetModal from '../../Modals/ModalBodies/NewBet';

const CounterButton = ({ betInfo }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
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
      <Button size="small" color="secondary" fullWidth onClick={handleClickOpen}>
        Counter{betInfo.counters.length > 0 ? ` (${betInfo.counters.length})` : ''}
      </Button>
      <ModalBase
        open={open}
        onClose={handleClose}
        title="Counter"
        body={
          <NewBetModal
            description={<BetDescription betInfo={betInfo} />}
            onSubmit={handleCounterOffer}
          />
        }
      />
    </div>
  );
};

export default CounterButton;
