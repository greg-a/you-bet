import { Chip, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import BetDescription from '../../Form/Description/BetDescription';

const MainBet = ({ betInfo }) => {
  const [selectedChip, setSelectedChip] = useState('details');
  const bodies = { 
    details: <BetDescription betInfo = { betInfo } />,
    comments: <div>comments</div>,
    counters: <div>counters</div>,
  };

  const handleChipClick = (event) => {
    const { value } = event.currentTarget.attributes.name;
    setSelectedChip(value);
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <Grid container justifyContent="space-around">
          <Chip
            label="Details"
            name="details"
            clickable
            size="small"
            color={selectedChip === 'details' ? 'primary' : 'secondary'}
            onClick={handleChipClick}
          />
          <Chip
            label="Comments"
            name="comments"
            clickable
            size="small"
            color="primary"
            color={selectedChip === 'comments' ? 'primary' : 'secondary'}
            onClick={handleChipClick}
          />
          <Chip
            label="Counters"
            name="counters"
            clickable
            size="small"
            color="primary"
            color={selectedChip === 'counters' ? 'primary' : 'secondary'}
            onClick={handleChipClick}
          />
        </Grid>
      </Grid>
      <Grid item md={12}>
        { bodies[selectedChip] }
      </Grid>
    </Grid>
  );
};

export default MainBet;
