import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router'
import { IAuthContext, useAuth } from '@Services/auth/Auth.helpers';

import {createUseStyles, useTheme} from 'react-jss'
import type { CustomTheme } from '@Theme/Theme'


type RuleNames = 
  'wrapper'       |
  'logoutButton'  |
  'welcome'       | 
  'notLoggedIn'

interface AuthStatusProps {}

const useStyles = createUseStyles<RuleNames, AuthStatusProps, CustomTheme>({
  // wrapper: ({theme}) => ({
  //   background: theme.background || 'black',
  //   color: theme.text2
  // }),
  wrapper: ({
    // background: 'black'
  }),
  logoutButton:  {},
  welcome:  {},
  notLoggedIn: {}
})

export const AuthStatus:React.FC = ({...props}: AuthStatusProps):ReactElement => {
  const auth:IAuthContext = useAuth();
  const navigate:NavigateFunction = useNavigate();

  const theme:CustomTheme = useTheme<CustomTheme>()
  const classes = useStyles({...props, theme})

  const logout = () => {
    auth.logout(() => navigate("/"));
  }
  if (!auth?.user) {
    return <div className={classes.notLoggedIn}>
      <span>You are not logged in.</span>
    </div>;
  }

  return (
    <div
      data-testid=""
      className={classes.wrapper}
    >
      <span className={classes.welcome}>
        Welcome {auth.user.username}!{" "}
      </span>
      <button
        className={classes.logoutButton}
        onClick={ logout }
      >
        <label>Log Out</label>
      </button>
    </div>
  );
}