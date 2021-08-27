import React from 'react';
import { Button } from '@material-ui/core';

const SimpleButton = ({ title, onClick, disabled = false }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      fullWidth
      style={{ height: '100%' }}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default SimpleButton;
