import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import BasicTextInput from '../../Form/Inputs/BasicTextInput';

const NewBetModal = () => {
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <BasicTextInput
          placeholder="description"
          multiline
        />
      </Grid>
      <Grid item md={3}>
        <BasicTextInput
          placeholder="$"
        />
      </Grid>
      <Grid item md={3}>
        <BasicTextInput
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default NewBetModal;
