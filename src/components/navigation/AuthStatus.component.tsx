import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@Services/auth/Auth.helpers';

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth?.user) {
    return <div><p>You are not logged in.</p></div>;
  }

  return (
    <p>
      <label>Welcome {auth.user.username}!{" "}</label>
      <button
        onClick={() => {
          auth.logout(() => navigate("/"));
        }}
      >
      <label>Sign Out</label>
      </button>
    </p>
  );
}