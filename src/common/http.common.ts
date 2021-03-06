import axios from "axios";

import TokenService from "@AuthService/token.service";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token && config && config.headers) {
      config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    // For Eventual Sign In Page
    if (originalConfig.url !== "/auth/signin/" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await instance.post("/api/token/refresh/", {
            refresh: TokenService.getLocalRefreshToken(),
          });
          const { access } = rs.data;
          TokenService.updateLocalAccessToken(access);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
