import React, { useState } from 'react';
import { Button, Grid, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles'
import ModalBase from '../../Modals/ModalBase';
import BetDescription from '../Description/BetDescription';
import CommentTextInput from '../Inputs/CommentTextInput';

const CommentButton = ({ betInfo }) => {
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
      <Button size="small" color="secondary" fullWidth onClick={handleClickOpen}>
        Comment{betInfo.messages.length > 0 ? ` (${betInfo.messages.length})` : ''}
      </Button>
      <ModalBase
        open={open}
        onClose={handleClose}
        title="Comment"
        body={(
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <BetDescription betInfo={betInfo} />
            </Grid>
            <Grid item xs={12}>
              <CommentTextInput betInfo={betInfo} onSubmit={handleClose} />
            </Grid>
          </Grid>
        )}
      />
    </div>
  );
};

export default CommentButton;
