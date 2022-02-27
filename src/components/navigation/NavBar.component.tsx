import React, {ReactElement} from "react"
import { Link } from "react-router-dom"

import { ROUTE_NAMES } from '@Routes/RouteNames.const';
import { AuthStatus } from "@Components/navigation/AuthStatus.component"

import {createUseStyles, useTheme} from 'react-jss'
import type { CustomTheme } from '@Theme/Theme'

type RuleNames = 
  'wrapper'  |
  'link'

const useStyles = createUseStyles<RuleNames, NavBarProps, CustomTheme>({
  wrapper: ({theme}) => ({
    background: theme.background || 'black'
  }),
  link:  {},
})

interface NavBarProps {}

export const NavBar:React.FC = ({...props}: NavBarProps):ReactElement => {

    const theme:CustomTheme = useTheme<CustomTheme>()
    const classes = useStyles({...props, theme})

    return (
        <div
            data-testid='NavBar-container'
            className={classes.wrapper}
        >
            <Link className="link" to={`/${ROUTE_NAMES.LOGIN}`}>
                Login
            </Link>
            <Link className="link" to={`/${ROUTE_NAMES.ADD_MATCH}`}>
                Add Match (login req)
            </Link>
            <Link className="link" to={`/${ROUTE_NAMES.LISTING}`}>
                Match List
            </Link>
            <AuthStatus />
        </div>
    )
}