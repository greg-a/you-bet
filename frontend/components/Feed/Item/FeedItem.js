import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar, Button, Card, CardActions, CardContent, Grid, ListItem, ListItemAvatar,
  ListItemSecondaryAction, ListItemText, Tooltip, Typography,
} from '@material-ui/core';
import { formatDate } from '../../../utils/formatters';

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
    borderColor: theme.palette.secondary.main,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 5,
  }
}));

const FeedItem = ({ data }) => {
  const classes = useStyles();
  const user = data.user.first_name && data.user.last_name ? `${data.user.first_name} ${data.user.last_name}` : data.user.username;

  return (
    <div className={classes.container}>
      <ListItem alignItems="flex-start" button>
        <ListItemAvatar>
          <Avatar alt={user} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          className={classes.body}
          primary={(
            <Grid container justifyContent="space-between">
              <b>{user}</b>
              <Typography variant="caption">{formatDate(data.createdAt)}</Typography>
            </Grid>
          )}
          secondary={<Typography className={classes.title} color="textSecondary" gutterBottom>
            {data.description}
          </Typography>}
        />
      </ListItem>
      <Grid container justifyContent="space-around">
        <Button size="small" color="secondary">Comment</Button>
        <Button size="small" color="secondary">Counter</Button>
        <Button size="small" color="secondary">Accept</Button>
      </Grid>
    </div>
  );
};

export default FeedItem;
