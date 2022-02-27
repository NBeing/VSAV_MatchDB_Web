import * as React from "react";
import { Outlet} from "react-router-dom";
import { NavBar } from "@Components/navigation/NavBar.component";

const App:React.FC = ():React.ReactElement => {
  return (
    <div data-testid="app-wrapper">
      <h1>VSAV MATCH DBEE</h1>
      <NavBar/>
      <Outlet />
    </div>
  );
}


export default App