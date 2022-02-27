import React from 'react'
import { useLocation, Navigate } from "react-router-dom";
import { IAuthContext, useAuth } from "@Services/auth/Auth.helpers";
import { Location } from 'history';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth:IAuthContext = useAuth();
    const location:Location = useLocation();
  
    if (!auth.user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }