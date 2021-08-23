import React, { useState } from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack';
import ModalBase from '../../Modals/ModalBase';
import BetDescription from '../Description/BetDescription';
import NewBetModal from '../../Modals/ModalBodies/NewBet';
import { createBet } from '../../../services';

const BetDetailsButton = ({ betInfo, variant = 'text' }) => {
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

  return (
    <div>
      <Button size="small" color={variant === 'contained' ? 'primary' : 'secondary'} variant={variant} fullWidth onClick={handleClickOpen}>
        Details
      </Button>
      <ModalBase
        open={open}
        onClose={handleClose}
        title="Details"
        body={
          <BetDescription betInfo={betInfo} />
        }
      />
    </div>
  );
};

export default BetDetailsButton;
