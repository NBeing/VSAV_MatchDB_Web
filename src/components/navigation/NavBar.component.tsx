import React, {ReactElement} from "react"
import { AuthStatus } from "@Components/navigation/AuthStatus.component"
import { Link } from "react-router-dom"
import { ROUTE_NAMES } from '@Routes/RouteNames.const';

export const NavBar:React.FC = ():ReactElement => {
    return (
        <div>
            <Link to={`/${ROUTE_NAMES.LOGIN}`}>Login</Link>
            <Link to={`/${ROUTE_NAMES.ADD_MATCH}`}>Add Match (login req)</Link>
            <Link to={`/${ROUTE_NAMES.LISTING}`}>Match List</Link>
            <AuthStatus />
        </div>
    )
}