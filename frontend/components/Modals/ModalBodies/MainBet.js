import React, { useState } from 'react';
import { Chip, Grid } from '@material-ui/core';
import CommentFeed from '../../Feed/CommentFeed/CommentFeed';
import CounterFeed from '../../Feed/CounterFeed/CounterFeed';
import BetDescription from '../../Form/Description/BetDescription';
import UserHeader from '../../Feed/Header/UserHeader';
import useStyles from '../ModalBase.style';

const MainBet = ({ betInfo }) => {
  const classes = useStyles();
  const [selectedChip, setSelectedChip] = useState('comments');
  const bodies = {
    comments: <CommentFeed betInfo={betInfo} />,
    counters: <CounterFeed betInfo={betInfo} />,
  };

  const handleChipClick = (event) => {
    const { value } = event.currentTarget.attributes.name;
    setSelectedChip(value);
  };

  return (
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={4} className={classes.container}>
        <Grid item xs={12}>
          <UserHeader userInfo={betInfo.main_user} />
        </Grid>
        <Grid item xs={12}>
          <BetDescription betInfo={betInfo} />
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" style={{ textAlign: 'center', marginBottom: 15 }}>
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
        <Grid item xs={12}>
          {bodies[selectedChip]}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainBet;
