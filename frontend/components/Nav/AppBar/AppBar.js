import React from 'react';
import {
  AppBar, Avatar, Button, IconButton, makeStyles, NoSsr, Toolbar, Typography,
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between"
  },
}));

const AppBarLogo = () => {
  const classes = useStyles();
  const { userInfo } = useAuth();

  return (
    <NoSsr>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <IconButton disabled={!userInfo}>
              <Avatar alt={userInfo?.username} src="/static/images/avatar/1.jpg" />
            </IconButton>
            <Typography variant="h6" className="logo-font">
              YouBet
            </Typography>
            <Button color="inherit">{userInfo?.username ? userInfo.username : 'Login'}</Button>
          </Toolbar>
        </AppBar>
      </div>
    </NoSsr>
  );
};

export default AppBarLogo;
