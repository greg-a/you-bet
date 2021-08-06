import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardActions, CardContent, Grid, ListItemSecondaryAction, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  body: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color: 'white',
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 5,
  }
}));

const FeedItem = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ListItem alignItems="flex-start" button>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          className={classes.body}
          primary={<b>Remy Sharp</b>}
          secondary={<Typography className={classes.title} color="textSecondary" gutterBottom>
            Kamala will be the next president
          </Typography>}
        />
      </ListItem>
      <Grid container justifyContent="space-around">
        <Button size="small" style={{ color: 'white' }}>Comment</Button>
        <Button size="small" style={{ color: 'white' }}>Counter</Button>
        <Button size="small" style={{ color: 'white' }}>Accept</Button>
      </Grid>
    </div>
  );
};

export default FeedItem;
