import { UserObject} from './Auth.helpers'

const getLocalRefreshToken = () => {
    const user:UserObject = JSON.parse(localStorage.getItem("user") as string);
    return user?.token?.refresh;
};
  
const getLocalAccessToken = () => {
    const user:UserObject = JSON.parse(localStorage.getItem("user") as string);
    return user?.token?.access;
};

const updateLocalAccessToken = (token:string) => {
    const user:UserObject = JSON.parse(localStorage.getItem("user") as string);
    user.token.access = token;
    localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
    return JSON.parse(localStorage.getItem("user") as string);
};

const setUser = (user:UserObject) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
    localStorage.removeItem("user");
};

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
};

export default TokenService;
