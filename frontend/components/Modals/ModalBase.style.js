import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '40%',
    backgroundColor: 'black',
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6),
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    overflowY: 'auto',
    maxHeight: '45vh',
  },
  closeButton: {
    width: 40,
    padding: 5,
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
