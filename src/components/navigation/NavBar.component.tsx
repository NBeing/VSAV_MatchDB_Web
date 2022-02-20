import React from "react"
import { AuthStatus } from "./AuthStatus.component"

export function NavBar(){
    return (
        <div>
            <h1>VSAV MATCH DBEE</h1>
            <AuthStatus />
        </div>
    )
}