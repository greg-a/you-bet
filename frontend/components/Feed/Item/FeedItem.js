import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardActions, CardContent, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const FeedItem = () => {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <Card className={classes.root} variant="elevation">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Kamala will be the next president
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Comment</Button>
          <Button size="small">Counter</Button>
          <Tooltip title="$20">
            <Button size="small">Accept</Button>
          </Tooltip>
        </CardActions>
      </Card>
    </ListItem>
  );
};

export default FeedItem;
