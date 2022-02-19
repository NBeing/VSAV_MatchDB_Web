import React from 'react'
import AuthService from '@AuthService/auth.service';
import TokenService from './token.service';

export interface Credentials {
    username: string | null,
    password: string | null
}
export interface UserObject {
    username: string | null,
    token: Token
}
export interface Token {
    refresh: string | null,
    access: string | null
}
export interface AuthContextType {
    user: UserObject | null;
    signin:  (credentials:Credentials, callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}
  
export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = React.useState<UserObject|null>(null);

    const signin = async (credentials:Credentials, callback: VoidFunction) => {
            const token = await AuthService.getToken(credentials)
            setUser({username: credentials.username, token });
            TokenService.setUser({username: credentials.username, token:token })
            callback();
    }

    const logout = (callback: VoidFunction) => {
            return AuthService.removeToken(() => {
                setUser(null);
                callback();
        });
    };

    const value = { user, signin, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}
