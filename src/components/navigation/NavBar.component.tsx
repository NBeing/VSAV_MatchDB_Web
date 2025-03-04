import React, { ReactElement } from "react"

import { ROUTE_NAMES } from '@Routes/RouteNames.const';
import { AuthStatus } from "@Components/navigation/AuthStatus.component"
import { NavBarItem } from "./NavBarItem.component";
import { Box, Toolbar, Paper } from "@mui/material";

import VSAV_LOGO from "@Root/assets/images/vsav_logo.png"
import VSAV_LOGO_BG from "@Root/assets/images/logo_repeated_bg.png"

// interface NavBarProps { }

type NavBarItemRouteInfo = {
    to: string
    description: string
}

const NAV_ITEMS: Readonly<NavBarItemRouteInfo[]> = [
    { to: ROUTE_NAMES.LOGIN, description: "Login" },
    { to: ROUTE_NAMES.LISTING, description: "Match List" },
    { to: ROUTE_NAMES.ADD_MATCH, description: "Add Match (protected)" }
]
export const NavBar: React.FC = (): ReactElement => {
    return (
        <Paper
            data-testid="app-wrapper"
            sx={{
                backgroundColor: "black",
                backgroundImage: `url(${VSAV_LOGO_BG})`,
                backgroundRepeat: "repeat-x",
            }}
        >
            <Box sx={{ display: 'flex', flexDirection:'row' }}>
                <img src={VSAV_LOGO}></img>
                    <Toolbar sx={{width: "100%", display: 'flex', justifyContent: 'space-between'}}>
                        {NAV_ITEMS.map(
                            (item: NavBarItemRouteInfo, key: number) => {
                                return (
                                    <NavBarItem key={key} to={item.to} description={item.description} />
                                )
                            })
                        }
                        <AuthStatus />

                    </Toolbar>
            </Box>

        </Paper>
    )
}