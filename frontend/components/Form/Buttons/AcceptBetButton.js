import React, { useState } from 'react';
import { Button, Grid, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack';
import { acceptBet } from '../../../services/index';
import BetDescription from '../Description/BetDescription';
import ModalBase from '../../Modals/ModalBase';
import SimpleButton from './SimpleButton';
import useFeedList from '../../../hooks/useFeedList';

const AcceptBetButton = ({ betInfo }) => {
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

  const handleAcceptBet = async () => {
    try {
      await acceptBet(betInfo.id);
      enqueueSnackbar('Bet accepted!', { variant: 'success' });
      refreshFeedList();
      handleClose();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <Button size="small" color="secondary" fullWidth onClick={handleClickOpen} disabled={betInfo.acceptedUserId > 0}>
        {betInfo.acceptedUserId ? 'Accepted' : 'Accept'}
      </Button>
      <ModalBase
        open={open}
        onClose={handleClose}
        title="Accept Bet"
        body={(
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <BetDescription betInfo={betInfo} />
            </Grid>
            <Grid item xs={12}>
              <SimpleButton title="Accept" onClick={handleAcceptBet} />
            </Grid>
          </Grid>
        )}
      />
    </div>
  );
};

export default AcceptBetButton;
