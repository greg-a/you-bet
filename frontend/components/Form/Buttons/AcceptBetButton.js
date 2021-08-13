import React, { useState } from 'react';
import { 
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack';;
import { formatDate } from '../../../utils/formatters';
import { acceptBet } from '../../../services/index';

const AcceptBetButton = ({ betInfo }) => {
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

  const handleAcceptBet = async () => {
    try {
      await acceptBet({ betId: betInfo.id });
      enqueueSnackbar('Bet accepted!', { variant: 'success' });
      handleClose();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <Button size="small" color="secondary" fullWidth onClick={handleClickOpen}>
        Accept
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="accept-bet-dialog"
      >
        <DialogTitle id="accept-bet-dialog">{`Accept bet for $${betInfo.bet_amount}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {betInfo.description}
          </DialogContentText>
            <Typography variant="caption">{`End Date: ${formatDate(betInfo.end_date, 'date')}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAcceptBet} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AcceptBetButton;
