import React from 'react';
import { Grid, List, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import BasicFeedItem from '../FeedItems/BasicFeedItem';
import CommentTextInput from '../../Form/Inputs/CommentTextInput';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    maxHeight: '50vh',
    overflowY: 'auto',
    // backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const CommentFeed = ({ betInfo }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container justifyContent="space-between" style={{ height: '100%' }}>
      <Grid item xs={12}>
        <List className={classes.root} dense>
          {betInfo?.messages.length > 0 ? (
            <>
              {betInfo.messages.map((comment) => (
                <BasicFeedItem
                  body={comment.message}
                  user={comment.user}
                  timestamp={comment.createdAt}
                  key={comment.id}
                />
              ))}
            </>
          ) : (
            <p>no comments</p>
          )}
        </List>
      </Grid>
      <Grid item xs={12}>
        <CommentTextInput
          betInfo={betInfo}
        />
      </Grid>
    </Grid>
  );
};

export default CommentFeed;
