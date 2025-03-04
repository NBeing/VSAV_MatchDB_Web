import * as React from "react";
import { Outlet} from "react-router-dom";
import { NavBar } from "@Components/navigation/NavBar.component";

const App:React.FC = ():React.ReactElement => {
  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  );
}


export default App