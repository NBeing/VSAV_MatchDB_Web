import api from "../http.common";

import TokenService from "./token.service";
import { Credentials } from "./Auth.helpers";

const getToken = (credentials:Credentials) => {
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

const removeToken = (callback:VoidFunction) => {
  TokenService.removeUser();
  console.log(TokenService.getLocalAccessToken())
  callback()
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") as string);
};


const AuthService = {
  getToken,
  removeToken,
  getCurrentUser,
};

export default AuthService;
