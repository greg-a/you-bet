import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import Theme from '../styles/mui-theme';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp
