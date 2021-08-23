import React from 'react';
import { Grid, List, ListSubheader, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import BasicFeedItem from '../FeedItems/BasicFeedItem';
import CommentTextInput from '../../Form/Inputs/CommentTextInput';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
    <Grid container justifyContent="center" style={{ height: '100%' }} spacing={6}>
      <Grid item xs={11}>
        <CommentTextInput
          betInfo={betInfo}
        />
      </Grid>
      <Grid item xs={11}>
        <List className={classes.root} dense>
          <ListSubheader color="primary">Comments</ListSubheader>
          {betInfo?.messages.length > 0 ? (
            <>
              {betInfo.messages.map((comment) => (
                <BasicFeedItem
                  body={comment.message}
                  user={comment.user}
                  timestamp={comment.createdAt}
                  key={comment.id}
                  modalData={betInfo}
                />
              ))}
            </>
          ) : (
            <p>no comments</p>
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default CommentFeed;
