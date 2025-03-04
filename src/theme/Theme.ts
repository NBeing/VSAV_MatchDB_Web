import { createTheme } from "@mui/material";

type CustomTheme = {
  background: string
  container: string,
  container2: string,
  container3: string,
  text1: string,
  text2: string,

}

const customTheme: CustomTheme = {
  background: '#191d26',
  container: '#1b222c',
  container2: '#12151c',
  container3: '#191d26',
  text1: '#661b1c',
  text2: '#531516',
}
const muiTheme = createTheme({
  typography: {
    // fontFamily: 'OndineRegular',
    // fontSize: 30,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'OndineRegular';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('OndineRegular'), local('OndineRegular'), url(./assets/OndineRegular.ttf) format('truetype');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: '#a800b8',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#000000',
    },
  },
});
export {
  muiTheme,
  customTheme,
  type CustomTheme
}
