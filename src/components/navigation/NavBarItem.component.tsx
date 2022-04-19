import React, {ReactElement} from "react"
import { Link } from "react-router-dom"

import {createUseStyles, useTheme} from 'react-jss'
import type { CustomTheme } from '@Theme/Theme'

type RuleNames = 
  'wrapper'  |
  'link'

const useStyles = createUseStyles<RuleNames, NavBarItemProps, CustomTheme>({
  wrapper: ({
    // background: 'black'
  }),
  link:  {},
})

interface NavBarItemProps {
    to: string // TODO: This should be an enum type
    description: string
}

export const NavBarItem:React.FC<NavBarItemProps> = 
    ({...props} : NavBarItemProps ) : ReactElement => 
{
    const {to, description} = props
    const theme:CustomTheme = useTheme<CustomTheme>()
    const classes = useStyles({...props, theme})

    return (
        <li
            data-testid='NavBarItem-container'
            className={classes.wrapper}
        >
            <Link className="link" to={to}>
                {description}
            </Link>
        </li>
    )
}