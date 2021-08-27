import React from 'react';
import { TextField } from '@material-ui/core';

const BasicTextInput = (props) => (
  <TextField
    {...props}
    fullWidth
    variant={props.label ? 'filled' : 'outlined'}
    size="small"
    color="primary"
    name={props.name || props.placeholder}
  />
);

export default BasicTextInput;
