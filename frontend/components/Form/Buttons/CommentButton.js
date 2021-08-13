import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Typography, useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles'
import { useSnackbar } from 'notistack';;
import { formatDate } from '../../../utils/formatters';
import { acceptBet, newMessage } from '../../../services/index';
import BasicTextInput from '../Inputs/BasicTextInput';
import ModalBase from '../../Modals/ModalBase';
import SimpleButton from './SimpleButton';
import BetDescription from '../Description/BetDescription';

const CommentButton = ({ betInfo }) => {
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
    setTimeout(() => setMessage(''), 500);
  };

  const handleComment = async () => {
    if (message.length === 0) return enqueueSnackbar('Enter a comment please', { variant: 'warning' })
    try {
      await newMessage({ betId: betInfo.id, message });
      enqueueSnackbar('Successful Comment!', { variant: 'success' });
      handleClose();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <Button size="small" color="secondary" fullWidth onClick={handleClickOpen}>
        Comment
      </Button>
      <ModalBase
        open={open}
        onClose={handleClose}
        title="Comment"
        body={(
          <Grid container spacing={3}>
            <Grid item md={12}>
              <BetDescription betInfo={betInfo} />
            </Grid>
            <Grid item md={12}>
              <BasicTextInput
                multiline
                placeholder="comment"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </Grid>
            <Grid item md={12}>
              <SimpleButton title="Comment" onClick={handleComment} />
            </Grid>
          </Grid>
        )}
      />
    </div>
  );
};

export default CommentButton;