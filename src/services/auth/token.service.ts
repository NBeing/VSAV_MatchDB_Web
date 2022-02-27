import { AccessToken, RefreshToken, UserObject } from './Auth.helpers'

const getLocalRefreshToken = ():RefreshToken => {
    const user:UserObject = JSON.parse(localStorage.getItem("user") as string);
    return user?.token?.refresh;
};
  
const getLocalAccessToken = ():AccessToken => {
    const user:UserObject = JSON.parse(localStorage.getItem("user") as string);
    return user?.token?.access;
};

const updateLocalAccessToken = (token:AccessToken):void => {
    const user:UserObject = JSON.parse(localStorage.getItem("user") as string);
    user.token.access = token;
    localStorage.setItem("user", JSON.stringify(user));
};

const getUser = ():UserObject => {
    return JSON.parse(localStorage.getItem("user") as string);
};

const setUser = (user:UserObject):void => {
    localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = ():void => {
    localStorage.removeItem("user");
};

interface TokenServiceInterface {
    getLocalRefreshToken(): RefreshToken
    getLocalAccessToken(): AccessToken
    updateLocalAccessToken(token:AccessToken):void
    getUser(): UserObject
    setUser(user:UserObject): void
    removeUser():void   
}
const TokenService:TokenServiceInterface = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
};

export default TokenService;
