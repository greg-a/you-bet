import React from 'react';
import { TextField } from '@material-ui/core';

const BasicTextInput = (props) => (
  <TextField
    {...props}
    fullWidth
    variant="outlined"
    size="small"
    name={props.placeholder}
  />
);

export default BasicTextInput;
