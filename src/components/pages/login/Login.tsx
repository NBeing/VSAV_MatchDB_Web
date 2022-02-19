import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Location, To } from "history";
import { useAuth } from "@AuthService/Auth.helpers";

type LocationState = {
  from: {
    path: string;
  }
}

function Login() {
  
  const navigate = useNavigate();
  const location:Location = useLocation();
  const auth = useAuth();

  const { from } = location.state as LocationState || { from: { pathname: "/" } };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    await auth.signin({username, password}, () => {
      // This is the callback post signin
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from as To, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from.path}</p>

      <form onSubmit={handleSubmit}>
        <label>
            Username: 
            <input name="username" type="text" />
        </label>
        <label>
            Password:
            <input name="password" type="password">
          </input>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login
