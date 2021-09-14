import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

const SearchResultsFeed = ({ userList }) => {
  const router = useRouter();
  const handleUserClick = (user) => {
    router.replace(`/${user.username}`);
  };

  return (
    <List>
      {userList.length > 0 ? (
        userList.map((user) => (
          <ListItem
            key={user.id}
            button
            onClick={() => handleUserClick(user)}
          >
            <ListItemAvatar>
              <Avatar alt={user.username} src={user.picURL || '/static/images/avatar/1.jpg'} />
            </ListItemAvatar>
            <ListItemText primary={`${user.first_name} ${user.last_name}`} secondary={`@${user.username}`} />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="no users found" />
        </ListItem>
      )}
    </List>
  );
};

export default SearchResultsFeed;
