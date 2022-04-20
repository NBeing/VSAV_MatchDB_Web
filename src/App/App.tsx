import * as React from "react";
import { Outlet} from "react-router-dom";
import { NavBar } from "@Components/navigation/NavBar.component";
import { Paper } from "@mui/material";

const App:React.FC = ():React.ReactElement => {
  return (
    <Paper
      data-testid="app-wrapper"
    >
      <h1>VSAV MATCH DBEE</h1>
      <NavBar/>
      <Outlet />
    </Paper>
  );
}


export default App