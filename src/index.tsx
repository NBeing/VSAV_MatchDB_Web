import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import { AuthProvider } from 'services/auth/Auth.helpers'

function index() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    )
}

render(index(), document.getElementById('appMainBody'))