import { makeStyles } from '@material-ui/core';

const drawerWidth = 330;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'black',
    color: theme.palette.secondary.light,
    border: 'none',
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  divider: {
    height: 0.5,
    backgroundColor: theme.palette.secondary.light,
  },
  headerContainer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerContainer: {
    borderColor: theme.palette.secondary.light,
    borderRightStyle: 'solid',
    minHeight: '100vh',
    borderWidth: 0.5,
    marginTop: 1,
  },
}));

export default useStyles;
