import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FeedItem from './Item/FeedItem';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const FeedList = ({ data = [1, 2] }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {data.map((itemData, i) => (
        <>
          <FeedItem />
        </>
      ))}
    </List>
  );
};

export default FeedList;
