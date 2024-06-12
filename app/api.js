import axios from "axios";

const api = axios.create({
  baseURL: "https://subtle-immortal-sailfish.ngrok-free.app/api",
  headers: { "ngrok-skip-browser-warning": "skip-browser-warning" },
});

const TOKEN_KEY = "timesheet_access_token";

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      navigation.navigate("Login");
      localStorage.removeItem(TOKEN_KEY)
    }
    return Promise.reject(error);
  }
);

export default api;
