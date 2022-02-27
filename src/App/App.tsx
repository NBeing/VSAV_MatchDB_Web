import * as React from "react";
import { Outlet} from "react-router-dom";
import { NavBar } from "@Components/navigation/NavBar.component";

import {createUseStyles, useTheme} from 'react-jss'
import type { CustomTheme } from '@Theme/Theme'


type RuleNames = 'wrapper'


const useStyles = createUseStyles<RuleNames, AppProps, CustomTheme>({
  wrapper: ({theme}) => ({
    background: theme.background || 'black'
  })
})

interface AppProps {}

const App:React.FC = ({...props}):React.ReactElement => {
  const theme:CustomTheme = useTheme<CustomTheme>()
  const classes = useStyles({...props, theme})

  return (
    <div 
      className={classes.wrapper} 
      data-testid="app-wrapper"
    >
      <h1>VSAV MATCH DBEE</h1>
      <NavBar/>
      <Outlet />
    </div>
  );
}


export default App