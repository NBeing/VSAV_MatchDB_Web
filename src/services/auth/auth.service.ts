import api from "@Common/http.common";
import TokenService from "@Auth/token.service";
import { Credentials } from "@Auth/Auth.helpers";

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
