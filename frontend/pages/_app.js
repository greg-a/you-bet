import { ThemeProvider } from '@material-ui/core';
import Theme from '../styles/mui-theme';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
    <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
