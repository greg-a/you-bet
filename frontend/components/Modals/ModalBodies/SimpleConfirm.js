import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import SimpleButton from '../../Form/Buttons/SimpleButton';

const SimpleConfirm = ({ body, button, onSubmit }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography>{body}</Typography>
      </Grid>
      <Grid item xs={12}>
        <SimpleButton
          title={button}
          onClick={onSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default SimpleConfirm;
