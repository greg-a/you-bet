import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 412,
    backgroundColor: 'black',
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6),
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '65vh',
  },
  body: {
    overflowY: 'auto',
    maxHeight: '45vh',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    padding: 10,
  },
}));

export default useStyles;
