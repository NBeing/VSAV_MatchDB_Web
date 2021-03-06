import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { ThemeProvider } from 'react-jss'

import App from '@Root/App/App'
import { AuthProvider } from 'services/auth/Auth.helpers'
import { muiTheme } from "@Theme/Theme"
import { AppRoutes } from '@Routes/Routes'
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";

function index() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <ThemeProvider theme={muiTheme}>
                    <CssBaseline />
                    <AuthProvider>
                        <App/>
                        <AppRoutes />
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </React.StrictMode>
    )
}

render(index(), document.getElementById('appMainBody'))