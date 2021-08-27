import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  body: {
    minWidth: 275,
    paddingRight: 10,
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
    borderWidth: 0.5,
    borderColor: theme.palette.secondary.dark,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 8,
    overflowWrap: 'break-word',
  },
}));

export default useStyles;
