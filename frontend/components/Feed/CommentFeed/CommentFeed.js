import React from 'react';
import { Grid, List, makeStyles } from '@material-ui/core';
import BasicFeedItem from '../FeedItems/BasicFeedItem';
import BasicTextInput from '../../Form/Inputs/BasicTextInput';
import SimpleButton from '../../Form/Buttons/SimpleButton';
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

const CommentFeed = ({ comments }) => {
  const classes = useStyles();
  return (
    <>
      <List className={classes.root} dense>
        {comments?.length > 0 ? (
          <>
            {comments.map((comment) => (
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
      <CommentTextInput 
        betInfo={{ id: comments[0].betId }}
      />
    </>
  );
};

export default CommentFeed;
