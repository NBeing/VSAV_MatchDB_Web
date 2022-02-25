import * as React from "react";
import {
    Routes,
    Route,
    Link,
    Outlet
} from "react-router-dom";

import { RequireAuth } from "@Components/auth/RequireAuth";
import Login from "@Pages/login/Login.component";
// import { ApiTest } from "./ApiTest";
import { NavBar } from "@Components/navigation/NavBar.component";
import { MatchList } from "@Pages/matchlist/MatchList.component";
import AddMatch from "@Pages/addmatch/AddMatch.component";

export default function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MatchList />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <AddMatch />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/protected">Protected Page (Test Auth)</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}



