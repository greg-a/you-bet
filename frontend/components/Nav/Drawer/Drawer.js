import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Divider, Drawer, Grid, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, useTheme,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useAuth from '../../../hooks/useAuth';
import { formatUsername } from '../../../utils/formatters';
import UserHeader from '../../Feed/Header/UserHeader';
import useStyles from '../Nav.styles';

const UserDrawer = ({ open, window, onClose }) => {
  const classes = useStyles();
  const { userInfo } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const username = formatUsername(userInfo);
  const [selectedPage, setSelectedPage] = useState('Home');

  const handlePageClick = (event) => {
    const pages = {
      Home: '/',
    };
    const { textContent } = event.target;
    setSelectedPage(textContent);
    router.push('/');
  };

  const drawer = (
    <div>
      <Grid container justifyContent="space-between" className={classes.headerContainer}>
        <Grid item xs={10} style={{ paddingTop: 10, paddingBottom: 10 }}>
          <UserHeader userInfo={userInfo} />
        </Grid>
        {open && (
          <Grid item xs={2} style={{ alignSelf: 'center' }}>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <div className={classes.drawerContainer}>
        {/* <div className={classes.divider} /> */}
        <List>
          <ListItem button onClick={handlePageClick}>
            <ListItemIcon><HomeIcon color={selectedPage === 'Home' ? 'primary' : 'secondary'} /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handlePageClick}>
            <ListItemIcon><NotificationsIcon color={selectedPage === 'Notifications' ? 'primary' : 'secondary'} /></ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button onClick={handlePageClick}>
            <ListItemIcon><MailIcon color={selectedPage === 'Messages' ? 'primary' : 'secondary'} /></ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button onClick={handlePageClick}>
            <ListItemIcon><PersonIcon color={selectedPage === 'Profile' ? 'primary' : 'secondary'} /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <div className={classes.divider} />
        Test
      </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden mdUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default UserDrawer;
