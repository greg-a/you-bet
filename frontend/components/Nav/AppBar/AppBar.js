import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NoSsr } from '@material-ui/core';
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
