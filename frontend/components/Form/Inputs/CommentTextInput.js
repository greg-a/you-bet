import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import SimpleButton from '../Buttons/SimpleButton';
import BasicTextInput from './BasicTextInput';
import { newMessage } from '../../../services';
import useFeedList from '../../../hooks/useFeedList';

const CommentTextInput = ({ betInfo, onSubmit = () => {} }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { updateFeedList } = useFeedList();
  const [message, setMessage] = useState('');

  const handleComment = async () => {
    if (message.length === 0) return enqueueSnackbar('Enter a comment please', { variant: 'warning' })
    try {
      await newMessage({ betId: betInfo.id, message });
      enqueueSnackbar('Successful Comment!', { variant: 'success' });
      setMessage('');
      updateFeedList();
      onSubmit();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Grid container spacing={3} style={{ paddingTop: 10 }}>
      <Grid item md={12}>
        <BasicTextInput
          multiline
          placeholder="what do you think..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Grid>
      <Grid item md={12}>
        <SimpleButton title="Send" onClick={handleComment} />
      </Grid>
    </Grid>
  );
};

export default CommentTextInput;
