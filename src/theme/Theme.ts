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
import { createTheme } from "@mui/material";
const muiTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: '#00FF00',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: '#000000',
      },
      // text: {
      //   primary: "white"
      // }
    },
});
export {
    muiTheme,
    customTheme,
    type CustomTheme
}
    