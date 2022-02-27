import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router'
import { IAuthContext, useAuth } from '@Services/auth/Auth.helpers';

export const AuthStatus:React.FC = ():ReactElement => {
  const auth:IAuthContext = useAuth();
  const navigate:NavigateFunction = useNavigate();

  const logout = () => {
    auth.logout(() => navigate("/"));
  }
  if (!auth?.user) {
    return <div><p>You are not logged in.</p></div>;
  }

  return (
    <p>
      <label>Welcome {auth.user.username}!{" "}</label>
      <button
        onClick={ logout }
      >
        <label>Sign Out</label>
      </button>
    </p>
  );
}