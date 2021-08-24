import React, { useEffect, useState } from 'react';
import {
  AppBar, Avatar, Button, IconButton, makeStyles, NoSsr, Toolbar, Typography, useMediaQuery, useTheme,
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import UserDrawer from '../Drawer/Drawer';

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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const { userInfo } = useAuth();
  const [drawerOpenMobile, setDrawerOpenMobile] = useState(false);

  useEffect(() => {
    setDrawerOpenMobile(false);
  }, [fullScreen]);

  return (
    <NoSsr>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <IconButton disabled={!userInfo} onClick={() => setDrawerOpenMobile(true)}>
              <Avatar alt={userInfo?.username} src="/static/images/avatar/1.jpg" />
            </IconButton>
            <Typography variant="h6" className="logo-font">
              YouBet
            </Typography>
            <Button color="inherit">{userInfo?.username ? userInfo.username : 'Login'}</Button>
          </Toolbar>
        </AppBar>
        <UserDrawer open={drawerOpenMobile} onClose={() => setDrawerOpenMobile(false)} />
      </div>
    </NoSsr>
  );
};

export default AppBarLogo;
