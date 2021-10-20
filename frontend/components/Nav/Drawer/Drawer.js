import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Drawer, Grid, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, useTheme,
} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useSnackbar } from 'notistack';
import BasicTextInput from '../../Form/Inputs/BasicTextInput';
import useAuth from '../../../hooks/useAuth';
import { formatUsername } from '../../../utils/formatters';
import UserHeader from '../../Feed/Header/UserHeader';
import useStyles from '../Nav.styles';
import FollowButtons from './FollowButtons/FollowButtons';
import { userSearch } from '../../../services';
import SearchResultsFeed from '../../Feed/SearchResults/SearchResults';
import useFeedList from '../../../hooks/useFeedList';

const UserDrawer = ({ open, window, onClose }) => {
  const { refreshFeedList } = useFeedList();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { userInfo } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const username = formatUsername(userInfo);
  const [selectedPage, setSelectedPage] = useState('Home');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [timeoutId, setTimeoutId] = useState();

  const handlePageClick = (event) => {
    const pages = {
      Home: '/',
      My_Bets: `/${userInfo?.username}`,
      Profile: '/profile'
    };
    const { textContent } = event.target;
    const page = textContent.replace(' ', '_');
    if (textContent === 'Home') refreshFeedList();
    setSelectedPage(textContent);
    router.push(pages[page]);
    onClose();
  };

  const handleSearchInput = async (value) => {
    try {
      const { data } = await userSearch(value);
      setSearchResults(data);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const handleSearchDebounce = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    clearTimeout(timeoutId);
    if (value.length > 0) {
      const search = () => setTimeout(() => handleSearchInput(value), 1000);
      setTimeoutId(search());
    } else {
      setSearchResults([]);
    }
  };

  const handleUserClick = () => {
    setSearchInput('');
    onClose();
  };

  const drawer = (
    <div>
      <Grid container justifyContent="space-between" className={classes.headerContainer}>
        <Grid item xs={10}>
          <UserHeader userInfo={userInfo} />
        </Grid>
        {open && (
          <Grid item xs={2} style={{ alignSelf: 'center' }}>
            <IconButton onClick={onClose}>
              <ChevronLeftIcon color="secondary" />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button onClick={handlePageClick}>
            <ListItemIcon>
              <HomeIcon color={selectedPage === 'Home' ? 'primary' : 'secondary'} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handlePageClick}>
            <ListItemIcon>
              <LibraryBooks color={selectedPage === 'My Bets' ? 'primary' : 'secondary'} />
            </ListItemIcon>
            <ListItemText primary="My Bets" />
          </ListItem>
          <ListItem button onClick={handlePageClick} disabled>
            <ListItemIcon>
              <NotificationsIcon color={selectedPage === 'Notifications' ? 'primary' : 'secondary'} />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem button onClick={handlePageClick} disabled>
            <ListItemIcon>
              <MailIcon color={selectedPage === 'Messages' ? 'primary' : 'secondary'} />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button onClick={handlePageClick}>
            <ListItemIcon>
              <PersonIcon color={selectedPage === 'Profile' ? 'primary' : 'secondary'} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <div className={classes.divider} />
        {userInfo && (
          <Grid container style={{ marginTop: 10 }} justifyContent="center">
            <Grid item xs={10}>
              <BasicTextInput
                placeholder="Search..."
                name="search"
                onChange={handleSearchDebounce}
                value={searchInput}
              />
              {searchInput ? (
                <SearchResultsFeed userList={searchResults} onUserClick={handleUserClick} />
              ) : (
                <FollowButtons onClose={onClose} />
              )}
            </Grid>
          </Grid>
        )}
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
