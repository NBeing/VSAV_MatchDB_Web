import React, {ReactElement} from "react"
import { AuthStatus } from "@Components/navigation/AuthStatus.component"
import { Link } from "react-router-dom"

export const NavBar:React.FC = ():ReactElement => {
    return (
        <div>
            <Link to="/login">Login</Link>
            <Link to="/protected">Protected (Edit)</Link>
            <Link to="/listing">Match List</Link>
            <AuthStatus />
        </div>
    )
}