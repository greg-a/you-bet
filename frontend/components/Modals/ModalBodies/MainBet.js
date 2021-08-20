import { Chip, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import BetFeed from '../../Feed/BetFeed/BetFeed';
import CommentFeed from '../../Feed/CommentFeed/CommentFeed';
import CounterFeed from '../../Feed/CounterFeed/CounterFeed';
import BetDescription from '../../Form/Description/BetDescription';

const MainBet = ({ betInfo }) => {
  const [selectedChip, setSelectedChip] = useState('details');
  const bodies = {
    details: <BetDescription betInfo={betInfo} />,
    comments: <CommentFeed betInfo={betInfo} />,
    counters: <CounterFeed betInfo={betInfo} />,
  };

  const handleChipClick = (event) => {
    const { value } = event.currentTarget.attributes.name;
    setSelectedChip(value);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-around" style={{ textAlign: 'center' }}>
          <Grid item xs={3}>
            <Chip
              label="Details"
              name="details"
              clickable
              color={selectedChip === 'details' ? 'primary' : 'secondary'}
              onClick={handleChipClick}
            />
          </Grid>
          <Grid item xs={3}>
            <Chip
              label="Comments"
              name="comments"
              clickable
              color="primary"
              color={selectedChip === 'comments' ? 'primary' : 'secondary'}
              onClick={handleChipClick}
            />
          </Grid>
          <Grid item xs={3}>
            <Chip
              label="Counters"
              name="counters"
              clickable
              color="primary"
              color={selectedChip === 'counters' ? 'primary' : 'secondary'}
              onClick={handleChipClick}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ minHeight: '42vh' }}>
        {bodies[selectedChip]}
      </Grid>
    </Grid>
  );
};

export default MainBet;
