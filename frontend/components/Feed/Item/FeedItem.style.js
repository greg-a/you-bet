import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  body: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color: 'white',
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    borderWidth: 1,
    borderColor: theme.palette.secondary.main,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 5,
  },
}));

export default useStyles;
