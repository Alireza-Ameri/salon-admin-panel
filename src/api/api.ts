import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const config: AxiosRequestConfig = {
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  headers: {
    Accept: "*/*",
  },
  timeout: 3000,
};

const customAxios: AxiosInstance = axios.create(config);

const loggedIn = (auth: string) => {
  customAxios.defaults.headers.common["Authorization"] = `Bearer ${auth}`;
};

const loggedOut = () => {
  customAxios.defaults.headers.common["Authorization"] = "";
  window.location.replace("/login");
};

const requestHandler = (request: any) => {
  const token = localStorage.getItem("token");

  if (token) {
    request.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }

  return request;
};

const responseHandler = (response: any) => {
  return response;
};

const errorHandler = (error: any) => {
  if (error.response.status === 401) {
    loggedOut();
  }

  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export { customAxios, loggedIn, loggedOut };
