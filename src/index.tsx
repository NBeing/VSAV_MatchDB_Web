import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from '@Root/App/App'
import { AuthProvider } from 'services/auth/Auth.helpers'
import { ThemeProvider } from 'react-jss'
import { theme } from "@Theme/Theme"

function index() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <AuthProvider>
                        <App/>
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </React.StrictMode>
    )
}

render(index(), document.getElementById('appMainBody'))