import * as React from "react";
import {
    Routes,
    Route,
    Link,
    Outlet
} from "react-router-dom";

import { RequireAuth } from "@Components/auth/RequireAuth";
import Login from "@Pages/login/Login";
import { ApiTest } from "./ApiTest";
import { MatchList } from "@Pages/matchlist/MatchList";
import { NavBar } from "./navigation/NavBar.component";

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
                <ApiTest />
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
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}



