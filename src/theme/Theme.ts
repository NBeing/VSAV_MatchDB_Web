type CustomTheme = {
    background: string
    container:  string,
	container2: string,
	container3: string,
	text1:      string,
	text2:      string,

}

const customTheme:CustomTheme = {
    background: '#191d26',
    container:  '#1b222c',
	container2: '#12151c',
	container3: '#191d26',
	text1:      '#661b1c',
	text2:      '#531516',
}
import { createTheme } from "@mui/material/styles";
const muiTheme = createTheme({
    palette: {
      primary: {
        light: "#63b8ff",
        main: "#0989e3",
        dark: "#005db0",
        contrastText: "#000",
      },
      secondary: {
        main: "#4db6ac",
        light: "#82e9de",
        dark: "#00867d",
        contrastText: "#000",
      },
    },
  });
export {
    muiTheme,
    customTheme,
    type CustomTheme
}
    