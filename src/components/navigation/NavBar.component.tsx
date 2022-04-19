import React, {ReactElement} from "react"

import { ROUTE_NAMES } from '@Routes/RouteNames.const';
import { AuthStatus } from "@Components/navigation/AuthStatus.component"

import {createUseStyles, useTheme} from 'react-jss'
import type { CustomTheme } from '@Theme/Theme'
import { NavBarItem } from "./NavBarItem.component";

type RuleNames = 
  'wrapper'  |
  'link'

const useStyles = createUseStyles<RuleNames, NavBarProps, CustomTheme>({
  wrapper: ({
    // background: 'black'
  }),
  link:  {},
})

interface NavBarProps {}

type NavBarItemRouteInfo = {
    to: string
    description: string
}

const NAV_ITEMS:Readonly<NavBarItemRouteInfo[]> = [
    { to: ROUTE_NAMES.LOGIN,     description: "Login" } ,
    { to: ROUTE_NAMES.LISTING,   description: "Match List" } ,
    { to: ROUTE_NAMES.ADD_MATCH, description: "Add Match (protected)" } 
]
export const NavBar:React.FC = ({...props}: NavBarProps):ReactElement => {

    const theme:CustomTheme = useTheme<CustomTheme>()
    const classes = useStyles({...props, theme})

    return (
        <div style={{marginBottom: 'none'}}
            data-testid='NavBar-container'
            className={classes.wrapper}
        >
            { NAV_ITEMS.map(
                (item:NavBarItemRouteInfo, key:number) => {
                    return (
                        <NavBarItem key={key} to={item.to} description={item.description}/>
                    )
            })
            }
            <AuthStatus />
        </div>
    )
}