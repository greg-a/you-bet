import React from 'react';
import { Button } from '@material-ui/core';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const NewBetButton = () => {
  const handleClick = () => {
    console.log('hello')
  };

  return (
    <>
      <SpeedDialAction
        icon={CreateIcon}
        tooltipTitle="Create Bet"
        onClick={handleClick}
      />
    </>
  );
};

export default NewBetButton;
