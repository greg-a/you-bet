import React, { useState } from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack';
import ModalBase from '../../Modals/ModalBase';
import BetDescription from '../Description/BetDescription';
import NewBetModal from '../../Modals/ModalBodies/NewBet';
import { createBet } from '../../../services';

const CounterButton = ({ betInfo, variant = 'text' }) => {
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
      await createBet({ ...counterOffer, ...{ betId: betInfo.id } });
      enqueueSnackbar('Successful Counter Offer!', { variant: 'success' });
      handleClose();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <Button size="small" color={variant === 'contained' ? 'primary' : 'secondary'} variant={variant} fullWidth onClick={handleClickOpen}>
        Counter{betInfo?.counter_bets?.length > 0 && variant !== 'contained' ? ` (${betInfo.counter_bets.length})` : ''}
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
