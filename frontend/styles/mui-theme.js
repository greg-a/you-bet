import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#025e89',
    },
    secondary: {
      main: '#D9DBF1',
      dark: '#D9DBF1A8',
    },
  },
  spacing: 4,
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    h6: {
      fontFamily: 'Conthrax',
    },
    description: '#D9DBF1A8',
  },
});

export default theme;
