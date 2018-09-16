
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

 const theme  = createMuiTheme({
    palette: {
      primary: {
        main:"#443737",
        light:"#6f6161",
        dark:"#1d1111"
      },
      secondary: {
        main: '#c8110c',
        light:"#ff5338",
        dark:"#8f0000"
      },
    },
  });

  export default theme;