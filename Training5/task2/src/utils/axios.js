import axios from "axios";
import { logout, setPermissionDeny } from "../redux/actions/auth";
let store;

export const setStore = (_store) => {
  store = _store;
};

export const $axios = axios.create({
  baseURL: "http://localhost:9000/",
  headers: {
    accept: "application/json",
  },
});

$axios.interceptors.request.use((config) => {
  const token = store.getState()?.auth?.token;
  token && (config.headers["authorization"] = `Bearer ${token}`);
  console.log("config request", config);
  return config;
});

$axios.interceptors.response.use(
  (response) => {
    console.log("config response", response);
    return response;
  },
  (error) => {
    console.log("error?.response?.status", error?.response?.status);
    if (error?.response?.status === 401) {
      store.dispatch(logout());
    }
    if (error?.response?.status === 403) {
      store.dispatch(setPermissionDeny(true));
    }
    return Promise.reject(error);
  }
);
