import api from "@Common/http.common";
import TokenService from "@AuthService/token.service";
import { Credentials, Token, UserObject } from "@AuthService/Auth.helpers";

const getToken = (credentials:Credentials): Promise<Token> => {
  return api
    .post("/api/token/", {
      email: credentials.username,
      password: credentials.password
    })
    .then((response) => {
      if (response.data.access) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const removeToken = (callback:VoidFunction): void => {
  TokenService.removeUser();
  callback()
};

const getCurrentUser = ():UserObject => {
  return JSON.parse(localStorage.getItem("user") as string) as UserObject;
};

interface AuthServiceInterface {
  getToken: (credentials:Credentials) => Promise<Token>
  removeToken: (callback:VoidFunction) => void
  getCurrentUser: () => UserObject
}

const AuthService:AuthServiceInterface = {
  getToken,
  removeToken,
  getCurrentUser,
};

export default AuthService;
