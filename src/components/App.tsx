import * as React from "react";
import {
    Routes,
    Route,
    Link,
    Outlet
} from "react-router-dom";

import { AuthStatus } from "./navigation/AuthStatus.component";
import { RequireAuth } from "./auth/RequireAuth";
import Login from "@Pages/login/Login";
import { ApiTest } from "./ApiTest";

export default function App() {
  return (
      <div>
      <h1>Auth Example</h1>

      <p>
        This example demonstrates a simple login flow with three pages: a public
        page, a protected page, and a login page. In order to see the protected
        page, you must first login. Pretty standard stuff.
    </p>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
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
      <AuthStatus />

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

function PublicPage() {
  return <h3>Public Page, hello to you!</h3>;
}




