import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

const SearchResultsFeed = ({ userList, onUserClick = () => {} }) => {
  const router = useRouter();
  const handleUserClick = (user) => {
    router.replace(`/${user.username}`);
    onUserClick();
  };

  return (
    <List>
      {userList.length > 0 ? (
        userList.map((data) => {
          let user = data;
          if (user.main_user) user = user.main_user;
          if (user.followed_user) user = user.followed_user;
          return (
            <ListItem
              key={user.id}
              button
              onClick={() => handleUserClick(user)}
            >
              <ListItemAvatar>
                <Avatar
                  alt={user.username}
                  src={user.picURL || "/static/images/avatar/1.jpg"}
                />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={`@${user.username}`}
              />
            </ListItem>
          );
        })
      ) : (
        <ListItem>
          <ListItemText primary="no users found" />
        </ListItem>
      )}
    </List>
  );
};

export default SearchResultsFeed;
