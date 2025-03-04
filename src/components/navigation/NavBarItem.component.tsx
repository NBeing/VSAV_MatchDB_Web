import React, { ReactElement } from "react"
import { Link } from "react-router-dom"
import { Typography } from "@mui/material"

interface NavBarItemProps {
    to: string // TODO: This should be an enum type
    description: string
}

export const NavBarItem: React.FC<NavBarItemProps> =
    ({ ...props }: NavBarItemProps): ReactElement => {
        const { to, description } = props

        return (
            <Link
                to={to}
                style={{
                    textDecoration: 'none',
                }}>
                <Typography
                    variant="h6"
                    sx={{
                        position: 'relative',
                        top: -10,
                        fontFamily: "OndineRegular",
                        fontSize: "3.5em",
                        color: "black",
                        // ["-webkit-text-stroke-width"]: "1px",
                        // ["-webkit-text-stroke-color"]: "#ffdc33",
                        // background: "rgb(29,206,28)",
                        // background: "radial-gradient(circle, rgba(29,206,28,1) 0%, rgba(2,89,67,1) 75%, rgba(0,0,0,1) 100%)" 
                        
                    }}
                > {description}</Typography>
            </Link>
        )
    }