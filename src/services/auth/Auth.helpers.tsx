import React from 'react'
import AuthService from '@AuthService/auth.service';
import TokenService from './token.service';

export type Credentials = {
    username: string | null
    password: string | null
}
export type UserObject = {
    username: string | null
    token: Token
}
export type RefreshToken = string | null
export type AccessToken = string | null

export type Token = {
    refresh: RefreshToken
    access: AccessToken
}
export interface IAuthContext {
    user: UserObject | null;
    signin:  (credentials:Credentials, callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
}
export type VideoDetails = {
    uploader:  string,
    dateUploaded: string,
    videoTitle: string
  }

export const AuthContext = React.createContext<IAuthContext>(null!);

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

export function useAuth():IAuthContext {
    return React.useContext(AuthContext);
}
